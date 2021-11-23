import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import AddProductRequest from "./AddProductRequest";


export default class AddProductHandler
{
    public static async add(request: AddProductRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiProductAdd, request, true);
        return response;
    }
}
