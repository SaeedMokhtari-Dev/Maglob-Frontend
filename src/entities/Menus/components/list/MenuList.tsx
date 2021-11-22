import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import { Link } from "react-router-dom";
import "./MenuList.scss";
import Stores from "app/constants/Stores";

import {
    Button,
    Pagination,
    Table, Modal, PageHeader
} from "antd";
import {
    EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined,
    ExclamationCircleOutlined, PlusCircleOutlined, CheckCircleOutlined, CarOutlined
} from '@ant-design/icons';
import i18next from "i18next";
import Routes from "../../../../app/constants/Routes";
import GetMenuRequest from "../../handlers/get/GetMenuRequest";
import MenuStore from 'entities/Menus/stores/MenuStore';
import MenuColumns from "./MenuColumns";
import {getEditMenuRoute} from "../../../../app/utils/RouteHelper";


const { confirm } = Modal;

interface MenuListProps {
    menuStore?: MenuStore
}

const MenuList: React.FC<MenuListProps> = inject(Stores.menuStore)(observer(({menuStore}) => {
    MenuColumns.forEach(w => {
       w.title = i18next.t(w.title);
        if(w.key == "isActive")
        {
            w["render"] = (w) => {
                return  w ? <CheckOutlined /> : <CloseOutlined />
            }
        }
    });

    let columns: any[] = [...MenuColumns,
        {
        title: i18next.t("General.Column.Action"),
        dataIndex: 'operation',
        key: 'action',
        fixed: 'right',
        render: (text, record) => (
            <div className="inline">
                <Link to={getEditMenuRoute(record.key)}>
                   <Button type="primary" icon={<EditOutlined/>}
                           title={i18next.t("General.Button.Edit")}/>
               </Link>
               <Button type="primary" danger icon={<DeleteOutlined/>}
               onClick={() => showDeleteConfirm(record)}
               title={i18next.t("General.Button.Delete")}/>

            </div>
        )
    }];
    useEffect(() => {
        onLoad();

        return onUnload;
    }, []);

    async function onLoad() {
        menuStore.onMenuGetPageLoad();
        //menuStore.onMenuEditPageLoad();
        menuStore.getMenuViewModel.pageIndex = 0;
        menuStore.getMenuViewModel.pageSize = 20;

        await menuStore.getMenuViewModel.getAllMenu(new GetMenuRequest(
            20, 0));
    }

    let viewModel = menuStore.getMenuViewModel;

    if (!viewModel) return;

    async function showDeleteConfirm(e) {
        console.log(e.key);
        confirm({
            title: i18next.t("General.Confirm.Delete"),
            icon: <ExclamationCircleOutlined />,
            async onOk() {
                console.log(e.key);
                await onDelete(e.key);
            },
            onCancel() {},
        });
    }

    async function onDelete(key: number){
        await viewModel.deleteMenu(key);
    }

    function onUnload() {
        menuStore.onMenuGetPageUnload();
        //menuStore.onMenuEditPageUnload();
    }

    async function pageIndexChanged(pageIndex, pageSize){
        viewModel.pageIndex = pageIndex - 1;
        viewModel.pageSize = pageSize;

        await menuStore.getMenuViewModel.getAllMenu(new GetMenuRequest(
            pageSize, pageIndex - 1));
    }
    async function pageSizeChanged(current, pageSize){
        viewModel.pageIndex = 0;
        viewModel.pageSize = pageSize;
        await menuStore.getMenuViewModel.getAllMenu(new GetMenuRequest(
                pageSize, 0));
    }
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={i18next.t("Menus.Page.Title")}
                subTitle={i18next.t("Menus.Page.SubTitle")}
                extra={[
                    <Link to={Routes.addMenu}>
                        <Button key={"Add"} type="primary" icon={<PlusCircleOutlined />}>
                            {i18next.t("General.Button.Add")}
                        </Button>
                    </Link>
                    ,
                ]}
            />

            <Table dataSource={viewModel?.menuList} columns={columns} loading={viewModel?.isProcessing}
                   bordered={true} pagination={false} scroll={{ x: 1500 }} sticky/>
            <br/>
            <Pagination
                total={viewModel?.totalSize}
                showSizeChanger
                showQuickJumper
                defaultPageSize={20}
                onChange={pageIndexChanged}
                onShowSizeChange={pageSizeChanged}
                showTotal={total => `Total ${total} items`}
            />
        </div>
    )
}));


export default MenuList;


