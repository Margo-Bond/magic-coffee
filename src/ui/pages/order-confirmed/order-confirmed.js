import OrderedSvg from "@/assets/images/ordered.svg";
import timerManager from "../../../../Services/timerManager.js";

export default async function renderOrderConfirmedPage(main) {
  let order = JSON.parse(localStorage.getItem("order")) || {};
  let user = JSON.parse(localStorage.getItem("user")) || {};
  let keys = Object.keys(order);
  let lastKey = keys[keys.length - 1];
  const lastOrder = order[lastKey];
  const now = Date.now();
  const userUid = user ? user.uid : null;

  const nameUser = user.name || "Customer";
  const timeOrder = order[lastKey].order_time;
  const pickupTime = order[lastKey].pickup_time;
  const adressUser = order[lastKey].cafe_address || "specified";
  const qr = "/profile";

  const greetingElement = document.querySelector(".order-confirmed__greeting");
  const resultElement = document.querySelector(".order-confirmed__result");
  const qrLinkElement = document.querySelector(".order-confirmed__submit a");

  main.innerHTML = `
    <div class="order-confirmed">
      <div class="order-confirmed__image"></div>
      <div class="order-confirmed__title">
        <h2 class="order-confirmed__title-text">Ordered</h2>
      </div>
      <div class="order-confirmed__item">
        <div class="order-confirmed__greeting">${nameUser}, your order has been successfully placed.</div>
        <div class="order-confirmed__result">
          The order will be ready today at ${pickupTime} at the address ${adressUser}
        </div>
        <div class="order-confirmed__submit">
          Submit your personal <a href="${qr}">QR</a> code at a coffee shop to receive an order.
        </div>
      </div>
    </div>
  `;

  const imageContainer = main.querySelector(".order-confirmed__image");
  imageContainer.insertAdjacentHTML("afterbegin", OrderedSvg);

  if (!timeOrder) {
    const resultDiv = document.querySelector(".order-confirmed__result");
    if (timeOrder === "00:00") {
      resultDiv.innerHTML = `The order will be ready today in 30 minutes at the ${adressUser} address.`;
    }
  }

  if (userUid && lastOrder.delete_at) {
    timerManager.setDeletionTimer(
      lastOrder.delete_at - now,
      lastOrder,
      lastKey,
      userUid
    );
  }
}
