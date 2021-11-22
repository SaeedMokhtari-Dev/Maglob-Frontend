import {makeAutoObservable} from "mobx";

export default class DeleteSettingRequest
{
    public settingId: number;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
