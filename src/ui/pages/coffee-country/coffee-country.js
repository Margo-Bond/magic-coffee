import Back from "@/assets/images/geometric-icons/back.svg";
import Cart from "@/assets/images/cart.svg";
import More from "@/assets/images/geometric-icons/icon-more-grey.svg";

export default async function renderCoffeeCountryPage(main) {
  main.innerHTML = `
    <div class="country">
          <div class="country-header">
            <div class="country-header__icon">${Back}</div>
            <p class="country-header__title">Coffee lover assemblage</p>
            <div class="country-header__icon">${Cart}</div>
          </div>

          <div class="country-title">
            <p class="country-title__text">Select country and sort of coffee</p>
          </div>

          <div class="country-content">
            <div class="country-content__wrapper item-one">
              <p class="country-content__text text-one">Brazil</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Brazil</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Costa Rica</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Jamaica</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Yemen</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Kenya</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">India</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Tanzania</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Hawaii</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Indonesia</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Ethiopia</p>
              <div class="country-content__icon">${More}</div>
            </div>
          </div>
        </div>
  `;

  const countryBtns = document.querySelectorAll('.country-content__wrapper');

  countryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      resetButtons();
      btn.classList.add('selected');
      const CountryBtnText = btn.querySelector('.country-content__text');
      const btnTextValue = CountryBtnText.textContent;
      const storedCountry = localStorage.getItem('country');
      if (storedCountry === btnTextValue) {
        localStorage.removeItem('country');
        btn.classList.remove('selected'); // Удаление класса при повторном нажатии
      } else {
        localStorage.setItem('country', btnTextValue);
      }
    });
  });

  function resetButtons() {
    countryBtns.forEach(btn => {
      btn.classList.remove('selected');
    })
  }
}

renderCoffeeCountryPage(main);