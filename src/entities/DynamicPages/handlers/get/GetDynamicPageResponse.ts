import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import DynamicPageItem from "./DynamicPageItem";

export default class GetDynamicPageResponse implements IDeserialize
{
    items: DynamicPageItem[] = [];
    totalCount: number;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new DynamicPageItem().deserialize(x));
        this.totalCount = this.totalCount;

        return this;
    }
}
