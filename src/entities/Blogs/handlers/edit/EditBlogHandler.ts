import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import EditBlogRequest from "./EditBlogRequest";


export default class EditBlogHandler
{
    public static async edit(request: EditBlogRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiBlogEdit, request, true);
        return response;
    }
}
