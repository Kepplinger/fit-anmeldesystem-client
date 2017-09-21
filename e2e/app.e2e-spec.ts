import { FitAnmeldesystemClientPage } from './app.po';

describe('fit-anmeldesystem-client App', () => {
  let page: FitAnmeldesystemClientPage;

  beforeEach(() => {
    page = new FitAnmeldesystemClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
