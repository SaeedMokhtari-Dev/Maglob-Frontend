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
    name: string;
    socialNetwork: string;
    job: string;
    smallPicture: string;
    smallPictureChanged: boolean;


    constructor(
    ) {
        makeAutoObservable(this);
    }
}
