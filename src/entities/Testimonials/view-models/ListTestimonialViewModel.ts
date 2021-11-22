import {makeAutoObservable} from "mobx";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import ListTestimonialRequest from "../handlers/list/ListTestimonialRequest";
import ListTestimonialHandler from "../handlers/list/ListTestimonialHandler";
import ListTestimonialResponse from "../handlers/list/ListTestimonialResponse";

export default class ListTestimonialViewModel {
    
    isProcessing: boolean;
    errorMessage: string;
    listTestimonialResponse: ListTestimonialResponse = new ListTestimonialResponse();


    constructor() {
        makeAutoObservable(this);
    }

    public async getTestimonialList()  {
        try {
            
            this.isProcessing = true;

            let request = new ListTestimonialRequest();
            let response = await ListTestimonialHandler.get(request);

            if (response && response.success) {

                this.listTestimonialResponse = new ListTestimonialResponse();
                let result = response.data;
                //let items = result.items;
                this.listTestimonialResponse.items = result;

                return this.listTestimonialResponse;
            } else {
                this.errorMessage = getLocalizedString(response.message);
            }
        } catch (e) {
            this.errorMessage = i18next.t('Testimonials.Error.List.Message');
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
}
