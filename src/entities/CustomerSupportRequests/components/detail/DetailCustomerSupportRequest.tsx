import React from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {
    Col,
    Divider,
    PageHeader,
    Row,
    Select,
    Spin,
    Descriptions
} from "antd";
import i18next from "i18next";
import history from "../../../../app/utils/History";
import CustomerSupportRequestStore from "../../stores/CustomerSupportRequestStore";
import "./DetailCustomerSupportRequest.scss";
const {useEffect} = React;

interface DetailCustomerSupportRequestProps {
    customerSupportRequestStore?: CustomerSupportRequestStore;
    match?: any;
}

const DetailCustomerSupportRequest: React.FC<DetailCustomerSupportRequestProps> = inject(Stores.customerSupportRequestStore)(observer(({customerSupportRequestStore, match}) =>
{

    const [dataFetched, setDataFetched] = React.useState(false);

    useEffect(() => {
        onLoad();
        return onUnload;
    }, []);

    async function onLoad()
    {
        customerSupportRequestStore.onCustomerSupportRequestDetailPageLoad();

        let customerSupportRequestIdParam = +match.params?.customerSupportRequestId;

        if(customerSupportRequestIdParam)
        {
            await customerSupportRequestStore.detailCustomerSupportRequestViewModel.getDetailCustomerSupportRequest(customerSupportRequestIdParam);
        }
        else{
            history.goBack();
        }

        setDataFetched(true);
    }

    let viewModel = customerSupportRequestStore.detailCustomerSupportRequestViewModel;

    if(!viewModel) return;

    function onUnload() {
        customerSupportRequestStore.onCustomerSupportRequestDetailPageUnload();
    }

    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={i18next.t("CustomerSupportRequests.Detail.HeaderText")}
            />
            {dataFetched ?
                <div>
                    <Row gutter={[24, 16]}>
                        <Col span={24}>
                            <Descriptions title="" bordered>
                                <Descriptions.Item label={i18next.t("CustomerSupportRequests.Label.name")}>{viewModel?.detailCustomerSupportRequestResponse?.name}</Descriptions.Item>
                                <Descriptions.Item span={2} label={i18next.t("CustomerSupportRequests.Label.phoneNumber")}>{viewModel?.detailCustomerSupportRequestResponse?.phoneNumber}</Descriptions.Item>
                                <Descriptions.Item label={i18next.t("CustomerSupportRequests.Label.description")} span={3}>
                                    {viewModel?.detailCustomerSupportRequestResponse?.description}
                                </Descriptions.Item>
                                <Descriptions.Item label={i18next.t("CustomerSupportRequests.Label.createdAt")}>{viewModel?.detailCustomerSupportRequestResponse?.createdAt}</Descriptions.Item>
                                <Descriptions.Item label={i18next.t("CustomerSupportRequests.Label.modifiedAt")}>{viewModel?.detailCustomerSupportRequestResponse?.modifiedAt}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <Divider></Divider>
                    {viewModel.errorMessage && (
                        <div className='response-error-msg'>{viewModel.errorMessage}</div>
                    )}
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

export default DetailCustomerSupportRequest;
