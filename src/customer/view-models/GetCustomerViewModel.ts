import {makeAutoObservable} from "mobx";
import i18next from "i18next";
import log from "loglevel";
import CustomerStore from "../stores/CustomerStore";
import {getLocalizedString} from "../../app/utils/Localization";
import DetailUserRequest from "../../entities/Users/handlers/detail/DetailUserRequest";
import DetailUserHandler from "../../entities/Users/handlers/detail/DetailUserHandler";
import DetailUserResponse from "../../entities/Users/handlers/detail/DetailUserResponse";

export default class GetCustomerViewModel {
    isProcessing: boolean;
    errorMessage: string;

    detailUserResponse: DetailUserResponse = new DetailUserResponse();
    constructor(public customerStore: CustomerStore) {
        makeAutoObservable(this);

    }
    public async getDetailUser(userId: number)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let request = new DetailUserRequest(userId);
            let response = await DetailUserHandler.detail(request);

            if(response && response.success)
            {
                this.detailUserResponse = new DetailUserResponse().deserialize(response.data);

                return this.detailUserResponse;
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Users.Error.Detail.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
}
