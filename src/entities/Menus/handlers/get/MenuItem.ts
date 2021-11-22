import IDeserialize from "../../../../app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";

export default class MenuItem implements IDeserialize
{
    key: number;
    title: string;
    displayOrder: number;
    language: string;
    url: string;
    isActive: boolean;
    createdAt: string;
    modifiedAt: string;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}
