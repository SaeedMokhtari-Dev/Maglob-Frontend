import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import EditTestimonialRequest from "./EditTestimonialRequest";


export default class EditTestimonialHandler
{
    public static async edit(request: EditTestimonialRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiTestimonialEdit, request, true);
        return response;
    }
}
