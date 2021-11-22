import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import ListTestimonialRequest from "./ListTestimonialRequest";

export default class ListTestimonialHandler
{
    public static async get(request: ListTestimonialRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiTestimonialList, request, true);
        return response;
    }
}
