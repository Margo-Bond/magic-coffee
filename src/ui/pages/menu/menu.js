import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../../firebase.js";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

import {
  getDatabase,
  get,
  child,
  update,
  ref,
  runTransaction,
  set,
} from "firebase/database";

const app = firebase.initializeApp(firebaseConfig);
const database = app.database();

export default function renderMenuPage(main) {
  main.innerHTML = `
    <div class="menu__welcome-wrap">
      <div class="menu__welcome-container">
        <div class="menu__welcome-title">Welcome!</div>

        <div class="menu__welcome-username"></div>
      </div>

      <div class="menu__welcome-carticon_container">
        <div class="menu__welcome-carticon_btn"></div>
      </div>
    </div>

    <div class="menu__options-container">
      <span class="menu__options-title">Select your coffee</span>

      <div class="menu__options-selection">
        <div class="menu__options-elem elem1">
          <div class="menu__options-img img-wrap1">
            <img class="img1" src="./src/assets/images/foto/americano_img.png" alt="Americano">
          </div>
          <p class="menu__options-type cafetype1">Americano</p>
        </div>

        <div class="menu__options-elem elem2">
          <div class="menu__options-img img-wrap2">
            <img class="menu__options-img img2" src="./src/assets/images/foto/cappuccino_img.png" alt="Cappuccino" >
          </div>
          <p class="menu__options-type cafetype2">Cappuccino</p>
        </div>

        <div class="menu__options-elem elem3">
          <div class="menu__options-img img-wrap3">
            <img class="menu__options-img img3" src="./src/assets/images/foto/latte_img.png" alt="Latte">
          </div>
          
          <p class="menu__options-type cafetype3">Latte</p>
        </div>
        
        <div class="menu__options-elem elem4">
          <div class="menu__options-img img-wrap4">
            <img class="menu__options-img img4" src="./src/assets/images/foto/flat_white_img.png" alt="Flat White">
          </div>
          
          <p class="menu__options-type cafetype4">Flat White</p>
        </div>
        
        <div class="menu__options-elem elem5">
          <div class="menu__options-img img-wrap5">
            <img class="menu__options-img img5" src="./src/assets/images/foto/raf_img.png" alt="Raf">
          </div>
          
          <p class="menu__options-type cafetype5">Raf</p>
        </div>

        <div class="menu__options-elem elem6">
          <div class="menu__options-img img-wrap6">
            <img class="menu__options-img img6" src="./src/assets/images/foto/espresso_img.png" alt="Espresso">
          </div>
          
          <p class="menu__options-type cafetype6">Espresso</p>
        </div>
      </div>
    </div>
  `;

  async function getcafe(path) {
    const dbRef = ref(database, path);
    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }

  getcafe("cafes/cafe_one/coffees"); //Only error from catch returns!

  const username = document.querySelector(".menu__welcome-username");
  const getUserName = localStorage.getItem("username");
  if (getUserName) {
    username.textContent = getUserName;
  } else {
    console.log("No username is available");
  }

  const coffeeBtns = document.querySelectorAll(".menu__options-elem");

  coffeeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      resetButtons();
      btn.classList.add("selected");
      const coffeeBtnText = btn.querySelector(".menu__options-type");
      const btnTextValue = coffeeBtnText.textContent;
      const storedCoffee = localStorage.getItem("coffee");
      if (storedCoffee === btnTextValue) {
        localStorage.removeItem("coffee");
        btn.classList.remove("selected"); // Удаление класса при повторном нажатии
      } else {
        localStorage.setItem("coffee", btnTextValue);
      }
    });
  });

  function resetButtons() {
    coffeeBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
  }

  const americano = document.querySelector(".elem1");
  const cappuccino = document.querySelector(".elem2");
  const latte = document.querySelector(".elem3");
  const flatWhite = document.querySelector(".elem4");
  const raf = document.querySelector(".elem5");
  const espresso = document.querySelector(".elem6");

  americano.addEventListener("click", () => {
    window.location.href = "/order-options";
  });

  cappuccino.addEventListener("click", () => {
    window.location.href = "/order-options";
  });

  latte.addEventListener("click", () => {
    window.location.href = "/order-options";
  });
}
