import {makeAutoObservable} from "mobx";

export default class DeleteUserRequest
{
    public userId: number;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
