import Back from "@/assets/images/geometric-icons/back.svg";
import Cart from "@/assets/images/cart.svg";
import More from "@/assets/images/geometric-icons/icon-more-grey.svg";
import Roasting from "@/assets/images/coffee-icons/roasting.svg";
import SmallGrinding from "@/assets/images/coffee-icons/small-grinding.svg";
import BigGrinding from "@/assets/images/coffee-icons/big-grinding.svg";
import Ice from "@/assets/images/coffee-icons/ice.svg";
import { getMilkList, getSyrupList } from "../../../../Services/Get.js";
import { auth, onAuthStateChanged } from "../../../../main.js";

export default function renderDesignerPage(main) {
  main.innerHTML = `
    <div class="designer-header">
      <div class="designer__svg designer-header__svg-back">${Back}</div>
      <p class="designer-header__title">Coffee lover assemblage</p>
      <div class="designer__svg designer-header__svg-cart">${Cart}</div>
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
        <div class="designer__svg designer-content__svg-sort">${More}</div>
      </div>
      <div class="designer-content__wrapper">
        <p class="designer-content__text">Roasting</p>
        <div class="roasting">
          <div class="designer__svg designer-content__svg-roasting_light roasting_row ">${Roasting}</div>
          <div class="designer__svg designer-content__svg-roasting_medium roasting_row">${Roasting}${Roasting}</div>
          <div class="roasting_column designer-content__svg-roasting_strong">
            <div class="designer__svg roasting_below">${Roasting}</div>
            <div class="designer__svg roasting_below">${Roasting}${Roasting}</div>
          </div>
        </div>
      </div>
      <div class="designer-content__wrapper">
        <p class="designer-content__text">Grinding</p>
        <div class="grinding">
          <div class="designer__svg designer-content__svg-grinding_small">${SmallGrinding}</div>
          <div class="designer__svg designer-content__svg-grinding_big">${BigGrinding}</div>
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
        <div class="designer__svg designer-content__svg-additives">${More}</div>
      </div>
      <div class="designer-content__wrapper">
        <p class="designer-content__text-muted">Ice</p>
        <div class="ice">
          <div class="designer__svg designer-content__svg-ice_one ice_row">${Ice}</div>
          <div class="designer__svg designer-content__svg-ice_two ice_row">${Ice}${Ice}</div>
          <div class="ice_column designer-content__svg-ice_three">
            <div class="designer__svg ice_below">${Ice}</div>
            <div class="designer__svg ice_below">${Ice}${Ice}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="overlay none"></div>
    <div class="designer-modal__milk-container none">
      <div class="designer-modal__milk-question">What type of milk do you prefer?</div>
      <div class="designer-modal__milk-options"></div>
      <button class="designer-modal__button">Cancel</button>
    </div>
    <div class="designer-modal__syrup-container none">
      <div class="designer-modal__syrup-question">What flavor of syrup do you prefer?</div>
      <div class="designer-modal__syrup-options"></div>
      <button class="designer-modal__button">Cancel</button>
    </div>
    <footer class="designer-footer">
      <div class="designer-footer__count-container">
        <p class="designer-footer__count-text">Total Amount</p>
        <p class="designer-footer__count-currency">BYN<span class="designer-footer__count"></span></p>
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
  const milkContainer = document.querySelector(
    ".designer-modal__milk-container"
  );
  const syrupContainer = document.querySelector(
    ".designer-modal__syrup-container"
  );
  const slider = document.getElementById("type__coffee-slider");
  const sortSvg = document.querySelector(".designer-content__svg-sort");
  const milkOptions = document.querySelectorAll(".designer-modal__milk-option");
  const syrupOptions = document.querySelectorAll(
    ".designer-modal__syrup-option"
  );
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
  const totalCount = document.querySelector(".designer-footer__count");
  const buttonNext = document.querySelector(".designer-footer__button");

  // Получение значения ползунка на coffee_ratio
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
        localStorage.setItem("coffee_ratio", value);
      });
    } else {
      alert("You should sign in.");
      console.log("No user is signed in.");
    }
  });

  //Получение coffee_roasiting, coffee_grinding и coffee_ice
  function setFillColor(element, color) {
    element.querySelectorAll("svg path, svg rect").forEach((svg) => {
      svg.setAttribute("fill", color);
      svg.setAttribute("stroke", color);
    });
  }

  function checkBlack(element, type, category) {
    const isBlack = Array.from(
      element.querySelectorAll("svg path, svg rect")
    ).some((svg) => svg.getAttribute("fill") === "black");

    if (isBlack) {
      selectCategory(type, category, "#D8D8D8");
      localStorage.removeItem(`coffee_${category}`);
      console.log(category);
    } else {
      selectCategory(type, category, "black");
    }
  }

  function selectCategory(type, category, color) {
    const options = {
      coffee_roasting: ["light", "medium", "strong"],
      coffee_grinding: ["small", "big"],
      coffee_ice: ["one", "two", "three"],
    };

    options[category].forEach((option) => {
      const elements = document.querySelectorAll(
        `.designer-content__svg-${category.replace("coffee_", "")}_${option}`
      );

      elements.forEach((element) => {
        if (option === type) {
          setFillColor(element, color);
          if (color === "black") {
            localStorage.setItem(`coffee_${category}`, type);
          }
        } else {
          setFillColor(element, "#D8D8D8");
        }
      });
    });
  }

  roastingLight.addEventListener("click", () =>
    checkBlack(roastingLight, "light", "coffee_roasting")
  );
  roastingMedium.addEventListener("click", () =>
    checkBlack(roastingMedium, "medium", "coffee_roasting")
  );
  roastingStrong.addEventListener("click", () =>
    checkBlack(roastingStrong, "strong", "coffee_roasting")
  );

  grindingSmall.addEventListener("click", () =>
    checkBlack(grindingSmall, "small", "coffee_grinding")
  );
  grindingBig.addEventListener("click", () =>
    checkBlack(grindingBig, "big", "coffee_grinding")
  );

  iceOne.addEventListener("click", () =>
    checkBlack(iceOne, "one", "coffee_ice")
  );
  iceTwo.addEventListener("click", () =>
    checkBlack(iceTwo, "two", "coffee_ice")
  );
  iceThree.addEventListener("click", () =>
    checkBlack(iceThree, "three", "coffee_ice")
  );

  //Получение milk_option и syrup_option
  const cafeAddress = localStorage.getItem("address");

  function showMilkContainer() {
    overlay.classList.remove("none");
    milkContainer.classList.remove("none");
    milkContainer.classList.remove("slide-down");
    milkContainer.classList.add("slide-up");
  }

  function showSyrupContainer() {
    overlay.classList.remove("none");
    syrupContainer.classList.remove("none");
    syrupContainer.classList.remove("slide-down");
    syrupContainer.classList.add("slide-up");
  }

  function closeMilkSyrupcontainers() {
    overlay.classList.add("none");
    milkContainer.classList.remove("slide-up");
    syrupContainer.classList.remove("slide-up");
    milkContainer.classList.add("slide-down");
    syrupContainer.classList.add("slide-down");

    setTimeout(() => {
      milkContainer.classList.add("none");
      syrupContainer.classList.add("none");
    }, 1000);
  }

  if (cafeAddress === "Bradford BD1 1PR") {
    renderMilkList("cafe_one");
    renderSyrupList("cafe_one");
  } else if (cafeAddress === "Bradford BD4 7SJ") {
    renderMilkList("cafe_two");
    renderSyrupList("cafe_two");
  } else if (cafeAddress === "Bradford BD1 4RN") {
    renderMilkList("cafe_three");
    renderSyrupList("cafe_three");
  } else {
    console.log("Cafe address wasn't got");
  }

  async function renderMilkList(cafe) {
    try {
      const milkList = await getMilkList(cafe);
      if (milkList) {
        const milkOptions = Object.values(milkList);

        const milkOptionsContainer = document.querySelector(
          ".designer-modal__milk-options"
        );
        milkOptionsContainer.innerHTML = "";

        milkOptions.forEach((milkOption) => {
          const optionElement = document.createElement("div");
          optionElement.classList.add("designer-modal__milk-option");
          optionElement.textContent = milkOption;
          milkOptionsContainer.append(optionElement);

          optionElement.addEventListener("click", function () {
            const milkValue = milkOption;
            localStorage.setItem("milk_option", milkValue);
          });
        });
      } else {
        console.log("No data receoved from getMilkList");
      }
    } catch (err) {
      console.log("Error fetching milk list: ", err);
    }
  }

  async function renderSyrupList(cafe) {
    try {
      const syrupList = await getSyrupList(cafe);
      if (syrupList) {
        const syrupOptions = Object.values(syrupList);

        const syrupOptionsContainer = document.querySelector(
          ".designer-modal__syrup-options"
        );
        syrupOptionsContainer.innerHTML = "";

        syrupOptions.forEach((syrupOption) => {
          const optionElement = document.createElement("div");
          optionElement.classList.add("designer-modal__syrup-option");
          optionElement.textContent = syrupOption;
          syrupOptionsContainer.append(optionElement);

          optionElement.addEventListener("click", function () {
            const syrupValue = syrupOption;
            localStorage.setItem("syrup_option", syrupValue);
          });
        });
      } else {
        console.log("No data receoved from getSyrupList");
      }
    } catch (err) {
      console.log("Error fetching syrup list: ", err);
    }
  }

  selectMilk.addEventListener("click", showMilkContainer);
  selectSyrup.addEventListener("click", showSyrupContainer);
  overlay.addEventListener("click", closeMilkSyrupcontainers);

  cancelButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const isMilkVisible = !milkContainer.classList.contains("none");
      const isSyrupVisible = !syrupContainer.classList.contains("none");
      if (isMilkVisible) {
        localStorage.removeItem("milk_option");
        console.log("Milk option removed");
      } else if (isSyrupVisible) {
        localStorage.removeItem("syrup_option");
        console.log("Syrup option removed");
      }

      closeMilkSyrupcontainers();
    });
  });

  //Перезапись order_price
  let orderPrice = JSON.parse(localStorage.getItem("order_price")).toFixed(2);
  console.log(orderPrice);
  totalCount.textContent = orderPrice;

  //Маршруты
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
  buttonNext.addEventListener(
    "click",
    () => (window.location.href = "/current-order")
  );
}
