import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import AddCustomerSupportRequestRequest from "./AddCustomerSupportRequestRequest";


export default class AddCustomerSupportRequestHandler
{
    public static async add(request: AddCustomerSupportRequestRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiCustomerSupportRequestAdd, request, true);
        return response;
    }
}
