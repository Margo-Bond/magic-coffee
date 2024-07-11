import CoffeeCupImg from "@/assets/images/coffee-cups.svg";
import cafeAddressImg from "@/assets/images/Location-icon.svg";

const timeOrder = localStorage.getItem('order_time');
const adressUser = localStorage.getItem('cafe_address') || 'specified';
const totalAmountOrder = localStorage.getItem('order_price');
const coffeeTypeOrder = localStorage.getItem('coffee_type');
const qr = "/profile";
//const currentTimeOrder = 
//const currentDateOrder = 

export default function renderMyOrdersPage(main) {

  main.innerHTML = `
  <div class="myOrders">
    <div class="myOrders__main">
      <p class="myOrders__title">My Orders</p>
    </div>

    <div class="myOrders__nav">
      <div class="myOrders-nav__item item1">
        <button class="myOrders-nav__item-button border">On going</button>
        <span class="myOrders-nav__item-element"></span>
      </div> 
      <div class="myOrders-nav__item item2">
        <button class="myOrders-nav__item-button">History</button>
        <span class="myOrders-nav__item-element invisible"></span>
      </div>
    </div>
          
    <div class="myOrders__table">
      <div class="myOrders-table__item item3">
        <div class="item__block1">

          <p class="item-block1__text"> "currentDateOrder" | "currentTimeOrder" | by ${timeOrder}</p>

          <div class="item-block1__element">
            <div class="item-block1__element-img">${CoffeeCupImg}</div>
            <p class="item-block1__element-text">${coffeeTypeOrder}</p>
          </div>

          <div class="item-block1__element">
            <div class="item-block1__element-img">${cafeAddressImg}</div>
            <p class="item-block1__element-text">${adressUser}</p>
          </div>

        </div>

        <div class="item__block2">
         <h2 class="item-block2__text">BYN ${totalAmountOrder} </h2>
        </div>
      </div>
    </div>
  </div>`;

  const history = document.querySelector(".myOrders-nav__item-button");
  back.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/history", 700;
  });
  /*  const coffeeTypeOrder = document.querySelector('.item-block1__element-text');
   coffeeTypeOrder.textContent = localStorage.getItem('coffee_type'); */

  /*   const totalAmountOrder = document.querySelector('.item-block2__totalAmount');
    totalAmountOrder.textContent = localStorage.getItem('order_price'); */



  //const currentDateOrder = document.querySelector('.item-block1__text');
  //currentDateOrder.textContent = localStorage.getItem("coffee_type");

}
