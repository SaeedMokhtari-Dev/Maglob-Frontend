import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import GetDynamicPageRequest from "./GetDynamicPageRequest";

export default class GetDynamicPageHandler
{
    public static async get(request: GetDynamicPageRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiDynamicPageGet, request, true);
        return response;
    }
}
