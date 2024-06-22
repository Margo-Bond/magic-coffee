import Time from "@/assets/images/header/header-time.svg";
import Connection from "@/assets/images/header/header-connection.svg";
import Wifi from "@/assets/images/header/header-wifi.svg";
import Battery from "@/assets/images/header/header-battery.svg";

export function createHeaderBlack(header) {
  header.innerHTML = `
      <div>
        <img src='${Time}' alt='Current time' />
      </div>
      <div>
        <img src='${Connection}' alt='Current connection' />
        <img src='${Wifi}' alt='Wifi statment' />
        <img src='${Battery}' alt='Battery statment' />
      </div>
    `;
}

export function createHeaderWhite(header) {
  header.innerHTML = `
    <div>
        <img src='${Time}' alt='Current time' />
      </div>
      <div>
        <img src='${Connection}' alt='Current connection' />
        <img src='${Wifi}' alt='Wifi statment' />
        <img src='${Battery}' alt='Battery statment' />
      </div>
    `;
}
