import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DetailCertificateRequest from "./DetailCertificateRequest";


export default class DetailCertificateHandler
{
    public static async detail(request: DetailCertificateRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiCertificateDetail, request, true);
        return response;
    }
}
