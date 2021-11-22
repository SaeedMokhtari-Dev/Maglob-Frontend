import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import GetSettingRequest from "./GetSettingRequest";

export default class GetSettingHandler
{
    public static async get(request: GetSettingRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiSettingGet, request, true);
        return response;
    }
}
