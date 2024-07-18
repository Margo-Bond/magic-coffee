import ArrowBack from "@/assets/images/geometric-icons/back.svg";
import CartBuy from "@/assets/images/cart.svg";
import Takeaway from "@/assets/images/coffee-icons/cold-beverage.svg";
import Onsite from "@/assets/images/coffee-icons/hot-beverage.svg";
import CupSmall from "@/assets/images/coffee-icons/cup-250.svg";
import CupMedium from "@/assets/images/coffee-icons/cup-350.svg";
import CupLarge from "@/assets/images/coffee-icons/cup-450.svg";
import { getCoffeeType, getPrice } from "../../../../Services/Get.js";

export default async function renderOrderOptionPage(main) {

  main.innerHTML = `
    <div class="order-option">
      <div class="order-option__main">
        <div class="order-option__arrowBack">${ArrowBack}</div>
        <p class="order-option__title">Order</p>
        <div class="order-option__cartBuy">${CartBuy}</div>
      </div>

      <div class="order-option__coffee-img">
        <div class="coffeeCard">
          <img id="coffeeImage" src="" alt="">
        </div>
      </div>

      <div class="order-option__item item1">
        <div class="order-option__item-text">
          <p class="order-option__text coffee"></p>
        </div>
        <div class="order-optionr__item-quantity" id="counter"> 
          <input type="button" class="order-option__quantity" id="buttonCountMinus" value="-">
          <div id="buttonCountNumber">1</div>
          <input type="button" class="order-option__quantity" id="buttonCountPlus" value="+">
        </div>
      </div>

      <div class="order-option__item item2">
        <div class="order-option__item-text">
          <p class="order-option__text">Ristretto</p>
        </div>
        <div class="order-option__item-strength">
          <button id="strength1" class="order-option__strength" data-strength="One">One</button>
          <button id="strength2" class="order-option__strength" data-strength="Two">Two</button>
        </div>
      </div>

      <div class="order-option__item item3">
        <div class="order-option__item-text">
          <p class="order-option__text">Onsite / Takeaway</p>
        </div>
        <div class="order-option__where">
          <div class="order-option__svg order-option__svg-where_onsite">${Onsite}</div>
          <div class="order-option__svg order-option__svg-where_takeaway">${Takeaway}</div>
        </div>
      </div>

      <div class="order-option__item item4">
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

      <div class="order-option__item item5">
        <div class="order-option__item-text">
          <p class="order-option__text">Prepare by a certain time today?</p>
        </div>
        <div class="order-option__item_switch">
          <label class="switch">
            <input type="checkbox" id="togBtn" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="order-option__item item6">
        <div class="order-option__empty"></div>
        <div class="order-option__item-watch">
          <input type="time" id="time" class="order-option__watch" value="00:00" />
        </div>
      </div>
    </div>
    <footer class="order-option-footer">
      <div class="order-option-footer__count-container"
        <p class="order-option-footer__count-text"> Total Amount </p>
        <p class="order-option-footer__count-currency">BYN <span id="multipliedValue" class="order-option-footer__count"></span></p>
      </div>
      <button class="order-option-footer__button">Next</button>
    </footer>`;

  const back = document.querySelector(".order-option__arrowBack");
  const cart = document.querySelector(".order-option__cartBuy");
  const coffeeImage = document.getElementById("coffeeImage");
  const coffeeName = document.querySelector(".coffee");

  back.addEventListener("click", () => { window.location.href = "/menu" });
  cart.addEventListener("click", () => { window.location.href = "/current-order" });

  let order = JSON.parse(localStorage.getItem("order")) || {};
  let keys = Object.keys(order);
  let lastKey = keys[keys.length - 1];

  //Получение и добавление картинок с кофе из БД
  const cafeAddress = order[lastKey].cafe_address;
  const coffeeType = order[lastKey].coffee_type;

  const coffeeKey = coffeeType.toLowerCase().replace(/\s+/g, '_');

  let cafeKey = null;

  if (cafeAddress === "Bradford BD1 1PR") {
    cafeKey = "cafe_one";
  } else if (cafeAddress === "Bradford BD4 7SJ") {
    cafeKey = "cafe_two";
  } else if (cafeAddress === "Bradford BD1 4RN") {
    cafeKey = "cafe_three";
  }

  try {
    const data = await getCoffeeType(cafeKey, coffeeKey);
    coffeeImage.src = data.image_url;
    coffeeImage.alt = data.coffee_type;
    coffeeName.textContent = data.coffee_type;

  } catch (error) {
    console.error("Error fetching coffee data:", error);
  }

  //Установка счетчика (количество порций кофе)
  const counter = document.getElementById("buttonCountNumber");
  const buttonPlus = document.getElementById("buttonCountPlus");
  const buttonMinus = document.getElementById("buttonCountMinus");
  const totalAmount = document.getElementById("multipliedValue");
  const buttonWrap = document.querySelector('.order-optionr__item-quantity');
  const minCount = 1;

  // Получение сохраненного кол-ва кофе из localStorage или установка по умолчанию 1
  let count = parseInt(order[lastKey].cup_quantity) || 1;
  counter.textContent = count;

  function updateCount(newCount) {
    count = newCount;
    counter.textContent = count;
    calculateTotalAmount(cafeKey, coffeeKey, count);
    order[lastKey].cup_quantity = count;
    localStorage.setItem("order", JSON.stringify(order));
    buttonWrap.classList.add("active");
  }

  async function calculateTotalAmount(cafeKey, coffeeKey, count) {
    const price = await getPrice(cafeKey, coffeeKey);

    if (price) {
      totalAmount.textContent = (count * price).toFixed(2);
      order[lastKey].cup_quantity = count.toString();
      order[lastKey].order_price = totalAmount.textContent;
      localStorage.setItem("order", JSON.stringify(order));
    } else {
      console.error("Цена не является допустимым числом:", price);
    }
  }

  buttonPlus.addEventListener("click", function () {
    updateCount(count + 1);
  });

  buttonMinus.addEventListener("click", function () {
    if (count > minCount) {
      updateCount(count - 1);
    }
  });

  // Расчёт общей суммы на основе сохраненного значения счётчика при загрузке страницы
  calculateTotalAmount(cafeKey, coffeeKey, count);

  // Установить класс "active" при загрузке страницы, если есть сохраненное значение
  if (count > minCount) {
    buttonWrap.classList.add("active");
  }

  // Включение/выключение выделения кнопок coffee_ristretto и сохранение выделение при переходе на др страницу
  const buttons = document.querySelectorAll(".order-option__strength");

  // Восстановление состояния кнопок из localStorage
  buttons.forEach((button) => {
    const getRistretto = order[lastKey].coffee_ristretto;
    if (getRistretto === button.getAttribute("data-strength")) {
      button.classList.add("active");
    }
  });

  function resetButtons() {
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
  }
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        delete order[lastKey].coffee_ristretto;
      } else {
        resetButtons();
        this.classList.add("active");
        order[lastKey].coffee_ristretto = this.getAttribute("data-strength");
      }
      localStorage.setItem("order", JSON.stringify(order));
    });
  });

  // Изменение цвета mug_option и cup_volume в зависимости от выделения
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

      if (category === "where") {
        delete order[lastKey].mug_option;
        localStorage.setItem("order", JSON.stringify(order));
      } else if (category === "cup") {
        delete order[lastKey].cup_volume;
        localStorage.setItem("order", JSON.stringify(order));
      }
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
      const elements = document.querySelectorAll(`.order-option__svg-${category}_${option}`);

      elements.forEach((element) => {
        const isSelected = element.classList.contains('selected');

        if (option === type) {
          if (isSelected) {
            setFillColor(element, "#D8D8D8");
            element.classList.remove('selected');
            if (category === "where") {
              delete order[lastKey].mug_option;
            } else if (category === "cup") {
              delete order[lastKey].cup_volume;
            }
          } else {
            setFillColor(element, color);
            if (color === "black") {
              element.classList.add('selected');
              if (category === "where") {
                order[lastKey].mug_option = type;
              } else if (category === "cup") {
                order[lastKey].cup_volume = type;
              }
            }
          }
        } else {
          setFillColor(element, "#D8D8D8");
          element.classList.remove('selected');
        }
      });
    });

    localStorage.setItem("order", JSON.stringify(order));
  }

  if (onsite) {
    onsite.addEventListener("click", () =>
      checkBlack(onsite, "onsite", "where")
    );
  }
  if (takeaway) {
    takeaway.addEventListener("click", () =>
      checkBlack(takeaway, "takeaway", "where")
    );
  }
  if (cupSizeSmall) {
    cupSizeSmall.addEventListener("click", () =>
      checkBlack(cupSizeSmall, "small", "cup")
    );
  }
  if (cupSizeMedium) {
    cupSizeMedium.addEventListener("click", () =>
      checkBlack(cupSizeMedium, "medium", "cup")
    );
  }
  if (cupSizeLarge) {
    cupSizeLarge.addEventListener("click", () =>
      checkBlack(cupSizeLarge, "large", "cup")
    );
  }

  // Сохранение выделения mug_option
  const selectedMugOption = order[lastKey]?.mug_option;
  if (selectedMugOption) {
    selectCategory(selectedMugOption, "where", "black");
  }
  // Сохранение выделения cup_volume
  const selectedCupVolume = order[lastKey]?.cup_volume;
  if (selectedCupVolume) {
    selectCategory(selectedCupVolume, "cup", "black");
  }

  // Изменение цвета объема чашек кофе в зависимости от выделения и сохранение выделения
  const sizeMapping = {
    "250": "small",
    "350": "medium",
    "450": "large"
  };

  const savedVolume = order[lastKey]?.cup_volume;

  document.querySelectorAll(".order-option__text-size").forEach((textSize) => {
    if (sizeMapping[textSize.textContent] === savedVolume) {
      textSize.classList.add("selected");
    }
  });

  document.querySelectorAll(".order-option__cup").forEach((cup) => {
    cup.addEventListener("click", function () {
      const currentText = this.querySelector(".order-option__text-size");

      if (currentText.classList.contains("selected")) {
        currentText.classList.remove("selected");
        delete order[lastKey].cup_volume; // Удаление ключа из localStorage при снятии выделения
        localStorage.setItem("order", JSON.stringify(order));
      } else {
        document.querySelectorAll(".order-option__text-size").forEach((text) => {
          text.classList.remove("selected");
        });
        currentText.classList.add("selected");
        order[lastKey].cup_volume = sizeMapping[currentText.textContent]; // Сохранение выделенного текста в localStorage
        localStorage.setItem("order", JSON.stringify(order));
      }
    });
  });

  ///Закидываем вермя заказа в ЛС и забираем оттуда данные
  const timeInput = document.getElementById("time");
  timeInput.addEventListener("change", function () {
    if (lastKey) {
      order[lastKey].order_time = this.value;
    }
    localStorage.setItem("order", JSON.stringify(order));
  });

  if (order[lastKey].order_time) {
    timeInput.value = order[lastKey].order_time;
  }

  /// Появление часов для выбора времени заказа после нажания тоглера
  const toggle = document.getElementById("togBtn");
  const watch = document.querySelector(".order-option__item-watch");

  if (order[lastKey].order_time) {
    timeInput.value = order[lastKey].order_time;
  }

  const getWatchData = order[lastKey]?.order_time;

  // Сохранение тоглера нажатым и показывается элемент выбора времени
  if (getWatchData) {
    toggle.checked = true;
    watch.style.display = "flex";
    watch.style.alignItems = "center";
  } else {
    watch.style.display = "none";
  }

  // Обработчик изменения состояния тоглера
  toggle.addEventListener("change", function () {
    if (this.checked) {
      watch.style.display = "flex";
      watch.style.alignItems = "center";
    } else {
      watch.style.display = "none";
    }
  });

  const next = document.querySelector(".order-option-footer__button");

  next.addEventListener("click", () => {
    window.location.href = "/designer";
  });

  //Настройка футера 
  const orderOptionsFooter = document.querySelector('main');
  orderOptionsFooter.style.justifyContent = "space-between";
}