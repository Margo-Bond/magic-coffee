import { createHeaderBlack } from "@/ui/components/header/header.js";
//import { createFooter } from "@/ui/components/footer/footer.js";
import Ordered from "@/assets/images/ordered.svg";
//import nameUser from "";
//import timeOrder from "";
//import adressUser from "";
//import qr from "";

const nameUser = "Dasha";
const timeOrder = "18:10";
const adressUser = "Krasnodar, 5 Krasnaya st.";
const qr = "/profile";

export default function renderOrderConfirmedPage(main) {
  main.innerHTML = `
  <div class="order-confirmed">
    <div class="order-confirmed__image">
      <img src='${Ordered}' alt='Logo'/>
    </div>    
    <div class="order-confirmed__title">
      <h2 class="order-confirmed__title-text">Ordered</h2>
    </div>
    <div class="order-confirmed__item">
      <div class="order-confirmed__greeting"> ${nameUser}, your order has been successfully placed. </div>
      <div class="order-confirmed__result">  The order will be ready today
  to ${timeOrder} at the address ${adressUser}</div>
      <div class="order-confirmed__submit">Submit your personal <a href='${qr}'>QR</a> code
  at a coffee shop to receive an order.</div>
    </div>
  </div>`;

  //Если пользователь не указывает время, то меняем текст на
  //The order will be ready today in 30 minutes at the address ${adressUser}

  //const div = document.querySelector('.order-confirmed__result');
}
