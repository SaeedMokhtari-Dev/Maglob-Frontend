import IDeserialize from "app/interfaces/deserialize";

export default class DetailBlogResponse implements IDeserialize
{
    key: number;
    title: string;
    description: string;
    picture: string;
    publishedDate: string;
    displayOrder: number;
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
