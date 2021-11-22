import {makeAutoObservable} from "mobx";

export default class ActiveUserRequest
{
    public userId: number;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
