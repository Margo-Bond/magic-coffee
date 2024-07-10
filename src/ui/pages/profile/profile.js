import signOut from "../../../../Services/signOut.js";
import Back from "@/assets/images/geometric-icons/back.svg";
import LogOut from "@/assets/images/geometric-icons/logout.svg";
import ProfileName from "@/assets/images/user-icons/profile-name.svg";
import ProfilePhone from "@/assets/images/user-icons/profile-phone.svg";
import ProfileEmail from "@/assets/images/user-icons/profile-email.svg";
import ProfileStore from "@/assets/images/user-icons/profile-store.svg";
import QrCode from "@/assets/images/qr-code.svg";

export default function renderProfilePage(main) {
  main.innerHTML = `
    <div class="profile">
      <div class="profile__main">
        <div class="profile__arrowBack">${Back}</div>
        <p class="profile__title">Profile</p>
        <div class="profile__logOut">${LogOut}</div>
      </div>
      <div class="profile__table">
        <div class="profile-table__item">
        <div class="profile-table__item-image">${ProfileName}</div>
          <div class="profile-table__item-block">
            <p class="item-block__text">Name</p>
            <h2 class="item-block__variable text">Alex</h2>
          </div>
          <button class="profile-table__item-button edit" id="text"></button>
        </div>
        <div class="profile-table__item">
          <div class="profile-table__item-image">${ProfilePhone}</div>
          <div class="profile-table__item-block">
            <p class="item-block__text">Phone</p>
            <h2 class="item-block__variable number">+375 33 664-57-36</h2>
          </div>
          <button class="profile-table__item-button edit" id="number"></button>
        </div>

        <div class="profile-table__item">
          <div class="profile-table__item-image">${ProfileEmail}</div>
          <div class="profile-table__item-block">
            <p class="item-block__text">Email</p>
            <h2 class="item-block__variable email">adosmenesk@pm.me</h2>
          </div>
          <button class="profile-table__item-button edit" id="email"></button>
        </div>

        <div class="profile-table__item">
          <div class="profile-table__item-image">${ProfileStore}</div>      
          <div class="profile-table__item-block">
            <p class="item-block__text">Magic Coffee store address</p>
            <h2 class="item-block__variable location">Bradford BD1 1PR</h2>
          </div>
          <button class="profile-table__item-button edit" id="location"></button>
        </div>

        <div class="profile-table__qr-code">
          <div class="profile__qr-code">${QrCode}</div>
        </div>
      </div>
    </div>`;

  const back = document.querySelector(".profile__arrowBack");
  back.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/order-confirmed";
  });

  const logOut = document.querySelector(".profile__logOut");
  logOut.addEventListener("click", (e) => {
    e.preventDefault();
    signOut();
  });
}
