import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DetailTestimonialRequest from "./DetailTestimonialRequest";


export default class DetailTestimonialHandler
{
    public static async detail(request: DetailTestimonialRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiTestimonialDetail, request, true);
        return response;
    }
}
