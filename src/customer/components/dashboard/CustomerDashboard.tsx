import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import { Link } from "react-router-dom";
import Stores from "app/constants/Stores";
import CustomerStore from "../../stores/CustomerStore";
import i18next from "i18next";
import UserContext from "../../../identity/contexts/UserContext";
import {Badge, Button, Col, Descriptions, Divider, Image, Row, Spin, Table} from "antd";
import {CheckOutlined, ClockCircleOutlined, CloseOutlined, EditOutlined} from "@ant-design/icons";
import {getEditUserRoute} from "../../../app/utils/RouteHelper";

interface DashboardProps {
    customerStore?: CustomerStore
}

const CustomerDashboard: React.FC<DashboardProps> = inject(Stores.customerStore)(observer(({customerStore}) =>
{
    const [dataFetched, setDataFetched] = React.useState(false);

    useEffect(() => {
        onLoad();

        return onUnload;
    }, []);

    async function onLoad() {
        
        customerStore.onCustomerGetPageLoad();
        await customerStore.getCustomerViewModel.getDetailUser(UserContext.info.id);

        setDataFetched(true);
    }

    let viewModel = customerStore.getCustomerViewModel;

    if (!viewModel) return;

    function onUnload() {
        customerStore.onCustomerGetPageUnload();
    }

    return (
        <div>
        {dataFetched ?
            <div>
                <h3>
                    {i18next.t("Dashboard.Customer.Title")}
                    <Link to={getEditUserRoute(UserContext.info.id)}>
                        <Button type="primary" icon={<EditOutlined/>}
                                title={i18next.t("General.Button.Edit")}/>
                    </Link>
                </h3>
                <Divider>{i18next.t("Users.Section.CertificateInformation")}</Divider>
                <Row>
                    <Col span={20}>
                <Descriptions style={{width: "100%"}} bordered>
                    <Descriptions.Item label={i18next.t("Users.Label.firstName")}>{viewModel.detailUserResponse.firstName}</Descriptions.Item>
                    <Descriptions.Item label={i18next.t("Users.Label.lastName")}>{viewModel.detailUserResponse.lastName}</Descriptions.Item>
                </Descriptions>
                    </Col>
                </Row>
            </div>
                :
                <Row gutter={[24, 16]}>
                    <Col offset={11} span={8}>
                        <Spin className={"spine"} size="large" />
                    </Col>
                </Row>
        }
        </div>
    )
}));

export default CustomerDashboard;
