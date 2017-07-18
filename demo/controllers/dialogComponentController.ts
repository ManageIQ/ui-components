
export default class DialogComponentController {
    public dialog: any;
    public showDialogData: boolean;
    public dialogDataResults: any;

     /* @ngInject */
    constructor() {
        const dialogFile = require('../data/dialog-data.json');
        this.dialog = dialogFile.resources[0].content[0];
        this.showDialogData = false;
    }
    public refreshField(field) {
        let Promise: any;
        return new Promise((resolve, reject) => {
            resolve({'status': 'success'});
        });
    }
    public dialogData(data) {
       this.dialogDataResults = data;
    }
    public showDialogDataResults() {
        this.showDialogData = true;
    }
}
