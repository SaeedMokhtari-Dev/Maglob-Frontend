import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import GetUserRequest from "./GetUserRequest";

export default class GetUserHandler
{
    public static async get(request: GetUserRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiUserGet, request, true);
        return response;
    }
}
