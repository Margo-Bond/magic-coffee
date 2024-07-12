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
  const backBtn = document.querySelector(".current-header__back-btn");
  const nextBtn = document.querySelector(".current__button-next");
  const cafeAddress = localStorage.getItem("cafe_address");
  const coffeeType = localStorage.getItem("coffee_type");
  const orderPrice = localStorage.getItem("order_price");
  const cupQuantity = localStorage.getItem("cup_quantity");
  const coffeeRistretto = localStorage.getItem("coffee_ristretto") || "none";
  const coffeeIce = localStorage.getItem("coffee_ice") || "none";
  const coffeeRoasting = localStorage.getItem("coffee_roasting") || "none";

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
  /*
  // Получение картинки и установка
  async function setCoffeeImage(cafeKey, coffeeKey) {
    try {
      const cafes = await getCafes();
      if (cafes) {
        if (cafes[cafeKey]) {
          const coffeeData = await getCoffeeType(cafeKey, coffeeKey);
          if (coffeeData && coffeeData.image_url) {
            const coffeeImage = document.querySelector(".current-order__img");
            coffeeImage.src = coffeeData.image_url;
            coffeeImage.alt = coffeeType;
          } else {
            console.log("No coffee data available");
          }
        } else {
          console.log("Cafe not found");
        }
      } else {
        console.log("No cafes data available");
      }
    } catch (error) {
      console.error("Error setting coffee image:", error);
    }
  }

  if (cafeKey && coffeeKey) {
    setCoffeeImage(cafeKey, coffeeKey);
  }
*/
  /*// Функция для создания объекта заказа
  function createOrderObject() {
    return {
      coffee_roasting: localStorage.getItem("coffee_coffee_roasting") || "none",
      orders: JSON.parse(localStorage.getItem("orders")) || [],
      syrup_option: localStorage.getItem("syrup_option") || "none",
      mug_option: localStorage.getItem("mug_option") || "none",
      coffee_ristretto: localStorage.getItem("coffee_ristretto") || "none",
      user: JSON.parse(localStorage.getItem("user")) || {},
      coffee_type: localStorage.getItem("coffee_type") || "none",
      order_price: parseFloat(localStorage.getItem("order_price")) || 0,
      cup_quantity: parseInt(localStorage.getItem("cup_quantity")) || 1,
      cafe_address: localStorage.getItem("cafe_address") || "none",
      order_time: localStorage.getItem("order_time") || "none",
      milk_option: localStorage.getItem("milk_option") || "none",
      cup_volume: localStorage.getItem("cup_volume") || "none",
      coffee_ratio: parseInt(localStorage.getItem("coffee_ratio")) || 0,
      coffee_grinding: localStorage.getItem("coffee_coffee_grinding") || "none",
    };*/
  // Маршрутизация
  backBtn.addEventListener("click", () => {
    window.location.href = "/designer";
  });

  nextBtn.addEventListener("click", () => {
    window.location.href = "/order-confirmed";
  });
}

/*// Функция для добавления нового заказа
  function addOrder() {
    let orders = JSON.parse(localStorage.getItem("order")) || [];
    let newOrder = createOrderObject();
    orders.push(newOrder);
    localStorage.setItem("order", JSON.stringify(orders));
  }

  // Вызов функции для добавления нового заказа
  addOrder();*/
/*
// Функция для отображения заказов
function displayOrder() {
  const currentOrderContainer = document.getElementById(
    "currentOrderContainer"
  );
  currentOrderContainer.innerHTML = "";

  let order = JSON.parse(localStorage.getItem("order")) || [];

  order.forEach((order) => {
    const orderItem = document.createElement("div");
    orderItem.classList.add("current-order__item");

    orderItem.innerHTML = `
        <img class="current-order__img" src="${
          order.image_url || "path/to/default_image.jpg"
        }" alt="${order.coffee_type}" class="current-order__item-img"/>
        <div class="current-order__item-description">
          <p class="current-order__item-title">${order.coffee_type}</p>
          <p class="current-order__item-details">${order.details || ""}</p>
          <p class="current-order__item-quantity">x ${order.cup_quantity}</p>
        </div>
        <div class="current-order__item-sum">
          <p class="current-order__item-currency">BYN</p>
          <p class="current-order__item-count">${order.order_price}</p>
        </div>
      `;

    currentOrderContainer.append(orderItem);
  });
}

// Отображаем заказы при загрузке страницы
displayOrder();

*/
