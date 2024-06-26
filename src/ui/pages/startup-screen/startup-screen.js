import Logo from "@/assets/images/logo.svg";

export default function renderStartupScreenPage(body) {
  body.innerHTML = `    
    <div class="startup__logo">
      <img src='${Logo}' alt='Logo' />
      <h1 class="startup__title">Magic coffee</h1>`;
  setTimeout(function () {
    window.location.href = '/menu';
  }, 1 * 1000);
}