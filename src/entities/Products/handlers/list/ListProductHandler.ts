import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import ListProductRequest from "./ListProductRequest";

export default class ListProductHandler
{
    public static async get(request: ListProductRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiProductList, request, true);
        return response;
    }
}
