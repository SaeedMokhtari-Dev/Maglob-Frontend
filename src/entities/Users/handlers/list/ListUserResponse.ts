import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import UserListItem from "./UserListItem";

export default class ListUserResponse implements IDeserialize
{
    items: UserListItem[];

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new UserListItem().deserialize(x));

        return this;
    }
}
