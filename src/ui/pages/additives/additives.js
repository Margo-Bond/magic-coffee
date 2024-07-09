import CartSvg from "@/assets/images/cart.svg";
import BackSvg from "@/assets/images/geometric-icons/back.svg";
import Chosen from "@/assets/images/geometric-icons/chosen.svg";
import { getCafes } from "../../../../Services/GetCafes";

export default function renderAdditivesPage(main) {
  main.innerHTML = `
  <div class="additives-header">
    <div class="additives-header__header">
      <div class="additives-header__svg additives-header__svg-back">${BackSvg}</div>
      <p class="additives-header__title">Coffee lover assemblage</p>
      <div class="additives-header__svg additives-header__svg-cart">${CartSvg}</div>
    </div>
    <p class="additives-header__subtitle">Select additives</p>
  </div>
  <div class="additives__country-list"></div>
  `;

  getCafes()
    .then((cafes) => {
      if (cafes) {
        const countrySet = new Set();
        for (const cafeKey in cafes) {
          const cafe = cafes[cafeKey];
          if (cafe.coffee_selection) {
            for (const selectionKey in cafe.coffee_selection) {
              const selection = cafe.coffee_selection[selectionKey];
              countrySet.add(selection.country);
            }
          }
        }

        const countries = Array.from(countrySet);
        const countryList = document.querySelector(".additives__country-list");

        for (let country in countries) {
          const divElem = document.createElement("div");
        }

        console.log("Countries:", countries);
      } else {
        console.log("No cafes data available");
      }
    })
    .catch((error) => {
      console.error("Error getting cafes data:", error);
    });
}
