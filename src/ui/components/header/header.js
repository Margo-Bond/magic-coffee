import TimeSvg from "@/assets/images/header/header-time.svg";
import ConnectionSvg from "@/assets/images/header/header-connection.svg";
import WifiSvg from "@/assets/images/header/header-wifi.svg";
import BatterySvg from "@/assets/images/header/header-battery.svg";

export function createHeaderBlack(header) {
  header.innerHTML = `
    <div class="header__wrapper">
      <div class="header-icon">${TimeSvg}</div>
    </div>
    <div class="header__wrapper">
      <div class="header-icon">${ConnectionSvg}</div>
      <div class="header-icon">${WifiSvg}</div>
      <div class="header-icon">${BatterySvg}</div>
    </div>
  `;
}

export function createHeaderWhite(header) {
  header.innerHTML = `
    <div class="header__wrapper">
      <div class="header-icon header-white__icon">${TimeSvg}</div>
    </div>
    <div class="header__wrapper">
      <div class="header-icon header-white__icon">${ConnectionSvg}</div>
      <div class="header-icon header-white__icon">${WifiSvg}</div>
      <div class="header-icon header-white__icon">${BatterySvg}</div>
    </div>
  `;

  changeSvgFill(header, "white");
}

function changeSvgFill(header, color) {
  const paths = header.querySelectorAll(
    ".header-white__icon svg path, .header-white__icon svg rect"
  );
  paths.forEach((path) => {
    path.setAttribute("fill", color);
    path.setAttribute("stroke", color);
  });
}
