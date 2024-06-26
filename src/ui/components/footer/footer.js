import Cafe from "@/assets/images/footer/footer-shopping.svg";
import Profile from "@/assets/images/footer/footer-profile.svg";
import Orders from "@/assets/images/footer/footer-orders.svg";

async function loadSvg(url) {
  const response = await fetch(url);
  const svgText = await response.text();
  return svgText;
}

export default async function createFooter() {
  console.log("Creating footer...");
  const footer = document.createElement("footer");
  footer.className = "footer";

  const cafeSvg = await loadSvg(Cafe);
  const profileSvg = await loadSvg(Profile);
  const ordersSvg = await loadSvg(Orders);

  footer.innerHTML = `
    <div class="footer__icon footer__icon_cafe">${cafeSvg}</div>
    <div class="footer__icon footer__icon_profile">${profileSvg}</div>
    <div class="footer__icon footer__icon_orders">${ordersSvg}</div>
  `;

  document.body.appendChild(footer);

  const cafeBtn = footer.querySelector(".footer__icon_cafe");
  const profileBtn = footer.querySelector(".footer__icon_profile");
  const ordersBtn = footer.querySelector(".footer__icon_orders");

  console.log("Buttons found:");
  console.log("Cafe button:", cafeBtn);
  console.log("Profile button:", profileBtn);
  console.log("Orders button:", ordersBtn);

  function setActiveIcon(activeBtn) {
    const allIcons = footer.querySelectorAll(".footer__icon svg path");
    allIcons.forEach((icon) => {
      icon.style.fill = "var(--svg-color-muted)";
      console.log(`Set muted color for icon: ${icon}`);
    });

    const activePaths = activeBtn.querySelectorAll("svg path");
    activePaths.forEach((path) => {
      path.style.fill = "var(--accent-color)";
      console.log(`Set active color for path: ${path}`);
    });
  }

  cafeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Cafe button clicked");
    setActiveIcon(cafeBtn);
  });

  profileBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Profile button clicked");
    setActiveIcon(profileBtn);
  });

  ordersBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Orders button clicked");
    setActiveIcon(ordersBtn);
  });

  return footer;
}
