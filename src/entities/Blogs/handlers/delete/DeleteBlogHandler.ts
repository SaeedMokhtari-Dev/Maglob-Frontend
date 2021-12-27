import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DeleteBlogRequest from "./DeleteBlogRequest";


export default class DeleteBlogHandler
{
    public static async delete(request: DeleteBlogRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiBlogDelete, request, true);
        return response;
    }
}
