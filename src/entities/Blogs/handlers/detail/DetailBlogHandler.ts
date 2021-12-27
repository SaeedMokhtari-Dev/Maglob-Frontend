import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DetailBlogRequest from "./DetailBlogRequest";


export default class DetailBlogHandler
{
    public static async detail(request: DetailBlogRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiBlogDetail, request, true);
        return response;
    }
}
