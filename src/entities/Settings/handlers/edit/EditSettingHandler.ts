import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import EditSettingRequest from "./EditSettingRequest";


export default class EditSettingHandler
{
    public static async edit(request: EditSettingRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiSettingEdit, request, true);
        return response;
    }
}
