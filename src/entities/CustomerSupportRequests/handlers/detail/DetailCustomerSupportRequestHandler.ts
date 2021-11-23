import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DetailCustomerSupportRequestRequest from "./DetailCustomerSupportRequestRequest";


export default class DetailCustomerSupportRequestHandler
{
    public static async detail(request: DetailCustomerSupportRequestRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiCustomerSupportRequestDetail, request, true);
        return response;
    }
}
