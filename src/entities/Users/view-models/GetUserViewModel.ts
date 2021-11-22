import UserItem from "../handlers/get/UserItem";
import AddUserRequest from "../handlers/add/AddUserRequest";
import UserStore from "../stores/UserStore";
import {makeAutoObservable} from "mobx";
import GetUserRequest from "../handlers/get/GetUserRequest";
import GetUserHandler from "../handlers/get/GetUserHandler";
import GetUserResponse from "../handlers/get/GetUserResponse";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DeleteUserHandler from "../handlers/delete/DeleteUserHandler";
import DeleteUserRequest from "../handlers/delete/DeleteUserRequest";
import {message} from "antd";
import UserContext from "../../../identity/contexts/UserContext";
import ActiveUserHandler from "../handlers/active/ActiveUserHandler";
import ActiveUserRequest from "../handlers/active/ActiveUserRequest";

export default class GetUserViewModel {
    columns: any[];
    userList: UserItem[];
    totalSize: number;
    isProcessing: boolean;
    errorMessage: string;
    pageIndex: number;
    pageSize: number;

    addUserRequest: AddUserRequest = new AddUserRequest();
    addedSuccessfully: boolean;

    constructor(public userStore: UserStore) {
        makeAutoObservable(this);

    }

    public async getAllUser(getUsersRequest: GetUserRequest) {
        try {
            this.isProcessing = true;
            let response = await GetUserHandler.get(getUsersRequest);


            if (response && response.success) {

                let result = response.data;
                let items = result.items;
                this.userList = items;
                this.totalSize = result.totalCount;
                this.addedSuccessfully = true;
            } else {
                this.errorMessage = getLocalizedString(response.message);
                this.addedSuccessfully = false;
            }
        } catch (e) {
            this.errorMessage = i18next.t('Users.Error.Get.Message');
            this.addedSuccessfully = false;
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
    public async deleteUser(key: number)
    {
        try
        {

            this.errorMessage = "";
            let request = new DeleteUserRequest();
            request.userId = key;
            let response = await DeleteUserHandler.delete(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                await this.getAllUser(new GetUserRequest(this.pageSize, this.pageIndex));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
                message.error(this.errorMessage);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Users.Error.Delete.Message');
            message.error(this.errorMessage);
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async activeUser(key: number)
    {
        try
        {

            this.errorMessage = "";
            let request = new ActiveUserRequest();
            request.userId = key;
            let response = await ActiveUserHandler.active(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                await this.getAllUser(new GetUserRequest(this.pageSize, this.pageIndex));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
                message.error(this.errorMessage);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Users.Error.Active.Message');
            message.error(this.errorMessage);
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }

}
