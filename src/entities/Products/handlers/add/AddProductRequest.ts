import {makeAutoObservable} from "mobx";

export default class AddProductRequest
{
    name: string;
    description: string;
    model: string;
    quality: string;
    volume: string;
    displayOrder: number;
    isActive: boolean;
    descriptionSeo: string;
    productCertificateIds: number[];
    largePicture: string;
    smallPicture: string;
    createdAt: string;
    modifiedAt: string;
    language: string;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
