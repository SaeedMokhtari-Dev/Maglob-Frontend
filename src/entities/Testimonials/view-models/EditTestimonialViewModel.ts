import {makeAutoObservable} from "mobx";

import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DetailTestimonialHandler from "../handlers/detail/DetailTestimonialHandler";
import DetailTestimonialRequest from "../handlers/detail/DetailTestimonialRequest";
import AddTestimonialRequest from "../handlers/add/AddTestimonialRequest";
import EditTestimonialRequest from "../handlers/edit/EditTestimonialRequest";
import AddTestimonialHandler from "../handlers/add/AddTestimonialHandler";
import {message} from "antd";
import EditTestimonialHandler from "../handlers/edit/EditTestimonialHandler";
import DetailTestimonialResponse from "../handlers/detail/DetailTestimonialResponse";
import TestimonialStore from "../stores/TestimonialStore";

export default class EditTestimonialViewModel
{
    isProcessing: boolean;
    errorMessage: string;
    key: number;
    uploadLoading: boolean;

    detailTestimonialResponse: DetailTestimonialResponse = new DetailTestimonialResponse();
    addTestimonialRequest: AddTestimonialRequest = new AddTestimonialRequest();
    editTestimonialRequest: EditTestimonialRequest = new EditTestimonialRequest();


    constructor(public testimonialStore: TestimonialStore) {
        makeAutoObservable(this);
    }
    public async getDetailTestimonial(testimonialId: number)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let request = new DetailTestimonialRequest(testimonialId);
            let response = await DetailTestimonialHandler.detail(request);

            if(response && response.success)
            {

                this.detailTestimonialResponse = new DetailTestimonialResponse().deserialize(response.data);
                this.editTestimonialRequest = new EditTestimonialRequest();
                for ( let i in this.editTestimonialRequest )
                    if ( this.detailTestimonialResponse.hasOwnProperty( i ) )
                        this.editTestimonialRequest[i] = this.detailTestimonialResponse[i];


                return this.detailTestimonialResponse;
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Testimonials.Error.Detail.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async addTestimonial(request: AddTestimonialRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;

            let response = await AddTestimonialHandler.add(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));                
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Testimonials.Error.Add.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
    public async editTestimonial(request: EditTestimonialRequest)
    {
        try
        {
            this.errorMessage = "";
            this.isProcessing = true;
            

            let response = await EditTestimonialHandler.edit(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Testimonials.Error.Edit.Message');
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }
}
