import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import ActiveUserRequest from "./ActiveUserRequest";


export default class ActiveUserHandler
{
    public static async active(request: ActiveUserRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiUserActive, request, true);
        return response;
    }
}
