import arrowIcon from "@/assets/images/geometric-icons/forward.svg";

export default function createForwardButton(link) {
  const button = document.createElement("button");
  button.classList.add("forwardButton");

  const icon = document.createElement("div");
  icon.innerHTML = `
  ${arrowIcon}
  `;

  button.append(icon);

  button.addEventListener("click", () => {
    window.location.href = link;
  });

  return button;
}
