import {makeAutoObservable} from "mobx";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import ListProductRequest from "../handlers/list/ListProductRequest";
import ListProductHandler from "../handlers/list/ListProductHandler";
import ListProductResponse from "../handlers/list/ListProductResponse";

export default class ListProductViewModel {
    
    isProcessing: boolean;
    errorMessage: string;
    listProductResponse: ListProductResponse = new ListProductResponse();


    constructor() {
        makeAutoObservable(this);
    }

    public async getProductList()  {
        try {
            
            this.isProcessing = true;

            let request = new ListProductRequest();
            let response = await ListProductHandler.get(request);

            if (response && response.success) {

                this.listProductResponse = new ListProductResponse();
                let result = response.data;
                //let items = result.items;
                this.listProductResponse.items = result;

                return this.listProductResponse;
            } else {
                this.errorMessage = getLocalizedString(response.message);
            }
        } catch (e) {
            this.errorMessage = i18next.t('Products.Error.List.Message');
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
}
