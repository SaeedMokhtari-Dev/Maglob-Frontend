import {makeAutoObservable} from "mobx";
import i18next from "i18next";
import log from "loglevel";
import {message} from "antd";
import GetAdminRequest from "../handlers/get/GetAdminRequest";
import GetAdminHandler from "../handlers/get/GetAdminHandler";
import AdminStore from "../stores/AdminStore";
import {getLocalizedString} from "../../app/utils/Localization";

export default class GetAdminViewModel {
    isProcessing: boolean;
    errorMessage: string;

    getAdminRequest: GetAdminRequest;

    constructor(public customerStore: AdminStore) {
        makeAutoObservable(this);

    }

    public async getDashboardData() {
        try {
            this.isProcessing = true;
            let response = await GetAdminHandler.get(new GetAdminRequest());

            if (response && response.success) {
                let result = response.data;
            } else {
                this.errorMessage = getLocalizedString(response.message);
            }
        } catch (e) {
            this.errorMessage = i18next.t('Admins.Error.Get.Message');
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
}
