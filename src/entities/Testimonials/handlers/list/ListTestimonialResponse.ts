import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import TestimonialListItem from "./TestimonialListItem";

export default class ListTestimonialResponse implements IDeserialize
{
    items: TestimonialListItem[];

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new TestimonialListItem().deserialize(x));

        return this;
    }
}
