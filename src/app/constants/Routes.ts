export default
{
    auth: "/auth",
    register: "/auth/register",

    resetPassword: "/auth/password/reset",
    changePassword: "/auth/password/change/:token",
    unknown: "/unknown",

    app: "/app",

    // Admin
    // User
    user: "/app/user",
    editUser: "/app/user/edit/:userId",
    addUser: "/app/user/add",
    presentUser: "/app/user/present/:electionId",
    // Menu
    menu: "/app/menu",
    editMenu: "/app/menu/edit/:menuId",
    addMenu: "/app/menu/add",
    // CustomerSupportRequest
    customerSupportRequest: "/app/customerSupportRequest",
    editCustomerSupportRequest: "/app/customerSupportRequest/:customerSupportRequestId/edit",
    detailCustomerSupportRequest: "/app/customerSupportRequest/:customerSupportRequestId/detail",
    addCustomerSupportRequest: "/app/customerSupportRequest/add",
    // Setting
    setting: "/app/setting",
    editSetting: "/app/setting/edit/:settingId",
    addSetting: "/app/setting/add",
    // Certificate
    certificate: "/app/certificate",
    editCertificate: "/app/certificate/edit/:certificateId",
    addCertificate: "/app/certificate/add",
    // Testimonial
    testimonial: "/app/testimonial",
    editTestimonial: "/app/testimonial/edit/:testimonialId",
    addTestimonial: "/app/testimonial/add",
    // DynamicPage
    dynamicPage: "/app/dynamicPage",
    editDynamicPage: "/app/dynamicPage/edit/:dynamicPageId",
    addDynamicPage: "/app/dynamicPage/add",
    // Product
    product: "/app/product",
    editProduct: "/app/product/edit/:productId",
    addProduct: "/app/product/add",
}
