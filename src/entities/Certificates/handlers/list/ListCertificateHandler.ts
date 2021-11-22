import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import ListCertificateRequest from "./ListCertificateRequest";

export default class ListCertificateHandler
{
    public static async get(request: ListCertificateRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiCertificateList, request, true);
        return response;
    }
}
