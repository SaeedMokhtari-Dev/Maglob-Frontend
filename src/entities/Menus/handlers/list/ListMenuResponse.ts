import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import MenuListItem from "./MenuListItem";

export default class ListMenuResponse implements IDeserialize
{
    items: MenuListItem[];

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new MenuListItem().deserialize(x));

        return this;
    }
}
