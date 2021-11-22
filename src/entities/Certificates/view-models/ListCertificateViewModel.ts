import {makeAutoObservable} from "mobx";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import ListCertificateRequest from "../handlers/list/ListCertificateRequest";
import ListCertificateHandler from "../handlers/list/ListCertificateHandler";
import ListCertificateResponse from "../handlers/list/ListCertificateResponse";

export default class ListCertificateViewModel {
    
    isProcessing: boolean;
    errorMessage: string;
    listCertificateResponse: ListCertificateResponse = new ListCertificateResponse();


    constructor() {
        makeAutoObservable(this);
    }

    public async getCertificateList()  {
        try {
            
            this.isProcessing = true;

            let request = new ListCertificateRequest();
            let response = await ListCertificateHandler.get(request);

            if (response && response.success) {

                this.listCertificateResponse = new ListCertificateResponse();
                let result = response.data;
                //let items = result.items;
                this.listCertificateResponse.items = result;

                return this.listCertificateResponse;
            } else {
                this.errorMessage = getLocalizedString(response.message);
            }
        } catch (e) {
            this.errorMessage = i18next.t('Certificates.Error.List.Message');
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
}
