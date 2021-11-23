import {makeAutoObservable} from "mobx";

import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DetailProductHandler from "../handlers/detail/DetailProductHandler";
import DetailProductRequest from "../handlers/detail/DetailProductRequest";
import AddProductRequest from "../handlers/add/AddProductRequest";
import EditProductRequest from "../handlers/edit/EditProductRequest";
import AddProductHandler from "../handlers/add/AddProductHandler";
import {message} from "antd";
import EditProductHandler from "../handlers/edit/EditProductHandler";
import DetailProductResponse from "../handlers/detail/DetailProductResponse";
import ProductStore from "../stores/ProductStore";

export default class EditProductViewModel
{
    isProcessing: boolean;
    errorMessage: string;
    key: number;
    uploadLoading: boolean;

    detailProductResponse: DetailProductResponse = new DetailProductResponse();
    addProductRequest: AddProductRequest = new AddProductRequest();
    editProductRequest: EditProductRequest = new EditProductRequest();


    constructor(public productStore: ProductStore) {
        makeAutoObservable(this);
    }
    public async getDetailProduct(productId: number)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let request = new DetailProductRequest(productId);
            let response = await DetailProductHandler.detail(request);

            if(response && response.success)
            {

                this.detailProductResponse = new DetailProductResponse().deserialize(response.data);
                this.editProductRequest = new EditProductRequest();
                for ( let i in this.editProductRequest )
                    if ( this.detailProductResponse.hasOwnProperty( i ) )
                        this.editProductRequest[i] = this.detailProductResponse[i];

                this.editProductRequest.productCertificateIds = this.detailProductResponse?.certificateItems?.map(w => w.key);
                return this.detailProductResponse;
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Products.Error.Detail.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async addProduct(request: AddProductRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let response = await AddProductHandler.add(request);

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
            this.errorMessage = i18next.t('Products.Error.Add.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async editProduct(request: EditProductRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;
            

            let response = await EditProductHandler.edit(request);

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
            this.errorMessage = i18next.t('Products.Error.Edit.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
}
