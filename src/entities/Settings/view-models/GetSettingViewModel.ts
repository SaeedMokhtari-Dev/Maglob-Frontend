import SettingItem from "../handlers/get/SettingItem";
import AddSettingRequest from "../handlers/add/AddSettingRequest";
import SettingStore from "../stores/SettingStore";
import {makeAutoObservable} from "mobx";
import GetSettingRequest from "../handlers/get/GetSettingRequest";
import GetSettingHandler from "../handlers/get/GetSettingHandler";
import GetSettingResponse from "../handlers/get/GetSettingResponse";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DeleteSettingHandler from "../handlers/delete/DeleteSettingHandler";
import DeleteSettingRequest from "../handlers/delete/DeleteSettingRequest";
import {message} from "antd";

export default class GetSettingViewModel {
    columns: any[];
    settingList: SettingItem[];
    totalSize: number;
    isProcessing: boolean;
    errorMessage: string;
    pageIndex: number;
    pageSize: number;

    addSettingRequest: AddSettingRequest = new AddSettingRequest();
    addedSuccessfully: boolean;

    constructor(public settingStore: SettingStore) {
        makeAutoObservable(this);

    }

    public async getAllSetting(getSettingsRequest: GetSettingRequest) {
        try {
            this.isProcessing = true;
            let response = await GetSettingHandler.get(getSettingsRequest);


            if (response && response.success) {

                let result = response.data;
                let items = result.items;
                this.settingList = items;
                this.totalSize = result.totalCount;
                this.addedSuccessfully = true;
            } else {
                this.errorMessage = getLocalizedString(response.message);
                this.addedSuccessfully = false;
            }
        } catch (e) {
            this.errorMessage = i18next.t('Settings.Error.Get.Message');
            this.addedSuccessfully = false;
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
    public async deleteSetting(key: number)
    {
        try
        {

            this.errorMessage = "";
            let request = new DeleteSettingRequest();
            request.settingId = key;
            let response = await DeleteSettingHandler.delete(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                await this.getAllSetting(new GetSettingRequest(this.pageSize, this.pageIndex));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
                message.error(this.errorMessage);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Settings.Error.Delete.Message');
            message.error(this.errorMessage);
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }

}
