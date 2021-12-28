import IDeserialize from "app/interfaces/deserialize";

export default class DetailTestimonialResponse implements IDeserialize
{
    key: number;
    comment: string;
    title: string;
    picture: string;
    isActive: boolean;
    createdAt: string;
    modifiedAt: string;
    language: string;
    name: string;
    socialNetwork: string;
    job: string;
    smallPicture: string;

    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}
