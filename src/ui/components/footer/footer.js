import Cafe from "@/assets/images/footer/footer-shopping.svg";
import Profile from "@/assets/images/footer/footer-profile.svg";
import Orders from "@/assets/images/footer/footer-orders.svg";

export default async function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";

  footer.innerHTML = `
    <div class="footer__icon footer__icon_cafe">${Cafe}</div>
    <div class="footer__icon footer__icon_profile">${Profile}</div>
    <div class="footer__icon footer__icon_orders">${Orders}</div>
  `;

  document.body.appendChild(footer);

  const cafeBtn = footer.querySelector(".footer__icon_cafe");
  const profileBtn = footer.querySelector(".footer__icon_profile");
  const ordersBtn = footer.querySelector(".footer__icon_orders");

  function setActiveIcon(activeBtn) {
    const allIcons = footer.querySelectorAll(".footer__icon svg path");
    allIcons.forEach((icon) => {
      icon.style.fill = "var(--svg-color-muted)";
    });

    const activePaths = activeBtn.querySelectorAll("svg path");
    activePaths.forEach((path) => {
      path.style.fill = "var(--accent-color)";
    });
  }

  function setInitialActiveIcon() {
    const currentPath = window.location.pathname;
    if (currentPath.includes("/menu")) {
      setActiveIcon(cafeBtn);
    } else if (currentPath.includes("/profile")) {
      setActiveIcon(profileBtn);
    } else if (currentPath.includes("/my-orders")) {
      setActiveIcon(ordersBtn);
    }
  }

  cafeBtn.addEventListener("click", () => {
    window.location.href = "/cafe";
  });

  profileBtn.addEventListener("click", () => {
    window.location.href = "/profile";
  });

  ordersBtn.addEventListener("click", () => {
    window.location.href = "/my-orders";
  });

  setInitialActiveIcon();

  return footer;
}
