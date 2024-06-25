
import { createHeaderBlack } from "@/ui/components/header/header.js";
import createForwardButton from "@/ui/components/forward-button/forward-button.js";
import arrowBack from "@/assets/images/geometric-icons/back.svg";
import cartBuy from "@/assets/images/cart.svg";
//import imageCoffee from "";
import coldBeverage from "@/assets/images/coffee-icons/cold-beverage.svg";
import hotBeverage from "@/assets/images/coffee-icons/hot-beverage.svg";
import cupSmall from "@/assets/images/coffee-icons/cup-250.svg";
import cupMedium from "@/assets/images/coffee-icons/cup-350.svg";
import cupBig from "@/assets/images/coffee-icons/cup-450.svg";


const imageCoffee = "https://imgproxy.sbermarket.ru/imgproxy/width-auto/czM6Ly9jb250ZW50LWltYWdlcy1wcm9kL3Byb2R1Y3RzLzMyNDQxNTEyL29yaWdpbmFsLzEvMjAyNC0wMy0xOFQxMSUzQTA1JTNBNDQuMjkwODczJTJCMDAlM0EwMC8zMjQ0MTUxMl8xLmpwZw==.jpg";

export default function renderOrderOptionPage(main) {
  main.innerHTML = `
        <div class="container-order">
          <div class="container-order__main">
            <a class="back">
              <img src='${arrowBack}'  alt='Back btn' />
            </a>
            <p class="сontainer-order__title">Order</p>
            <a class="card">
              <img src='${cartBuy}' alt='Card btn' />
            </a>
          </div>

      <div class="container-order__coffee">
        <div class="container-order__wrap">
          <img
            class="container-order__image"
            src="${imageCoffee}"
          />
        </div>
      </div>

      <div class="container-order__item">
        <div class="container-order__item-text">
          <p class="container-order__text">Cuppucino</p>
        </div>
        <div class="container-order__item-quantity">
          <span class="container-order__item-quantity_minus">-</span>
          <span class="container-order__item-quantity_number">1</span>
          <span class="container-order__item-quantity_plus">+</span>
        </div>
      </div>

      <div class="container-order__item">
        <div class="container-order__item-text">
          <p class="container-order__text">Ristretto</p>
        </div>
        <div class="container-order__item-strength">
          <button id="strength1" class="container-order__btn">One</button>
          <button id="strength2"class="container-order__btn">Two</button>
        </div>
      </div>

      <div class="container-order__item">
        <div class="container-order__item-text">
          <p class="container-order__text">Onsite / Takeaway</p>
        </div>
        <div class="container-order__item-temperature">
          <img
          id="hot"
            class="container-order__temperature"
            src="${hotBeverage}"/>
          <img
           id="cold"
            class="container-order__temperature"
            src="${coldBeverage}"/>
        </div>
      </div>

      <div class="container-order__item">
        <div class="container-order__item-text">
          <p class="container-order__text"> Volume, ml </p>
        </div>
        <div class="container-order__item-cup-size">
          <img
            class="container-order__cup-size container-order__cup-size_small"
            src="${cupSmall}"/>
          <img
            class="container-order__cup-size container-order__cup-size_medium"
            src="${cupMedium}"/>
          <img
            class="container-order__cup-size ccontainer-order__cup-size-big"
            src="${cupBig}"/>  
        </div>
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

  const back = document.querySelector(".back");
  const card = document.querySelector(".card");

  back.addEventListener("click", () => {
    window.location.href = "/menu";
  })

  card.addEventListener("click", () => {
    window.location.href = "/my-oders";
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

