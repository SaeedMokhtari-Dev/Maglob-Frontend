import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import ProductListItem from "./ProductListItem";

export default class ListProductResponse implements IDeserialize
{
    items: ProductListItem[];

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new ProductListItem().deserialize(x));

        return this;
    }
}
