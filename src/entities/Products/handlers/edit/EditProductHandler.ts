import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import EditProductRequest from "./EditProductRequest";


export default class EditProductHandler
{
    public static async edit(request: EditProductRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiProductEdit, request, true);
        return response;
    }
}
