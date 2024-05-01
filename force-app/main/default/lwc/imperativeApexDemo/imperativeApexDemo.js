import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountHelper.getAccounts';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

const COLUMNS = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Account Industry', fieldName: 'Industry' },
    { label: 'Account Rating', fieldName: 'Rating' },

];

export default class ImperativeApexDemo extends LightningElement {
    data = [];
    options = [];
    columns = COLUMNS;
    selectedIndustry;

    @wire(getObjectInfo, {
        objectApiName: ACCOUNT_OBJECT
    })
    accountInfo;


    @wire(getPicklistValues, {
        recordTypeId: "$accountInfo.data.defaultRecordTypeId",
        fieldApiName: ACCOUNT_INDUSTRY_FIELD
    })industryPicklist;
    
    clickHandler() {
        getAccounts({inputIndustry: this.selectedIndustry})
            .then((result) => {
                console.log("Result", result);
                this.data = result;
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }

    handleChange(event) {
        this.selectedIndustry = event.target.value;
    }
}