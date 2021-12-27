import "antd/dist/antd.min.css";
import "app/styles/style.scss";
import React, {Component, Suspense} from "react";
import { ConfigProvider } from 'antd';
import { Router, Switch, Route, Redirect, useParams } from 'react-router-dom'
import popupContainer from "app/utils/PopupContainer";
import Routes from "app/constants/Routes";
import Login from "auth/login/components/Login";
import history from "app/utils/History";
import NotFoundPage from "app/components/not-found-page/NotFoundPage";
import AuthRoute from "app/components/routes/AuthRoute";
import ProtectedRoute from "app/components/routes/ProtectedRoute";
import ResetPassword from "auth/reset-password/components/ResetPassword";
import ChangePassword from "auth/change-password/components/ChangePassword";
import ProtectedRedirectRoute from "app/components/routes/ProtectedRedirectRoute";
import Page from "page/components/Page";
import RoleType from "identity/constants/RoleType";
import Dashboard from "app/components/common/Dashboard";
import fa_IR from 'antd/lib/locale/fa_IR';
import {DirectionType} from "antd/es/config-provider";
import UserList from "../../entities/Users/components/list/UserList";
import EditUser from "../../entities/Users/components/edit/EditUser";
import MenuList from "../../entities/Menus/components/list/MenuList";
import EditMenu from "../../entities/Menus/components/edit/EditMenu";
import SettingList from "../../entities/Settings/components/list/SettingList";
import EditSetting from "../../entities/Settings/components/edit/EditSetting";
import CertificateList from "../../entities/Certificates/components/list/CertificateList";
import EditCertificate from "../../entities/Certificates/components/edit/EditCertificate";
import TestimonialList from "../../entities/Testimonials/components/list/TestimonialList";
import EditTestimonial from "../../entities/Testimonials/components/edit/EditTestimonial";
import DynamicPageList from "../../entities/DynamicPages/components/list/DynamicPageList";
import EditDynamicPage from "../../entities/DynamicPages/components/edit/EditDynamicPage";
import ProductList from "../../entities/Products/components/list/ProductList";
import EditProduct from "../../entities/Products/components/edit/EditProduct";
import CustomerSupportRequestList
    from "../../entities/CustomerSupportRequests/components/list/CustomerSupportRequestList";
import EditCustomerSupportRequest
    from "../../entities/CustomerSupportRequests/components/edit/EditCustomerSupportRequest";
import DetailCustomerSupportRequest
    from "../../entities/CustomerSupportRequests/components/detail/DetailCustomerSupportRequest";
import BlogList from "../../entities/Blogs/components/list/BlogList";
import EditBlog from "../../entities/Blogs/components/edit/EditBlog";


const App: React.FC = () =>
{
    /*let antLang = en_US;
    let dir: DirectionType = 'ltr';
    const language = localStorage.getItem("currentLanguage");
    if(language && language != 'en') {
        antLang = ar_EG;
        dir = 'rtl';
    }*/
    let dir: DirectionType = 'rtl';
    let antLang = fa_IR;
    return (
        <ConfigProvider locale={antLang} getPopupContainer={popupContainer} direction={dir}>
            <Suspense fallback="">
                <Router history={history}>
                    <Switch>

                        <ProtectedRedirectRoute exact path="/" />

                        {/* Auth */}
                        <Route path={Routes.auth}>
                            <Switch>
                                <AuthRoute exact path={Routes.auth} component={Login} />
                                <Route exact path={Routes.resetPassword} component={ResetPassword} />
                                <Route exact path={Routes.changePassword} component={ChangePassword} />

                                <Route component={NotFoundPage} />
                            </Switch>
                        </Route>

                        <ProtectedRoute path={Routes.app} allRoles={true}>
                            <Page>
                                <Switch>
                                    {/* All Roles */}
                                    <Route exact path={Routes.app} component={Dashboard} />

                                    {/* Entities */}
                                    <Route exact roles={[RoleType.admin]} path={Routes.user} component={UserList} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.editUser} component={EditUser} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.addUser} component={EditUser} />

                                    <Route exact roles={[RoleType.admin]} path={Routes.menu} component={MenuList} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.editMenu} component={EditMenu} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.addMenu} component={EditMenu} />

                                    <Route exact roles={[RoleType.admin]} path={Routes.setting} component={SettingList} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.editSetting} component={EditSetting} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.addSetting} component={EditSetting} />

                                    <Route exact roles={[RoleType.admin]} path={Routes.certificate} component={CertificateList} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.editCertificate} component={EditCertificate} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.addCertificate} component={EditCertificate} />

                                    <Route exact roles={[RoleType.admin]} path={Routes.testimonial} component={TestimonialList} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.editTestimonial} component={EditTestimonial} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.addTestimonial} component={EditTestimonial} />

                                    <Route exact roles={[RoleType.admin]} path={Routes.dynamicPage} component={DynamicPageList} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.editDynamicPage} component={EditDynamicPage} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.addDynamicPage} component={EditDynamicPage} />

                                    <Route exact roles={[RoleType.admin]} path={Routes.product} component={ProductList} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.editProduct} component={EditProduct} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.addProduct} component={EditProduct} />

                                    <Route exact roles={[RoleType.admin]} path={Routes.blog} component={BlogList} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.editBlog} component={EditBlog} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.addBlog} component={EditBlog} />

                                    <Route exact roles={[RoleType.admin]} path={Routes.customerSupportRequest} component={CustomerSupportRequestList} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.editCustomerSupportRequest} component={EditCustomerSupportRequest} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.detailCustomerSupportRequest} component={DetailCustomerSupportRequest} />
                                    <Route exact roles={[RoleType.admin]} path={Routes.addCustomerSupportRequest} component={EditCustomerSupportRequest} />

                                    <Route component={NotFoundPage} />
                                </Switch>
                            </Page>
                        </ProtectedRoute>

                        <Route component={NotFoundPage} />
                    </Switch>
                </Router>
            </Suspense>
        </ConfigProvider>
    );
};

export default App;
