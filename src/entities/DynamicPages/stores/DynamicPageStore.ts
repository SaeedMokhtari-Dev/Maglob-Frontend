import {AppStore} from "app/stores/AppStore";
import {makeAutoObservable} from "mobx";
import EditDynamicPageViewModel from "../view-models/EditDynamicPageViewModel";
import GetDynamicPageViewModel from "../view-models/GetDynamicPageViewModel";


export default class DynamicPageStore
{
    getDynamicPageViewModel: GetDynamicPageViewModel;
    editDynamicPageViewModel: EditDynamicPageViewModel;

    constructor(public appStore: AppStore) {
        makeAutoObservable(this);
    }

    onDynamicPageGetPageLoad()
    {
        this.getDynamicPageViewModel = new GetDynamicPageViewModel(this);
    }

    onDynamicPageGetPageUnload()
    {
        this.getDynamicPageViewModel = null;
    }

    onDynamicPageEditPageLoad()
    {
        this.editDynamicPageViewModel = new EditDynamicPageViewModel(this);
    }

    onDynamicPageEditPageUnload()
    {
        this.editDynamicPageViewModel = null;
    }

}
