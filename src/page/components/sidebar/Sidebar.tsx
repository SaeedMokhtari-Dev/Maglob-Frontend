import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import PageStore from "page/stores/PageStore";
import "page/components/sidebar/Sidebar.scss";
import { Link } from "react-router-dom";

import { Layout, Menu } from 'antd';
import {
    DashboardOutlined, ReadOutlined, ShoppingOutlined, DollarOutlined, HomeOutlined,
    ShopOutlined, BookOutlined, CarOutlined
} from '@ant-design/icons';
import Routes from "../../../app/constants/Routes";
import i18next from "i18next";
import UserContext from "../../../identity/contexts/UserContext";
import RoleType from "../../../identity/constants/RoleType";

const { Sider } = Layout;
const { SubMenu } = Menu;

interface SidebarProps {
    pageStore?: PageStore
}

const Sidebar: React.FC<SidebarProps> = inject(Stores.pageStore)(observer(({pageStore, children}) =>
{
    const [electionLink, setElectionLink] = React.useState("");
    useEffect(() => {
        onLoad();

        return onUnload;
    }, []);

    const adminMenu= (<Menu theme="dark" defaultSelectedKeys={['app']} mode="inline">
        <Menu.Item key="app" icon={<DashboardOutlined />}>
            <Link to={Routes.app}>{i18next.t('Dashboard.Menu.Title')}</Link>
        </Menu.Item>
        <Menu.Item key="user" icon={<HomeOutlined />}>
            <Link to={Routes.user}>{i18next.t('Users.Menu.Title')}</Link>
        </Menu.Item>
        <Menu.Item key="menu" icon={<HomeOutlined />}>
            <Link to={Routes.menu}>{i18next.t('Menus.Menu.Title')}</Link>
        </Menu.Item>
        <Menu.Item key="setting" icon={<HomeOutlined />}>
            <Link to={Routes.setting}>{i18next.t('Settings.Menu.Title')}</Link>
        </Menu.Item>
        <Menu.Item key="certificate" icon={<HomeOutlined />}>
            <Link to={Routes.certificate}>{i18next.t('Certificates.Menu.Title')}</Link>
        </Menu.Item>
        <Menu.Item key="testimonial" icon={<HomeOutlined />}>
            <Link to={Routes.testimonial}>{i18next.t('Testimonials.Menu.Title')}</Link>
        </Menu.Item>
        <Menu.Item key="dynamicPage" icon={<HomeOutlined />}>
            <Link to={Routes.dynamicPage}>{i18next.t('DynamicPages.Menu.Title')}</Link>
        </Menu.Item>
        <Menu.Item key="product" icon={<HomeOutlined />}>
            <Link to={Routes.product}>{i18next.t('Products.Menu.Title')}</Link>
        </Menu.Item>
        <Menu.Item key="customerSupportRequest" icon={<HomeOutlined />}>
            <Link to={Routes.customerSupportRequest}>{i18next.t('CustomerSupportRequests.Menu.Title')}</Link>
        </Menu.Item>
    </Menu>)

    async function onLoad() {
        pageStore.onSidebarLoad();
    }

    function onUnload() {
        pageStore.onSidebarUnLoad();
    }

    function toggle() {
        pageStore.isSidebarCollapsed = !pageStore?.isSidebarCollapsed
    }
    const customerMenu= (<Menu theme="dark" defaultSelectedKeys={['app']} mode="inline">
        <Menu.Item key="app" icon={<DashboardOutlined />}>
            <Link to={Routes.app}>{i18next.t('Dashboard.Menu.Title')}</Link>
        </Menu.Item>
    </Menu>)
    return (
        <Sider collapsible collapsed={pageStore?.isSidebarCollapsed} onCollapse={toggle}>
            <div>
                <img src="/images/logo.png" hidden={pageStore?.isSidebarCollapsed} style={{width: "100%", height: "100%"}} alt="logo"/>
            </div>
            {UserContext.info.roles.includes(RoleType.user) ? customerMenu : ""}
            {UserContext.info.roles.includes(RoleType.admin) ? adminMenu : ""}
        </Sider>
    )
}));

export default Sidebar;
