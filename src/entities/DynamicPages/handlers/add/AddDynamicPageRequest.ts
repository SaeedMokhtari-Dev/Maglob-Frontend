import {makeAutoObservable} from "mobx";

export default class AddDynamicPageRequest
{
    title: string;
    descriptionSeo: string;
    editor: string;
    isActive: boolean;
    language: string;



    constructor(
    ) {
        makeAutoObservable(this);
    }
}
