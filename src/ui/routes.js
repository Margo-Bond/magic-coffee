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
    renderAuthorizationPage(mainContainer);
  });
  page("/registration", () => {
    renderRegistrationPage(mainContainer);
  });
  page("/password-remind", () => {
    renderPasswordRemindPage(mainContainer);
  });
  page("/startup-screen", () => {
    createHeaderWhite(headerContainer);
    renderStartupScreenPage(mainContainer);
  });
  page("/cafe", () => {
    renderCafePage(mainContainer);
  });
  page("/menu", () => {
    renderMenuPage(mainContainer);
  });
  page("/order-options", () => {
    renderOrderOptionsPage(mainContainer);
  });
  page("/designer", () => {
    renderDesignerPage(mainContainer);
  });
  page("/coffee-country", () => {
    renderCoffeeCountryPage(mainContainer);
  });
  page("/coffee-type", () => {
    renderCoffeeTypePage(mainContainer);
  });
  page("/additives", () => {
    renderAdditivesPage(mainContainer);
  });
  page("/current-order", () => {
    renderCurrentOrderPage(mainContainer);
  });
  page("/order-confirmed", () => {
    renderOrderConfirmedPage(mainContainer);
  });
  page("/profile", () => {
    renderProfilePage(mainContainer);
  });
  page("/my-orders", () => {
    renderMyOrdersPage(mainContainer);
  });

  page();
});
