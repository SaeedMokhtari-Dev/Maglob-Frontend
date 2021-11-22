import {makeAutoObservable} from "mobx";

export default class DeleteTestimonialRequest
{
    public testimonialId: number;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
