import {makeAutoObservable} from "mobx";

export default class DeleteCustomerSupportRequestRequest
{
    public customerSupportRequestId: number;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
