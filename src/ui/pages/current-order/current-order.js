import { cafeOne, cafeTwo, cafeThree } from "../../../../vars.js";
import { database, set, ref, get, remove } from "../../../../main.js";
import BackSvg from "@/assets/images/geometric-icons/back.svg";
import { getCoffeeImage } from "../../../../Services/Get.js";
import timerManager from "../../../../Services/timerManager.js";

export default async function renderCurrentOrderPage(main) {
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

    if (order[lastKey]) {
      const itemContainer = document.createElement("div");
      itemContainer.classList.add("current-order__item");

      itemContainer.innerHTML = `
        <img class="current-order__item-img" src="" alt="${
          order[lastKey].coffee_type
        }"/>
        <div class="current-order__item-description">
          <p class="current-order__item-title">${
            order[lastKey].coffee_type || ""
          }</p>
          <p class="current-order__item-details">${coffeeRistretto || ""} | ${
        coffeeRoasting || ""
      } | ${milkOption || ""} | ${syrupOption || ""}</p>
          <p class="current-order__item-quantity">x ${
            order[lastKey].cup_quantity || ""
          }</p>
        </div>
        <div class="current-order__item-sum">
          <p class="current-order__item-currency">BYN</p>
          <p class="current-order__item-price">${
            order[lastKey].order_price || ""
          }</p>
        </div>
      `;
      currentOrderContainer.append(itemContainer);

      try {
        const coffeeImage = await getCoffeeImage(
          cafeKey,
          coffeeKeys[order[lastKey].coffee_type]
        );
        const coffeeImageElement = itemContainer.querySelector(
          ".current-order__item-img"
        );
        coffeeImageElement.src = coffeeImage;
        coffeeImageElement.alt = order[lastKey].coffee_type;
      } catch (err) {
        console.error("Error setting coffee image:", err);
      }
    }
  }

  displayOrder(order);

  const lastOrder = order[lastKey];
  const user = JSON.parse(localStorage.getItem("user"));
  const userUid = user ? user.uid : null;

  function calculateDelay(lastOrder, now) {
    let delay = 2 * 60 * 1000;
    let pickupTime = lastOrder.pickup_time;

    if (pickupTime) {
      const [pickupHour, pickupMinute] = pickupTime.split(":").map(Number);
      const pickupDateTime = new Date();
      pickupDateTime.setHours(pickupHour);
      pickupDateTime.setMinutes(pickupMinute);
      pickupDateTime.setSeconds(0);
      pickupDateTime.setMilliseconds(0);

      const deletionTime = pickupDateTime.getTime();
      const currentTime = now.getTime();
      delay = deletionTime - currentTime;
    } else {
      let hours = now.getHours();
      let minutes = now.getMinutes() + 1;

      if (minutes >= 60) {
        minutes -= 60;
        hours += 1;
      }

      // Форматируем часы и минуты в двухзначный формат
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");

      let pickupTime2 = `${formattedHours}:${formattedMinutes}`;
      lastOrder.pickup_time = pickupTime2;
    }

    return delay;
  }

  async function sendOrderToDatabase(lastOrder, lastKey, userUid, delay) {
    const now = new Date();
    const orderTime = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} | ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    lastOrder.order_time = orderTime;

    const orderRef = ref(
      database,
      `users/${userUid}/orders/on-going/${lastKey}`
    );

    try {
      lastOrder.delete_at = now.getTime() + delay;
      await set(orderRef, lastOrder);
      localStorage.setItem("order", JSON.stringify(order));

      timerManager.setDeletionTimer(
        lastOrder.delete_at - now.getTime(),
        lastOrder,
        lastKey,
        userUid
      );
    } catch (error) {
      console.error("Error saving order: ", error);
      alert("There was an error placing your order. Please try again.");
    }
  }

  backBtn.addEventListener("click", () => {
    window.location.href = "/designer";
  });

  nextBtn.addEventListener("click", async () => {
    const now = new Date();
    const delay = calculateDelay(lastOrder, now);

    if (delay <= 0) {
      alert(
        "Order pick-up time cannot be set earlier than sending the order for processing."
      );
      window.location.href = "/order-options";
    } else {
      if (userUid) {
        await sendOrderToDatabase(lastOrder, lastKey, userUid, delay);
        window.location.href = "/order-confirmed";
      } else {
        alert("User is not authenticated.");
      }
    }
  });
}
