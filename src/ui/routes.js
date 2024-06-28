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
import createFooter from "./components/footer/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.getElementById("main");
  const headerContainer = document.getElementById("header");
  const footerContainer = document.getElementById("footer");

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
  page("/menu", async () => {
    createHeaderBlack(headerContainer);
    renderMenuPage(mainContainer);
    await createFooter(footerContainer);
  });
  page("/order-options", () => {
    createHeaderBlack(headerContainer);
    renderOrderOptionsPage(mainContainer);
  });
  page("/designer", () => {
    createHeaderBlack(headerContainer);
    renderDesignerPage(mainContainer);
  });
  page("/coffee-country", async () => {
    createHeaderBlack(headerContainer);
    renderCoffeeCountryPage(mainContainer);
    await createFooter(footerContainer);
  });
  page("/coffee-type", async () => {
    createHeaderBlack(headerContainer);
    renderCoffeeTypePage(mainContainer);
    await createFooter(footerContainer);
  });
  page("/additives", async () => {
    createHeaderBlack(headerContainer);
    renderAdditivesPage(mainContainer);
    await createFooter(footerContainer);
  });
  page("/current-order", async () => {
    createHeaderBlack(headerContainer);
    renderCurrentOrderPage(mainContainer);
    await createFooter(footerContainer);
  });
  page("/order-confirmed", async () => {
    createHeaderBlack(headerContainer);
    renderOrderConfirmedPage(mainContainer);
    await createFooter(footerContainer);
  });
  page("/profile", async () => {
    createHeaderBlack(headerContainer);
    renderProfilePage(mainContainer);
    await createFooter(footerContainer);
  });
  page("/my-orders", async () => {
    createHeaderBlack(headerContainer);
    renderMyOrdersPage(mainContainer);
    await createFooter(footerContainer);
  });

  page();
});
