import OrderedSvg from "@/assets/images/ordered.svg";

const nameUser = JSON.parse(localStorage.getItem("user"))?.name || 'Customer';
const timeOrder = localStorage.getItem('order_time');
const adressUser = localStorage.getItem('cafe_address') || 'specified';
const qr = "/profile";

const greetingElement = document.querySelector('.order-confirmed__greeting');
const resultElement = document.querySelector('.order-confirmed__result');
const qrLinkElement = document.querySelector('.order-confirmed__submit a');

export default async function renderOrderConfirmedPage(main) {
  main.innerHTML = `
    <div class="order-confirmed">
      <div class="order-confirmed__image"></div>
      <div class="order-confirmed__title">
        <h2 class="order-confirmed__title-text">Ordered</h2>
      </div>
      <div class="order-confirmed__item">
        <div class="order-confirmed__greeting">${nameUser}, your order has been successfully placed.</div>
        <div class="order-confirmed__result">
          The order will be ready today at ${timeOrder} at the address ${adressUser}
        </div>
        <div class="order-confirmed__submit">
          Submit your personal <a href="${qr}">QR</a> code at a coffee shop to receive an order.
        </div>
      </div>
    </div>
  `;

  const imageContainer = main.querySelector(".order-confirmed__image");
  imageContainer.insertAdjacentHTML("afterbegin", OrderedSvg);
  ///

  const resultDiv = document.querySelector(".order-confirmed__result");
  if (!timeOrder, "00:00") {
    resultDiv.innerHTML = `The order will be ready today in 30 minutes at the ${adressUser} address.`;
  }
}
