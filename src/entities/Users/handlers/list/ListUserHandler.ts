import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import ListUserRequest from "./ListUserRequest";

export default class ListUserHandler
{
    public static async get(request: ListUserRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiUserList, request, true);
        return response;
    }
}
