import {makeAutoObservable} from "mobx";

export default class AddCertificateRequest
{
    title: string;
    picture: string;
    isActive: boolean;
    language: string;


    constructor(
    ) {
        makeAutoObservable(this);
    }
}
