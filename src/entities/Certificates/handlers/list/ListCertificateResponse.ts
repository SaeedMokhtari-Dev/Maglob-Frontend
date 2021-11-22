import IDeserialize from "app/interfaces/deserialize";
import {makeAutoObservable} from "mobx";
import CertificateListItem from "./CertificateListItem";

export default class ListCertificateResponse implements IDeserialize
{
    items: CertificateListItem[];

    constructor() {
        makeAutoObservable(this);
    }

    deserialize(input: any): this
    {
        Object.assign(this, input);

        this.items = this.items.map(x => new CertificateListItem().deserialize(x));

        return this;
    }
}
