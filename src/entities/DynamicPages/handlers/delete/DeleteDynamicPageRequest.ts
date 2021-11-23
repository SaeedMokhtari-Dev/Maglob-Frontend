import {makeAutoObservable} from "mobx";

export default class DeleteDynamicPageRequest
{
    public dynamicPageId: number;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
