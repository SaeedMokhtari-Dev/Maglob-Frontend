import IDeserialize from "../../../../app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";

export default class BlogItem implements IDeserialize
{
    key: number;
    title: string;
    /*description: string;
    picture: string;*/
    publishedDate: string;
    displayOrder: number;
    isActive: boolean;
    /*createdAt: string;
    modifiedAt: string;*/
    language: string;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}
