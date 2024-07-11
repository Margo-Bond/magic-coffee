import getCafes from '../../../../Services/GetCafes.js';

export default async function renderMenuPage(main) {
  main.innerHTML = `
    <div class="menu">
      <div class="menu__header">
        <div class="menu__header__title">
          <div class="menu__header__title-text">Welcome!</div>

          <div class="menu__header__title-username"></div>
        </div>

        <div class="menu__header__button">
          <div class="menu__header__button-icon"></div>
        </div>
      </div>

      <div class="menu__content__wrapper">
        <span class="menu__content__title">Select your coffee</span>

        <div class="menu__content">
          <div class="menu__content__item">
            <div class="menu__content__item-image">
              <img class="image" src="" alt="Americano">
            </div>
            <p class="menu__content__item-name"></p>
          </div>

          <div class="menu__content__item">
            <div class="menu__content__item-image">
              <img class="image" src="" alt="Cappuccino">
            </div>
            <p class="menu__content__item-name"></p>
          </div>

          <div class="menu__content__item">
            <div class="menu__content__item-image">
              <img class="image" src="" alt="Latte">
            </div>
            <p class="menu__content__item-name"></p>
          </div>
          
          <div class="menu__content__item">
            <div class="menu__content__item-image">
              <img class="image" src="" alt="Flat White">
            </div>
            <p class="menu__content__item-name"></p>
          </div>
          
          <div class="menu__content__item">
            <div class="menu__content__item-image">
              <img class="image" src="" alt="Raf">
            </div>
            <p class="menu__content__item-name"></p>
          </div>

          <div class="menu__content__item">
            <div class="menu__content__item-image img-wrap6">
              <img class="image" src="" alt="Espresso">
            </div>
            <p class="menu__content__item-name"></p>
          </div>
        </div>
      </div>
    </div>
  `;

  const username = document.querySelector(".menu__header__title-username");
  const getUserName = localStorage.getItem("username"); // Need to put here the right key
  if (getUserName) {
    username.textContent = getUserName;
  } else {
    console.log("No username is available");
  }

  try {
    const data = await getCafes();
    const cafeOne = "Bradford BD1 1PR";
    const cafeTwo = "Bradford BD4 7SJ";
    const cafeThree = "Bradford BD1 4RN";
    const getAddress = localStorage.getItem('cafe_address');

    let selectedCafe = null;

    if (getAddress === cafeOne) {
      selectedCafe = data.cafe_one.coffees;
    } else if (getAddress === cafeTwo) {
      selectedCafe = data.cafe_two.coffees;
    } else if (getAddress === cafeThree) {
      selectedCafe = data.cafe_three.coffees;
    }

    if (selectedCafe) {
      const coffeeTypes = Object.keys(selectedCafe);
      console.log(coffeeTypes)
      const menuContentItems = document.querySelectorAll('.menu__content__item');

      menuContentItems.forEach((menuItem, index) => {
        if (coffeeTypes[index]) {
          const coffeeType = coffeeTypes[index];
          const coffeeData = selectedCafe[coffeeType];

          const imageElement = menuItem.querySelector('.image');
          const itemName = menuItem.querySelector('.menu__content__item-name');

          if (imageElement) {
            imageElement.src = coffeeData.image_url;
            imageElement.alt = coffeeData.coffee_type;
          }

          if (itemName) {
            itemName.textContent = coffeeData.coffee_type;
          }
        }
      });
    }
  } catch (error) {
    console.error("Error fetching coffee data:", error);
  }

  const coffeeBtns = document.querySelectorAll(".menu__content__item");

  coffeeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const coffeeBtnText = btn.querySelector(".menu__content__item-name");
      const btnTextValue = coffeeBtnText.textContent;
      localStorage.setItem("coffee_type", btnTextValue);
      window.location.href = "/order-options";
    })
  });
}
