import Cafe from '@/assets/images/cafe.svg';
import Forward from '@/assets/images/geometric-icons/icon-more-white.svg';
import getCafes from '../../../../Services/GetCafes.js';

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



  // ymaps.ready(function () {

  //   let myMap = new ymaps.Map('map', { center: [53.76276163364722, -1.7446288889196655], zoom: 13 });

  //   let createPlacemark = function (markerId, coord1, coord2, markerImage) {
  //     let placemark = new ymaps.GeoObject({ geometry: { type: "Point", coordinates: [+coord1, +coord2] } }, {
  //       iconLayout: 'default#image',
  //       iconImageHref: markerImage,
  //       iconImageSize: [35, 46],
  //       iconImageOffset: [-5, -38]
  //     });

  //     myMap.geoObjects.add(placemark);
  //   }

  //   // Вызов функции для создания метки
  //   createPlacemark('marker1', 53.79418191555254, -1.7527547668503962, './style/Pin_Restaurant.png');
  //   createPlacemark('marker2', 53.77187768361212, -1.7307664992830152, './style/Pin_Restaurant.png');
  //   createPlacemark('marker3', 53.80100601337673, -1.755208439810188, './style/Pin_Restaurant.png');
  // });



  try {
    const data = await getCafes();

    if (data) {
      const cafesData = data;
      const addresses = Object.values(cafesData).map(cafe => cafe.address);

      const addressButtons = document.querySelectorAll('.cafe-box__button__title');

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
  const addressBtns = document.querySelectorAll('.cafe-box__button');

  buttonBack.addEventListener("click", () => {
    window.location.href = "/";
  });

  addressBtns.forEach(button => {
    button.addEventListener("click", () => {
      window.location.href = "/menu";
    });
  });
}

renderCafePage(main);


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