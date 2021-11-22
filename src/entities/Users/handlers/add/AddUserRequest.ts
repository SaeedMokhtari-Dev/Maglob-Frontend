import {makeAutoObservable} from "mobx";

export default class AddUserRequest
{
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    username: string;
    password: string;
    isActive: boolean;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
