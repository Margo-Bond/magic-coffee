
import Logo from "@/assets/images/logo.svg";

export default function renderStartupScreenPage(body) {
  body.innerHTML = `    
    <div class="startup__logo">
      <img src='${Logo}' alt='Logo' />
      <h1 class="startup__title">Magic coffee</h1>`;

  document.getElementById('white').setAttribute('fill', 'white');

  setTimeout(function () {
    window.location.href = '/menu';
  }, 2 * 1000);
}