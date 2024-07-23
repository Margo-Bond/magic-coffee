import { getOrders } from "../../../../Services/Get.js";
import { order, lastKey } from "../../../../vars.js";

export default async function renderMyOrdersPage(main) {
  main.innerHTML = `
  <main class="myOrders">

        <h1 class="myOrders__header">My orders</h1>
          <div class="myOrders__nav">
            <div class="myOrders-nav__item">
              <button type="button" class="myOrders-nav__item-button border" id="onGoing">On going</button>
              <span class="myOrders-nav__item-element"></span>
            </div> 
            <div class="myOrders-nav__item">
              <button type="button" class="myOrders-nav__item-button" id="history">History</button>
              <span class="myOrders-nav__item-element invisible"></span>
            </div>
          </div>
        <div class="myOrders__table1"></div>

        <div class="myOrders__table2 invisible"></div>

      </main>
  `;

  //Подключение кнопок On Going и History

  //Кнопки
  const onGoing = document.getElementById("onGoing");
  const history = document.getElementById("history");

  //Табы
  const onGoingTab = document.querySelector(".myOrders__table1");
  const onGoingParent = onGoing.closest("div");
  const onGoingSpan = onGoingParent.querySelector(
    ".myOrders-nav__item-element"
  );

  const historyTab = document.querySelector(".myOrders__table2");
  const historyParent = history.closest("div");
  const historySpan = historyParent.querySelector(
    ".myOrders-nav__item-element"
  );

  //Кнопка On Going
  onGoing.addEventListener("click", () => {
    historyTab.classList.add("invisible");
    onGoingTab.classList.remove("invisible");

    historySpan.classList.add("invisible");
    onGoingSpan.classList.remove("invisible");

    history.classList.remove("border");
    onGoing.classList.add("border");
  });

  //Кнопка History
  history.addEventListener("click", () => {
    onGoingTab.classList.add("invisible");
    historyTab.classList.remove("invisible");

    onGoingSpan.classList.add("invisible");
    historySpan.classList.remove("invisible");

    history.classList.add("border");
    onGoing.classList.remove("border");
  });

  //Логика для вкладки on-going
  // Получаем данные on-going из orders в FB
  const userData = JSON.parse(localStorage.getItem("user"));

  try {
    const ongoingOrders = await getOrders(userData.uid, "on-going");

    for (let x in ongoingOrders) {
      const newOrderDate = ongoingOrders[x].order_time;
      const newOrderReadyTime = ongoingOrders[x].pickup_time;
      const newCoffeeType = ongoingOrders[x].coffee_type;
      const newCafeAddress = ongoingOrders[x].cafe_address;
      const newOrderPrice = ongoingOrders[x].order_price;

      if (
        newOrderDate === undefined ||
        newOrderReadyTime === undefined ||
        newCoffeeType === undefined ||
        newCafeAddress === undefined ||
        newOrderPrice === undefined
      ) {
        return;
      }

      const newOrderContainer = document.createElement("div");
      newOrderContainer.classList.add("myOrders-table1__item");
      newOrderContainer.innerHTML = `<div class="item__block1">
      <p class="item-block1__text">${newOrderDate} | by ${newOrderReadyTime}</p>
  
      <div class="item-block1__element">
      <img class="item-block1__element-img" src="./src/assets/images/coffee-icons/chosen-beverage.svg">
      <p class="item-block1__element-text">${newCoffeeType}</p>
      </div>
  
      <div class="item-block1__element">
      <img class="item-block1__element-img" src="./src/assets/images/chosen-store.svg">
      <p class="item-block1__element-text">${newCafeAddress}</p>
      </div>
      </div>
  
      <div class="item__block2">
      <h2 class="item-block2__text">BYN ${newOrderPrice}</h2>
      </div> `;

      onGoingTab.prepend(newOrderContainer);
    }
  } catch (error) {
    console.error("An error occurred while loading data from server:", error);
  }

  //History
  try {
    const historyOrders = await getOrders(userData.uid, "history");

    for (let key in historyOrders) {
      const orderDate = historyOrders[key].order_time;
      const coffeeType = historyOrders[key].coffee_type;
      const cafeAddress = historyOrders[key].cafe_address;
      const orderPrice = historyOrders[key].order_price;

      if (
        orderDate === undefined ||
        coffeeType === undefined ||
        cafeAddress === undefined ||
        orderPrice === undefined
      ) {
        continue;
      }

      const historyOrderContainer = document.createElement("div");
      historyOrderContainer.classList.add("myOrders-table2__block");
      historyOrderContainer.innerHTML = `
        <div class="block__item1">
          <p class="block-item1__text">${orderDate}</p>
          <div class="block-item1__element">
            <img class="block-item1__element-img" src="./src/assets/images/coffee-icons/chosen-beverage.svg">
            <p class="block-item1__element-text">${coffeeType}</p>
          </div>
          <div class="block-item1__element">
            <img class="block-item1__element-img" src="./src/assets/images/chosen-store.svg">
            <p class="block-item1__element-text">${cafeAddress}</p>
          </div>
        </div>
        <div class="block__item2">
          <h2 class="block-item2__text">BYN ${orderPrice}</h2>
          <button class="block-item2__button">Order</button>
        </div>
      `;

      historyTab.prepend(historyOrderContainer);

      // Повторный заказ при нажатии на кнопку Order
      const orderBtn = historyOrderContainer.querySelector(
        ".block-item2__button"
      );
      orderBtn.addEventListener("click", () => {
        const repeatOrder = historyOrders[key];
        const orderKey = `order${Object.keys(order).length + 1}`;
        order[orderKey] = repeatOrder;
        localStorage.setItem("order", JSON.stringify(order));
        window.location.href = "/current-order";

        processNewOrder(repeatOrder);
      });
    }
  } catch (error) {
    console.error("Error loading history orders: ", error);
    alert("There was an error loading your order history. Please try again.");
  }

  function processNewOrder(order) {
    // Логика для обработки нового заказа
    console.log("New order processed: ", order);
  }
}
