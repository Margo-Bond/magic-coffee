import { arrowIcon } from "@/assets/images/geometric-icons/forward.svg";

export default function createForwardButton(link) {
  const button = document.createElement("button");
  button.classList.add("forwardButton");

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.innerHTML = arrowIcon;

  button.appendChild(icon);

  button.addEventListener("click", () => {
    window.location.href = link;
  });

  return button;
}
