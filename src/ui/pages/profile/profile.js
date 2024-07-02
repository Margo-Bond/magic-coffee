import { createHeaderBlack } from "@/ui/components/header/header.js";
import signOut from "../../../../Services/signOut.js";
import ProfileName from "@/assets/images/user-icons/profile-name.svg";
import ProfilePhone from "@/assets/images/user-icons/profile-phone.svg";
import ProfileEmail from "@/assets/images/user-icons/profile-email.svg";
import ProfileStore from "@/assets/images/user-icons/profile-store.svg";
import QrCode from "@/assets/images/qr-code.svg";

export default function renderProfilePage(main) {
  main.innerHTML = `<main class="profile">

        <div class="profile__nav">
          <button class="profile-nav__button1" id="back"></button>
          <h1 class="profile-nav__header">Profile</h1>
          <button class="profile-nav__button2" id="logOut"></button>
        </div>


        <div class="profile__table">

          <div class="profile-table__item">
            <img
              class="profile-table__item-image"
              src=${ProfileName}
            />
            <div class="profile-table__item-block">
              <p class="item-block__text">Name</p>
              <h2 class="item-block__variable text">Alex</h2>
            </div>
            <button class="profile-table__item-button edit" id="text"></button>
          </div>

          <div class="profile-table__item">
            <img
              class="profile-table__item-image"
              src=${ProfilePhone}
            />
            <div class="profile-table__item-block">
              <p class="item-block__text">Phone</p>
              <h2 class="item-block__variable number">+375 33 664-57-36</h2>
            </div>
            <button class="profile-table__item-button edit" id="number"></button>
          </div>

          <div class="profile-table__item">
            <img
              class="profile-table__item-image"
              src=${ProfileEmail}
            />
            <div class="profile-table__item-block">
              <p class="item-block__text">Email</p>
              <h2 class="item-block__variable email">adosmenesk@pm.me</h2>
            </div>
            <button class="profile-table__item-button edit" id="email"></button>
          </div>

          <div class="profile-table__item">
            <img
              class="profile-table__item-image"
              src=${ProfileStore}
            />
            <div class="profile-table__item-block">
              <p class="item-block__text">Magic Coffee store address</p>
              <h2 class="item-block__variable location">Bradford BD1 1PR</h2>
            </div>
            <button class="profile-table__item-button edit" id="location"></button>
          </div>

          <img class="profile__item" src=${QrCode}>
        </div>
      </main>
      <footer class="profile__footer">
        <div class="profile-footer__nav">
        <button
          class="profile-footer__nav-button1"
          id="button-menu"
        ></button>
        <button
          class="profile-footer__nav-button2"
          id="button-profile"
        ></button>
        <button
          class="profile-footer__nav-button3"
          id="button-order"
        ></button>
      </footer>`;

  const back = document.getElementById("back");
  back.addEventListener("click", () => {
    e.preventDefault();
    window.location.href = "/order-confirmed";
  });

  const logOut = document.getElementById("logOut");
  logOut.addEventListener("click", () => {
    e.preventDefault();
    signOut();
  });

  const menu = document.getElementById("button-menu");
  menu.addEventListener("click", () => {
    e.preventDefault();
    window.location.href = "/menu";
  });

  const profilePage = document.getElementById("button-profile");
  profilePage.addEventListener("click", () => {
    e.preventDefault();
    window.location.href = "/profile";
  });

  const orders = document.getElementById("button-order");
  orders.addEventListener("click", () => {
    e.preventDefault();
    window.location.href = "/my-orders";
  });
}
