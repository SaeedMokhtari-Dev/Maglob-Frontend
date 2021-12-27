import {makeAutoObservable} from "mobx";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import ListBlogRequest from "../handlers/list/ListBlogRequest";
import ListBlogHandler from "../handlers/list/ListBlogHandler";
import ListBlogResponse from "../handlers/list/ListBlogResponse";

export default class ListBlogViewModel {
    
    isProcessing: boolean;
    errorMessage: string;
    listBlogResponse: ListBlogResponse = new ListBlogResponse();


    constructor() {
        makeAutoObservable(this);
    }

    public async getBlogList()  {
        try {
            
            this.isProcessing = true;

            let request = new ListBlogRequest();
            let response = await ListBlogHandler.get(request);

            if (response && response.success) {

                this.listBlogResponse = new ListBlogResponse();
                let result = response.data;
                //let items = result.items;
                this.listBlogResponse.items = result;

                return this.listBlogResponse;
            } else {
                this.errorMessage = getLocalizedString(response.message);
            }
        } catch (e) {
            this.errorMessage = i18next.t('Blogs.Error.List.Message');
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
}
