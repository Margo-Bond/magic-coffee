import getCafes from '../../../../Services/GetCafes.js';
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
              <p class="coffeetype-content__text">Santos</p>
              <div class="coffeetype-content__icon">${Chosen}</div>
            </div>

            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text">Bourbon santos</p>
              <div class="coffeetype-content__icon">${Chosen}</div>
            </div>

            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text">Minas</p>
              <div class="coffeetype-content__icon">${Chosen}</div>
            </div>

            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text">Rio</p>
              <div class="coffeetype-content__icon">${Chosen}</div>
            </div>

            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text">Canilon</p>
              <div class="coffeetype-content__icon">${Chosen}</div>
            </div>

            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text">Flat beat</p>
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

  try {
    const data = await getCafes();
    const cafeOne = "Bradford BD1 1PR";
    const cafeTwo = "Bradford BD4 7SJ";
    const cafeThree = "Bradford BD1 4RN";
    const getAddress = localStorage.getItem('address');

    let selectedCafe = null;

    if (getAddress === cafeOne) {
      selectedCafe = data.cafe_one.coffee_selection;
    } else if (getAddress === cafeTwo) {
      selectedCafe = data.cafe_two.coffee_selection;
    } else if (getAddress === cafeThree) {
      selectedCafe = data.cafe_three.coffee_selection;
    }

    if (selectedCafe) {
      const countryOptions = Object.keys(selectedCafe);
      console.log(countryOptions);


    }
  } catch (error) {
    console.error("Error fetching country data:", error);
  }













  const coffeeTypeBtns = document.querySelectorAll(
    ".coffeetype-content__wrapper"
  );

  coffeeTypeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isSelected = btn.classList.contains("selected");

      if (isSelected) {
        // Если элемент уже выбран, снимаем выделение и скрываем картинку
        btn.classList.remove("selected");
        const coffeetypeBtnText = btn.querySelector(".coffeetype-content__text");
        coffeetypeBtnText.style.color = "rgb(0, 24, 51)";
        const coffeetypeBtnIcon = btn.querySelector(".coffeetype-content__icon");
        coffeetypeBtnIcon.style.display = "none"; // Скрываем картинку
        localStorage.removeItem("coffee_type");
      } else {
        // Если элемент не выбран, выделяем его и показываем картинку
        resetButtons();
        btn.classList.add("selected");
        const coffeetypeBtnText = btn.querySelector(".coffeetype-content__text");
        const btnTextValue = coffeetypeBtnText.textContent;
        localStorage.setItem("coffee_type", btnTextValue);
        coffeetypeBtnText.style.color = "rgb(10, 132, 255)";
        const coffeetypeBtnIcon = btn.querySelector(".coffeetype-content__icon");
        coffeetypeBtnIcon.style.display = "block"; // Показываем картинку
      }
    });
  });

  function resetButtons() {
    coffeeTypeBtns.forEach((btn) => {
      btn.classList.remove("selected");
      const coffeetypeBtnText = btn.querySelector(".coffeetype-content__text");
      coffeetypeBtnText.style.color = "rgb(0, 24, 51)";
      const coffeetypeBtnIcon = btn.querySelector(".coffeetype-content__icon");
      coffeetypeBtnIcon.style.display = "none"; // Скрываем картинку у всех элементов
    });
  }
}

renderCoffeeTypePage(main);
