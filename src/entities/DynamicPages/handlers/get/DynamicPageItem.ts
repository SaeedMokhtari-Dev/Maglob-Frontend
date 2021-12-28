import IDeserialize from "../../../../app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";

export default class DynamicPageItem implements IDeserialize
{
    key: number;
    title: string;
    descriptionSeo: string;
    isActive: boolean;
    createdAt: string;
    modifiedAt: string;
    language: string;
    url: string;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}
