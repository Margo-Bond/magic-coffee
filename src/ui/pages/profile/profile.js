import handleSignOut from "../../../../Services/signOut.js";
import updateUserData from "../../../../Services/updateUserData.js";
import getUserInfo from "../../../../Services/Get.js";
import Back from "@/assets/images/geometric-icons/back.svg";
import LogOut from "@/assets/images/geometric-icons/logout.svg";
import ProfileName from "@/assets/images/user-icons/profile-name.svg";
import ProfilePhone from "@/assets/images/user-icons/profile-phone.svg";
import ProfileEmail from "@/assets/images/user-icons/profile-email.svg";
import ProfileStore from "@/assets/images/user-icons/profile-store.svg";
import QrCode from "@/assets/images/qr-code.svg";

export default function renderProfilePage(main) {
  // LOCAL STORAGE
  const localData = JSON.parse(localStorage.getItem("user"));

  getUserInfo(localData.uid).then((userData) => {
    let address = userData.location;
    let userName = userData.name;
    let userPhone = userData.phone;
    let userEmail = userData.email;

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
            <h2 class="item-block__variable text">${userName}</h2>
            <input type="text" class="item-block__input invisible" />
          </div>
          <button class="profile-table__item-button edit" id="text"></button>
        </div>
        <div class="profile-table__item">
          <div class="profile-table__item-image">${ProfilePhone}</div>
          <div class="profile-table__item-block">
            <p class="item-block__text">Phone</p>
            <h2 class="item-block__variable number">${userPhone}</h2>
            <input type="number" class="item-block__input invisible" />
          </div>
          <button class="profile-table__item-button edit" id="number"></button>
        </div>

        <div class="profile-table__item">
          <div class="profile-table__item-image">${ProfileEmail}</div>
          <div class="profile-table__item-block">
            <p class="item-block__text">Email</p>
            <h2 class="item-block__variable email">${userEmail}</h2>
            <input type="email" class="item-block__input invisible" />
          </div>
          <button class="profile-table__item-button edit" id="email"></button>
        </div>

        <div class="profile-table__item">
          <div class="profile-table__item-image">${ProfileStore}</div>      
          <div class="profile-table__item-block">
            <p class="item-block__text">Magic Coffee store address</p>
            <h2 class="item-block__variable location">${address}</h2>
          </div>
          <button class="profile-table__item-button edit" id="location"></button>
        </div>

        <div class="profile-table__qr-code">
          <div class="profile__qr-code">${QrCode}</div>
        </div>
      </div>
    </div>
    
    <div class="profile__container invisible">
          <div class="profile-container__menu">
            <div class="menu__block menu-list">Select your Magic Coffee store
              <ul class="menu__block-list">
                <li class="menu__block-item">
                  <button class="menu__block-button" value="Bradford BD1 1PR">Bradford BD1 1PR</button>
                </li>
                <li class="menu__block-item">
                  <button class="menu__block-button" value="Bradford BD4 7SJ">Bradford BD4 7SJ</button>
                </li>
                <li class="menu__block-item">
                  <button class="menu__block-button last" value="Bradford BD1 4RN">Bradford BD1 4RN</button>
                </li>
              </ul>
            </div>
            <div class="menu__block">
              <button class="menu__block-button menu-button" value="cancel">Cancel</button>
            </div>
          </div>
        </div>`;

    // Back button
    /*
    const back = document.querySelector(".profile__arrowBack");
    back.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/order-confirmed";
    });
    */

    // Log Out button
    const logOut = document.querySelector(".profile__logOut");
    logOut.addEventListener("click", (e) => {
      e.preventDefault();
      handleSignOut();
      localStorage.clear();
      window.location.href = "/authorization";
    });

    // MAIN LOGIC HERE
    const classes = document.querySelectorAll(".item-block__variable");
    const buttons = document.querySelectorAll(".profile-table__item-button");

    function validateName(input) {
      const nameRegex = /^[a-zA-Z]{2,30}(?: [a-zA-Z]{2,30})?$/;
      if (nameRegex.test(input.value)) {
        input.style.border = "none";
        return true;
      } else {
        input.style.border = "1px solid red";
        return false;
      }
    }

    function validateNumber(input) {
      const numberRegex =
        /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/;
      if (numberRegex.test(input.value)) {
        input.style.border = "none";
        return true;
      } else {
        input.style.border = "1px solid red";
        return false;
      }
    }

    function validateEmail(input) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (emailRegex.test(input.value)) {
        input.style.border = "none";
        return true;
      } else {
        input.style.border = "1px solid red";
        return false;
      }
    }

    function selectValidator(input) {
      if (input.getAttribute("type") === "text") {
        return validateName(input);
      } else if (input.getAttribute("type") === "number") {
        return validateNumber(input);
      } else {
        return validateEmail(input);
      }
    }

    function editLocalData(input) {
      if (input.getAttribute("type") === "text") {
        localData.name = input.value;
      } else if (input.getAttribute("type") === "number") {
        localData.phoneNumber = input.value;
      } else {
        localData.email = input.value;
      }
      localStorage.setItem("user", JSON.stringify(localData));
    }

    function setNewData(input) {
      if (input.getAttribute("type") === "text") {
        userName = input.value;
      } else if (input.getAttribute("type") === "number") {
        userPhone = input.value;
      } else {
        userEmail = input.value;
      }
    }

    function updateUserProfile() {
      const newData = JSON.parse(localStorage.getItem("user"));
      updateUserData(newData.uid, userName, userPhone, userEmail, address);
    }

    function handleEditButtonClick(e) {
      const currentBtn = e.target;
      let id = currentBtn.getAttribute("id");
      currentBtn.classList.add("change-icon");

      if (id === "location") {
        const menu = document.querySelector(".profile__container");
        menu.classList.remove("invisible");

        const locationBtns = document.querySelectorAll(".menu__block-button");
        for (let locationBtn of locationBtns) {
          if (locationBtn.value !== "cancel") {
            locationBtn.addEventListener("click", (e) => {
              e.preventDefault();
              currentBtn.classList.remove("change-icon");
              const location = document.querySelector(".location");
              location.textContent = locationBtn.value;
              localStorage.setItem("cafe_address", locationBtn.value);
              address = locationBtn.value;
              menu.classList.add("invisible");
              updateUserProfile();
            });
          } else {
            locationBtn.addEventListener("click", (e) => {
              e.preventDefault();
              menu.classList.add("invisible");
              currentBtn.classList.remove("change-icon");
            });
          }
        }
      } else {
        for (let item of classes) {
          if (item.classList.contains(id)) {
            const parent = item.closest("div");
            const input = parent.querySelector(".item-block__input");

            item.classList.add("invisible");
            input.classList.remove("invisible");

            function handleSave() {
              if (input.value === "") {
                item.classList.remove("invisible");
                input.classList.add("invisible");
              } else {
                if (selectValidator(input)) {
                  item.classList.remove("invisible");
                  item.textContent = input.value;
                  editLocalData(input);
                  setNewData(input);
                  input.classList.add("invisible");
                  updateUserProfile();
                }
              }
            }

            currentBtn.addEventListener("click", (e) => {
              e.preventDefault();
              handleSave();
              currentBtn.classList.remove("change-icon");
            });

            input.addEventListener("blur", (e) => {
              handleSave();
              currentBtn.classList.remove("change-icon");
            });

            input.addEventListener("keypress", (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSave();
                currentBtn.classList.remove("change-icon");
              }
            });
          }
        }
      }
    }

    buttons.forEach((button) => {
      button.addEventListener("click", handleEditButtonClick);
    });
  });
}
