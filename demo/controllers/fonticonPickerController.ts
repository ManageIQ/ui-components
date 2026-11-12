import {ComponentDemo} from '../services/availableComponentBuilder';
@ComponentDemo({
  name: 'basic',
  title: 'Fonticon picker',
  template: require('./../views/fonticon-picker/basic.html'),
  group: 'fonticon-picker',
  controller: 'demoFonticonPicker as vm'
})
export default class FonticonPickerController {
}
