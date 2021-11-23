import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DeleteProductRequest from "./DeleteProductRequest";


export default class DeleteProductHandler
{
    public static async delete(request: DeleteProductRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiProductDelete, request, true);
        return response;
    }
}
