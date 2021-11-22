import IDeserialize from "app/interfaces/deserialize";

export default class UserInfo implements IDeserialize
{
    id: number;
    name: string;
    username: string;
    roles: number[];

    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}
