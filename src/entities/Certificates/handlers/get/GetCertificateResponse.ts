import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import CertificateItem from "./CertificateItem";

export default class GetCertificateResponse implements IDeserialize
{
    items: CertificateItem[] = [];
    totalCount: number;

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new CertificateItem().deserialize(x));
        this.totalCount = this.totalCount;

        return this;
    }
}
