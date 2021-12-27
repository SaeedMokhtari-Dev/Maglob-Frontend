import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import BlogListItem from "./BlogListItem";

export default class ListBlogResponse implements IDeserialize
{
    items: BlogListItem[];

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new BlogListItem().deserialize(x));

        return this;
    }
}
