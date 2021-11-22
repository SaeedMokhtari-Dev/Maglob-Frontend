import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DetailSettingRequest from "./DetailSettingRequest";


export default class DetailSettingHandler
{
    public static async detail(request: DetailSettingRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiSettingDetail, request, true);
        return response;
    }
}
