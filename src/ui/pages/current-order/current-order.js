import BackSvg from "@/assets/images/geometric-icons/back.svg";
import { getCafes, getCoffeeType } from "../../../../Services/Get.js";

export default function renderCurrentOrderPage(main) {
  main.innerHTML = `
    <div class="current-header">
      <button class="current-header__back-btn">${BackSvg}</button>
      <p class="current-header__title">My order</p>
    </div>
    <div class="current-order" id="currentOrderContainer"></div>
    <button class="current__button-next">Order Now</button>
  `;

  // Константы
  let order = JSON.parse(localStorage.getItem("order")) || {};
  let keys = Object.keys(order);
  let lastKey = keys[keys.length - 1];
  const backBtn = document.querySelector(".current-header__back-btn");
  const nextBtn = document.querySelector(".current__button-next");
  const currentOrderContainer = document.getElementById(
    "currentOrderContainer"
  );
  const cafeAddress = order[lastKey].cafe_address;
  const coffeeType = order[lastKey].coffee_type;
  const orderPrice = order[lastKey].order_price;
  const coffeeIce = order[lastKey].coffee_ice;
  const milkOption = order[lastKey].milk_option;
  const syrupOption = order[lastKey].syrup_option;
  const cupQuantity = order[lastKey].cup_quantity || "none";
  const coffeeRistretto = order[lastKey].coffee_ristretto || "none";
  const coffeeRoasting = order[lastKey].coffee_roasting || "none";
  const cafeOne = "Bradford BD1 1PR";
  const cafeTwo = "Bradford BD4 7SJ";
  const cafeThree = "Bradford BD1 4RN";

  // Определение ключа для кафе
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

  // Определение ключа для типа кофе
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

  // Получение картинки и установка
  async function setCoffeeImage(cafeKey, coffeeKey) {
    try {
      const cafes = await getCafes();
      if (cafes) {
        const coffeeData = await getCoffeeType(cafeKey, coffeeKey);
        const coffeeImage = document.querySelector(".current-order__item-img");
        const coffeeType = order[lastKey].coffee_type;
        coffeeImage.src = coffeeData.image_url;
        coffeeImage.alt = coffeeType;
      } else {
        console.log("No coffee data available");
      }
    } catch (error) {
      console.error("Error setting coffee image:", error);
    }
  }

  if (cafeKey && coffeeKey) {
    setCoffeeImage(cafeKey, coffeeKey);
  }

  // Функция для отображения заказов
  function displayOrder(order) {
    currentOrderContainer.innerHTML = "";

    order.forEach((orderItem) => {
      const order = document.createElement("div");
      orderItem.classList.add("current-order__item");

      orderItem.innerHTML = `
        <img class="current-order__item-img" src="${order.image_url}" alt="${order[lastKey].coffee_type}"/>
        <div class="current-order__item-description">
          <p class="current-order__item-title">${order[lastKey].coffee_type}</p>
          <p class="current-order__item-details">${orderp[lastKey].details}</p>
          <p class="current-order__item-quantity">x ${order[lastKey].cup_quantity}</p>
        </div>
        <div class="current-order__item-sum">
          <p class="current-order__item-currency">BYN</p>
          <p class="current-order__item-count">${order[lastKey].order_price}</p>
        </div>
      `;

      currentOrderContainer.append(orderItem);
    });
  }

  // Отображаем заказы при загрузке страницы
  displayOrder(order);

  // Маршрутизация
  backBtn.addEventListener("click", () => {
    window.location.href = "/designer";
  });

  nextBtn.addEventListener("click", () => {
    window.location.href = "/order-confirmed";
  });
}
