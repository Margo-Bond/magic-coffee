import Logo from "@/assets/images/logo.svg";

export default function renderStartupScreenPage(main) {
  main.innerHTML = `    
    <div class="startup__logo">
      <img src='${Logo}' alt='Logo' />
      <h1 class="startup__title">Magic coffee</h1>`;

  const div = document.querySelector('.container');
  div.classList.add('startup-background');

  setTimeout(function () {
    window.location.href = '/menu';
  }, 2000);
}
