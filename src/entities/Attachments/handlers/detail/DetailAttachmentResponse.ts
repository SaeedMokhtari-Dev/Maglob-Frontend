import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";

export default class DetailAttachmentResponse implements IDeserialize
{
    image: string;


    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        return this;
    }
}
