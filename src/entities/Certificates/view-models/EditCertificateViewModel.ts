import {makeAutoObservable} from "mobx";

import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DetailCertificateHandler from "../handlers/detail/DetailCertificateHandler";
import DetailCertificateRequest from "../handlers/detail/DetailCertificateRequest";
import AddCertificateRequest from "../handlers/add/AddCertificateRequest";
import EditCertificateRequest from "../handlers/edit/EditCertificateRequest";
import AddCertificateHandler from "../handlers/add/AddCertificateHandler";
import {message} from "antd";
import EditCertificateHandler from "../handlers/edit/EditCertificateHandler";
import DetailCertificateResponse from "../handlers/detail/DetailCertificateResponse";
import CertificateStore from "../stores/CertificateStore";

export default class EditCertificateViewModel
{
    isProcessing: boolean;
    errorMessage: string;
    key: number;
    uploadLoading: boolean;

    detailCertificateResponse: DetailCertificateResponse = new DetailCertificateResponse();
    addCertificateRequest: AddCertificateRequest = new AddCertificateRequest();
    editCertificateRequest: EditCertificateRequest = new EditCertificateRequest();


    constructor(public certificateStore: CertificateStore) {
        makeAutoObservable(this);
    }
    public async getDetailCertificate(certificateId: number)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let request = new DetailCertificateRequest(certificateId);
            let response = await DetailCertificateHandler.detail(request);

            if(response && response.success)
            {

                this.detailCertificateResponse = new DetailCertificateResponse().deserialize(response.data);
                this.editCertificateRequest = new EditCertificateRequest();
                for ( let i in this.editCertificateRequest )
                    if ( this.detailCertificateResponse.hasOwnProperty( i ) )
                        this.editCertificateRequest[i] = this.detailCertificateResponse[i];


                return this.detailCertificateResponse;
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Certificates.Error.Detail.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async addCertificate(request: AddCertificateRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let response = await AddCertificateHandler.add(request);

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
            this.errorMessage = i18next.t('Certificates.Error.Add.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async editCertificate(request: EditCertificateRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;
            

            let response = await EditCertificateHandler.edit(request);

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
            this.errorMessage = i18next.t('Certificates.Error.Edit.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
}
