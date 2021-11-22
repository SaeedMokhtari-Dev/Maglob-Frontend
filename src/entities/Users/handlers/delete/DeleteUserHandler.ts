import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DeleteUserRequest from "./DeleteUserRequest";


export default class DeleteUserHandler
{
    public static async delete(request: DeleteUserRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiUserDelete, request, true);
        return response;
    }
}
