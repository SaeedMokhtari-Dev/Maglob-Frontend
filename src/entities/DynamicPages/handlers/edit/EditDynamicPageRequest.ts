import {makeAutoObservable} from "mobx";

export default class EditDynamicPageRequest
{
    dynamicPageId: number;
    title: string;
    descriptionSeo: string;
    editor: string;
    isActive: boolean;
    createdAt: string;
    modifiedAt: string;
    language: string;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
