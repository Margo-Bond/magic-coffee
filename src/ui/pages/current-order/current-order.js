import {
  order,
  lastKey,
  cafeAddress,
  coffeeType,
  cafeOne,
  cafeTwo,
  cafeThree,
} from "../../../../vars.js";
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

  // Константы
  const backBtn = document.querySelector(".current-header__back-btn");
  const nextBtn = document.querySelector(".current__button-next");
  const currentOrderContainer = document.getElementById(
    "currentOrderContainer"
  );

  const milkOption = order[lastKey].milk_option || "none";
  const syrupOption = order[lastKey].syrup_option || "none";
  const coffeeRistretto = order[lastKey].coffee_ristretto || "none";
  const coffeeRoasting = order[lastKey].coffee_roasting || "none";

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

  // Функция для отображения заказов
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

  // Маршрутизация
  backBtn.addEventListener("click", () => {
    window.location.href = "/designer";
  });

  nextBtn.addEventListener("click", () => {
    window.location.href = "/order-confirmed";
  });
}
