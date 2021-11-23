import Routes from "app/constants/Routes";

export function getEditUserRoute(userId: number = null): string
{
    return Routes.editUser.replace('/:userId', userId ? `/${userId}` : '');
}
export function getEditMenuRoute(menuId: number = null): string
{
    return Routes.editMenu.replace('/:menuId', menuId ? `/${menuId}` : '');
}
export function getEditSettingRoute(settingId: number = null): string
{
    return Routes.editSetting.replace('/:settingId', settingId ? `/${settingId}` : '');
}
export function getEditCertificateRoute(certificateId: number = null): string
{
    return Routes.editCertificate.replace('/:certificateId', certificateId ? `/${certificateId}` : '');
}
export function getEditTestimonialRoute(testimonialId: number = null): string
{
    return Routes.editTestimonial.replace('/:testimonialId', testimonialId ? `/${testimonialId}` : '');
}
export function getEditDynamicPageRoute(dynamicPageId: number = null): string
{
    return Routes.editDynamicPage.replace('/:dynamicPageId', dynamicPageId ? `/${dynamicPageId}` : '');
}
export function getEditProductRoute(productId: number = null): string
{
    return Routes.editProduct.replace('/:productId', productId ? `/${productId}` : '');
}
export function getEditCustomerSupportRequestRoute(customerSupportRequestId: number = null): string
{
    return Routes.editCustomerSupportRequest.replace('/:customerSupportRequestId', customerSupportRequestId ? `/${customerSupportRequestId}` : '');
}
export function getDetailCustomerSupportRequestRoute(customerSupportRequestId: number = null): string
{
    return Routes.detailCustomerSupportRequest.replace('/:customerSupportRequestId', customerSupportRequestId ? `/${customerSupportRequestId}` : '');
}
