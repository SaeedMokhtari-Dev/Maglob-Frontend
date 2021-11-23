import IDeserialize from "app/interfaces/deserialize";

export default class CertificateItem implements IDeserialize
{
    key: number;
    title: string;
    image: string;

    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}
