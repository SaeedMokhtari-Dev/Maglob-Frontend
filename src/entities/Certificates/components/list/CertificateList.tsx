import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import { Link } from "react-router-dom";
import "./CertificateList.scss";
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
import GetCertificateRequest from "../../handlers/get/GetCertificateRequest";
import CertificateStore from 'entities/Certificates/stores/CertificateStore';
import CertificateColumns from "./CertificateColumns";
import {getEditCertificateRoute} from "../../../../app/utils/RouteHelper";


const { confirm } = Modal;

interface CertificateListProps {
    certificateStore?: CertificateStore
}

const CertificateList: React.FC<CertificateListProps> = inject(Stores.certificateStore)(observer(({certificateStore}) => {
    CertificateColumns.forEach(w => {
       w.title = i18next.t(w.title);
        if(w.key == "isActive")
        {
            w["render"] = (w) => {
                return  w ? <CheckOutlined /> : <CloseOutlined />
            }
        }
    });

    let columns: any[] = [...CertificateColumns,
        {
        title: i18next.t("General.Column.Action"),
        dataIndex: 'operation',
        key: 'action',
        fixed: 'right',
        render: (text, record) => (
            <div className="inline">
                <Link to={getEditCertificateRoute(record.key)}>
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
        certificateStore.onCertificateGetPageLoad();
        //certificateStore.onCertificateEditPageLoad();
        certificateStore.getCertificateViewModel.pageIndex = 0;
        certificateStore.getCertificateViewModel.pageSize = 20;

        await certificateStore.getCertificateViewModel.getAllCertificate(new GetCertificateRequest(
            20, 0));
    }

    let viewModel = certificateStore.getCertificateViewModel;

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
        await viewModel.deleteCertificate(key);
    }

    function onUnload() {
        certificateStore.onCertificateGetPageUnload();
        //certificateStore.onCertificateEditPageUnload();
    }

    async function pageIndexChanged(pageIndex, pageSize){
        viewModel.pageIndex = pageIndex - 1;
        viewModel.pageSize = pageSize;

        await certificateStore.getCertificateViewModel.getAllCertificate(new GetCertificateRequest(
            pageSize, pageIndex - 1));
    }
    async function pageSizeChanged(current, pageSize){
        viewModel.pageIndex = 0;
        viewModel.pageSize = pageSize;
        await certificateStore.getCertificateViewModel.getAllCertificate(new GetCertificateRequest(
                pageSize, 0));
    }
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={i18next.t("Certificates.Page.Title")}
                subTitle={i18next.t("Certificates.Page.SubTitle")}
                extra={[
                    <Link to={Routes.addCertificate}>
                        <Button key={"Add"} type="primary" icon={<PlusCircleOutlined />}>
                            {i18next.t("General.Button.Add")}
                        </Button>
                    </Link>
                    ,
                ]}
            />

            <Table dataSource={viewModel?.certificateList} columns={columns} loading={viewModel?.isProcessing}
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


export default CertificateList;


