import Back from "@/assets/images/geometric-icons/back.svg";
import Cart from "@/assets/images/cart.svg";
import More from "@/assets/images/geometric-icons/icon-more-grey.svg";
import Roasting from "@/assets/images/coffee-icons/roasting.svg";
import SmallGrinding from "@/assets/images/coffee-icons/small-grinding.svg";
import BigGrinding from "@/assets/images/coffee-icons/big-grinding.svg";
import Ice from "@/assets/images/coffee-icons/ice.svg";
import { auth, database, onAuthStateChanged } from "../../../../main.js";

export default function renderDesignerPage(main) {
  main.innerHTML = `
    <div class="designer-header">
      <div class="designer-header__svg designer-header__svg-back">${Back}</div>
      <p class="designer-header__title">Coffee lover assemblage</p>
      <div class="designer-header__svg designer-header__svg-cart">${Cart}</div>
    </div>
    <div class="designer-content">
      <div class="designer-content__wrapper type">
        <label for="type__coffee-slider" class="designer-content__text type__slider-label">Coffee type</label>
        <div class="type__slider">
          <input type="range" id="type__coffee-slider" class="type__range" min="1" max="5" step="1">
          <div class="type__slider-values">
            <p id="value-1" class="type__slider-value">Arabica</p>
            <p id="value-5" class="type__slider-value">Robusta</p>
          </div>
        </div>  
      </div>
      <div class="designer-content__wrapper">
        <p class="designer-content__text">Coffee sort</p>
        <div class="designer-content__svg designer-content__svg-sort">${More}</div>
      </div>
      <div class="designer-content__wrapper">
        <p class="designer-content__text">Roasting</p>
        <div class="roasting">
          <div class="designer-content__svg designer-content__svg-roasting_light roasting_row ">${Roasting}</div>
          <div class="designer-content__svg designer-content__svg-roasting_medium roasting_row">${Roasting}${Roasting}</div>
          <div class="roasting_column designer-content__svg-roasting_strong">
            <div class="designer-content__svg roasting_below">${Roasting}</div>
            <div class="designer-content__svg roasting_below">${Roasting}${Roasting}</div>
          </div>
        </div>
      </div>
      <div class="designer-content__wrapper">
        <p class="designer-content__text">Grinding</p>
        <div class="grinding">
          <div class="designer-content__svg designer-content__svg-grinding_small">${SmallGrinding}</div>
          <div class="designer-content__svg designer-content__svg-grinding_big">${BigGrinding}</div>
        </div>
      </div>
      <div class="designer-content__wrapper">
        <p class="designer-content__text">Milk</p>
        <p class="designer-content__text designer-content__select designer-content__select_milk">Select</p>
      </div>
      <div class="designer-content__wrapper">
        <p class="designer-content__text">Syrup</p>
        <p class="designer-content__text designer-content__select designer-content__select_syrup">Select</p>
      </div>
      <div class="designer-content__wrapper">
        <p class="designer-content__text">Additives</p>
        <div class="designer-content__svg designer-content__svg-additives">${More}</div>
      </div>
      <div class="designer-content__wrapper">
        <p class="designer-content__text-muted">Ice</p>
        <div class="ice">
          <div class="designer-content__svg designer-content__svg-ice_one ice_row">${Ice}</div>
          <div class="designer-content__svg designer-content__svg-ice_two ice_row">${Ice}${Ice}</div>
          <div class="ice_column designer-content__svg-ice_three">
            <div class="designer-content__svg ice_below">${Ice}</div>
            <div class="designer-content__svg ice_below">${Ice}${Ice}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="overlay none"></div>
    <div class="designer-modal__milk-container none">
      <div class="designer-modal__milk-options">
        <div class="designer-modal__milk-question">What type of milk do you prefer?</div>
        <div class="designer-modal__milk-option designer-modal__milk_none">None</div>
        <div class="designer-modal__milk-option designer-modal__milk_cow">Cow's</div>
        <div class="designer-modal__milk-option designer-modal__milk_lactose-free">Lactose-free</div>
        <div class="designer-modal__milk-option designer-modal__milk_skimmed">Skimmed</div>
        <div class="designer-modal__milk-option designer-modal__milk_vegetable">Vegetable</div>
      </div>
      <button class="designer-modal__button">Cancel</button>
    </div>
    <div class="designer-modal__syrup-container none">
      <div class="designer-modal__syrup-options">
        <div class="designer-modal__syrup-question">What flavor of syrup do you prefer?</div>
        <div class="designer-modal__syrup-option designer-modal__syrup_none">None</div>
        <div class="designer-modal__syrup-option designer-modal__syrup_cow">Amaretto</div>
        <div class="designer-modal__syrup-option designer-modal__syrup_lactose-free">Coconut</div>
        <div class="designer-modal__syrup-option designer-modal__syrup_skimmed">Vanilla</div>
        <div class="designer-modal__syrup-option designer-modal__syrup_vegetable">Caramel</div>
      </div>
      <button class="designer-modal__button">Cancel</button>
    </div>
    <footer class="designer-footer">
      <div class="designer-footer__count-container">
        <p class="designer-footer__count-text">Total Amount</p>
        <p class="designer-footer__count-currency">BYN<span class="designer-footer__count">9.00</span></p>
      </div>
      <button class="designer-footer__button">Next</button>
    </footer>
  `;

  const cartSvg = document.querySelector(".designer-header__svg-cart");
  const backSvg = document.querySelector(".designer-header__svg-back");
  const selectMilk = document.querySelector(".designer-content__select_milk");
  const selectSyrup = document.querySelector(".designer-content__select_syrup");
  const overlay = document.querySelector(".overlay");
  const cancelButtons = document.querySelectorAll(".designer-modal__button");
  const milkList = document.querySelector(".designer-modal__milk-container");
  const syrupList = document.querySelector(".designer-modal__syrup-container");
  const slider = document.getElementById("type__coffee-slider");
  const sortSvg = document.querySelector(".designer-content__svg-sort");
  const additivesSvg = document.querySelector(
    ".designer-content__svg-additives"
  );
  const roastingLight = document.querySelector(
    ".designer-content__svg-roasting_light"
  );
  const roastingMedium = document.querySelector(
    ".designer-content__svg-roasting_medium"
  );
  const roastingStrong = document.querySelector(
    ".designer-content__svg-roasting_strong"
  );
  const grindingSmall = document.querySelector(
    ".designer-content__svg-grinding_small"
  );
  const grindingBig = document.querySelector(
    ".designer-content__svg-grinding_big"
  );
  const iceOne = document.querySelector(".designer-content__svg-ice_one");
  const iceTwo = document.querySelector(".designer-content__svg-ice_two");
  const iceThree = document.querySelector(".designer-content__svg-ice_three");

  selectMilk.addEventListener("click", function () {
    overlay.classList.remove("none");
    milkList.classList.remove("none");
  });

  selectSyrup.addEventListener("click", function () {
    overlay.classList.remove("none");
    syrupList.classList.remove("none");
  });

  cancelButtons.forEach((button) => {
    button.addEventListener("click", function () {
      overlay.classList.add("none");
      milkList.classList.add("none");
      syrupList.classList.add("none");
    });
  });

  slider.addEventListener("input", (event) => {
    const value = event.target.value;
    const min = event.target.min;
    const max = event.target.max;
    const percentage = ((value - min) / (max - min)) * 100;
    event.target.style.background = `linear-gradient(to right, var(--slider-color) ${percentage}%, var(--line-color) ${percentage}%)`;
  });

  const initialPercentage =
    ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(to right, var(--slider-color) ${initialPercentage}%, var(--line-color) ${initialPercentage}%)`;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      slider.addEventListener("input", (event) => {
        const value = event.target.value;
        console.log("Slider value:", value);
        sendSliderValue(user.uid, value);
      });
    } else {
      console.log("No user is signed in.");
    }
  });

  function sendSliderValue(userId, value) {
    set(ref(database, "users/" + userId + "/cart" + "/"), {
      coffeeType: value,
    })
      .then(() => {
        console.log("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  }

  sortSvg.addEventListener("click", function () {
    window.location.href = "/coffee-country";
  });

  additivesSvg.addEventListener("click", function () {
    window.location.href = "/additives";
  });

  backSvg.addEventListener("click", function () {
    window.location.href = "/order-options";
  });

  cartSvg.addEventListener("click", function () {
    window.location.href = "/current-order";
  });

  const elements = [
    { element: roastingLight, related: [roastingMedium, roastingStrong] },
    { element: roastingMedium, related: [roastingLight, roastingStrong] },
    { element: roastingStrong, related: [roastingLight, roastingMedium] },
    { element: grindingSmall, related: [grindingBig] },
    { element: grindingBig, related: [grindingSmall] },
    { element: iceOne, related: [iceTwo, iceThree] },
    { element: iceTwo, related: [iceOne, iceThree] },
    { element: iceThree, related: [iceOne, iceTwo] },
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
    });
  }

  function resetFillColor(element) {
    const svgElements = element.querySelectorAll("svg path, svg rect");
    svgElements.forEach((svgElement) => {
      svgElement.setAttribute("fill", "#D8D8D8");
      svgElement.setAttribute("stroke", "#D8D8D8");
    });
  }

  function resetAllColors() {
    elements.forEach((item) => {
      resetFillColor(item.element);
    });
  }
}
