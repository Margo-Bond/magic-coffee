import { getAdditives } from '../../../../Services/Get.js';
import Back from "@/assets/images/geometric-icons/back.svg";
import Cart from "@/assets/images/cart.svg";
import Chosen from "@/assets/images/geometric-icons/chosen.svg";

export default async function renderAdditivesPage(main) {
  main.innerHTML = `
  <div class="additives">
        <div class="additives-header">
          <div class="additives-header__icon back-button">${Back}</div>
          <p class="additives-header__title">Coffee lover assemblage</p>
          <div class="additives-header__icon cart-button">${Cart}</div>
        </div>

        <div class="additives-title">
          <p class="additives-title__text">Select a sort of coffee</p>
        </div>

        <div class="additives-content">
        ${Array(8).fill(`
          <div class="additives-content__wrapper">
            <p class="additives-content__text"></p>
            <div class="additives-content__icon">${Chosen}</div>
          </div>
        `).join('')}
        </div>
      </div>
`;

  const backBtn = document.querySelector(".back-button");
  const cartBtn = document.querySelector(".cart-button");
  backBtn.addEventListener("click", () => {
    window.location.href = "/designer";
  });
  cartBtn.addEventListener(
    "click",
    () => (window.location.href = "/current-order")
  );

  const additivesBtns = document.querySelectorAll(".additives-content__wrapper");

  try {
    const getAddress = localStorage.getItem('cafe_address');

    let cafeKey = null;

    if (getAddress === "Bradford BD1 1PR") {
      cafeKey = "cafe_one";
    } else if (getAddress === "Bradford BD4 7SJ") {
      cafeKey = "cafe_two";
    } else if (getAddress === "Bradford BD1 4RN") {
      cafeKey = "cafe_three";
    }

    const data = await getAdditives(cafeKey);
    console.log(data);

    additivesBtns.forEach((btn, index) => {
      const additivesBtnText = btn.querySelector(".additives-content__text");

      const additiveType = data[`additive_type${index + 1}`];

      if (additiveType) {
        additivesBtnText.textContent = additiveType;
      }
    })

    const additivesPrice = data.price;
    if (additivesPrice) {
      localStorage.setItem('additives_price', additivesPrice);
    } else {
      console.log("Error additive price wasn't set");
    }
  } catch (error) {
    console.error("Error fetching additive types data:", error);
  }

  additivesBtns.forEach((btn) => {
    const additivesBtnText = btn.querySelector(".additives-content__text");
    const btnTextValue = additivesBtnText.textContent;
    const isSelected = localStorage.getItem("coffee_additives");

    if (isSelected === btnTextValue) {
      btn.classList.add("selected");
      additivesBtnText.style.color = "rgb(10, 132, 255)";
      const additivesBtnIcon = btn.querySelector(".additives-content__icon");
      additivesBtnIcon.style.display = "block";
    }
  });

  additivesBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isSelected = btn.classList.contains("selected");
      const getOrderPrice = Number(localStorage.getItem('order_price'));
      const getAdditivePrice = Number(localStorage.getItem('additives_price'));

      if (isSelected) {
        btn.classList.remove("selected");
        const additivesBtnText = btn.querySelector(".additives-content__text");
        additivesBtnText.style.color = "rgb(0, 24, 51)";
        const additivesBtnIcon = btn.querySelector(".additives-content__icon");
        additivesBtnIcon.style.display = "none";
        localStorage.removeItem("coffee_additives");
        const originalOrderPrice = getOrderPrice - getAdditivePrice;
        localStorage.setItem('order_price', originalOrderPrice);
      } else {
        resetButtons();
        btn.classList.add("selected");
        const additivesBtnText = btn.querySelector(".additives-content__text");
        const btnTextValue = additivesBtnText.textContent;
        localStorage.setItem("coffee_additives", btnTextValue);
        additivesBtnText.style.color = "rgb(10, 132, 255)";
        const additivesBtnIcon = btn.querySelector(".additives-content__icon");
        const newOrderPrice = getAdditivePrice + getOrderPrice;
        localStorage.setItem('order_price', newOrderPrice);

        setTimeout(() => {
          additivesBtnIcon.style.display = "block";
        }, 700);
      }
    });
  });

  function resetButtons() {
    additivesBtns.forEach((btn) => {
      btn.classList.remove("selected");
      const additivesBtnText = btn.querySelector(".additives-content__text");
      additivesBtnText.style.color = "rgb(0, 24, 51)";
      const additivesBtnIcon = btn.querySelector(".additives-content__icon");
      additivesBtnIcon.style.display = "none";
    });
  }
}
