import DynamicPageItem from "../handlers/get/DynamicPageItem";
import AddDynamicPageRequest from "../handlers/add/AddDynamicPageRequest";
import DynamicPageStore from "../stores/DynamicPageStore";
import {makeAutoObservable} from "mobx";
import GetDynamicPageRequest from "../handlers/get/GetDynamicPageRequest";
import GetDynamicPageHandler from "../handlers/get/GetDynamicPageHandler";
import GetDynamicPageResponse from "../handlers/get/GetDynamicPageResponse";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DeleteDynamicPageHandler from "../handlers/delete/DeleteDynamicPageHandler";
import DeleteDynamicPageRequest from "../handlers/delete/DeleteDynamicPageRequest";
import {message} from "antd";

export default class GetDynamicPageViewModel {
    columns: any[];
    dynamicPageList: DynamicPageItem[];
    totalSize: number;
    isProcessing: boolean;
    errorMessage: string;
    pageIndex: number;
    pageSize: number;

    addDynamicPageRequest: AddDynamicPageRequest = new AddDynamicPageRequest();
    addedSuccessfully: boolean;

    constructor(public dynamicPageStore: DynamicPageStore) {
        makeAutoObservable(this);

    }

    public async getAllDynamicPage(getDynamicPagesRequest: GetDynamicPageRequest) {
        try {
            this.isProcessing = true;
            let response = await GetDynamicPageHandler.get(getDynamicPagesRequest);


            if (response && response.success) {

                let result = response.data;
                let items = result.items;
                this.dynamicPageList = items;
                this.totalSize = result.totalCount;
                this.addedSuccessfully = true;
            } else {
                this.errorMessage = getLocalizedString(response.message);
                this.addedSuccessfully = false;
            }
        } catch (e) {
            this.errorMessage = i18next.t('DynamicPages.Error.Get.Message');
            this.addedSuccessfully = false;
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
    public async deleteDynamicPage(key: number)
    {
        try
        {

            this.errorMessage = "";
            let request = new DeleteDynamicPageRequest();
            request.dynamicPageId = key;
            let response = await DeleteDynamicPageHandler.delete(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                await this.getAllDynamicPage(new GetDynamicPageRequest(this.pageSize, this.pageIndex));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
                message.error(this.errorMessage);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('DynamicPages.Error.Delete.Message');
            message.error(this.errorMessage);
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }

}
