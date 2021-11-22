import {makeAutoObservable} from "mobx";

export default class EditUserRequest
{
    userId: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    username: string;
    password: string;
    passwordChanged: boolean;
    isActive: boolean;


    constructor(
    ) {
        makeAutoObservable(this);
    }
}
