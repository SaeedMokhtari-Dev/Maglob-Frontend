import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import TestimonialItem from "./TestimonialItem";

export default class GetTestimonialResponse implements IDeserialize
{
    items: TestimonialItem[] = [];
    totalCount: number;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new TestimonialItem().deserialize(x));
        this.totalCount = this.totalCount;

        return this;
    }
}
