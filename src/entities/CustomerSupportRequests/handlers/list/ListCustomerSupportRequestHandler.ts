import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import ListCustomerSupportRequestRequest from "./ListCustomerSupportRequestRequest";

export default class ListCustomerSupportRequestHandler
{
    public static async get(request: ListCustomerSupportRequestRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiCustomerSupportRequestList, request, true);
        return response;
    }
}
