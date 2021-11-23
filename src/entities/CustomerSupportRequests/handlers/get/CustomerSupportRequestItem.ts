import IDeserialize from "../../../../app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";

export default class CustomerSupportRequestItem implements IDeserialize
{
    key: number;
    name: string;
    phoneNumber: string;
    description: string;
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
