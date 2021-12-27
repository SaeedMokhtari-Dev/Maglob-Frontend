import {makeAutoObservable} from "mobx";

export default class DeleteBlogRequest
{
    public blogId: number;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
