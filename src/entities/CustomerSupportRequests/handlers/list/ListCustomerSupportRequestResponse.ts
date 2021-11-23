import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import CustomerSupportRequestListItem from "./CustomerSupportRequestListItem";

export default class ListCustomerSupportRequestResponse implements IDeserialize
{
    items: CustomerSupportRequestListItem[];

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new CustomerSupportRequestListItem().deserialize(x));

        return this;
    }
}
