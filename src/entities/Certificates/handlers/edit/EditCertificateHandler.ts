import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import EditCertificateRequest from "./EditCertificateRequest";


export default class EditCertificateHandler
{
    public static async edit(request: EditCertificateRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiCertificateEdit, request, true);
        return response;
    }
}
