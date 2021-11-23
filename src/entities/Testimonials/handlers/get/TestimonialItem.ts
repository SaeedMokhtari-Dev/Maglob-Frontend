import IDeserialize from "../../../../app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";

export default class TestimonialItem implements IDeserialize
{
    key: number;
    title: string;
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
