import {makeAutoObservable} from "mobx";

import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DetailDynamicPageHandler from "../handlers/detail/DetailDynamicPageHandler";
import DetailDynamicPageRequest from "../handlers/detail/DetailDynamicPageRequest";
import AddDynamicPageRequest from "../handlers/add/AddDynamicPageRequest";
import EditDynamicPageRequest from "../handlers/edit/EditDynamicPageRequest";
import AddDynamicPageHandler from "../handlers/add/AddDynamicPageHandler";
import {message} from "antd";
import EditDynamicPageHandler from "../handlers/edit/EditDynamicPageHandler";
import DetailDynamicPageResponse from "../handlers/detail/DetailDynamicPageResponse";
import DynamicPageStore from "../stores/DynamicPageStore";

export default class EditDynamicPageViewModel
{
    isProcessing: boolean;
    errorMessage: string;
    key: number;
    uploadLoading: boolean;

    detailDynamicPageResponse: DetailDynamicPageResponse = new DetailDynamicPageResponse();
    addDynamicPageRequest: AddDynamicPageRequest = new AddDynamicPageRequest();
    editDynamicPageRequest: EditDynamicPageRequest = new EditDynamicPageRequest();


    constructor(public dynamicPageStore: DynamicPageStore) {
        makeAutoObservable(this);
    }
    public async getDetailDynamicPage(dynamicPageId: number)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let request = new DetailDynamicPageRequest(dynamicPageId);
            let response = await DetailDynamicPageHandler.detail(request);

            if(response && response.success)
            {

                this.detailDynamicPageResponse = new DetailDynamicPageResponse().deserialize(response.data);
                this.editDynamicPageRequest = new EditDynamicPageRequest();
                for ( let i in this.editDynamicPageRequest )
                    if ( this.detailDynamicPageResponse.hasOwnProperty( i ) )
                        this.editDynamicPageRequest[i] = this.detailDynamicPageResponse[i];


                return this.detailDynamicPageResponse;
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('DynamicPages.Error.Detail.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async addDynamicPage(request: AddDynamicPageRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let response = await AddDynamicPageHandler.add(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));                
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('DynamicPages.Error.Add.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async editDynamicPage(request: EditDynamicPageRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;
            

            let response = await EditDynamicPageHandler.edit(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('DynamicPages.Error.Edit.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
}
