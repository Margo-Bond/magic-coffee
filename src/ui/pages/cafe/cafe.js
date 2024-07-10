import Cafe from "@/assets/images/cafe.svg";
import Forward from "@/assets/images/geometric-icons/icon-more-white.svg";
import Pin from "../../../assets/images/cafe-pin.png";
import { getCafes } from "../../../../Services/Get.js";

export default async function renderCafePage(main) {
  main.innerHTML = `
    <div class="cafe">

      <div class="cafe__button">
        <button class="cafe__button__icon"></button>
      </div>

      <div class="cafe__box">
        <div class="cafe-box__element-title">
          <p class="cafe-box__element-text">Select Magic Coffee store</p>
        </div>

        <div class="cafe-box__element-wrap">

          <div class="cafe-box__element">

            <div class="cafe-box__button address-btn-one">
              <div class="cafe-box__button__icon">${Cafe}</div>
    
              <div class="cafe-box__button__title"></div>
    
              <div class="cafe-box__button__arrow">${Forward}</div>
            </div>

            <div class="cafe-box__button address-btn-two">
              <div class="cafe-box__button__icon">${Cafe}</div>
    
              <div class="cafe-box__button__title"></div>
    
              <div class="cafe-box__button__arrow">${Forward}</div>
            </div>

            <div class="cafe-box__button address-btn-three">
              <div class="cafe-box__button__icon">${Cafe}</div>
    
              <div class="cafe-box__button__title"></div>
    
              <div class="cafe-box__button__arrow">${Forward}</div>
            </div>
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

      // Create placemarks
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

  try {
    const data = await getCafes();

    if (data) {
      const cafesData = data;
      const addresses = Object.values(cafesData).map((cafe) => cafe.address);

      const addressButtons = document.querySelectorAll(
        ".cafe-box__button__title"
      );

      addressButtons.forEach((addressElement, index) => {
        if (addresses[index]) {
          addressElement.textContent = addresses[index];
        }
      });
    } else {
      console.log("No cafes data is available");
    }
  } catch (error) {
    console.error("Error fetching cafes data:", error);
  }

  const buttonBack = document.querySelector(".cafe__button");
  const addressBtns = document.querySelectorAll(".cafe-box__button");

  buttonBack.addEventListener("click", () => {
    window.location.href = "/";
  });

  addressBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cafeBtnTitle = btn.querySelector(".cafe-box__button__title");
      const btnTitleValue = cafeBtnTitle.textContent;
      localStorage.setItem("address", btnTitleValue);
      window.location.href = "/menu";
    });
  });
}

//Dependencies pt make GetCafes function work

// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "../firebase.js";
// //initializeApp(firebaseConfig);
// import firebase from "firebase/compat/app";
// //import "firebase/compat/database";

// import {
//   getDatabase,
//   get,
//   child,
//   update,
//   ref,
//   runTransaction,
//   set,
// } from "firebase/database";

// const app = firebase.initializeApp(firebaseConfig);
// const database = app.database();
