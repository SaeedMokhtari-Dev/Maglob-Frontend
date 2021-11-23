import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DeleteCustomerSupportRequestRequest from "./DeleteCustomerSupportRequestRequest";


export default class DeleteCustomerSupportRequestHandler
{
    public static async delete(request: DeleteCustomerSupportRequestRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiCustomerSupportRequestDelete, request, true);
        return response;
    }
}
