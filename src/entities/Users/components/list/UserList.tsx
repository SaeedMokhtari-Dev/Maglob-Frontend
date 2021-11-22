import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import { Link } from "react-router-dom";
import "./UserList.scss";
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
import NavigationService from "../../../../app/services/NavigationService";
import GetUserRequest from "../../handlers/get/GetUserRequest";
import UserStore from 'entities/Users/stores/UserStore';
import UserColumns from "./UserColumns";
import {getEditUserRoute} from "../../../../app/utils/RouteHelper";


const { confirm } = Modal;

interface UserListProps {
    userStore?: UserStore
}

const UserList: React.FC<UserListProps> = inject(Stores.userStore)(observer(({userStore}) => {
    UserColumns.forEach(w => {
       w.title = i18next.t(w.title);
        if(w.key == "isActive")
        {
            w["render"] = (w) => {
                return  w ? <CheckOutlined /> : <CloseOutlined />
            }
        }
    });


    let columns: any[] = [...UserColumns,
        {
        title: i18next.t("General.Column.Action"),
        dataIndex: 'operation',
        key: 'action',
        fixed: 'right',
        render: (text, record) => (
            <div className="inline">
                {/*{(!record.isActive) &&
                (
                <Button type="default"  icon={<CheckCircleOutlined />} onClick={() => showActivation(record)}
                        title={i18next.t("Users.Button.Accept")} style={{ background: "green", borderColor: "white" }}/>
                )}*/}

                <Link to={getEditUserRoute(record.key)}>
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
        userStore.onUserGetPageLoad();
        //userStore.onUserEditPageLoad();
        userStore.getUserViewModel.pageIndex = 0;
        userStore.getUserViewModel.pageSize = 20;

        await userStore.getUserViewModel.getAllUser(new GetUserRequest(
            20, 0));
    }

    let viewModel = userStore.getUserViewModel;

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
    async function showActivation(e) {
        console.log(e.key);
        confirm({
            title: i18next.t("General.Confirm.Active"),
            icon: <ExclamationCircleOutlined />,
            async onOk() {
                console.log(e.key);
                await onActive(e.key);
            },
            onCancel() {},
        });
    }


    async function onDelete(key: number){
        await viewModel.deleteUser(key);
    }

    async function onActive(key: number){
        await viewModel.activeUser(key);
    }

    function onUnload() {
        userStore.onUserGetPageUnload();
        //userStore.onUserEditPageUnload();
    }

    async function pageIndexChanged(pageIndex, pageSize){
        viewModel.pageIndex = pageIndex - 1;
        viewModel.pageSize = pageSize;

        await userStore.getUserViewModel.getAllUser(new GetUserRequest(
            pageSize, pageIndex - 1));
    }
    async function pageSizeChanged(current, pageSize){
        viewModel.pageIndex = 0;
        viewModel.pageSize = pageSize;
        await userStore.getUserViewModel.getAllUser(new GetUserRequest(
                pageSize, 0));
    }
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={i18next.t("Users.Page.Title")}
                subTitle={i18next.t("Users.Page.SubTitle")}
                extra={[
                    <Link to={Routes.addUser}>
                        <Button key={"Add"} type="primary" icon={<PlusCircleOutlined />}>
                            {i18next.t("General.Button.Add")}
                        </Button>
                    </Link>
                    ,
                ]}
            />

            <Table dataSource={viewModel?.userList} columns={columns} loading={viewModel?.isProcessing}
                   bordered={true} pagination={false} scroll={{ x: 1500 }} sticky
                   rowClassName={(record, index) => (record.isActive ? "green" : "red")}/>
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


export default UserList;


