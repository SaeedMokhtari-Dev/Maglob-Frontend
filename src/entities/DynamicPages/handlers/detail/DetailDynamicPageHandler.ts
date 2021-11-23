import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DetailDynamicPageRequest from "./DetailDynamicPageRequest";


export default class DetailDynamicPageHandler
{
    public static async detail(request: DetailDynamicPageRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiDynamicPageDetail, request, true);
        return response;
    }
}
