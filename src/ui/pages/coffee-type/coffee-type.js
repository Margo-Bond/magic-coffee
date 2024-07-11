import { getCoffeeSorts } from '../../../../Services/Get.js';
import Back from "@/assets/images/geometric-icons/back.svg";
import Cart from "@/assets/images/cart.svg";
import Chosen from "@/assets/images/geometric-icons/chosen.svg";

export default async function renderCoffeeTypePage(main) {
  main.innerHTML = `
    <div class="coffeetype">
          <div class="coffeetype-header">
            <div class="coffeetype-header__icon back-button">${Back}</div>
            <p class="coffeetype-header__title">Coffee lover assemblage</p>
            <div class="coffeetype-header__icon cart-button">${Cart}</div>
          </div>

          <div class="coffeetype-title">
            <p class="coffeetype-title__text">Select a sort of coffee</p>
          </div>

          <div class="coffeetype-content">
            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text"></p>
              <div class="coffeetype-content__icon">${Chosen}</div>
            </div>

            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text"></p>
              <div class="coffeetype-content__icon">${Chosen}</div>
            </div>

            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text"></p>
              <div class="coffeetype-content__icon">${Chosen}</div>
            </div>

            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text"></p>
              <div class="coffeetype-content__icon">${Chosen}</div>
            </div>

            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text"></p>
              <div class="coffeetype-content__icon">${Chosen}</div>
            </div>

            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text"></p>
              <div class="coffeetype-content__icon">${Chosen}</div>
            </div>
          </div>
        </div>
  `;

  const backBtn = document.querySelector(".back-button");
  const cartBtn = document.querySelector(".cart-button");
  backBtn.addEventListener("click", () => {
    window.location.href = "/coffee-country";
  });
  cartBtn.addEventListener(
    "click",
    () => (window.location.href = "/current-order")
  );

  const coffeeTypeBtns = document.querySelectorAll(".coffeetype-content__wrapper");

  try {
    const getAddress = localStorage.getItem('cafe_address');

    const getCountry = localStorage.getItem('coffee_country');
    const countryKey = getCountry.toLowerCase().replace(/\s+/g, '_');

    let cafeKey = null;

    if (getAddress === "Bradford BD1 1PR") {
      cafeKey = "cafe_one";
    } else if (getAddress === "Bradford BD4 7SJ") {
      cafeKey = "cafe_two";
    } else if (getAddress === "Bradford BD1 4RN") {
      cafeKey = "cafe_three";
    }

    const data = await getCoffeeSorts(cafeKey, countryKey);
    console.log(data);

    coffeeTypeBtns.forEach((btn, index) => {
      const coffeeTypeBtnText = btn.querySelector(".coffeetype-content__text");

      const coffeeType = data[`sort_of_coffee${index + 1}`];

      if (coffeeType) {
        coffeeTypeBtnText.textContent = coffeeType;
      }
    })

  } catch (error) {
    console.error("Error fetching coffee types data:", error);
  }


  coffeeTypeBtns.forEach((btn) => {
    const coffeetypeBtnText = btn.querySelector(".coffeetype-content__text");
    const btnTextValue = coffeetypeBtnText.textContent;
    const isSelected = localStorage.getItem("coffee_type");

    if (isSelected === btnTextValue) {
      btn.classList.add("selected");
      coffeetypeBtnText.style.color = "rgb(10, 132, 255)";
      const coffeetypeBtnIcon = btn.querySelector(".coffeetype-content__icon");
      coffeetypeBtnIcon.style.display = "block";
    }
  });



  coffeeTypeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isSelected = btn.classList.contains("selected");

      if (isSelected) {
        btn.classList.remove("selected");
        const coffeetypeBtnText = btn.querySelector(".coffeetype-content__text");
        coffeetypeBtnText.style.color = "rgb(0, 24, 51)";
        const coffeetypeBtnIcon = btn.querySelector(".coffeetype-content__icon");
        coffeetypeBtnIcon.style.display = "none";
        localStorage.removeItem("coffee_type");
      } else {
        resetButtons();
        btn.classList.add("selected");
        const coffeetypeBtnText = btn.querySelector(".coffeetype-content__text");
        const btnTextValue = coffeetypeBtnText.textContent;
        localStorage.setItem("coffee_type", btnTextValue);
        coffeetypeBtnText.style.color = "rgb(10, 132, 255)";
        const coffeetypeBtnIcon = btn.querySelector(".coffeetype-content__icon");

        setTimeout(() => {
          coffeetypeBtnIcon.style.display = "block"; // Показываем картинку
          window.location.href = "/designer";
        }, 700);
      }
    });
  });

  function resetButtons() {
    coffeeTypeBtns.forEach((btn) => {
      btn.classList.remove("selected");
      const coffeetypeBtnText = btn.querySelector(".coffeetype-content__text");
      coffeetypeBtnText.style.color = "rgb(0, 24, 51)";
      const coffeetypeBtnIcon = btn.querySelector(".coffeetype-content__icon");
      coffeetypeBtnIcon.style.display = "none";
    });
  }
}

renderCoffeeTypePage(main);