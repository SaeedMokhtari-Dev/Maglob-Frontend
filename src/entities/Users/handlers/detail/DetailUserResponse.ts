import IDeserialize from "app/interfaces/deserialize";

export default class DetailUserResponse implements IDeserialize
{
    key: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    username: string;
    password: string;
    isActive: boolean;
    createdAt: string;
    modifiedAt: string;
    lastLoginAt: string;
    roleId: number;

    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}
