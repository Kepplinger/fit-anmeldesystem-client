import { FitAnmeldesystemPage } from './app.po';

describe('log-file-explorer-client App', function() {
  let page: FitAnmeldesystemPage;

  beforeEach(() => {
    page = new FitAnmeldesystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    // expect(page.getParagraphText()).toEqual('app works!');
  });
});
