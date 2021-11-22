import IDeserialize from "../../../../app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";

export default class UserItem implements IDeserialize
{
    key: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    username: string;
    password: string;
    isActive: boolean;
    createdAt: string;
    modifiedAt: string;
    lastLoginAt: string;


    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}
