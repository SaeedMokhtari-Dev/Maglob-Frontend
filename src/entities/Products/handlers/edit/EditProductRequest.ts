import {makeAutoObservable} from "mobx";

export default class EditProductRequest
{
    productId: number;
    name: string;
    description: string;
    model: string;
    quality: string;
    volume: string;
    displayOrder: number;
    isActive: boolean;
    descriptionSeo: string;
    productCertificateIds: number[];
    largePictureChanged: string;
    smallPictureChanged: string;
    createdAt: string;
    modifiedAt: string;
    language: string;




    constructor(
    ) {
        makeAutoObservable(this);
    }
}
