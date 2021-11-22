import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import GetCertificateRequest from "./GetCertificateRequest";

export default class GetCertificateHandler
{
    public static async get(request: GetCertificateRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiCertificateGet, request, true);
        return response;
    }
}
