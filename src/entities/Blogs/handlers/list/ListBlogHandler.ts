import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import ListBlogRequest from "./ListBlogRequest";

export default class ListBlogHandler
{
    public static async get(request: ListBlogRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiBlogList, request, true);
        return response;
    }
}
