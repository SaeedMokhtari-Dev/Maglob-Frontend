import IDeserialize from "app/interfaces/deserialize";

export default class DetailDynamicPageResponse implements IDeserialize
{
    key: number;
    title: string;
    descriptionSeo: string;
    editor: string;
    isActive: boolean;
    createdAt: string;
    modifiedAt: string;
    language: string;
    url: string;

    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}
