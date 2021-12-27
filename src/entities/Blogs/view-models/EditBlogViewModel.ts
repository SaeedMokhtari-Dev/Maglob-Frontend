import {makeAutoObservable} from "mobx";

import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DetailBlogHandler from "../handlers/detail/DetailBlogHandler";
import DetailBlogRequest from "../handlers/detail/DetailBlogRequest";
import AddBlogRequest from "../handlers/add/AddBlogRequest";
import EditBlogRequest from "../handlers/edit/EditBlogRequest";
import AddBlogHandler from "../handlers/add/AddBlogHandler";
import {message} from "antd";
import EditBlogHandler from "../handlers/edit/EditBlogHandler";
import DetailBlogResponse from "../handlers/detail/DetailBlogResponse";
import BlogStore from "../stores/BlogStore";

export default class EditBlogViewModel
{
    isProcessing: boolean;
    errorMessage: string;
    key: number;
    uploadLoading: boolean;

    detailBlogResponse: DetailBlogResponse = new DetailBlogResponse();
    addBlogRequest: AddBlogRequest = new AddBlogRequest();
    editBlogRequest: EditBlogRequest = new EditBlogRequest();


    constructor(public blogStore: BlogStore) {
        makeAutoObservable(this);
    }
    public async getDetailBlog(blogId: number)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let request = new DetailBlogRequest(blogId);
            let response = await DetailBlogHandler.detail(request);

            if(response && response.success)
            {

                this.detailBlogResponse = new DetailBlogResponse().deserialize(response.data);
                this.editBlogRequest = new EditBlogRequest();
                for ( let i in this.editBlogRequest )
                    if ( this.detailBlogResponse.hasOwnProperty( i ) )
                        this.editBlogRequest[i] = this.detailBlogResponse[i];


                return this.detailBlogResponse;
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Blogs.Error.Detail.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async addBlog(request: AddBlogRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let response = await AddBlogHandler.add(request);

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
            this.errorMessage = i18next.t('Blogs.Error.Add.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async editBlog(request: EditBlogRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;
            

            let response = await EditBlogHandler.edit(request);

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
            this.errorMessage = i18next.t('Blogs.Error.Edit.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
}
