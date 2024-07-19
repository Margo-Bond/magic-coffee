import { cafeOne, cafeTwo, cafeThree } from "../../../../vars.js";
import { database, set, ref, get, remove } from "../../../../main.js";
import BackSvg from "@/assets/images/geometric-icons/back.svg";
import { getCoffeeImage } from "../../../../Services/Get.js";

export default function renderCurrentOrderPage(main) {
  main.innerHTML = `
    <div class="current-header">
      <button class="current-header__back-btn">${BackSvg}</button>
      <p class="current-header__title">My order</p>
    </div>
    <div class="current-order" id="currentOrderContainer"></div>
    <button class="current__button-next">Order Now</button>
  `;

  let order = JSON.parse(localStorage.getItem("order")) || {};
  let keys = Object.keys(order);
  let lastKey = keys[keys.length - 1];

  const cafeAddress = order[lastKey].cafe_address;
  const coffeeType = order[lastKey].coffee_type;
  const backBtn = document.querySelector(".current-header__back-btn");
  const nextBtn = document.querySelector(".current__button-next");
  const currentOrderContainer = document.getElementById(
    "currentOrderContainer"
  );

  const milkOption = order[lastKey].milk_option || "none";
  const syrupOption = order[lastKey].syrup_option || "none";
  const coffeeRistretto = order[lastKey].coffee_ristretto || "none";
  const coffeeRoasting = order[lastKey].coffee_roasting || "none";

  function getCafeKey(address) {
    switch (address) {
      case cafeOne:
        return "cafe_one";
      case cafeTwo:
        return "cafe_two";
      case cafeThree:
        return "cafe_three";
      default:
        return null;
    }
  }
  const cafeKey = getCafeKey(cafeAddress);

  const coffeeKeys = {
    Americano: "americano",
    Cappuccino: "cappuccino",
    Latte: "latte",
    "Flat White": "flat_white",
    Raf: "raf",
    Espresso: "espresso",
    "Matcha Latte": "matcha_latte",
    "Vienna Coffee": "vienna_coffee",
    Frappuccino: "frappuccino",
    Macchiato: "macchiato",
  };
  const coffeeKey = coffeeKeys[coffeeType];

  if (!cafeKey) {
    console.error("Invalid cafe address:", cafeAddress);
  }
  if (!coffeeKey) {
    console.error("Invalid coffee type:", coffeeType);
  }

  async function displayOrder(order) {
    currentOrderContainer.innerHTML = ``;

    for (let key of Object.keys(order)) {
      const itemContainer = document.createElement("div");
      itemContainer.classList.add("current-order__item");

      itemContainer.innerHTML = `
        <img class="current-order__item-img" src="" alt="${order[key].coffee_type}"/>
        <div class="current-order__item-description">
          <p class="current-order__item-title">${order[key].coffee_type}</p>
          <p class="current-order__item-details">${coffeeRistretto} | ${coffeeRoasting} | ${milkOption} | ${syrupOption}</p>
          <p class="current-order__item-quantity">x ${order[key].cup_quantity}</p>
        </div>
        <div class="current-order__item-sum">
          <p class="current-order__item-currency">BYN</p>
          <p class="current-order__item-price">${order[key].order_price}</p>
        </div>
      `;
      currentOrderContainer.append(itemContainer);

      try {
        const coffeeImage = await getCoffeeImage(
          cafeKey,
          coffeeKeys[order[key].coffee_type]
        );
        const coffeeImageElement = itemContainer.querySelector(
          ".current-order__item-img"
        );
        coffeeImageElement.src = coffeeImage;
        coffeeImageElement.alt = order[key].coffee_type;
      } catch (err) {
        console.error("Error setting coffee image:", err);
      }
    }
  }

  displayOrder(order);

  const lastOrder = order[lastKey];

  async function sendOrderToDatabase(lastOrder, lastKey, userUid) {
    const now = new Date();
    const orderTime = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
      now.getSeconds()
    ).padStart(2, "0")}`;

    lastOrder.order_time = orderTime;

    const orderRef = ref(
      database,
      `users/${userUid}/orders/on-going/${lastKey}`
    );

    function setDeletionTimer(delay) {
      setTimeout(async () => {
        await moveOrderToHistory(lastOrder, lastKey, userUid);
        delete order[lastKey];
        localStorage.setItem("order", JSON.stringify(order));
        console.log("Order removed after specified time.");
      }, delay);
    }

    try {
      await set(orderRef, lastOrder);
      console.log("Order saved successfully.");
      const pickupTime = order[lastKey].pickup_time;

      if (pickupTime) {
        const [pickupHour, pickupMinute] = pickupTime.split(":").map(Number);
        const pickupDateTime = new Date(now);
        pickupDateTime.setHours(pickupHour);
        pickupDateTime.setMinutes(pickupMinute);
        pickupDateTime.setSeconds(0);
        pickupDateTime.setMilliseconds(0);

        const deletionTime = pickupDateTime.getTime();
        const currentTime = now.getTime();
        const delay = deletionTime - currentTime;
        if (deletionTime > currentTime) {
          setDeletionTimer(delay);
        } else {
          alert(
            "Order pick-up time cannot be set earlier than sending the order for processing."
          );
        }
      } else {
        setDeletionTimer(3 * 60 * 1000);
      }
    } catch (error) {
      console.error("Error saving order: ", error);
      alert("There was an error placing your order. Please try again.");
      return;
    }
  }

  async function moveOrderToHistory(lastOrder, lastKey, userUid) {
    const historyOrderRef = ref(database, `users/${userUid}/orders/history`);
    const ongoingOrderRef = ref(
      database,
      `users/${userUid}/orders/on-going/${lastKey}`
    );

    try {
      const snapshot = await get(historyOrderRef);
      const history = snapshot.exists() ? snapshot.val() : {};
      history[lastOrder.order_time] = lastOrder; // Используем уникальный ключ из lastOrder

      await set(historyOrderRef, history);
      console.log("Order moved to history successfully.");

      await remove(ongoingOrderRef);
    } catch (error) {
      console.error("Error moving order to history: ", error);
    }
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const userUid = user ? user.uid : null;

  backBtn.addEventListener("click", () => {
    window.location.href = "/designer";
  });

  nextBtn.addEventListener("click", () => {
    if (userUid) {
      sendOrderToDatabase(lastOrder, lastKey, userUid);
      window.location.href = "/order-confirmed";
    } else {
      alert("User is not authenticated.");
    }
  });
}
