import {makeAutoObservable} from "mobx";
import {AppStore} from "app/stores/AppStore";
import ChangeUserPasswordRequest from "../../auth/common/handlers/change-user-password/ChangeUserPasswordRequest";

export default class PageStore
{
    isSidebarCollapsed: boolean;

    currentLanguage: string;

    changeUserPasswordRequest: ChangeUserPasswordRequest;

    constructor(public appStore: AppStore)
    {
        makeAutoObservable(this);
    }

    public onSidebarLoad(){

    }
    public onSidebarUnLoad(){

    }
}
