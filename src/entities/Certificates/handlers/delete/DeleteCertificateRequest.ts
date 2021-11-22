import {makeAutoObservable} from "mobx";

export default class DeleteCertificateRequest
{
    public certificateId: number;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
