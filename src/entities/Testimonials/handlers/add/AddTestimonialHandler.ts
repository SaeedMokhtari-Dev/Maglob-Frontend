import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import AddTestimonialRequest from "./AddTestimonialRequest";


export default class AddTestimonialHandler
{
    public static async add(request: AddTestimonialRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiTestimonialAdd, request, true);
        return response;
    }
}
