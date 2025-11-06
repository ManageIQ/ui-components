import { AbstractModal, ModalController } from '../abstractModal';

/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name dialogEditorModalField
 * @description
 *    Component contains templates for the modal for editing dialog editors
 *    field (group) details
 * @example
 * <dialog-editor-modal-field></dialog-editor-modal-field>
 */
export default class ModalField extends AbstractModal {
  public template = require('./field.html');
  public controller = ModalFieldController;
}

class ModalFieldController extends ModalController {
  public treeOptions: any;
  public modalData: any;
  public validation: any;

  public $onInit() {

    const emsWorkflowsEnabled = this.treeOptions.emsWorkflowsEnabled === 'true' ? true : false;

    /** Function to load the selected workflow if configuration_script_id is available. */
    if (emsWorkflowsEnabled && this.modalData.resource_action && this.modalData.resource_action.configuration_script_id) {
      this.loadWorkflow(this.modalData.resource_action.configuration_script_id);
    };

    this.treeOptions = {
      ...this.treeOptions,

      show: false,
      includeDomain: false,
      data: null,
      automationType: null,
      automationTypes: {
        automate: 'embedded_automate',
        workflow: 'embedded_workflow',
      },
      emsWorkflowsEnabled: emsWorkflowsEnabled,

      /** Function to reset the modalData while changin the Automation Type. */
      onAutomationTypeChange: () => {
        this.treeOptions.automationType = this.modalData.automation_type;
      },

      /** Function to display the  automation_type select box
       * 'Embedded Automate' will be displayed, by default.
       * When the workflows are enabled, and automation_type === embedded_automate, 'Embedded Automate' select box will be displayed.
       * Else, 'Embedded Workflow' will be selected.
      */
      displayAutomationType: () => {
        let displayAutomate = true;

        if(emsWorkflowsEnabled) {
          displayAutomate = this.modalData.automation_type === this.treeOptions.automationTypes.automate;
        }
        return {automate: displayAutomate, workflow: !displayAutomate};
      },

      /** Function to open the modal box and load the automate tree. */
      toggle: () => {
        this.treeOptions.show = ! this.treeOptions.show;
        this.treeOptions.automationType = this.treeOptions.automationTypes.automate;

        if (this.treeOptions.show) {
          const fqname = this.showFullyQualifiedName(this.modalData.resource_action) || null;

          this.treeOptions.load(fqname).then((data) => {
            this.treeOptions.data = data;
            this.treeOptions.selected = {fqname: '/' + fqname};
          });
        }
      },

      /** Function to open the modal box and load the workflows list. */
      toggleWorkflows: () => {
        this.treeOptions.show = ! this.treeOptions.show;
        this.treeOptions.automationType = this.treeOptions.automationTypes.workflow;

        if (this.treeOptions.show) {
          this.treeOptions.loadAvailableWorkflows().then((data) => {
            // Keep all workflows and mark invalid ones as disabled
            this.treeOptions.data = data.resources.map((item: any) => ({
              ...item,
              disabled: item.payload_valid === false
            }));
            const workflow = this.treeOptions.data.find((item) => item.id === this.modalData.resource_action.configuration_script_id);
            this.treeOptions.selected = workflow ? workflow.name : null;
          });
        }
      },

      /** Function to handle the onclick event of an item in tree. */
      onSelect: (node) => {
        this.treeSelectorSelect(node, this.modalData);
      }
    };
  }

  public showFullyQualifiedName(resourceAction) {
    if (!resourceAction) {
      return '';
    }
    const actionKeys = ['ae_namespace', 'ae_class', 'ae_instance'];
    const keysPresent = actionKeys.every((item) => resourceAction.hasOwnProperty(item));

    if (keysPresent && resourceAction.ae_namespace && resourceAction.ae_class && resourceAction.ae_instance) {
      return `${resourceAction.ae_namespace}/${resourceAction.ae_class}/${resourceAction.ae_instance}`;
    } else {
      return '';
    }
  }

  /** Function to extract the values needed for embedded_automate during onclick event of an item from the tree */
  public onEmbeddedAutomateSelect(node, elementData) {
    const fqname = node.fqname.split('/');

    if (this.treeOptions.includeDomain === false) {
      fqname.splice(1, 1);
    }
    if (elementData.resource_action) {
      elementData.resource_action = {
        ...elementData.resource_action,
        ae_instance: fqname.pop(),
        ae_class: fqname.pop(),
        ae_namespace: fqname.filter(String).join('/'),
      };
    }
  }

  /** Function to extract the values needed for embedded_workflow during onclick event of an item from the list */
  public onEmbeddedWorkflowsSelect(workflow, elementData) {
    if (elementData.resource_action) {
      elementData.resource_action = {
        ...elementData.resource_action,
        configuration_script_id: workflow.id,
        workflow_name: workflow.name,
      };
    }
  }

  /** Function to extract the values needed for entry points during onclick event of an item from the tree or list */
  public treeSelectorSelect(node, elementData) {
    if (this.treeOptions.automationType === this.treeOptions.automationTypes.automate) {
      this.onEmbeddedAutomateSelect(node, elementData);
    } else if (this.treeOptions.automationType === this.treeOptions.automationTypes.workflow) {
      this.onEmbeddedWorkflowsSelect(node, elementData);
    }
    this.treeOptions.show = false;
  }

  /** Function to get notification messages for options modal box if any. */
  public modalNotification() {
    const notice = { error: false, message: undefined };

    if (!this.modalFieldIsValid() && this.validation.invalid && this.validation.invalid.message) {
      notice.message = this.validation.invalid.message;
      notice.error = true;
    } else if (this.modalData.validationMessage) {
      notice.message = this.modalData.validationMessage;
      notice.error = true;
    }

    return notice;
  }

  public modalFieldIsValid() {
    return this.validation.validateField(this.modalData);
  }

  /** Function to load a selected workflow. */
  public loadWorkflow(id: number) {
    this.treeOptions.loadWorkflow(id).then(({data, status}) => {
      this.modalData.resource_action.workflow_name = status ? data.name : '';
    });
  }
}
