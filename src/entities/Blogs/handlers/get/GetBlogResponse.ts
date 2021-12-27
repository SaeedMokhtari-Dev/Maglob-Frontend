import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import BlogItem from "./BlogItem";

export default class GetBlogResponse implements IDeserialize
{
    items: BlogItem[] = [];
    totalCount: number;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new BlogItem().deserialize(x));
        this.totalCount = this.totalCount;

        return this;
    }
}
