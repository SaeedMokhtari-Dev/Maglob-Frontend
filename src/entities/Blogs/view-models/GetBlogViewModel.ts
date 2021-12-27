import BlogItem from "../handlers/get/BlogItem";
import AddBlogRequest from "../handlers/add/AddBlogRequest";
import BlogStore from "../stores/BlogStore";
import {makeAutoObservable} from "mobx";
import GetBlogRequest from "../handlers/get/GetBlogRequest";
import GetBlogHandler from "../handlers/get/GetBlogHandler";
import GetBlogResponse from "../handlers/get/GetBlogResponse";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DeleteBlogHandler from "../handlers/delete/DeleteBlogHandler";
import DeleteBlogRequest from "../handlers/delete/DeleteBlogRequest";
import {message} from "antd";

export default class GetBlogViewModel {
    columns: any[];
    blogList: BlogItem[];
    totalSize: number;
    isProcessing: boolean;
    errorMessage: string;
    pageIndex: number;
    pageSize: number;

    addBlogRequest: AddBlogRequest = new AddBlogRequest();
    addedSuccessfully: boolean;

    constructor(public blogStore: BlogStore) {
        makeAutoObservable(this);

    }

    public async getAllBlog(getBlogsRequest: GetBlogRequest) {
        try {
            this.isProcessing = true;
            let response = await GetBlogHandler.get(getBlogsRequest);


            if (response && response.success) {

                let result = response.data;
                let items = result.items;
                this.blogList = items;
                this.totalSize = result.totalCount;
                this.addedSuccessfully = true;
            } else {
                this.errorMessage = getLocalizedString(response.message);
                this.addedSuccessfully = false;
            }
        } catch (e) {
            this.errorMessage = i18next.t('Blogs.Error.Get.Message');
            this.addedSuccessfully = false;
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
    public async deleteBlog(key: number)
    {
        try
        {

            this.errorMessage = "";
            let request = new DeleteBlogRequest();
            request.blogId = key;
            let response = await DeleteBlogHandler.delete(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                await this.getAllBlog(new GetBlogRequest(this.pageSize, this.pageIndex));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
                message.error(this.errorMessage);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Blogs.Error.Delete.Message');
            message.error(this.errorMessage);
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }

}
