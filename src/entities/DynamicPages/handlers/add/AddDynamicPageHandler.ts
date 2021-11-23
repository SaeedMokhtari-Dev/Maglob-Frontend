import ApiResponse from "app/models/ApiResponse";
import ApiService from "app/services/ApiService";
import Endpoints from "app/constants/Endpoints";
import AddDynamicPageRequest from "./AddDynamicPageRequest";


export default class AddDynamicPageHandler
{
    public static async add(request: AddDynamicPageRequest): Promise<ApiResponse>
    {
        let response = await ApiService.post(Endpoints.apiDynamicPageAdd, request, true);
        return response;
    }
}
