
import ArrowBack from "@/assets/images/geometric-icons/back.svg";
import CartBuy from "@/assets/images/cart.svg";
import CoffeeCard from "@/assets/images/coffee-cup.svg";
import coldBeverage from "@/assets/images/coffee-icons/cold-beverage.svg";
import hotBeverage from "@/assets/images/coffee-icons/hot-beverage.svg";
import cupSmall from "@/assets/images/coffee-icons/cup-250.svg";
import cupMedium from "@/assets/images/coffee-icons/cup-350.svg";
import cupBig from "@/assets/images/coffee-icons/cup-450.svg";

export default function renderOrderOptionPage(main) {
  main.innerHTML = `
        <div class="order-option">
          <div class="order-option__main">
            <div class="order-option__arrowBack">${ArrowBack}</div>
            <p class="order-option__title">Order</p>
            <div class="order-option__cartBuy">${CartBuy}</div>
          </div>

      <div class="order-option__coffee-img">
        <div class="coffeeCard"></div>
      </div>

      <div class="order-option__item">
        <div class="order-option__item-text">
          <p class="order-option__text">Cuppucino</p>
        </div>
        <div class="order-optionr__item-quantity">
          <div class="order-option__quantity order-option__quantity_minus">-</div>
          <div class="order-option__quantity order-option__quantity_number">0</div>
          <div class="order-option__quantity order-option__quantity_plus">+</div>
        </div>
      </div>

      <div class="order-option__item">
        <div class="order-option__item-text">
          <p class="order-option__text">Ristretto</p>
        </div>
        <div class="order-option__item-strength">
          <button id="strength1" class="order-option__strength">One</button>
          <button id="strength2"class="order-optionм__strength">Two</button>
        </div>
      </div>

      <div class="order-option__item">
        <div class="order-option__item-text">
          <p class="order-option__text">Onsite / Takeaway</p>
        </div>
        <div class="order-optionr__item-temperature">
          <img
          id="hot"
            class="order-option__temperature"
            src="${hotBeverage}"/>
          <img
           id="cold"
            class="order-option__temperature"
            src="${coldBeverage}"/>
        </div>
      </div>

      <div class="order-option__item">
        <div class="order-option__item-text">
          <p class="order-option__text"> Volume, ml </p>
        </div>
        <div class="order-option__item-cup">
           <div order-option__cup-size" 
           <div order-option__cup-size" 
           <div order-option__cup-size" 
         </div>   
         
        /* <div class="order-option__item-cup">
          <img id="cold"
            class="order-option__cup-size "
            src="${cupSmall}"/>
          <img
            class="container-order__cup-size container-order__cup-size_medium"
            src="${cupMedium}"/>
          <img
            class="container-order__cup-size ccontainer-order__cup-size-big"
            src="${cupBig}"/>  
        </div> */
      </div>

      <div class="container-order__item">
        <div class="container-order__item-text">
          <p class="container-order__text">Prepare by a certain time today?</p>
        </div>
        <div class="container-order__item_switch">
          <input type="checkbox" class="switch__input" />
          <span class-"switch__slider"></span>
        </div>
      </div>
      <div class="container-order__item">
        <div class="container-order__item-empty"></div>
        <div class="container-order__item-watch">
          <span class="container-order__item-watch_hour">00</span>
          <span class="container-order__item-watch_point">:</span>
          <span class="container-order__item-watch_minutes">00</span>
        </div>
      </div>
    </div>
    
    <footer class="footer">
      <div class="footer__content"
        <p class="footer__text"> Total Amount </p>
        <a class="footer__sum" id="link">BYN 3.00</a>
      </div>
      <div class="footer__button">
        <button type="submit" id="button">Next</button>
      </div>
    </footer>`;

  const back = document.querySelector(".order-option__arrowBack");
  const cart = document.querySelector(".order-option__cartBuy");

  back.addEventListener("click", () => {
    window.location.href = "/menu";
  })

  cart.addEventListener("click", () => {
    window.location.href = "/my-oders";
  });

  const coffeeCard = main.querySelector(".coffeeCard");
  coffeeCard.insertAdjacentHTML("afterbegin", CoffeeCard);

  const minusBtn = main.querySelector(".order-option__quantity_minus");
  const numberBtn = main.querySelector(".order-option__quantity_number");
  const plusBtn = main.querySelector(".order-option__quantity_plus");

  function setActiveIcon(activeBtn) {
    const allIcons = footer.querySelectorAll(".footer__icon svg path");
    allIcons.forEach((icon) => {
      icon.style.fill = "var(--svg-color-muted)";
    });






    document.addEventListener('DOMContentLoaded', () => {
      const one = document.getElementById("strength1");
      const two = document.getElementById("strength2");

      function highlightElement(strength) {
        one.classList.remove('highlight');
        two.classList.remove('highlight');
        strength.classList.add('highlight');
      }

      one.addEventListener('click', () => highlightElement(one));
      two.addEventListener('click', () => highlightElement(two));
    });
  }
}

