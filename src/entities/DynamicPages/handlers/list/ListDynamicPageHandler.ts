import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import ListDynamicPageRequest from "./ListDynamicPageRequest";

export default class ListDynamicPageHandler
{
    public static async get(request: ListDynamicPageRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiDynamicPageList, request, true);
        return response;
    }
}
