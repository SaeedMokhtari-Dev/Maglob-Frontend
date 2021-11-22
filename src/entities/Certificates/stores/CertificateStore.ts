import {AppStore} from "app/stores/AppStore";
import {makeAutoObservable} from "mobx";
import EditCertificateViewModel from "../view-models/EditCertificateViewModel";
import GetCertificateViewModel from "../view-models/GetCertificateViewModel";


export default class CertificateStore
{
    getCertificateViewModel: GetCertificateViewModel;
    editCertificateViewModel: EditCertificateViewModel;

    constructor(public appStore: AppStore) {
        makeAutoObservable(this);
    }

    onCertificateGetPageLoad()
    {
        this.getCertificateViewModel = new GetCertificateViewModel(this);
    }

    onCertificateGetPageUnload()
    {
        this.getCertificateViewModel = null;
    }

    onCertificateEditPageLoad()
    {
        this.editCertificateViewModel = new EditCertificateViewModel(this);
    }

    onCertificateEditPageUnload()
    {
        this.editCertificateViewModel = null;
    }

}
