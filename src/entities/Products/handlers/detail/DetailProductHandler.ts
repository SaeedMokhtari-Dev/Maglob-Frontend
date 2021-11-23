import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import DetailProductRequest from "./DetailProductRequest";


export default class DetailProductHandler
{
    public static async detail(request: DetailProductRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiProductDetail, request, true);
        return response;
    }
}
