import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import { Link } from "react-router-dom";
import "./SettingList.scss";
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
import GetSettingRequest from "../../handlers/get/GetSettingRequest";
import SettingStore from 'entities/Settings/stores/SettingStore';
import SettingColumns from "./SettingColumns";
import {getEditSettingRoute} from "../../../../app/utils/RouteHelper";


const { confirm } = Modal;

interface SettingListProps {
    settingStore?: SettingStore
}

const SettingList: React.FC<SettingListProps> = inject(Stores.settingStore)(observer(({settingStore}) => {
    SettingColumns.forEach(w => {
       w.title = i18next.t(w.title);
    });

    let columns: any[] = [...SettingColumns,
        {
        title: i18next.t("General.Column.Action"),
        dataIndex: 'operation',
        key: 'action',
        fixed: 'right',
        render: (text, record) => (
            <div className="inline">
                <Link to={getEditSettingRoute(record.key)}>
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
        settingStore.onSettingGetPageLoad();
        //settingStore.onSettingEditPageLoad();
        settingStore.getSettingViewModel.pageIndex = 0;
        settingStore.getSettingViewModel.pageSize = 20;

        await settingStore.getSettingViewModel.getAllSetting(new GetSettingRequest(
            20, 0));
    }

    let viewModel = settingStore.getSettingViewModel;

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
        await viewModel.deleteSetting(key);
    }

    function onUnload() {
        settingStore.onSettingGetPageUnload();
        //settingStore.onSettingEditPageUnload();
    }

    async function pageIndexChanged(pageIndex, pageSize){
        viewModel.pageIndex = pageIndex - 1;
        viewModel.pageSize = pageSize;

        await settingStore.getSettingViewModel.getAllSetting(new GetSettingRequest(
            pageSize, pageIndex - 1));
    }
    async function pageSizeChanged(current, pageSize){
        viewModel.pageIndex = 0;
        viewModel.pageSize = pageSize;
        await settingStore.getSettingViewModel.getAllSetting(new GetSettingRequest(
                pageSize, 0));
    }
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={i18next.t("Settings.Page.Title")}
                subTitle={i18next.t("Settings.Page.SubTitle")}
                extra={[
                    <Link to={Routes.addSetting}>
                        <Button key={"Add"} type="primary" icon={<PlusCircleOutlined />}>
                            {i18next.t("General.Button.Add")}
                        </Button>
                    </Link>
                    ,
                ]}
            />

            <Table dataSource={viewModel?.settingList} columns={columns} loading={viewModel?.isProcessing}
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


export default SettingList;


