import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import AddBlogRequest from "./AddBlogRequest";


export default class AddBlogHandler
{
    public static async add(request: AddBlogRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiBlogAdd, request, true);
        return response;
    }
}
