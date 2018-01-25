import DialogValidation from './dialogValidationService';
import * as angular from 'angular';

describe('DialogValidation test', () => {
  let dialogValidation;
  let dialogData;

  beforeEach(() => {
    angular.mock.inject(() => {
      dialogValidation = new DialogValidation();
    });

  });

  describe('#dialogIsValid validations for dialog', () => {
    describe('when a dialog has no label', () => {
      it('returns `false` and sets an error message', () => {
        dialogData = [{
          name: 'Larry\'s dialog',
          dialog_tabs: [{
            name: 'tab 1',
            dialog_groups: []
          }]
        }];
        expect(dialogValidation.dialogIsValid(dialogData)).toEqual(false);
        expect(dialogValidation.invalid.message).toEqual('Dialog needs to have a label');
      });
    });
    describe('when a dialog has no tab', () => {
      it('returns `false` and sets an error message', () => {
        dialogData = [{
          label: 'this is a testing dialog and shouldn\'t be taken seriously',
          name: 'Larry\'s dialog',
          dialog_tabs: []
        }];
        expect(dialogValidation.dialogIsValid(dialogData)).toEqual(false);
        expect(dialogValidation.invalid.message).toEqual('Dialog needs to have at least one tab');
      });
    });
  });
  describe('#dialogIsValid validations for tab', () => {
    describe('when a tab has no label', () => {
      it('returns `false` and sets an error message', () => {
        dialogData = [{
          label: 'this is a testing dialog and shouldn\'t be taken seriously',
          name: 'Larry\'s dialog',
          dialog_tabs: [{
            dialog_groups: [{
            }]
          }]
        }];
        expect(dialogValidation.dialogIsValid(dialogData)).toEqual(false);
        expect(dialogValidation.invalid.message).toEqual('Dialog tab needs to have a label');
      });
    });
    describe('when a tab has no box', () => {
      it('returns `false` and sets an error message', () => {
        dialogData = [{
          label: 'this is a testing dialog and shouldn\'t be taken seriously',
          name: 'Larry\'s dialog',
          dialog_tabs: [{
            label: 'New tab',
            dialog_groups: []
          }]
        }];
        expect(dialogValidation.dialogIsValid(dialogData)).toEqual(false);
        expect(dialogValidation.invalid.message).toEqual('Dialog tab needs to have at least one box');
      });
    });
  });
});

