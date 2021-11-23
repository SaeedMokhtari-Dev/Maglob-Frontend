import ProductItem from "../handlers/get/ProductItem";
import AddProductRequest from "../handlers/add/AddProductRequest";
import ProductStore from "../stores/ProductStore";
import {makeAutoObservable} from "mobx";
import GetProductRequest from "../handlers/get/GetProductRequest";
import GetProductHandler from "../handlers/get/GetProductHandler";
import GetProductResponse from "../handlers/get/GetProductResponse";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DeleteProductHandler from "../handlers/delete/DeleteProductHandler";
import DeleteProductRequest from "../handlers/delete/DeleteProductRequest";
import {message} from "antd";

export default class GetProductViewModel {
    columns: any[];
    productList: ProductItem[];
    totalSize: number;
    isProcessing: boolean;
    errorMessage: string;
    pageIndex: number;
    pageSize: number;

    addProductRequest: AddProductRequest = new AddProductRequest();
    addedSuccessfully: boolean;

    constructor(public productStore: ProductStore) {
        makeAutoObservable(this);

    }

    public async getAllProduct(getProductsRequest: GetProductRequest) {
        try {
            this.isProcessing = true;
            let response = await GetProductHandler.get(getProductsRequest);


            if (response && response.success) {

                let result = response.data;
                let items = result.items;
                this.productList = items;
                this.totalSize = result.totalCount;
                this.addedSuccessfully = true;
            } else {
                this.errorMessage = getLocalizedString(response.message);
                this.addedSuccessfully = false;
            }
        } catch (e) {
            this.errorMessage = i18next.t('Products.Error.Get.Message');
            this.addedSuccessfully = false;
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
    public async deleteProduct(key: number)
    {
        try
        {

            this.errorMessage = "";
            let request = new DeleteProductRequest();
            request.productId = key;
            let response = await DeleteProductHandler.delete(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                await this.getAllProduct(new GetProductRequest(this.pageSize, this.pageIndex));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
                message.error(this.errorMessage);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Products.Error.Delete.Message');
            message.error(this.errorMessage);
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }

}
