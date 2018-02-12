import { browser, element, by } from 'protractor';

export class Helper {

  static navigateTo(url: string) {
    return browser.get(url);
  }
}
