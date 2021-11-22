import {makeAutoObservable} from "mobx";

export default class EditSettingRequest
{
    settingId: number;
    key: number;
    websiteLogoImage: string;
    websiteLogoImageChanged: boolean;
    websiteTitle: string;
    language: string;


    constructor(
    ) {
        makeAutoObservable(this);
    }
}
