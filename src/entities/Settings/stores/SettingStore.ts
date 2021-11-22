import {AppStore} from "app/stores/AppStore";
import {makeAutoObservable} from "mobx";
import EditSettingViewModel from "../view-models/EditSettingViewModel";
import GetSettingViewModel from "../view-models/GetSettingViewModel";


export default class SettingStore
{
    getSettingViewModel: GetSettingViewModel;
    editSettingViewModel: EditSettingViewModel;

    constructor(public appStore: AppStore) {
        makeAutoObservable(this);
    }

    onSettingGetPageLoad()
    {
        this.getSettingViewModel = new GetSettingViewModel(this);
    }

    onSettingGetPageUnload()
    {
        this.getSettingViewModel = null;
    }

    onSettingEditPageLoad()
    {
        this.editSettingViewModel = new EditSettingViewModel(this);
    }

    onSettingEditPageUnload()
    {
        this.editSettingViewModel = null;
    }

}
