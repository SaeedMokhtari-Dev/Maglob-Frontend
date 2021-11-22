import TestimonialItem from "../handlers/get/TestimonialItem";
import AddTestimonialRequest from "../handlers/add/AddTestimonialRequest";
import TestimonialStore from "../stores/TestimonialStore";
import {makeAutoObservable} from "mobx";
import GetTestimonialRequest from "../handlers/get/GetTestimonialRequest";
import GetTestimonialHandler from "../handlers/get/GetTestimonialHandler";
import GetTestimonialResponse from "../handlers/get/GetTestimonialResponse";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DeleteTestimonialHandler from "../handlers/delete/DeleteTestimonialHandler";
import DeleteTestimonialRequest from "../handlers/delete/DeleteTestimonialRequest";
import {message} from "antd";

export default class GetTestimonialViewModel {
    columns: any[];
    testimonialList: TestimonialItem[];
    totalSize: number;
    isProcessing: boolean;
    errorMessage: string;
    pageIndex: number;
    pageSize: number;

    addTestimonialRequest: AddTestimonialRequest = new AddTestimonialRequest();
    addedSuccessfully: boolean;

    constructor(public testimonialStore: TestimonialStore) {
        makeAutoObservable(this);

    }

    public async getAllTestimonial(getTestimonialsRequest: GetTestimonialRequest) {
        try {
            this.isProcessing = true;
            let response = await GetTestimonialHandler.get(getTestimonialsRequest);


            if (response && response.success) {

                let result = response.data;
                let items = result.items;
                this.testimonialList = items;
                this.totalSize = result.totalCount;
                this.addedSuccessfully = true;
            } else {
                this.errorMessage = getLocalizedString(response.message);
                this.addedSuccessfully = false;
            }
        } catch (e) {
            this.errorMessage = i18next.t('Testimonials.Error.Get.Message');
            this.addedSuccessfully = false;
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
    public async deleteTestimonial(key: number)
    {
        try
        {

            this.errorMessage = "";
            let request = new DeleteTestimonialRequest();
            request.testimonialId = key;
            let response = await DeleteTestimonialHandler.delete(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                await this.getAllTestimonial(new GetTestimonialRequest(this.pageSize, this.pageIndex));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
                message.error(this.errorMessage);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Testimonials.Error.Delete.Message');
            message.error(this.errorMessage);
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }

}
