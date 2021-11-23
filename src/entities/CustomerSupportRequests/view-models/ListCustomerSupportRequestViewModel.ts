import CustomerSupportRequestStore from "../stores/CustomerSupportRequestStore";
import {makeAutoObservable} from "mobx";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import ListCustomerSupportRequestRequest from "../handlers/list/ListCustomerSupportRequestRequest";
import ListCustomerSupportRequestHandler from "../handlers/list/ListCustomerSupportRequestHandler";
import ListCustomerSupportRequestResponse from "../handlers/list/ListCustomerSupportRequestResponse";

export default class ListCustomerSupportRequestViewModel {
    
    isProcessing: boolean;
    errorMessage: string;
    listCustomerSupportRequestResponse: ListCustomerSupportRequestResponse = new ListCustomerSupportRequestResponse();


    constructor() {
        makeAutoObservable(this);
    }

    public async getCustomerSupportRequestList()  {
        try {
            
            this.isProcessing = true;

            let request = new ListCustomerSupportRequestRequest();
            let response = await ListCustomerSupportRequestHandler.get(request);

            if (response && response.success) {

                this.listCustomerSupportRequestResponse = new ListCustomerSupportRequestResponse();
                let result = response.data;
                //let items = result.items;
                this.listCustomerSupportRequestResponse.items = result;

                return this.listCustomerSupportRequestResponse;
            } else {
                this.errorMessage = getLocalizedString(response.message);
            }
        } catch (e) {
            this.errorMessage = i18next.t('CustomerSupportRequests.Error.List.Message');
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
}
