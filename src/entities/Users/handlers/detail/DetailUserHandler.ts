import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DetailUserRequest from "./DetailUserRequest";


export default class DetailUserHandler
{
    public static async detail(request: DetailUserRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiUserDetail, request, true);
        return response;
    }
}
