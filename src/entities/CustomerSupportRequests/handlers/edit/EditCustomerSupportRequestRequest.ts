import {makeAutoObservable} from "mobx";

export default class EditCustomerSupportRequestRequest
{
    customerSupportRequestId: number;
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
