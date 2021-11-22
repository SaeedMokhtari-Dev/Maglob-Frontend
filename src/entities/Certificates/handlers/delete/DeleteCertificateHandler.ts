import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DeleteCertificateRequest from "./DeleteCertificateRequest";


export default class DeleteCertificateHandler
{
    public static async delete(request: DeleteCertificateRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiCertificateDelete, request, true);
        return response;
    }
}
