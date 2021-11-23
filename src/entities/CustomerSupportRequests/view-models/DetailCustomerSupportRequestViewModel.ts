import {makeAutoObservable} from "mobx";

import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DetailCustomerSupportRequestResponse from "../handlers/detail/DetailCustomerSupportRequestResponse";
import DetailCustomerSupportRequestRequest from "../handlers/detail/DetailCustomerSupportRequestRequest";
import DetailCustomerSupportRequestHandler from "../handlers/detail/DetailCustomerSupportRequestHandler";

export default class DetailCustomerSupportRequestViewModel
{
    isProcessing: boolean;
    errorMessage: string;
    key: number;

    detailCustomerSupportRequestResponse: DetailCustomerSupportRequestResponse = new DetailCustomerSupportRequestResponse();


    constructor() {
        makeAutoObservable(this);
    }
    public async getDetailCustomerSupportRequest(customerSupportRequestId: number)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let request = new DetailCustomerSupportRequestRequest(customerSupportRequestId);
            let response = await DetailCustomerSupportRequestHandler.detail(request);

            if(response && response.success)
            {

                this.detailCustomerSupportRequestResponse = new DetailCustomerSupportRequestResponse().deserialize(response.data);

                return this.detailCustomerSupportRequestResponse;
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('CustomerSupportRequests.Error.Detail.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
}
