import { createHeaderBlack } from "@/ui/components/header/header.js";

export default function renderMyOrdersPage(main) {
  main.innerHTML = `
  <main class="myOrders">

          <h1 class="myOrders__header">My orders</h1>

        <div class="myOrders__nav">
          <div class="myOrders-nav__item">
            <button class="myOrders-nav__item-button border">On going</button>
            <span class="myOrders-nav__item-element"></span>
          </div> 
          <div class="myOrders-nav__item">
            <button class="myOrders-nav__item-button">History</button>
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



      </main>
  `;
}
