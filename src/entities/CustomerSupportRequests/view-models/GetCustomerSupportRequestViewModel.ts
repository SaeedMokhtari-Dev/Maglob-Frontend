import CustomerSupportRequestItem from "../handlers/get/CustomerSupportRequestItem";
import AddCustomerSupportRequestRequest from "../handlers/add/AddCustomerSupportRequestRequest";
import CustomerSupportRequestStore from "../stores/CustomerSupportRequestStore";
import {makeAutoObservable} from "mobx";
import GetCustomerSupportRequestRequest from "../handlers/get/GetCustomerSupportRequestRequest";
import GetCustomerSupportRequestHandler from "../handlers/get/GetCustomerSupportRequestHandler";
import GetCustomerSupportRequestResponse from "../handlers/get/GetCustomerSupportRequestResponse";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DeleteCustomerSupportRequestHandler from "../handlers/delete/DeleteCustomerSupportRequestHandler";
import DeleteCustomerSupportRequestRequest from "../handlers/delete/DeleteCustomerSupportRequestRequest";
import {message} from "antd";

export default class GetCustomerSupportRequestViewModel {
    columns: any[];
    customerSupportRequestList: CustomerSupportRequestItem[];
    totalSize: number;
    isProcessing: boolean;
    errorMessage: string;
    pageIndex: number;
    pageSize: number;

    addCustomerSupportRequestRequest: AddCustomerSupportRequestRequest = new AddCustomerSupportRequestRequest();
    addedSuccessfully: boolean;

    constructor(public customerSupportRequestStore: CustomerSupportRequestStore) {
        makeAutoObservable(this);

    }

    public async getAllCustomerSupportRequest(getCustomerSupportRequestsRequest: GetCustomerSupportRequestRequest) {
        try {
            this.isProcessing = true;
            let response = await GetCustomerSupportRequestHandler.get(getCustomerSupportRequestsRequest);


            if (response && response.success) {

                let result = response.data;
                let items = result.items;
                this.customerSupportRequestList = items;
                this.totalSize = result.totalCount;
                this.addedSuccessfully = true;
            } else {
                this.errorMessage = getLocalizedString(response.message);
                this.addedSuccessfully = false;
            }
        } catch (e) {
            this.errorMessage = i18next.t('CustomerSupportRequests.Error.Get.Message');
            this.addedSuccessfully = false;
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
    public async deleteCustomerSupportRequest(key: number)
    {
        try
        {

            this.errorMessage = "";
            let request = new DeleteCustomerSupportRequestRequest();
            request.customerSupportRequestId = key;
            let response = await DeleteCustomerSupportRequestHandler.delete(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                await this.getAllCustomerSupportRequest(new GetCustomerSupportRequestRequest(this.pageSize, this.pageIndex));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
                message.error(this.errorMessage);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('CustomerSupportRequests.Error.Delete.Message');
            message.error(this.errorMessage);
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }

}
