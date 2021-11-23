import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import GetCustomerSupportRequestRequest from "./GetCustomerSupportRequestRequest";

export default class GetCustomerSupportRequestHandler
{
    public static async get(request: GetCustomerSupportRequestRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiCustomerSupportRequestGet, request, true);
        return response;
    }
}
