import { Segmentation3DPage } from './app.po';

describe('segmentation3-d App', () => {
  let page: Segmentation3DPage;

  beforeEach(() => {
    page = new Segmentation3DPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
