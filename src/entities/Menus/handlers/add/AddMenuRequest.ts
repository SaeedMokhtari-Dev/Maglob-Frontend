import {makeAutoObservable} from "mobx";

export default class AddMenuRequest
{
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
