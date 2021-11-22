import {makeAutoObservable} from "mobx";

export default class EditTestimonialRequest
{
    testimonialId: number;
    comment: string;
    title: string;
    picture: string;
    pictureChanged: string;
    isActive: boolean;
    language: string;


    constructor(
    ) {
        makeAutoObservable(this);
    }
}
