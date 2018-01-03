import { Angular5practicePage } from './app.po';

describe('angular5practice App', () => {
  let page: Angular5practicePage;

  beforeEach(() => {
    page = new Angular5practicePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
