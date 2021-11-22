import {makeAutoObservable} from "mobx";

export default class AddTestimonialRequest
{
    comment: string;
    title: string;
    picture: string;
    isActive: boolean;
    language: string;


    constructor(
    ) {
        makeAutoObservable(this);
    }
}
