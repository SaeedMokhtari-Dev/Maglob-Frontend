import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import { Link } from "react-router-dom";
import "./DynamicPageList.scss";
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
import GetDynamicPageRequest from "../../handlers/get/GetDynamicPageRequest";
import DynamicPageStore from 'entities/DynamicPages/stores/DynamicPageStore';
import DynamicPageColumns from "./DynamicPageColumns";
import {getEditDynamicPageRoute} from "../../../../app/utils/RouteHelper";


const { confirm } = Modal;

interface DynamicPageListProps {
    dynamicPageStore?: DynamicPageStore
}

const DynamicPageList: React.FC<DynamicPageListProps> = inject(Stores.dynamicPageStore)(observer(({dynamicPageStore}) => {
    DynamicPageColumns.forEach(w => {
       w.title = i18next.t(w.title);
        if(w.key == "isActive")
        {
            w["render"] = (w) => {
                return  w ? <CheckOutlined /> : <CloseOutlined />
            }
        }
    });

    let columns: any[] = [...DynamicPageColumns,
        {
        title: i18next.t("General.Column.Action"),
        dataIndex: 'operation',
        key: 'action',
        fixed: 'right',
        render: (text, record) => (
            <div className="inline">
                <Link to={getEditDynamicPageRoute(record.key)}>
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
        dynamicPageStore.onDynamicPageGetPageLoad();
        //dynamicPageStore.onDynamicPageEditPageLoad();
        dynamicPageStore.getDynamicPageViewModel.pageIndex = 0;
        dynamicPageStore.getDynamicPageViewModel.pageSize = 20;

        await dynamicPageStore.getDynamicPageViewModel.getAllDynamicPage(new GetDynamicPageRequest(
            20, 0));
    }

    let viewModel = dynamicPageStore.getDynamicPageViewModel;

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
        await viewModel.deleteDynamicPage(key);
    }

    function onUnload() {
        dynamicPageStore.onDynamicPageGetPageUnload();
        //dynamicPageStore.onDynamicPageEditPageUnload();
    }

    async function pageIndexChanged(pageIndex, pageSize){
        viewModel.pageIndex = pageIndex - 1;
        viewModel.pageSize = pageSize;

        await dynamicPageStore.getDynamicPageViewModel.getAllDynamicPage(new GetDynamicPageRequest(
            pageSize, pageIndex - 1));
    }
    async function pageSizeChanged(current, pageSize){
        viewModel.pageIndex = 0;
        viewModel.pageSize = pageSize;
        await dynamicPageStore.getDynamicPageViewModel.getAllDynamicPage(new GetDynamicPageRequest(
                pageSize, 0));
    }
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={i18next.t("DynamicPages.Page.Title")}
                subTitle={i18next.t("DynamicPages.Page.SubTitle")}
                extra={[
                    <Link to={Routes.addDynamicPage}>
                        <Button key={"Add"} type="primary" icon={<PlusCircleOutlined />}>
                            {i18next.t("General.Button.Add")}
                        </Button>
                    </Link>
                    ,
                ]}
            />

            <Table dataSource={viewModel?.dynamicPageList} columns={columns} loading={viewModel?.isProcessing}
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


export default DynamicPageList;


