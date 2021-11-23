import {AppStore} from "app/stores/AppStore";
import {makeAutoObservable} from "mobx";
import EditProductViewModel from "../view-models/EditProductViewModel";
import GetProductViewModel from "../view-models/GetProductViewModel";
import ListCertificateViewModel from "../../Certificates/view-models/ListCertificateViewModel";


export default class ProductStore
{
    getProductViewModel: GetProductViewModel;
    editProductViewModel: EditProductViewModel;
    listCertificateViewModel: ListCertificateViewModel;

    constructor(public appStore: AppStore) {
        makeAutoObservable(this);
    }

    onProductGetPageLoad()
    {
        this.getProductViewModel = new GetProductViewModel(this);
    }

    onProductGetPageUnload()
    {
        this.getProductViewModel = null;
    }

    onProductEditPageLoad()
    {
        this.editProductViewModel = new EditProductViewModel(this);
        this.listCertificateViewModel = new ListCertificateViewModel();
    }

    onProductEditPageUnload()
    {
        this.editProductViewModel = null;
        this.listCertificateViewModel = null;
    }

}
