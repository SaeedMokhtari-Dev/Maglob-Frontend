import {makeAutoObservable} from "mobx";

export default class AddBlogRequest
{
    title: string;
    description: string;
    picture: string;
    //publishedDate: string;
    displayOrder: number;
    isActive: boolean;
    /*createdAt: string;
    modifiedAt: string;*/
    language: string;



    constructor(
    ) {
        makeAutoObservable(this);
    }
}
