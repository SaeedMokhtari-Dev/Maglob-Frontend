import {makeAutoObservable} from "mobx";

export default class DeleteProductRequest
{
    public productId: number;

    constructor(
    ) {
        makeAutoObservable(this);
    }
}
