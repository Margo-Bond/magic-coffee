
import ArrowBack from "@/assets/images/geometric-icons/back.svg";
import CartBuy from "@/assets/images/cart.svg";
import CoffeeCard from "@/assets/images/coffee-cup.svg";
import ColdBeverage from "@/assets/images/coffee-icons/cold-beverage.svg";
import HotBeverage from "@/assets/images/coffee-icons/hot-beverage.svg";
import CupSmall from "@/assets/images/coffee-icons/cup-250.svg";
import CupMedium from "@/assets/images/coffee-icons/cup-350.svg";
import CupLarge from "@/assets/images/coffee-icons/cup-450.svg";
import { auth, database, onAuthStateChanged } from "../../../../main.js";

export default function renderOrderOptionPage(main) {
  main.innerHTML = `
        <div class="order-option">
          <div class="order-option__main">
            <div class="order-option__arrowBack">${ArrowBack}</div>
            <p class="order-option__title">Order</p>
            <div class="order-option__cartBuy">${CartBuy}</div>
          </div>

      <div class="order-option__coffee-img">
        <div class="coffeeCard">${CoffeeCard}</div>
      </div>

      <div class="order-option__item">
        <div class="order-option__item-text">
          <p class="order-option__text">Cuppucino</p>
        </div>


        <div class="order-optionr__item-quantity" id="counter"> 
          <input type="button"  class="order-option__quantity" id="buttonCountMinus" value="-">
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
            <div class="order-option__size" >250</div>
          </div>
          <div class="order-option__cup">
            <div id="medium" class="order-option__cup-size" >${CupMedium}</div>
            <div class="order-option__size" >350</div>
          </div>
          <div class="order-option__cup">
            <div id="large" class="order-option__cup-size" >${CupLarge}</div>
            <div class="order-option__size" >450</div>
          </div>
        </div>  
      </div>

      <div class="order-option__item">
        <div class="order-option__item-text">
          <p class="order-option__text">Prepare by a certain time today?</p>
        </div>
        <div class="order-option__item_switch">
          <input type="checkbox" id="togBtn" />
          <span class="slider round"></span>
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
        <div id="calculation"></div> 
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

  /////

  document.addEventListener('DOMContentLoaded', function () {
    // Находим элементы на странице
    const countMinus = document.getElementById('buttonCountMinus');
    const countPlus = document.getElementById('buttonCountPlus');
    const countNumber = document.getElementById('buttonCountNumber');

    // Инициализируем счетчик
    const counter = parseInt(countNumber.textContent, 10);

    // Функция для обновления отображаемого числа
    function updateDisplay() {
      countNumber.textContent = counter;
    }

    // Функция для уменьшения счетчика
    function decreaseCount() {
      if (counter > 0) { // Предотвращаем отрицательное значение
        counter--;
        updateDisplay();
      }
    }

    // Функция для увеличения счетчика
    function increaseCount() {
      counter++;
      updateDisplay();
    }

    // Добавляем обработчики событий для кнопок
    countMinus.addEventListener('click', decreaseCount);
    countPlus.addEventListener('click', increaseCount);
  });




  //////
  const buttons = document.querySelectorAll('.order-option__strength');

  function resetButtons() {
    buttons.forEach(button => {
      button.classList.remove('active');
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      resetButtons();
      this.classList.add('active');
    });
  });

  /*   one.addEventListener('click', () => highlightElement(one));
    two.addEventListener('click', () => highlightElement(two));
  
    document.addEventListener('DOMContentLoaded', () => {
      const one = document.getElementById("strength1");
      const two = document.getElementById("strength2");
  
      function highlightElement(strength) {
        one.classList.remove('highlight');
        two.classList.remove('highlight');
        strength.classList.add('highlight');
      }
    }); */


  ////////
  const cupSizeSmall = document.getElementById("small");
  const cupSizeMedium = document.getElementById("medium");
  const cupSizeLarge = document.getElementById("large");
  const hotBeverage = document.getElementById("hot");
  const coldBeverage = document.getElementById("cold");

  const elements = [
    { element: cupSizeSmall, related: [cupSizeMedium, cupSizeLarge] },
    { element: cupSizeMedium, related: [cupSizeSmall, cupSizeLarge] },
    { element: cupSizeLarge, related: [cupSizeSmall, cupSizeMedium] },
  ];
  const elementsBev = [
    { element: hotBeverage, related: [coldBeverage] },
    { element: coldBeverage, related: [hotBeverage] },
  ];

  elements.forEach((item) => {
    item.element.addEventListener("click", () => {
      if (isElementFilled(item.element)) {
        resetFillColor(item.element);
      } else {
        resetAllColors();
        changeFillColor(item.element);
      }
    });
  });

  function isElementFilled(element) {
    const svgElements = element.querySelectorAll("svg path, svg rect");
    return Array.from(svgElements).some(
      (svgElement) => svgElement.getAttribute("fill") === "black"
    );
  }

  function changeFillColor(element) {
    const svgElements = element.querySelectorAll("svg path, svg rect");
    svgElements.forEach((svgElement) => {
      svgElement.setAttribute("fill", "black");
      svgElement.setAttribute("stroke", "black");
      svgElement.setAttribute('stroke-width', '0.1');
    });
  }

  function resetFillColor(element) {
    const svgElements = element.querySelectorAll("svg path, svg rect");
    svgElements.forEach((svgElement) => {
      svgElement.setAttribute("fill", "#D8D8D8");
      svgElement.setAttribute("stroke", "#D8D8D8");
      svgElement.setAttribute('stroke-width', '0.1');
    });
  }

  function resetAllColors() {
    elements.forEach((item) => {
      resetFillColor(item.element);
    });
  }
}

