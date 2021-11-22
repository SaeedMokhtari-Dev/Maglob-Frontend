import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import UserItem from "./UserItem";

export default class GetUserResponse implements IDeserialize
{
    items: UserItem[] = [];
    totalCount: number;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new UserItem().deserialize(x));
        this.totalCount = this.totalCount;

        return this;
    }
}
