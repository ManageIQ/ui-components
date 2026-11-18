import {AvailableComponent, default as AvailableComponentsService} from './availableComponentsService';

function checkProperties(settings: any, fields: string[], target?: any) {
  for (const field of fields) {
    if (!Object.prototype.hasOwnProperty.call(settings, field)) {
      const suffix = target ? `Called on class ${target['name']}.` : '';
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

  return function(target: new (...args: any[]) => any) {
    checkProperties(settings, ['controller', 'name', 'template', 'group'], target);
    const availCmps = new AvailableComponentsService();
    const currentGroup = availCmps.availableComponents.filter(group => group.name === settings.group);
    if (!currentGroup) {
      throw new Error(`Selected group '${settings.group}' does not exists!`);
    }
    currentGroup.forEach(oneGroup => oneGroup.components.push(componentFactory()));
  };
}
