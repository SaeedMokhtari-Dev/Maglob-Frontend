import IDeserialize from "app/interfaces/deserialize";

export default class DetailSettingResponse implements IDeserialize
{
    key: number;
    websiteLogoImage: string;
    websiteTitle: string;
    language: string;



    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}
