import arrowIcon from "@/assets/images/geometric-icons/forward.svg";

export default function createForwardButton() {
  const button = document.createElement("button");
  button.classList.add("forwardButton");

  const icon = document.createElement("div");
  icon.innerHTML = arrowIcon;

  button.append(icon);

  return button;
}
