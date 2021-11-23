import IDeserialize from "app/interfaces/deserialize";
import CertificateItem from "./CertificateItem";

export default class DetailProductResponse implements IDeserialize
{
    key: number;
    name: string;
    description: string;
    model: string;
    quality: string;
    volume: string;
    displayOrder: number;
    isActive: boolean;
    descriptionSeo: string;
    certificateItems: CertificateItem[] = [];
    largePicture: string;
    smallPicture: string;
    createdAt: string;
    modifiedAt: string;
    language: string;


    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}
