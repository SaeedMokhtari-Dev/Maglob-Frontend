import {makeAutoObservable} from "mobx";

import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DetailSettingHandler from "../handlers/detail/DetailSettingHandler";
import DetailSettingRequest from "../handlers/detail/DetailSettingRequest";
import AddSettingRequest from "../handlers/add/AddSettingRequest";
import EditSettingRequest from "../handlers/edit/EditSettingRequest";
import AddSettingHandler from "../handlers/add/AddSettingHandler";
import {message} from "antd";
import EditSettingHandler from "../handlers/edit/EditSettingHandler";
import DetailSettingResponse from "../handlers/detail/DetailSettingResponse";
import SettingStore from "../stores/SettingStore";

export default class EditSettingViewModel
{
    isProcessing: boolean;
    errorMessage: string;
    key: number;
    uploadLoading: boolean;

    detailSettingResponse: DetailSettingResponse = new DetailSettingResponse();
    addSettingRequest: AddSettingRequest = new AddSettingRequest();
    editSettingRequest: EditSettingRequest = new EditSettingRequest();


    constructor(public settingStore: SettingStore) {
        makeAutoObservable(this);
    }
    public async getDetailSetting(settingId: number)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let request = new DetailSettingRequest(settingId);
            let response = await DetailSettingHandler.detail(request);

            if(response && response.success)
            {

                this.detailSettingResponse = new DetailSettingResponse().deserialize(response.data);
                this.editSettingRequest = new EditSettingRequest();
                for ( let i in this.editSettingRequest )
                    if ( this.detailSettingResponse.hasOwnProperty( i ) )
                        this.editSettingRequest[i] = this.detailSettingResponse[i];


                return this.detailSettingResponse;
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Settings.Error.Detail.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async addSetting(request: AddSettingRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let response = await AddSettingHandler.add(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                /*await this.settingsStore.getSettingViewModel.getAllSettings(new GetSettingsRequest(20, 0));*/
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Settings.Error.Add.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async editSetting(request: EditSettingRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;
            

            let response = await EditSettingHandler.edit(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                /*await this.settingsStore.getSettingViewModel.getAllSettings(new GetSettingsRequest(20, 0));*/
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Settings.Error.Edit.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
}
