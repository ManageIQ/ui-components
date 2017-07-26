export interface IDialogs {
  dialog: object;
  refreshField: (args: {field: object}) => void;
  onUpdate: (args: {data: object}) => void;
  inputDisabled?: boolean;
}
