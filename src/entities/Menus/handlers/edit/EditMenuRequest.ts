import {makeAutoObservable} from "mobx";

export default class EditMenuRequest
{
    menuId: number;
    title: string;
    displayOrder: number;
    language: string;
    url: string;
    isActive: boolean;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
