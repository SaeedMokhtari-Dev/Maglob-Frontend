import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";

export default class GetAdminResponse implements IDeserialize
{
    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        return this;
    }
}
