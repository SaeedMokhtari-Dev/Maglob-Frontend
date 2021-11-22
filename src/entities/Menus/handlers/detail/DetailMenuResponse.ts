import IDeserialize from "app/interfaces/deserialize";

export default class DetailMenuResponse implements IDeserialize
{
    key: number;
    title: string;
    displayOrder: number;
    language: string;
    url: string;
    isActive: boolean;
    createdAt: string;
    modifiedAt: string;


    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}
