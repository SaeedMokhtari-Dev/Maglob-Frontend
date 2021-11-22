import UserStore from "../stores/UserStore";
import {makeAutoObservable} from "mobx";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import ListUserRequest from "../handlers/list/ListUserRequest";
import ListUserHandler from "../handlers/list/ListUserHandler";
import ListUserResponse from "../handlers/list/ListUserResponse";

export default class ListUserViewModel {
    
    isProcessing: boolean;
    errorMessage: string;
    listUserResponse: ListUserResponse = new ListUserResponse();


    constructor() {
        makeAutoObservable(this);
    }

    public async getUserList()  {
        try {
            
            this.isProcessing = true;

            let request = new ListUserRequest();
            let response = await ListUserHandler.get(request);

            if (response && response.success) {

                this.listUserResponse = new ListUserResponse();
                let result = response.data;
                //let items = result.items;
                this.listUserResponse.items = result;

                return this.listUserResponse;
            } else {
                this.errorMessage = getLocalizedString(response.message);
            }
        } catch (e) {
            this.errorMessage = i18next.t('Users.Error.List.Message');
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
}
