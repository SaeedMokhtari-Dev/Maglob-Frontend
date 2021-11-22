import MenuItem from "../handlers/get/MenuItem";
import AddMenuRequest from "../handlers/add/AddMenuRequest";
import MenuStore from "../stores/MenuStore";
import {makeAutoObservable} from "mobx";
import GetMenuRequest from "../handlers/get/GetMenuRequest";
import GetMenuHandler from "../handlers/get/GetMenuHandler";
import GetMenuResponse from "../handlers/get/GetMenuResponse";
import {getLocalizedString} from "../../../app/utils/Localization";
import i18next from "i18next";
import log from "loglevel";
import DeleteMenuHandler from "../handlers/delete/DeleteMenuHandler";
import DeleteMenuRequest from "../handlers/delete/DeleteMenuRequest";
import {message} from "antd";

export default class GetMenuViewModel {
    columns: any[];
    menuList: MenuItem[];
    totalSize: number;
    isProcessing: boolean;
    errorMessage: string;
    pageIndex: number;
    pageSize: number;

    addMenuRequest: AddMenuRequest = new AddMenuRequest();
    addedSuccessfully: boolean;

    constructor(public menuStore: MenuStore) {
        makeAutoObservable(this);

    }

    public async getAllMenu(getMenusRequest: GetMenuRequest) {
        try {
            this.isProcessing = true;
            let response = await GetMenuHandler.get(getMenusRequest);


            if (response && response.success) {

                let result = response.data;
                let items = result.items;
                this.menuList = items;
                this.totalSize = result.totalCount;
                this.addedSuccessfully = true;
            } else {
                this.errorMessage = getLocalizedString(response.message);
                this.addedSuccessfully = false;
            }
        } catch (e) {
            this.errorMessage = i18next.t('Menus.Error.Get.Message');
            this.addedSuccessfully = false;
            log.error(e);
        } finally {
            this.isProcessing = false;
        }
    }
    public async deleteMenu(key: number)
    {
        try
        {

            this.errorMessage = "";
            let request = new DeleteMenuRequest();
            request.menuId = key;
            let response = await DeleteMenuHandler.delete(request);

            if(response && response.success)
            {
                message.success(getLocalizedString(response.message));
                await this.getAllMenu(new GetMenuRequest(this.pageSize, this.pageIndex));
            }
            else{
                this.errorMessage = getLocalizedString(response.message);
                message.error(this.errorMessage);
            }
        }
        catch(e)
        {
            this.errorMessage = i18next.t('Menus.Error.Delete.Message');
            message.error(this.errorMessage);
            log.error(e);
        }
        finally
        {
            this.isProcessing = false;
        }
    }

}
