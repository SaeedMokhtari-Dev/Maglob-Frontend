import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import EditUserRequest from "./EditUserRequest";


export default class EditUserHandler
{
    public static async edit(request: EditUserRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiUserEdit, request, true);
        return response;
    }
}
