import {AppStore} from "app/stores/AppStore";
import {makeAutoObservable} from "mobx";
import EditUserViewModel from "../view-models/EditUserViewModel";
import GetUserViewModel from "../view-models/GetUserViewModel";


export default class UserStore
{
    getUserViewModel: GetUserViewModel;
    editUserViewModel: EditUserViewModel;

    constructor(public appStore: AppStore) {
        makeAutoObservable(this);
    }

    onUserGetPageLoad()
    {
        this.getUserViewModel = new GetUserViewModel(this);
    }

    onUserGetPageUnload()
    {
        this.getUserViewModel = null;
    }

    onUserEditPageLoad()
    {
        this.editUserViewModel = new EditUserViewModel(this);
    }

    onUserEditPageUnload()
    {
        this.editUserViewModel = null;
    }

}
