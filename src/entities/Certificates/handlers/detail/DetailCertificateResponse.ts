import IDeserialize from "app/interfaces/deserialize";

export default class DetailCertificateResponse implements IDeserialize
{
    key: number;
    title: string;
    picture: string;
    isActive: boolean;
    createdAt: string;
    modifiedAt: string;
    language: string;

    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}
