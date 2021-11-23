import {makeAutoObservable} from "mobx";

import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DetailCustomerSupportRequestHandler from "../handlers/detail/DetailCustomerSupportRequestHandler";
import DetailCustomerSupportRequestRequest from "../handlers/detail/DetailCustomerSupportRequestRequest";
import AddCustomerSupportRequestRequest from "../handlers/add/AddCustomerSupportRequestRequest";
import EditCustomerSupportRequestRequest from "../handlers/edit/EditCustomerSupportRequestRequest";
import AddCustomerSupportRequestHandler from "../handlers/add/AddCustomerSupportRequestHandler";
import {message} from "antd";
import EditCustomerSupportRequestHandler from "../handlers/edit/EditCustomerSupportRequestHandler";
import DetailCustomerSupportRequestResponse from "../handlers/detail/DetailCustomerSupportRequestResponse";
import CustomerSupportRequestStore from "../stores/CustomerSupportRequestStore";

export default class EditCustomerSupportRequestViewModel
{
    isProcessing: boolean;
    errorMessage: string;
    key: number;

    detailCustomerSupportRequestResponse: DetailCustomerSupportRequestResponse = new DetailCustomerSupportRequestResponse();
    addCustomerSupportRequestRequest: AddCustomerSupportRequestRequest = new AddCustomerSupportRequestRequest();
    editCustomerSupportRequestRequest: EditCustomerSupportRequestRequest = new EditCustomerSupportRequestRequest();


    constructor(public customerSupportRequestStore: CustomerSupportRequestStore) {
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
                this.editCustomerSupportRequestRequest = new EditCustomerSupportRequestRequest();
                for ( let i in this.editCustomerSupportRequestRequest )
                    if ( this.detailCustomerSupportRequestResponse.hasOwnProperty( i ) )
                        this.editCustomerSupportRequestRequest[i] = this.detailCustomerSupportRequestResponse[i];


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
    public async addCustomerSupportRequest(request: AddCustomerSupportRequestRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let response = await AddCustomerSupportRequestHandler.add(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                /*await this.customerSupportRequestsStore.getCustomerSupportRequestViewModel.getAllCustomerSupportRequests(new GetCustomerSupportRequestsRequest(20, 0));*/
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('CustomerSupportRequests.Error.Add.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async editCustomerSupportRequest(request: EditCustomerSupportRequestRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;
            

            let response = await EditCustomerSupportRequestHandler.edit(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                /*await this.customerSupportRequestsStore.getCustomerSupportRequestViewModel.getAllCustomerSupportRequests(new GetCustomerSupportRequestsRequest(20, 0));*/
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('CustomerSupportRequests.Error.Edit.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
}
