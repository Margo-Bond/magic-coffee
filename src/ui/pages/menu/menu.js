import Cart from "@/assets/images/cart.svg";
import { getCoffees } from "../../../../Services/Get.js";
import { order, lastKey } from "../../../../vars.js";
import timerManager from "../../../../Services/timerManager.js";

export default async function renderMenuPage(main) {
  const userName = JSON.parse(localStorage.getItem("user"))?.name || "Customer";

  main.innerHTML = `
    <div class="menu">
      <div class="menu__header">
        <div class="menu__header__title">
          <div class="menu__header__title-text">Welcome!</div>

          <div class="menu__header__title-username">${userName}</div>
        </div>

        <div class="menu__header__button">
          <div class="menu__header__button-icon">${Cart}</div>
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

  const cartBtn = document.querySelector(".menu__header__button-icon");
  const menuContentItems = document.querySelectorAll(".menu__content__item");

  /*let order = JSON.parse(localStorage.getItem("order")) || {};
  let keys = Object.keys(order);
  let lastKey = keys[keys.length - 1];*/

  const lastOrder = order[lastKey];
  const now = Date.now();
  let user = JSON.parse(localStorage.getItem("user")) || {};
  const userUid = user ? user.uid : null;

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

      if (
        order[lastKey].cup_quantity ||
        order[lastKey].coffee_ristretto ||
        order[lastKey].mug_option ||
        order[lastKey].cup_volume ||
        order[lastKey].order_time
      ) {
        delete order[lastKey].cup_quantity;
        delete order[lastKey].coffee_ristretto;
        delete order[lastKey].mug_option;
        delete order[lastKey].cup_volume;
        delete order[lastKey].order_time;
        localStorage.setItem("order", JSON.stringify(order));
      } else {
        console.log(
          "There are no keys from order-option page in Local Storage"
        );
      }

      window.location.href = "/order-options";
    });
  });

  const footer = document.querySelector("footer");
  footer.style.boxShadow = "none";
  cartBtn.addEventListener(
    "click",
    () => (window.location.href = "/current-order")
  );

  if (userUid && lastOrder.delete_at) {
    timerManager.setDeletionTimer(
      lastOrder.delete_at - now,
      lastOrder,
      lastKey,
      userUid
    );
  }
}
