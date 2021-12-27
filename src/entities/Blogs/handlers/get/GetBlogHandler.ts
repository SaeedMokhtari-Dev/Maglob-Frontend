import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import GetBlogRequest from "./GetBlogRequest";

export default class GetBlogHandler
{
    public static async get(request: GetBlogRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiBlogGet, request, true);
        return response;
    }
}
