import Back from "@/assets/images/geometric-icons/back.svg";
import Cart from "@/assets/images/cart.svg";
import More from "@/assets/images/geometric-icons/icon-more-grey.svg";

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
            </div>

            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text">Bourbon santos</p>
            </div>

            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text">Minas</p>
            </div>

            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text">Rio</p>
            </div>

            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text">Canilon</p>
            </div>

            <div class="coffeetype-content__wrapper">
              <p class="coffeetype-content__text">Flat beat</p>
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

  const coffeeTypeBtns = document.querySelectorAll(
    ".coffeetype-content__wrapper"
  );

  coffeeTypeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      resetButtons();
      btn.classList.add("selected");
      const coffeetypeBtnText = btn.querySelector(".coffeetype-content__text");
      const btnTextValue = coffeetypeBtnText.textContent;
      const storedCoffeeType = localStorage.getItem("coffee_type");
      if (storedCoffeeType === btnTextValue) {
        localStorage.removeItem("coffee_type");
        btn.classList.remove("selected");
        coffeetypeBtnText.style.color = "rgb(0, 24, 51)";
      } else {
        localStorage.setItem("coffee_sort", btnTextValue);
        coffeetypeBtnText.style.color = "rgb(10, 132, 255)";
      }
    });
  });

  function resetButtons() {
    coffeeTypeBtns.forEach((btn) => {
      btn.classList.remove("selected");
      const coffeetypeBtnText = btn.querySelector(".coffeetype-content__text");
      coffeetypeBtnText.style.color = "rgb(0, 24, 51)";
    });
  }
}

renderCoffeeTypePage(main);
