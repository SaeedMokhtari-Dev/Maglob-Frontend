import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import EditCustomerSupportRequestRequest from "./EditCustomerSupportRequestRequest";


export default class EditCustomerSupportRequestHandler
{
    public static async edit(request: EditCustomerSupportRequestRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiCustomerSupportRequestEdit, request, true);
        return response;
    }
}
