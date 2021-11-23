import IDeserialize from "app/interfaces/deserialize";

export default class DetailCustomerSupportRequestResponse implements IDeserialize
{
    key: number;
    name: string;
    phoneNumber: string;
    description: string;
    createdAt: string;
    modifiedAt: string;



    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}
