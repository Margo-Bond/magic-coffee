import { createHeaderBlack } from "@/ui/components/header/header.js";
import { getOrders } from "../../../../Services/Get.js";

export default function renderMyOrdersPage(main) {
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
  // Получаем данные on-going из orders в LS
  const newOrders = JSON.parse(localStorage.getItem("order"));
  //console.log(newOrders);

  for (let list in newOrders) {
    const newOrderDate = newOrders[item].order_date;
    const newOrderTime = newOrders[item].order_dateTime;
    const newOrderReadyTime = newOrders[list].order_time;
    const newCoffeeType = newOrders[list].coffee_type;
    const newCafeAddress = newOrders[list].cafe_address;
    const newOrderPrice = newOrders[list].order_price;

    if (
      //newOrderDate === undefined ||
      //newOrderTime === undefined ||
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
    <p class="item-block1__text">${newOrderDate} | ${newOrderTime} | by ${newOrderReadyTime}</p>

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

  const userData = JSON.parse(localStorage.getItem("user"));
  getOrders(userData.uid)
    .then((orders) => {
      console.log(orders);
      //const historyOrders = JSON.parse(localStorage.getItem("order"));

      //for (let key in historyOrders) {
      for (let key in orders) {
        /*
      const orderDate = historyOrders[key].order_date;
      const orderTime = historyOrders[key].order_time;
      const coffeeType = historyOrders[key].coffee_type;
      const cafeAddress = historyOrders[key].cafe_address;
      const orderPrice = historyOrders[key].order_price;
      */

        /*
        const now = new Date().getTime();
        console.log(now);
        const date = orders[key].order_time;
        console.log(date);
        const dateDifference = Math.floor(date - now); // / (1000 * 60 * 60 * 24));
        console.log(dateDifference);
        //if (dateDifference < 0) {
        //Если эта дата больше 0, тогда переносим в историю, а если меньше, то в on going
        //}
        */

        const month = date.toLocaleString("default", { month: "long" });
        const day = date.getDate();

        const orderDate = `${day} ${month}`;
        const orderTime = orders[key].order_time;
        const coffeeType = orders[key].coffee_type;
        const cafeAddress = orders[key].cafe_address;
        const orderPrice = orders[key].order_price;

        if (
          orderDate === undefined ||
          orderTime === undefined ||
          coffeeType === undefined ||
          cafeAddress === undefined ||
          orderPrice === undefined
        ) {
          return;
        }

        const historyOrderContainer = document.createElement("div");
        historyOrderContainer.classList.add("myOrders-table2__block");
        historyOrderContainer.innerHTML = `
              <div class="block__item1">
                <p class="block-item1__text">${orderDate} | ${orderTime}</p>

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
      }
    })
    .catch((error) => {
      console.log("An error occured while loading data from server: " + error);
    });

  // Повторный заказ при нажатии на кнопку Order

  /*
  const orderBtn = document.querySelector(".block-item2__button");
  orderBtn.addEventListener("click", (e) => {
    console.log(orders[key]);
  });
  */
}
