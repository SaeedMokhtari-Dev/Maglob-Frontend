import {makeAutoObservable} from "mobx";

export default class EditCertificateRequest
{
    certificateId: number;
    title: string;
    picture: string;
    pictureChanged: boolean;
    isActive: boolean;
    language: string;



    constructor(
    ) {
        makeAutoObservable(this);
    }
}
