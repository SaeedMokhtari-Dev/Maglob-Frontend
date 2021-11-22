import {makeAutoObservable} from "mobx";

export default class AddSettingRequest
{
    websiteLogoImage: string;
    websiteTitle: string;
    language: string;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
