import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DeleteTestimonialRequest from "./DeleteTestimonialRequest";


export default class DeleteTestimonialHandler
{
    public static async delete(request: DeleteTestimonialRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiTestimonialDelete, request, true);
        return response;
    }
}
