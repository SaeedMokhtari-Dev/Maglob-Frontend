import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DetailAttachmentRequest from "./DetailAttachmentRequest";

export default class DetailAttachmentHandler
{
    public static async detail(request: DetailAttachmentRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiAttachmentDetail, request, true);
        return response;
    }
}
