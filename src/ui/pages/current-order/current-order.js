import BackSvg from "@/assets/images/geometric-icons/back.svg";

export default function renderCurrentOrderPage(main) {
  main.innerHTML = `
  <div class="current-header">
    <button class="current-header__back-btn">${BackSvg}</button>
    <p class="current-header__title">My order</p>
  </div>
  <div class="current-order">
    <div class="current-order__item current-order__one">
      <img src={link_img} alt={name_coffee}" class="current-order__item-img"/>
      <div class="current-order__item-description">
        <p class="current-order__item-title">{name_coffee}</p>
        <p class="current-order__item-details">{details}</p>
        <p class="current-order__item-quantity">{quantity}</p>
      </div>
      <div class="current-order__item-sum">
        <p class="current-order__item-currency">BYN</p>
        <p class="current-order__item-count">{count}</p>
      </div>
    </div>
    <div class="current-order__item current-order__two"></div>
    <div class="current-order__item current-order__three"></div>
  </div>
  <button class="current__button-next">Next</button>
  `;

  const backSvg = document.querySelector(".current-header__back-btn");
  backSvg.addEventListener("click", () => (window.location.href = "/designer"));

  const nameCofee = document.querySelector(".current-order__item-img");
  nameCofee.computedStyleMap.alt = localStorage.getItem("name_cofee");
}
