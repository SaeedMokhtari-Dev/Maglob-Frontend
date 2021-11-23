import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import GetProductRequest from "./GetProductRequest";

export default class GetProductHandler
{
    public static async get(request: GetProductRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiProductGet, request, true);
        return response;
    }
}
