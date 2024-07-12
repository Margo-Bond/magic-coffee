//Дашин код
import CoffeeCupImg from "src/assets/images/coffee-cups.svg";
import cafeAddressImg from "src/assets/images/Location-icon.svg";

let order = JSON.parse(localStorage.getItem("order")) || {};
let keys = Object.keys(order);
let lastKey = keys[keys.length - 1];

/* function formatDateTime(dateTime) { 
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }; 
  return new Date(dateTime).toLocaleDateString('en-GB', options); 
} 
const formattedDateTime = formatDateTime(new Date()); */

export default async function renderMyOrdersPage(main) {
  main.innerHTML = ` 
    <div class="myOrders"> 
    <div class="myOrders__main"> 
      <p class="myOrders__title">My Orders</p> 
    </div> 
 
    <div class="myOrders__nav"> 
      <div class="myOrders-nav__item"> 
        <button type="button" class="myOrders-nav__item-button border"  id="onGoing">On going</button> 
        <span class="myOrders-nav__item-element"></span> 
      </div>  
      <div class="myOrders-nav__item"> 
        <button type="button" class="myOrders-nav__item-button" id="history">History</button> 
        <span class="myOrders-nav__item-element invisible"></span> 
      </div> 
    </div> 
           
    <div class="myOrders__table1"> 
      <!-- Текущие заказы будут отображаться здесь --> 
    </div> 
 
    <div class="myOrders__table2 invisible"> 
      <!-- История заказов будет отображаться здесь --> 
    </div> 
  </div>`;

  const onGoing = document.getElementById("onGoing");
  const history = document.getElementById("history");

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

  // Кнопка On Going
  onGoing.addEventListener("click", (e) => {
    historyTab.classList.add("invisible");
    onGoingTab.classList.remove("invisible");

    historySpan.classList.add("invisible");
    onGoingSpan.classList.remove("invisible");

    history.classList.remove("border");
    onGoing.classList.add("border");
  });

  // Кнопка History
  history.addEventListener("click", (e) => {
    onGoingTab.classList.add("invisible");
    historyTab.classList.remove("invisible");

    onGoingSpan.classList.add("invisible");
    historySpan.classList.remove("invisible");

    history.classList.add("border");
    onGoing.classList.remove("border");
  });

  // Функция для создания HTML-элемента заказа
  function createOrderElement(orderKey, orderData) {
    return ` 
      <div class="myOrders-table1__item" id="${orderKey}"> 
        <div class="item__block1"> 
          <p class="item-block1__text">${formatDateTime(
            orderData.order_time
          )} | by ${orderData.order_time}</p> 
          <div class="item-block1__element"> 
            <div class="item-block1__element-img">${CoffeeCupImg}</div> 
            <p class="item-block1__element-text">${orderData.coffee_type}</p> 
          </div> 
          <div class="item-block1__element"> 
            <div class="item-block1__element-img">${cafeAddressImg}</div> 
            <p class="item-block1__element-text">${orderData.cafe_address}</p> 
          </div> 
        </div> 
        <div class="item__block2"> 
          <h2 class="item-block2__text">BYN ${orderData.order_price}</h2> 
        </div> 
      </div> 
    `;
  }

  // Функция для отображения текущих заказов
  function displayOrders() {
    onGoingTab.innerHTML = "";
    for (let key of Object.keys(order)) {
      if (!key.includes("history")) {
        onGoingTab.innerHTML += createOrderElement(key, order[key]);
      }
    }
  }

  // Функция для перемещения заказа из текущих в историю
  function moveToHistory(orderKey) {
    const orderData = order[orderKey];
    delete order[orderKey];
    order[`${orderKey}_history`] = orderData;
    localStorage.setItem("order", JSON.stringify(order));
    displayOrders();
    displayHistory();
  }

  // Функция для отображения истории заказов
  function displayHistory() {
    historyTab.innerHTML = "";
    for (let key of Object.keys(order)) {
      if (key.includes("history")) {
        historyTab.innerHTML += createOrderElement(key, order[key]);
      }
    }
  }

  // Таймер для перемещения заказов в историю через 30 минут
  function setOrderTimers() {
    for (let key of Object.keys(order)) {
      if (!key.includes("history")) {
        setTimeout(() => moveToHistory(key), 5 * 60 * 1000);
      }
    }
  }

  displayOrders();
  displayHistory();
  setOrderTimers();
}
