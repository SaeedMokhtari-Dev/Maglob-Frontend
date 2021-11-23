import IDeserialize from "../../../../app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";

export default class ProductItem implements IDeserialize
{
    key: number;
    name: string;
    description: string;
    model: string;
    quality: string;
    volume: string;
    displayOrder: number;
    isActive: boolean;
    createdAt: string;
    modifiedAt: string;
    language: string;



    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}
