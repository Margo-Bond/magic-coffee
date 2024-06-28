import Back from "@/assets/images/geometric-icons/back.svg";
import Cart from "@/assets/images/cart.svg";
import Line from "@/assets/images/geometric-icons/line-long.svg";

export default function renderDesignerPage(main) {
  main.innerHTML = `
  <div class="designer__header">
    <div>${Back}</div>
    <p class="designer__title">Coffee lover assemblage</p>
    <div class="designer__cart-svg">${Cart}</div>
  </div>
  <div class="designer__content">
    <div>${Line}</div>

  </div>
  `;
}
