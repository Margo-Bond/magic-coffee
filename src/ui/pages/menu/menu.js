import { getCoffees } from "../../../../Services/Get.js";
const userName = JSON.parse(localStorage.getItem("user"))?.name || "Customer";

export default async function renderMenuPage(main) {
  main.innerHTML = `
    <div class="menu">
      <div class="menu__header">
        <div class="menu__header__title">
          <div class="menu__header__title-text">Welcome!</div>

          <div class="menu__header__title-username">${userName}</div>
        </div>

        <div class="menu__header__button">
          <div class="menu__header__button-icon"></div>
        </div>
      </div>

      <div class="menu__content__wrapper">
        <span class="menu__content__title">Select your coffee</span>

        <div class="menu__content">
          ${Array(6)
            .fill(
              `
          <div class="menu__content__item">
            <div class="menu__content__item-image">
              <img class="image" src="" alt="">
            </div>
            <p class="menu__content__item-name"></p>
          </div>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  const menuContentItems = document.querySelectorAll(".menu__content__item");

  let order = JSON.parse(localStorage.getItem("order")) || {};
  let keys = Object.keys(order);
  let lastKey = keys[keys.length - 1];

  try {
    const getAddress = order[lastKey].cafe_address;

    let cafeKey = null;

    if (getAddress === "Bradford BD1 1PR") {
      cafeKey = "cafe_one";
    } else if (getAddress === "Bradford BD4 7SJ") {
      cafeKey = "cafe_two";
    } else if (getAddress === "Bradford BD1 4RN") {
      cafeKey = "cafe_three";
    }

    const data = await getCoffees(cafeKey);
    const coffeeKeys = Object.keys(data);

    menuContentItems.forEach((btn, index) => {
      const imageElement = btn.querySelector(".image");
      const itemName = btn.querySelector(".menu__content__item-name");

      const coffeeKey = coffeeKeys[index];
      const coffeeItem = data[coffeeKey];

      if (coffeeItem) {
        imageElement.src = coffeeItem.image_url;
        imageElement.alt = coffeeItem.coffee_type;
        itemName.textContent = coffeeItem.coffee_type;
      }
    });
  } catch (error) {
    console.error("Error fetching coffee data:", error);
  }

  menuContentItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const coffeeBtnText = btn.querySelector(".menu__content__item-name");
      const btnTextValue = coffeeBtnText.textContent;

      order[lastKey].coffee_type = btnTextValue;
      localStorage.setItem("order", JSON.stringify(order));

      window.location.href = "/order-options";
    });
  });

  const footer = document.querySelector("footer");
  footer.style.boxShadow = "none";
}
