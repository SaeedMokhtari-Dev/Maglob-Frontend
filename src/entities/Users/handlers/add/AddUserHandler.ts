import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import AddUserRequest from "./AddUserRequest";


export default class AddUserHandler
{
    public static async add(request: AddUserRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiUserAdd, request, true);
        return response;
    }
}
