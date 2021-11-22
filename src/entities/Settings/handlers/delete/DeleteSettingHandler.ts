import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DeleteSettingRequest from "./DeleteSettingRequest";


export default class DeleteSettingHandler
{
    public static async delete(request: DeleteSettingRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiSettingDelete, request, true);
        return response;
    }
}
