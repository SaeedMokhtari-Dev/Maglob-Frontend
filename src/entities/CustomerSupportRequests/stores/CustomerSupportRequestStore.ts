import {AppStore} from "app/stores/AppStore";
import {makeAutoObservable} from "mobx";
import EditCustomerSupportRequestViewModel from "../view-models/EditCustomerSupportRequestViewModel";
import GetCustomerSupportRequestViewModel from "../view-models/GetCustomerSupportRequestViewModel";
import DetailCustomerSupportRequestViewModel from "../view-models/DetailCustomerSupportRequestViewModel";


export default class CustomerSupportRequestStore
{
    getCustomerSupportRequestViewModel: GetCustomerSupportRequestViewModel;
    editCustomerSupportRequestViewModel: EditCustomerSupportRequestViewModel;
    detailCustomerSupportRequestViewModel: DetailCustomerSupportRequestViewModel;

    constructor(public appStore: AppStore) {
        makeAutoObservable(this);
    }

    onCustomerSupportRequestGetPageLoad()
    {
        this.getCustomerSupportRequestViewModel = new GetCustomerSupportRequestViewModel(this);
    }

    onCustomerSupportRequestGetPageUnload()
    {
        this.getCustomerSupportRequestViewModel = null;
    }

    onCustomerSupportRequestEditPageLoad()
    {
        this.editCustomerSupportRequestViewModel = new EditCustomerSupportRequestViewModel(this);
    }

    onCustomerSupportRequestEditPageUnload()
    {
        this.editCustomerSupportRequestViewModel = null;
    }

    onCustomerSupportRequestDetailPageLoad()
    {
        this.detailCustomerSupportRequestViewModel = new DetailCustomerSupportRequestViewModel();
    }

    onCustomerSupportRequestDetailPageUnload()
    {
        this.detailCustomerSupportRequestViewModel = null;
    }

}
