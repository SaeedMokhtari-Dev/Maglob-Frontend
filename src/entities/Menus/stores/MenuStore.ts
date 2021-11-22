import {AppStore} from "app/stores/AppStore";
import {makeAutoObservable} from "mobx";
import EditMenuViewModel from "../view-models/EditMenuViewModel";
import GetMenuViewModel from "../view-models/GetMenuViewModel";


export default class MenuStore
{
    getMenuViewModel: GetMenuViewModel;
    editMenuViewModel: EditMenuViewModel;

    constructor(public appStore: AppStore) {
        makeAutoObservable(this);
    }

    onMenuGetPageLoad()
    {
        this.getMenuViewModel = new GetMenuViewModel(this);
    }

    onMenuGetPageUnload()
    {
        this.getMenuViewModel = null;
    }

    onMenuEditPageLoad()
    {
        this.editMenuViewModel = new EditMenuViewModel(this);
    }

    onMenuEditPageUnload()
    {
        this.editMenuViewModel = null;
    }

}
