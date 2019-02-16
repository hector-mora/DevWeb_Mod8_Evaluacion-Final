import { EvaluacionFinalPage } from './app.po';

describe('evaluacion-final App', function() {
  let page: EvaluacionFinalPage;

  beforeEach(() => {
    page = new EvaluacionFinalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
