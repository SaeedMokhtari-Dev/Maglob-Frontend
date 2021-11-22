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
