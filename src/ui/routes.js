import page from "page";
import renderWelcomePage from "@/ui/pages/welcome/welcome.js";
import renderAuthorizationPage from "./pages/authorization/authorization.js";
import renderRegistrationPage from "./pages/registration/registration.js";
import renderPasswordRemindPage from "./pages/password-remind/password-remind.js";
import renderStartupScreenPage from "./pages/startup-screen/startup-screen.js";
import renderCafePage from "./pages/cafe/cafe.js";
import renderMenuPage from "./pages/menu/menu.js";
import renderOrderOptionsPage from "./pages/order-options/order-options.js";
import renderDesignerPage from "./pages/designer/designer.js";
import renderCoffeeCountryPage from "./pages/coffee-country/coffee-country.js";
import renderCoffeeTypePage from "./pages/coffee-type/coffee-type.js";
import renderAdditivesPage from "./pages/additives/additives.js";
import renderCurrentOrderPage from "./pages/current-order/current-order.js";
import renderOrderConfirmedPage from "./pages/order-confirmed/order-confirmed.js";
import renderProfilePage from "./pages/profile/profile.js";
import renderMyOrdersPage from "./pages/my-orders/my-orders.js";

import {
  createHeaderBlack,
  createHeaderWhite,
} from "./components/header/header.js";

document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.getElementById("main");
  const headerContainer = document.getElementById("header");

  page("/", () => {
    createHeaderBlack(headerContainer);
    renderWelcomePage(mainContainer);
  });
  page("/authorization", () => {
    createHeaderBlack(headerContainer);
    renderAuthorizationPage(mainContainer);
  });
  page("/registration", () => {
    createHeaderBlack(headerContainer);
    renderRegistrationPage(mainContainer);
  });
  page("/password-remind", () => {
    createHeaderBlack(headerContainer);
    renderPasswordRemindPage(mainContainer);
  });
  page("/startup-screen", () => {
    createHeaderWhite(headerContainer);
    renderStartupScreenPage(mainContainer);
  });
  page("/cafe", () => {
    createHeaderBlack(headerContainer);
    renderCafePage(mainContainer);
  });
  page("/menu", () => {
    createHeaderBlack(headerContainer);
    renderMenuPage(mainContainer);
  });
  page("/order-options", () => {
    createHeaderBlack(headerContainer);
    renderOrderOptionsPage(mainContainer);
  });
  page("/designer", () => {
    createHeaderBlack(headerContainer);
    renderDesignerPage(mainContainer);
  });
  page("/coffee-country", () => {
    createHeaderBlack(headerContainer);
    renderCoffeeCountryPage(mainContainer);
  });
  page("/coffee-type", () => {
    createHeaderBlack(headerContainer);
    renderCoffeeTypePage(mainContainer);
  });
  page("/additives", () => {
    createHeaderBlack(headerContainer);
    renderAdditivesPage(mainContainer);
  });
  page("/current-order", () => {
    createHeaderBlack(headerContainer);
    renderCurrentOrderPage(mainContainer);
  });
  page("/order-confirmed", () => {
    createHeaderBlack(headerContainer);
    renderOrderConfirmedPage(mainContainer);
  });
  page("/profile", () => {
    createHeaderBlack(headerContainer);
    renderProfilePage(mainContainer);
  });
  page("/my-orders", () => {
    createHeaderBlack(headerContainer);
    renderMyOrdersPage(mainContainer);
  });

  page();
});
