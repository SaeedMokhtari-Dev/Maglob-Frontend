import {makeAutoObservable} from "mobx";

export default class AddTestimonialRequest
{
    comment: string;
    title: string;
    picture: string;
    isActive: boolean;
    language: string;
    name: string;
    socialNetwork: string;
    job: string;
    smallPicture: string;


    constructor(
    ) {
        makeAutoObservable(this);
    }
}
