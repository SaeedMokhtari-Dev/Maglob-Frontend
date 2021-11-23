import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import DynamicPageListItem from "./DynamicPageListItem";

export default class ListDynamicPageResponse implements IDeserialize
{
    items: DynamicPageListItem[];

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new DynamicPageListItem().deserialize(x));

        return this;
    }
}
