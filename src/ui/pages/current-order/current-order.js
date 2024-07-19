import {
  order,
  lastKey,
  cafeOne,
  cafeTwo,
  cafeThree,
} from "../../../../vars.js";
import { database, set, ref, get, push, update } from "../../../../main.js";
import BackSvg from "@/assets/images/geometric-icons/back.svg";
import { getCoffeeImage, getOrders } from "../../../../Services/Get.js";

export default function renderCurrentOrderPage(main) {
  main.innerHTML = `
    <div class="current-header">
      <button class="current-header__back-btn">${BackSvg}</button>
      <p class="current-header__title">My order</p>
    </div>
    <div class="current-order" id="currentOrderContainer"></div>
    <button class="current__button-next">Order Now</button>
  `;

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

  async function sendOrderToDatabase(order, userUid) {
    const now = new Date();
    const orderTime = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} | ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    let orderRef = await getOrders(userUid);
    console.log(orderRef);

    orderRef.forEach((key, index) => {
      set(key[index])
        .then(() => {
          console.log("Order saved successfully.");
          alert("Order has been placed successfully!");
        })
        .catch((error) => {
          console.error("Error saving order: ", error);
          alert("There was an error placing your order. Please try again.");
        });
    });

    const setDeletionTimer = (delay) => {
      setTimeout(() => {
        moveOrderToHistory(order, userUid);
        localStorage.removeItem("order");
        console.log("Order removed after specified time.");
        console.log(delay);
      }, delay);
      console.log(delay);
    };

    if (orderWithTime.order_time) {
      const deletionTime = new Date(orderWithTime.order_time).getTime();
      const currentTime = now.getTime();
      const delay = deletionTime - currentTime;
      if (delay > 0) {
        setDeletionTimer(delay);
      } else {
        moveOrderToHistory(order, userUid);
        localStorage.removeItem("order");
        console.log("Order removed as the specified time has already passed.");
      }
    } else {
      // 3 СЕКУНДЫ
      setDeletionTimer(30 * 60 * 1000);
    }
  }

  function moveOrderToHistory(order, userUid) {
    const now = new Date();
    const historyOrderRef = ref(database, `users/${userUid}/orders/history`);

    const newOrderWithTime = {
      ...order,
      order_time: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(now.getDate()).padStart(2, "0")} ${String(
        now.getHours()
      ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
        now.getSeconds()
      ).padStart(2, "0")}`,
    };

    push(historyOrderRef, newOrderWithTime)
      .then(() => {
        console.log("Order moved to history successfully.");
      })
      .catch((error) => {
        console.error("Error moving order to history: ", error);
      });
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const userUid = user ? user.uid : null;

  backBtn.addEventListener("click", () => {
    window.location.href = "/designer";
  });

  nextBtn.addEventListener("click", (e) => {
    if (userUid) {
      e.preventDefault();
      const orderItem = order[lastKey];
      console.log(orderItem);
      sendOrderToDatabase(orderItem, userUid);
      //window.location.href = "/order-confirmed";
    } else {
      alert("User is not authenticated.");
    }
  });
}
