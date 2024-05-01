import { LightningElement, api, wire } from 'lwc';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TICKER_FIELD from '@salesforce/schema/Account.TickerSymbol';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import updateTickerSymbol from '@salesforce/apex/AccountHelper.updateTickerSymbol';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';


export default class ImperativeApexForm extends LightningElement {

    @api recordId;
    accountName = "";
    accountTickerSymbol ="";

    @wire(getRecord, {
        recordId: "$recordId",
        fields: [ACCOUNT_NAME_FIELD, ACCOUNT_TICKER_FIELD]
    })
    recordDetails({data, error}){
        if(data){
            console.log("Get Record Details Susscessfull", data);
            this.accountName = getFieldValue(data, ACCOUNT_NAME_FIELD);  
            this.accountTickerSymbol = getFieldValue(data, ACCOUNT_TICKER_FIELD);         
            
        } else if(error){
            console.log("Error while fetching record details", error);
        }
    }

    changeHandler(event){
        this.accountTickerSymbol = event.target.value;
    }

    updateTicker(){
        updateTickerSymbol({
            recordId : this.recordId,
            newTickerSymbol : this.accountTickerSymbol
        })
        .then((result) => {
            console.log("Record updated successfully.", result);
            notifyRecordUpdateAvailable([{recordId: this.recordId}]);
        })
        .catch((error) => {
            console.log("Record updation failed.", error);
        });
    }
}