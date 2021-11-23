import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import CustomerSupportRequestItem from "./CustomerSupportRequestItem";

export default class GetCustomerSupportRequestResponse implements IDeserialize
{
    items: CustomerSupportRequestItem[] = [];
    totalCount: number;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new CustomerSupportRequestItem().deserialize(x));
        this.totalCount = this.totalCount;

        return this;
    }
}
