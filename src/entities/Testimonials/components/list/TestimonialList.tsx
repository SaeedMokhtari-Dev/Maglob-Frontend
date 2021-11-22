import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import { Link } from "react-router-dom";
import "./TestimonialList.scss";
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
import GetTestimonialRequest from "../../handlers/get/GetTestimonialRequest";
import TestimonialStore from 'entities/Testimonials/stores/TestimonialStore';
import TestimonialColumns from "./TestimonialColumns";
import {getEditTestimonialRoute} from "../../../../app/utils/RouteHelper";


const { confirm } = Modal;

interface TestimonialListProps {
    testimonialStore?: TestimonialStore
}

const TestimonialList: React.FC<TestimonialListProps> = inject(Stores.testimonialStore)(observer(({testimonialStore}) => {
    TestimonialColumns.forEach(w => {
       w.title = i18next.t(w.title);
        if(w.key == "isActive")
        {
            w["render"] = (w) => {
                return  w ? <CheckOutlined /> : <CloseOutlined />
            }
        }
    });

    let columns: any[] = [...TestimonialColumns,
        {
        title: i18next.t("General.Column.Action"),
        dataIndex: 'operation',
        key: 'action',
        fixed: 'right',
        render: (text, record) => (
            <div className="inline">
                <Link to={getEditTestimonialRoute(record.key)}>
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
        testimonialStore.onTestimonialGetPageLoad();
        //testimonialStore.onTestimonialEditPageLoad();
        testimonialStore.getTestimonialViewModel.pageIndex = 0;
        testimonialStore.getTestimonialViewModel.pageSize = 20;

        await testimonialStore.getTestimonialViewModel.getAllTestimonial(new GetTestimonialRequest(
            20, 0));
    }

    let viewModel = testimonialStore.getTestimonialViewModel;

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
        await viewModel.deleteTestimonial(key);
    }

    function onUnload() {
        testimonialStore.onTestimonialGetPageUnload();
        //testimonialStore.onTestimonialEditPageUnload();
    }

    async function pageIndexChanged(pageIndex, pageSize){
        viewModel.pageIndex = pageIndex - 1;
        viewModel.pageSize = pageSize;

        await testimonialStore.getTestimonialViewModel.getAllTestimonial(new GetTestimonialRequest(
            pageSize, pageIndex - 1));
    }
    async function pageSizeChanged(current, pageSize){
        viewModel.pageIndex = 0;
        viewModel.pageSize = pageSize;
        await testimonialStore.getTestimonialViewModel.getAllTestimonial(new GetTestimonialRequest(
                pageSize, 0));
    }
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={i18next.t("Testimonials.Page.Title")}
                subTitle={i18next.t("Testimonials.Page.SubTitle")}
                extra={[
                    <Link to={Routes.addTestimonial}>
                        <Button key={"Add"} type="primary" icon={<PlusCircleOutlined />}>
                            {i18next.t("General.Button.Add")}
                        </Button>
                    </Link>
                    ,
                ]}
            />

            <Table dataSource={viewModel?.testimonialList} columns={columns} loading={viewModel?.isProcessing}
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


export default TestimonialList;


