import { test as base } from 'playwright-bdd';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  CatalogPage,
  ProductPage,
  CartPage,
  ContactPage,
} from '../pages/demoshop';

type DemoShopFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  catalogPage: CatalogPage;
  productPage: ProductPage;
  cartPage: CartPage;
  contactPage: ContactPage;
};

export const test = base.extend<DemoShopFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
});

export { expect } from '@playwright/test';
