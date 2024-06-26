import Logo from "@/assets/images/logo.svg";

export default function renderStartupScreenPage(main) {
  main.innerHTML = `    
    <div class="startup__logo">
      <div class="startup__svg">${Logo}</div>
      <h1 class="startup__title">Magic coffee</h1>`;

  const div = document.querySelector(".container");
  div.classList.add("startup-background");

  setTimeout(function () {
    window.location.href = "/cafe";
  }, 10000);
}
