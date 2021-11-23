import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DeleteDynamicPageRequest from "./DeleteDynamicPageRequest";


export default class DeleteDynamicPageHandler
{
    public static async delete(request: DeleteDynamicPageRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiDynamicPageDelete, request, true);
        return response;
    }
}
