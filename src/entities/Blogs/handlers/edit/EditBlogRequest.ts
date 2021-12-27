import {makeAutoObservable} from "mobx";

export default class EditBlogRequest
{
    blogId: number;
    title: string;
    description: string;
    picture: string;
    pictureChanged: boolean;
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
