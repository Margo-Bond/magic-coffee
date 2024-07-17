import Cafe from "@/assets/images/cafe.svg";
import Forward from "@/assets/images/geometric-icons/icon-more-white.svg";
import Pin from "../../../assets/images/cafe-pin.png";
import { getCafes } from "../../../../Services/Get.js";

export default async function renderCafePage(main) {
  main.innerHTML = `
    <div class="cafe">

      <div class="cafe__button">
        <button class="cafe__button-icon"></button>
      </div>

      <div class="cafe__box">
        <div class="cafe__box-element-title">
          <p class="cafe__box-element-text">Select Magic Coffee store</p>
        </div>

        <div class="cafe__box-element-wrap">

          <div class="cafe__box-element">
            ${Array(3)
              .fill(
                `
              <div class="cafe__box-button">
              <div class="cafe__box-button-icon">${Cafe}</div>
    
              <div class="cafe__box-button-title"></div>
    
              <div class="cafe__box-button-arrow">${Forward}</div>
            </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `;

  const containerCafe = document.querySelector(".container");
  containerCafe.setAttribute("id", "map-container");
  const mapContainer = document.getElementById("map-container");

  const headerCafe = document.getElementById("header");
  headerCafe.classList.add("map-header");

  const mainCafe = document.querySelector("main");
  mainCafe.classList.add("map-main");

  const mapElement = document.createElement("div");
  mapElement.setAttribute("id", "map");
  mapContainer.insertBefore(mapElement, mainCafe);

  console.log("Yandex Maps API loading...");
  ymaps.ready(() => {
    try {
      console.log("Yandex Maps API loaded successfully.");

      const initialState = {
        center: [53.77603985993486, -1.751070041045801],
        zoom: 13,
      };

      const map = new ymaps.Map(document.getElementById("map"), initialState);
      console.log("Map initialized:", map);

      let createPlacemark = function (markerId, coord1, coord2, markerImage) {
        let placemark = new ymaps.Placemark(
          [+coord1, +coord2],
          {},
          {
            iconLayout: "default#image",
            iconImageHref: markerImage,
            iconImageSize: [35, 46],
            iconImageOffset: [-5, -38],
          }
        );

        map.geoObjects.add(placemark);

        placemark.events.add("click", () => {
          const currentCenter = map.getCenter();
          const currentZoom = map.getZoom();
          const isCloseEnough = (coord1, coord2, currentCenter) => {
            const tolerance = 0.0001;
            return (
              Math.abs(coord1 - currentCenter[0]) < tolerance &&
              Math.abs(coord2 - currentCenter[1]) < tolerance
            );
          };

          if (
            isCloseEnough(+coord1, +coord2, currentCenter) &&
            currentZoom === 15
          ) {
            map.setCenter(initialState.center, initialState.zoom, {
              checkZoomRange: true,
            });
            console.log("Map reset to initial state");
          } else {
            map.setCenter([+coord1, +coord2], 15, { checkZoomRange: true });
            console.log("Map zoomed to placemark");
          }
        });
      };

      createPlacemark(
        "marker1",
        53.79418191555254,
        -1.7527547668503962,
        `${Pin}`
      );
      createPlacemark(
        "marker2",
        53.77187768361212,
        -1.7307664992830152,
        `${Pin}`
      );
      createPlacemark(
        "marker3",
        53.80100601337673,
        -1.755208439810188,
        `${Pin}`
      );
    } catch (error) {
      console.error("Error initializing the map:", error);
    }
  });

  const cafeAddressButtons = document.querySelectorAll(".cafe__box-button");

  try {
    const data = await getCafes();
    const cafeAddresses = Object.keys(data);

    cafeAddressButtons.forEach((btn, index) => {
      const cafeAddressTitle = btn.querySelector(".cafe__box-button-title");
      const cafeAddress = cafeAddresses[index];
      const cafeAddressItem = data[cafeAddress];

      if (cafeAddressItem) {
        cafeAddressTitle.textContent = cafeAddressItem.address;
      }
    });
  } catch (error) {
    console.error("Error fetching cafes data:", error);
  }

  const buttonBack = document.querySelector(".cafe__button");

  buttonBack.addEventListener("click", () => {
    window.location.href = "/";
  });

  cafeAddressButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cafeAddressTitle = btn.querySelector(".cafe__box-button-title");
      const btnTitleValue = cafeAddressTitle.textContent;

      let order = JSON.parse(localStorage.getItem("order")) || {};
      const orderKey = `order${Object.keys(order).length + 1}`;
      const orderItem = { cafe_address: btnTitleValue };
      order[orderKey] = orderItem;
      localStorage.setItem("order", JSON.stringify(order));
      localStorage.setItem("cafe_address", btnTitleValue);

      window.location.href = "/menu";
    });
  });
}
