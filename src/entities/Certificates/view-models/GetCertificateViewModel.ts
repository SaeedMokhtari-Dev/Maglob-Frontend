import CertificateItem from "../handlers/get/CertificateItem";
import AddCertificateRequest from "../handlers/add/AddCertificateRequest";
import CertificateStore from "../stores/CertificateStore";
import {makeAutoObservable} from "mobx";
import GetCertificateRequest from "../handlers/get/GetCertificateRequest";
import GetCertificateHandler from "../handlers/get/GetCertificateHandler";
import GetCertificateResponse from "../handlers/get/GetCertificateResponse";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DeleteCertificateHandler from "../handlers/delete/DeleteCertificateHandler";
import DeleteCertificateRequest from "../handlers/delete/DeleteCertificateRequest";
import {message} from "antd";

export default class GetCertificateViewModel {
    columns: any[];
    certificateList: CertificateItem[];
    totalSize: number;
    isProcessing: boolean;
    errorMessage: string;
    pageIndex: number;
    pageSize: number;

    addCertificateRequest: AddCertificateRequest = new AddCertificateRequest();
    addedSuccessfully: boolean;

    constructor(public certificateStore: CertificateStore) {
        makeAutoObservable(this);

    }

    public async getAllCertificate(getCertificatesRequest: GetCertificateRequest) {
        try {
            this.isProcessing = true;
            let response = await GetCertificateHandler.get(getCertificatesRequest);


            if (response && response.success) {

                let result = response.data;
                let items = result.items;
                this.certificateList = items;
                this.totalSize = result.totalCount;
                this.addedSuccessfully = true;
            } else {
                this.errorMessage = getLocalizedString(response.message);
                this.addedSuccessfully = false;
            }
        } catch (e) {
            this.errorMessage = i18next.t('Certificates.Error.Get.Message');
            this.addedSuccessfully = false;
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
    public async deleteCertificate(key: number)
    {
        try
        {

            this.errorMessage = "";
            let request = new DeleteCertificateRequest();
            request.certificateId = key;
            let response = await DeleteCertificateHandler.delete(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                await this.getAllCertificate(new GetCertificateRequest(this.pageSize, this.pageIndex));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
                message.error(this.errorMessage);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Certificates.Error.Delete.Message');
            message.error(this.errorMessage);
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }

}
