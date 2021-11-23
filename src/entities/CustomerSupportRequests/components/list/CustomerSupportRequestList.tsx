import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import { Link } from "react-router-dom";
import "./CustomerSupportRequestList.scss";
import Stores from "app/constants/Stores";

import {
    Button,
    Pagination,
    Table, Modal, PageHeader
} from "antd";
import {
    DeleteOutlined, CheckOutlined, CloseOutlined,
    ExclamationCircleOutlined, EyeTwoTone, PlusCircleOutlined
} from '@ant-design/icons';
import i18next from "i18next";
import GetCustomerSupportRequestRequest from "../../handlers/get/GetCustomerSupportRequestRequest";
import CustomerSupportRequestStore from 'entities/CustomerSupportRequests/stores/CustomerSupportRequestStore';
import CustomerSupportRequestColumns from "./CustomerSupportRequestColumns";
import {
    getDetailCustomerSupportRequestRoute
} from "../../../../app/utils/RouteHelper";
import Routes from "../../../../app/constants/Routes";


const { confirm } = Modal;

interface CustomerSupportRequestListProps {
    customerSupportRequestStore?: CustomerSupportRequestStore
}

const CustomerSupportRequestList: React.FC<CustomerSupportRequestListProps> = inject(Stores.customerSupportRequestStore)(observer(({customerSupportRequestStore}) => {
    CustomerSupportRequestColumns.forEach(w => {
       w.title = i18next.t(w.title);
        if(w.key == "isActive")
        {
            w["render"] = (w) => {
                return  w ? <CheckOutlined /> : <CloseOutlined />
            }
        }
    });

    let columns: any[] = [...CustomerSupportRequestColumns,
        {
        title: i18next.t("General.Column.Action"),
        dataIndex: 'operation',
        key: 'action',
        fixed: 'right',
        render: (text, record) => (
            <div className="inline">
                <Link to={getDetailCustomerSupportRequestRoute(record.key)}>
                   <Button type="primary" icon={<EyeTwoTone/>}
                           title={i18next.t("General.Button.Detail")}/>
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
        customerSupportRequestStore.onCustomerSupportRequestGetPageLoad();
        customerSupportRequestStore.getCustomerSupportRequestViewModel.pageIndex = 0;
        customerSupportRequestStore.getCustomerSupportRequestViewModel.pageSize = 20;

        await customerSupportRequestStore.getCustomerSupportRequestViewModel.getAllCustomerSupportRequest(new GetCustomerSupportRequestRequest(
            20, 0));
    }

    let viewModel = customerSupportRequestStore.getCustomerSupportRequestViewModel;

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
        await viewModel.deleteCustomerSupportRequest(key);
    }

    function onUnload() {
        customerSupportRequestStore.onCustomerSupportRequestGetPageUnload();
    }

    async function pageIndexChanged(pageIndex, pageSize){
        viewModel.pageIndex = pageIndex - 1;
        viewModel.pageSize = pageSize;

        await customerSupportRequestStore.getCustomerSupportRequestViewModel.getAllCustomerSupportRequest(new GetCustomerSupportRequestRequest(
            pageSize, pageIndex - 1));
    }
    async function pageSizeChanged(current, pageSize){
        viewModel.pageIndex = 0;
        viewModel.pageSize = pageSize;
        await customerSupportRequestStore.getCustomerSupportRequestViewModel.getAllCustomerSupportRequest(new GetCustomerSupportRequestRequest(
                pageSize, 0));
    }
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={i18next.t("CustomerSupportRequests.Page.Title")}
                subTitle={i18next.t("CustomerSupportRequests.Page.SubTitle")}
                /*extra={[
                    <Link to={Routes.addCustomerSupportRequest}>
                        <Button key={"Add"} type="primary" icon={<PlusCircleOutlined />}>
                            {i18next.t("General.Button.Add")}
                        </Button>
                    </Link>
                    ,
                ]}*/
            />

            <Table dataSource={viewModel?.customerSupportRequestList} columns={columns} loading={viewModel?.isProcessing}
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


export default CustomerSupportRequestList;


