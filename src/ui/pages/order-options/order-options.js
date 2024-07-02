
import ArrowBack from "@/assets/images/geometric-icons/back.svg";
import CartBuy from "@/assets/images/cart.svg";
import CoffeeCard from "@/assets/images/coffee-cup.svg";
import ColdBeverage from "@/assets/images/coffee-icons/cold-beverage.svg";
import HotBeverage from "@/assets/images/coffee-icons/hot-beverage.svg";
import CupSmall from "@/assets/images/coffee-icons/cup-250.svg";
import CupMedium from "@/assets/images/coffee-icons/cup-350.svg";
import CupLardge from "@/assets/images/coffee-icons/cup-450.svg";

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
        <div class="order-optionr__item-quantity" id="counter"> 
          <input type="button"  class="order-option__quantity id="buttonCountMinus" value="-">
          <div id="buttonCountNumber">1</div>
          <input type="button" class="order-option__quantity id="buttonCountPlus" value="+">
        </div>
      </div>

      <div class="order-option__item">
        <div class="order-option__item-text">
          <p class="order-option__text">Ristretto</p>
        </div>
        <div class="order-option__item-strength">
          <button id="strength1" class="order-option__strength">One</button>
          <button id="strength2"class="order-option__strength">Two</button>
        </div>
      </div>

      <div class="order-option__item">
        <div class="order-option__item-text">
          <p class="order-option__text">Onsite / Takeaway</p>
        </div>
        <div class="order-optionr__item-temperature">
          <div id="hot" class="order-option__temperature" >${HotBeverage}</div>
          <div id="cold" class="order-option__temperature" >${ColdBeverage}</div>
        </div>
      </div>

      <div class="order-option__item">
        <div class="order-option__item-text">
          <p class="order-option__text"> Volume, ml </p>
        </div>
        <div class="order-option__item-cup">
          <div class="order-option__cup">
            <div id="small" class="order-option__cup-size" >${CupSmall}</div>
            <div id="medium" class="order-option__cup-size" >${CupMedium}</div>
            <div id="lardge" class="order-option__cup-size" >${CupLardge}</div>
          </div>
          <div class="order-option__cup">
            <div class="order-option__size" >250</div>
            <div class="order-option__size" >350</div>
            <div class="order-option__size" >450</div>
          </div>
        </div>  
      </div>

      <div class="order-option__item">
        <div class="order-option__item-text">
          <p class="order-option__text">Prepare by a certain time today?</p>
        </div>
        <div class="order-option__item_switch">
          <input type="checkbox" class="switch__input" />
          <span class-"switch__slider"></span>
        </div>
      </div>

      <div class="order-option__item">
        <div class="order-option__item-empty"></div>
        <div class="order-option__item-watch">
          <span id="hour" class="order-option__watch">00</span>
          <span id="dots" class="order-option__watch>:</span>
          <span id="minutes" class="order-option__watch">00</span>
        </div>
      </div>
    </div>
    
    <footer class="footer">
      <div class="footer__content"
        <div class="footer__text"> Total Amount </div>
        <div id="calculation">150</div> 
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


