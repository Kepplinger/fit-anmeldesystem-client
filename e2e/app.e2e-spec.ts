import { Helper } from './app.po';
import { browser, by, element, protractor } from 'protractor';

describe('log-file-explorer-client App', function () {

  beforeAll(() => {
    browser.manage().window().maximize();
  });

  it('should post booking', async () => {
    Helper.navigateTo('/');

    element(by.id('codeInput')).sendKeys('FirmenToken1');
    element(by.id('btnFitRegister')).click();
    browser.waitForAngular();

    // if (element(by.css('.ajs-button.ajs-cancel')).isPresent()) {
    //   element(by.css('.ajs-button.ajs-cancel')).click();
    // }

    await browser.executeScript('window.scrollTo(0,500);');
    element(by.id('btnNext')).click();
    await browser.executeScript('window.scrollTo(0,0);');

    // step 2
    element(by.id('phoneNumber')).sendKeys('0660 5791261');
    // element(by.id('email')).sendKeys('simon.kepplinger@gmail.com');
    element(by.id('homepage')).sendKeys('webpage.at');
    element(by.id('branch')).sendKeys('Automobil');
    element(by.css('.fr-element.fr-view')).sendKeys('Eine kleine nette Firma :)');
    await browser.executeScript('window.scrollTo(0,700);');

    element(by.id('establishmentsAut')).element(by.css('.ng2-tag-input__text-input')).click();
    element(by.id('establishmentsAut')).element(by.css('.ng2-tag-input__text-input')).sendKeys('Wien');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    element(by.id('establishmentsAut')).element(by.css('.ng2-tag-input__text-input')).sendKeys('Linz');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    element(by.id('establishmentsAut')).element(by.css('.ng2-tag-input__text-input')).sendKeys('Graz');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    element(by.id('establishmentsInt')).element(by.css('.ng2-tag-input__text-input')).click();
    element(by.id('establishmentsInt')).element(by.css('.ng2-tag-input__text-input')).sendKeys('London');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    element(by.id('establishmentsInt')).element(by.css('.ng2-tag-input__text-input')).sendKeys('New York');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    await browser.executeScript('window.scrollTo(0,1000);');

    element(by.id('checkboxBranch0')).element(by.css('.cr')).click();
    element(by.id('checkboxBranch2')).element(by.css('.cr')).click();

    element(by.id('providesSummerJob')).element(by.css('.cr')).click();
    element(by.id('providesThesis')).element(by.css('.cr')).click();

    // step 3
    element(by.id('btnNext')).click();
    await browser.executeScript('window.scrollTo(0,0);');

    element(by.id('representativeName0')).sendKeys('Simon Kepplinger');
    element(by.id('representativeEmail0')).sendKeys('simon.kepplinger@gmail.com');

    element(by.id('btnAddRepresentative')).click();

    element(by.id('representativeName1')).sendKeys('Max Mustermann');
    element(by.id('representativeEmail1')).sendKeys('max.mustermann@gmail.com');

    await browser.executeScript('window.scrollTo(0,500);');
    element.all(by.css('.cr')).first().click();
    element(by.id('otherNotes')).sendKeys('Eigener Stand!');

    // step 4
    element(by.id('btnNext')).click();
    await browser.executeScript('window.scrollTo(0,0);');

    element(by.id('lecturePack')).click();

    element(by.id('btnLocationModal')).click();
    browser.sleep(1000);
    element.all(by.css('.fit-location')).first().click();
    element(by.id('btnSaveLocation')).click();
    browser.sleep(1000);

    await browser.executeScript('window.scrollTo(0,700);');

    element(by.id('title')).sendKeys('Wie funktioniert Angular?');
    element(by.id('otherNotes')).sendKeys('Spoiler: gar nicht');
    element(by.id('checkboxBranch0')).element(by.css('.cr')).click();
    element(by.id('btnNext')).click();

    // step 5
    element(by.id('genderLabelF')).click();
    element(by.id('fitContactFirstName')).sendKeys('Simon');
    element(by.id('fitContactLastName')).sendKeys('Kepplinger');
    element(by.id('fitContactEmail')).sendKeys('simon.kepplinger@gmail.com');
    element(by.id('fitContactPhoneNumber')).sendKeys('0660 5791261');
    element(by.id('remarks')).sendKeys('Erstellt mit Protractor :*');

    await browser.executeScript('window.scrollTo(0,700);');

    element(by.id('acceptTerms')).element(by.css('.cr')).click();
    element(by.id('btnSubmitBooking')).click();

    browser.sleep(1000);
    browser.waitForAngular();

    expect(element(by.id('submissionSuccessContainer')).isPresent);
  });
});
