import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import SettingItem from "./SettingItem";

export default class GetSettingResponse implements IDeserialize
{
    items: SettingItem[] = [];
    totalCount: number;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new SettingItem().deserialize(x));
        this.totalCount = this.totalCount;

        return this;
    }
}
