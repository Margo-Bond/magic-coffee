import ArrowBack from "@/assets/images/geometric-icons/back.svg";
import CartBuy from "@/assets/images/cart.svg";
import CoffeeCard from "@/assets/images/coffee-cup.svg";
import Takeaway from "@/assets/images/coffee-icons/cold-beverage.svg";
import Onsite from "@/assets/images/coffee-icons/hot-beverage.svg";
import CupSmall from "@/assets/images/coffee-icons/cup-250.svg";
import CupMedium from "@/assets/images/coffee-icons/cup-350.svg";
import CupLarge from "@/assets/images/coffee-icons/cup-450.svg";
import { getDatabase, ref, get } from "firebase/database";
import { initializeApp, getApps } from "firebase/app";

// Инициализация Firebase
let app;
if (!getApps().length) {
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    databaseURL: "YOUR_DATABASE_URL",
  };

  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const database = getDatabase(app);

async function getCafes() {
  const dbRef = ref(database, "cafes");
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
    return {};
  }
}

export default async function renderOrderOptionPage(main) {
  main.innerHTML = `
    <div class="order-option">
      <div class="order-option__main">
        <div class="order-option__arrowBack">${ArrowBack}</div>
        <p class="order-option__title">Order</p>
        <div class="order-option__cartBuy">${CartBuy}</div>
      </div>

      <div class="order-option__coffee-img">
        <div class="coffeeCard">${CoffeeCard}</div>
      </div>

      <div class="order-option__item">
        <div class="order-option__item-text">
          <p class="order-option__text">Cuppucino</p>
        </div>
        <div class="order-optionr__item-quantity" id="counter"> 
          <input type="button" class="order-option__quantity" id="buttonCountMinus" value="-">
          <div id="buttonCountNumber">1</div>
          <input type="button" class="order-option__quantity" id="buttonCountPlus" value="+">
        </div>
      </div>

      <div class="order-option__item">
        <div class="order-option__item-text">
          <p class="order-option__text">Ristretto</p>
        </div>
        <div class="order-option__item-strength">
          <button id="strength1" class="order-option__strength">One</button>
          <button id="strength2" class="order-option__strength">Two</button>
        </div>
      </div>

      <div class="order-option__item">
        <div class="order-option__item-text">
          <p class="order-option__text">Onsite / Takeaway</p>
        </div>
        <div class="order-option__where">
          <div class="order-option__svg order-option__svg-where_onsite">${Onsite}</div>
          <div class="order-option__svg order-option__svg-where_takeaway">${Takeaway}</div>
        </div>
      </div>

      <div class="order-option__item">
        <div class="order-option__item-text">
          <p class="order-option__text">Volume, ml</p>
        </div>
        <div class="order-option__item-cup">
          <div class="order-option__cup">
            <div class="order-option__svg order-option__svg-cup_small">${CupSmall}</div>
            <div class="order-option__text-size">250</div>
          </div>
          <div class="order-option__cup">
            <div class="order-option__svg order-option__svg-cup_medium">${CupMedium}</div>
            <div class="order-option__text-size">350</div>
          </div>
          <div class="order-option__cup">
            <div class="order-option__svg order-option__svg-cup_large">${CupLarge}</div>
            <div class="order-option__text-size">450</div>
          </div>
        </div>  
      </div>

      <div class="order-option__item">
        <div class="order-option__item-text">
          <p class="order-option__text">Prepare by a certain time today?</p>
        </div>
        <div class="order-option__item_switch">
          <label class="switch">
            <input type="checkbox" id="togBtn" />
            <span class="slider round"></span>
          </label>
        </div>
        <div class="order-option__item-watch">
          <input type="time" id="time" class="order-option__watch" value="00:00" />
        </div>
    </div>

    <footer class="order-option-footer">
      <div class="order-option-footer__count-container">
        <p class="order-option-footer__count-text">Total Amount</p>
        <p class="order-option-footer__count-currency">BYN <span id="multipliedValue" class="order-option-footer__count">1</span></p>
      </div>
      <button class="order-option-footer__button">Next</button>
    </footer>`;

  const data = await getCafes();

  const coffeeCardContainer = document.querySelector(".coffeeCard");
  coffeeCardContainer.innerHTML = ""; // Очищаем контейнер

  const address = localStorage.getItem("address"); // Получаем адрес из localStorage
  let selectedCafe = null;

  if (address === "Bradford BD1 1PR") {
    selectedCafe = data.cafe_one;
  } else if (address === "Bradford BD4 7SJ") {
    selectedCafe = data.cafe_two;
  } else if (address === "Bradford BD1 4RN") {
    selectedCafe = data.cafe_three;
  }
  /*
  if (selectedCafe) {
    const coffeeSelection = selectedCafe.coffee_selection.coffees;
    Object.keys(coffeeSelection).forEach((coffeeKey) => {
      const coffee = coffeeSelection[coffeeKey];
      const coffeeElement = document.createElement("div");
      coffeeElement.innerHTML = `<p>${coffee.coffee_type}</p><p>${coffee.description}</p>`;
      coffeeCardContainer.appendChild(coffeeElement);
    });
  } else {
    coffeeCardContainer.innerHTML =
      "<p>No coffee available for the selected address.</p>";
  }*/
  const coffeeType = document.querySelector(".order-option__coffee");

  const gеtСoffeeType = localStorage.getItem("coffee_type"); // Need to put here the right key
  if (gеtСoffeeType) {
    //coffeeType.textContent = gеtСoffeeType;
  } else {
    console.log("No coffee_type is available");
  }

  const buttonNext = document.querySelector(".order-option-footer__button");
  const back = document.querySelector(".order-option__arrowBack");
  const cart = document.querySelector(".order-option__cartBuy");

  back.addEventListener("click", () => {
    window.location.href = "/menu";
  });

  cart.addEventListener("click", () => {
    window.location.href = "/current-order";
  });

  const counter = document.getElementById("buttonCountNumber");
  const buttonPlus = document.getElementById("buttonCountPlus");
  const buttonMinus = document.getElementById("buttonCountMinus");
  let count = 1;
  const minCount = 1;
  const multiplier = 3;

  function updateCount(newCount) {
    count = newCount;
    counter.textContent = count;
    document.getElementById("multipliedValue").textContent = (
      count * multiplier
    ).toFixed(2);
    localStorage.setItem("quantity", count.toString());
    localStorage.setItem("order_price", (count * multiplier).toFixed(2));
  }

  buttonPlus.addEventListener("click", function () {
    updateCount(count + 1);
  });

  buttonMinus.addEventListener("click", function () {
    if (count > minCount) {
      updateCount(count - 1);
    }
  });
  /*
  getCafes().then((cafes) => {
    if (cafes) {
      Object.keys(cafes).forEach((cafeKey) => {
        const cafe = cafes[cafeKey];
        if (cafe.coffee_selection && cafe.coffee_selection.coffees) {
          Object.keys(cafe.coffee_selection.coffees).forEach((coffeeKey) => {
            const coffee = cafe.coffee_selection.coffees[coffeeKey];
            if (coffee.price) {
              console.log(`Price of ${coffeeKey} in ${cafeKey}:`, coffee.price);
            } else {
              console.log(`Price for ${coffeeKey} not found in ${cafeKey}`);
            }
          });
        } else {
          console.log(`No coffee selection available for ${cafeKey}`);
        }
      });
    } else {
      console.log("No cafes data available");
    }
  });*/

  updateCount(count);

  const buttons = document.querySelectorAll(".order-option__strength");
  function resetButtons() {
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      resetButtons();
      this.classList.add("active");
    });
  });

  document.getElementById("strength1").addEventListener("click", function () {
    localStorage.setItem("mug_option", "One");
  });

  document.getElementById("strength2").addEventListener("click", function () {
    localStorage.setItem("mug_option", "Two");
  });

  const onsite = document.querySelector(".order-option__svg-where_onsite");
  const takeaway = document.querySelector(".order-option__svg-where_takeaway");
  const cupSizeSmall = document.querySelector(".order-option__svg-cup_small");
  const cupSizeMedium = document.querySelector(".order-option__svg-cup_medium");
  const cupSizeLarge = document.querySelector(".order-option__svg-cup_large");

  function setFillColor(element, color) {
    element.querySelectorAll("svg path, svg rect").forEach((svg) => {
      svg.setAttribute("fill", color);
      svg.setAttribute("stroke", color);
      svg.setAttribute("stroke-width", "0.1");
    });
  }

  function checkBlack(element, type, category) {
    const isBlack = Array.from(
      element.querySelectorAll("svg path, svg rect")
    ).some((svg) => svg.getAttribute("fill") === "black");

    if (isBlack) {
      selectCategory(type, category, "#D8D8D8");
      localStorage.removeItem(category);
    } else {
      selectCategory(type, category, "black");
    }
  }

  function selectCategory(type, category, color) {
    const options = {
      where: ["onsite", "takeaway"],
      cup: ["small", "medium", "large"],
    };
    options[category].forEach((option) => {
      const elements = document.querySelectorAll(
        `.order-option__svg-${category}_${option}`
      );

      elements.forEach((element) => {
        if (option === type) {
          setFillColor(element, color);
          if (color === "black") {
            localStorage.setItem(category, type);
          }
        } else {
          setFillColor(element, "#D8D8D8");
        }
      });
    });
  }

  onsite.addEventListener("click", () => checkBlack(onsite, "onsite", "where"));
  takeaway.addEventListener("click", () =>
    checkBlack(takeaway, "takeaway", "where")
  );
  cupSizeSmall.addEventListener("click", () =>
    checkBlack(cupSizeSmall, "small", "cup")
  );
  cupSizeMedium.addEventListener("click", () =>
    checkBlack(cupSizeMedium, "medium", "cup")
  );
  cupSizeLarge.addEventListener("click", () =>
    checkBlack(cupSizeLarge, "large", "cup")
  );

  const toggle = document.getElementById("togBtn");
  const watch = document.querySelector(".order-option__item-watch");

  toggle.addEventListener("change", function () {
    if (this.checked) {
      watch.style.display = "flex";
    } else {
      watch.style.display = "none";
    }
  });

  buttonNext.addEventListener("click", () => {
    window.location.href = "/designer";
  });
}

/*ДАША, ТУТ ПОЛУЧАЕМ ЦЕНУ
  const cafeKey = "cafe_one";
  const coffeeKey = "americano";

  try {
    const data = await getCafes(cafeKey, coffeeKey);
    console.log(data.price);
  } catch (error) {
    console.error("Error fetching coffee data:", error);
  }
*/
