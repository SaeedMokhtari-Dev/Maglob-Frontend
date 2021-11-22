import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import AddSettingRequest from "./AddSettingRequest";


export default class AddSettingHandler
{
    public static async add(request: AddSettingRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiSettingAdd, request, true);
        return response;
    }
}
