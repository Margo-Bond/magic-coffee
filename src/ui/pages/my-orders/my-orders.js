import { createHeaderBlack } from "@/ui/components/header/header.js";

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
          
        <div class="myOrders__table1">

          <div class="myOrders-table1__item">
              <div class="item__block1">
                <p class="item-block1__text">24 June | 12:30 | by 18:10</p>

                <div class="item-block1__element">
                  <img class="item-block1__element-img" src="./src/assets/images/coffee-icons/chosen-beverage.svg">
                  <p class="item-block1__element-text">Americano</p>
                </div>

                <div class="item-block1__element">
                  <img class="item-block1__element-img" src="./src/assets/images/chosen-store.svg">
                  <p class="item-block1__element-text">Bradford BD1 1PR</p>
                </div>
              </div>

              <div class="item__block2">
               <h2 class="item-block2__text">BYN 3.00</h2>
              </div>

          </div>

        </div>

        <div class="myOrders__table2 invisible">

        </div>

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
  onGoing.addEventListener("click", (e) => {
    historyTab.classList.add("invisible");
    onGoingTab.classList.remove("invisible");

    historySpan.classList.add("invisible");
    onGoingSpan.classList.remove("invisible");

    history.classList.remove("border");
    onGoing.classList.add("border");
  });

  //Кнопка History
  history.addEventListener("click", (e) => {
    onGoingTab.classList.add("invisible");
    historyTab.classList.remove("invisible");

    onGoingSpan.classList.add("invisible");
    historySpan.classList.remove("invisible");

    history.classList.add("border");
    onGoing.classList.remove("border");
  });

  //Логика для вкладки History
  const historyOrders = JSON.parse(localStorage.getItem("order"));

  for (let key in historyOrders) {
    const orderDate = historyOrders[key].order_date;
    const orderTime = historyOrders[key].order_time;
    const coffeeType = historyOrders[key].coffee_type;
    const cafeAddress = historyOrders[key].cafe_address;
    const orderPrice = historyOrders[key].order_price;

    const orderContainer = document.createElement("div");
    orderContainer.classList.add(".myOrders-table2__item");
    const orderRecap = `
              <div class="item__block1">
                <p class="item-block1__text">${orderDate} | ${orderTime}</p>

                <div class="item-block1__element">
                  <img class="item-block1__element-img" src="./src/assets/images/coffee-icons/chosen-beverage.svg">
                  <p class="item-block1__element-text">${coffeeType}</p>
                </div>

                <div class="item-block1__element">
                  <img class="item-block1__element-img" src="./src/assets/images/chosen-store.svg">
                  <p class="item-block1__element-text">${cafeAddress}</p>
                </div>
              </div>

              <div class="item__block2">
               <h2 class="item-block2__text">BYN ${orderPrice}</h2>
               <button class="item-block2__button">Order</button>
              </div>
    `;
    orderContainer.innerHTML = orderRecap;
    historyTab.prepend(orderContainer);
  }
  /*
  for (let x = 0; x < Object.keys(historyOrders).length; x++) {
    console.log(historyOrders[x]);
  }
    */

  /*console.log(
    `My order will be ready at ${order.order_time}, it costs ${order.order_price}. You can pick up the order at ${order.cafe_address} and it's a ${order.coffee_type}`
  );*/
}
