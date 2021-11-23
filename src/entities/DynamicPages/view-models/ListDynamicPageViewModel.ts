import {makeAutoObservable} from "mobx";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import ListDynamicPageRequest from "../handlers/list/ListDynamicPageRequest";
import ListDynamicPageHandler from "../handlers/list/ListDynamicPageHandler";
import ListDynamicPageResponse from "../handlers/list/ListDynamicPageResponse";

export default class ListDynamicPageViewModel {
    
    isProcessing: boolean;
    errorMessage: string;
    listDynamicPageResponse: ListDynamicPageResponse = new ListDynamicPageResponse();


    constructor() {
        makeAutoObservable(this);
    }

    public async getDynamicPageList()  {
        try {
            
            this.isProcessing = true;

            let request = new ListDynamicPageRequest();
            let response = await ListDynamicPageHandler.get(request);

            if (response && response.success) {

                this.listDynamicPageResponse = new ListDynamicPageResponse();
                let result = response.data;
                //let items = result.items;
                this.listDynamicPageResponse.items = result;

                return this.listDynamicPageResponse;
            } else {
                this.errorMessage = getLocalizedString(response.message);
            }
        } catch (e) {
            this.errorMessage = i18next.t('DynamicPages.Error.List.Message');
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
}
