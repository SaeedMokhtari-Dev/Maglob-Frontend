import AuthStore from "auth/stores/AuthStore";
import PageStore from "page/stores/PageStore";
import AdminStore from "admin/stores/AdminStore";
import CustomerStore from "../../customer/stores/CustomerStore";
import UserStore from "../../entities/Users/stores/UserStore";
import MenuStore from "../../entities/Menus/stores/MenuStore";
import SettingStore from "../../entities/Settings/stores/SettingStore";
import CertificateStore from "../../entities/Certificates/stores/CertificateStore";
import TestimonialStore from "../../entities/Testimonials/stores/TestimonialStore";
import DynamicPageStore from "../../entities/DynamicPages/stores/DynamicPageStore";

export class AppStore
{
    auth: AuthStore;
    page: PageStore;
    customer: CustomerStore;
    admin: AdminStore;
    user: UserStore;
    menu: MenuStore;
    setting: SettingStore;
    certificateStore: CertificateStore;
    testimonialStore: TestimonialStore;
    dynamicPageStore: DynamicPageStore;

    constructor()
    {
        this.auth = new AuthStore(this);
        this.page = new PageStore(this);
        this.customer = new CustomerStore(this);
        this.admin = new AdminStore(this);
        this.user = new UserStore(this);
        this.menu = new MenuStore(this);
        this.setting = new SettingStore(this);
        this.certificateStore = new CertificateStore(this);
        this.testimonialStore = new TestimonialStore(this);
        this.dynamicPageStore = new DynamicPageStore(this);
    }
}
