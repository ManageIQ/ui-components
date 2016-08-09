
import ToolbarButton from './toolbarButtonDirective';

describe('ToolbarButton test', () =>  {

  it('should instantiate',() => {
    let toolbarButton =  ToolbarButton.Factory();
    expect(toolbarButton).toBeDefined();
  });

});
