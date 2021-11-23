import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import EditDynamicPageRequest from "./EditDynamicPageRequest";


export default class EditDynamicPageHandler
{
    public static async edit(request: EditDynamicPageRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiDynamicPageEdit, request, true);
        return response;
    }
}
