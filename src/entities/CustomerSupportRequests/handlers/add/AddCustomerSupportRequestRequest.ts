import {makeAutoObservable} from "mobx";

export default class AddCustomerSupportRequestRequest
{
    name: string;
    phoneNumber: string;
    description: string;
    createdAt: string;
    modifiedAt: string;


    constructor(
    ) {
        makeAutoObservable(this);
    }
}
