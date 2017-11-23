import {AvailableComponent, default as AvailableComponentsService} from './availableComponentsService';

function checkProperties(settings, fields, target?) {
  for (let field of fields) {
    if (!settings.hasOwnProperty(field)) {
      let suffix = target ? `Called on class ${target['name']}.` : '';
      throw new Error(`Available component has to have ${field} set up! ${suffix}`);
    }
  }
}

export function ComponentDemo(settings: any) {
  function componentFactory() {
    return new AvailableComponent(
      settings.name,
      settings.title || settings.name,
      settings.location || `/${settings.name}`,
      settings.template,
      settings.controller
    );
  }

  return function(target: Function) {
    checkProperties(settings, ['controller', 'name', 'template', 'group'], target);
    let availCmps = new AvailableComponentsService();
    const currentGroup = availCmps.availableComponents.filter(group => group.name === settings.group);
    if (!currentGroup) {
      throw new Error(`Selected group '${settings.group}' does not exists!`);
    }
    currentGroup.forEach(oneGroup => oneGroup.components.push(componentFactory()));
  };
}
