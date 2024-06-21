import { arrowIcon } from "../../assets/images/forward.svg";

export function createForwardButton(link) {
  const button = document.createElement("button");
  button.className = styles.button;

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.innerHTML = arrowIcon;

  button.appendChild(icon);

  button.addEventListener("click", () => {
    window.location.href = link;
  });

  return button;
}
