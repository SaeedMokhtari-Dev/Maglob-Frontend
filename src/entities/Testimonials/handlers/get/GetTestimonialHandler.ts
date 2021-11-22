import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import GetTestimonialRequest from "./GetTestimonialRequest";

export default class GetTestimonialHandler
{
    public static async get(request: GetTestimonialRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiTestimonialGet, request, true);
        return response;
    }
}
