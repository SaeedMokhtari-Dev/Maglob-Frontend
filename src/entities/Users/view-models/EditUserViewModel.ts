import {makeAutoObservable} from "mobx";

import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DetailUserHandler from "../handlers/detail/DetailUserHandler";
import DetailUserRequest from "../handlers/detail/DetailUserRequest";
import AddUserRequest from "../handlers/add/AddUserRequest";
import EditUserRequest from "../handlers/edit/EditUserRequest";
import AddUserHandler from "../handlers/add/AddUserHandler";
import {message} from "antd";
import EditUserHandler from "../handlers/edit/EditUserHandler";
import DetailUserResponse from "../handlers/detail/DetailUserResponse";
import UserStore from "../stores/UserStore";

export default class EditUserViewModel
{
    isProcessing: boolean;
    calculating: boolean;
    errorMessage: string;
    key: number;
    uploadLoading: boolean;

    detailUserResponse: DetailUserResponse = new DetailUserResponse();
    addUserRequest: AddUserRequest = new AddUserRequest();
    editUserRequest: EditUserRequest = new EditUserRequest();


    constructor(public userStore: UserStore) {
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
                this.editUserRequest = new EditUserRequest();
                for ( let i in this.editUserRequest )
                    if ( this.detailUserResponse.hasOwnProperty( i ) )
                        this.editUserRequest[i] = this.detailUserResponse[i];


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
    public async addUser(request: AddUserRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let response = await AddUserHandler.add(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                /*await this.usersStore.getUserViewModel.getAllUsers(new GetUsersRequest(20, 0));*/
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Users.Error.Add.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async editUser(request: EditUserRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;
            

            let response = await EditUserHandler.edit(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                /*await this.usersStore.getUserViewModel.getAllUsers(new GetUsersRequest(20, 0));*/
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Users.Error.Edit.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
}
