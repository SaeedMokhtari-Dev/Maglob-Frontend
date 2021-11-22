import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import AddCertificateRequest from "./AddCertificateRequest";


export default class AddCertificateHandler
{
    public static async add(request: AddCertificateRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiCertificateAdd, request, true);
        return response;
    }
}
