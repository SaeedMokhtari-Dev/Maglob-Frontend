import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import ProductItem from "./ProductItem";

export default class GetProductResponse implements IDeserialize
{
    items: ProductItem[] = [];
    totalCount: number;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new ProductItem().deserialize(x));
        this.totalCount = this.totalCount;

        return this;
    }
}
