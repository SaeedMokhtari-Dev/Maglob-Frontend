import React from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {
    Button, Col,
    DatePicker,
    Divider, Form, Input, InputNumber, PageHeader, Image, Row, Select, Spin, Table, message, Upload, Switch, Checkbox
} from "antd";
import i18next from "i18next";
import DetailCustomerSupportRequestResponse from "../../handlers/detail/DetailCustomerSupportRequestResponse";
import AddCustomerSupportRequestRequest from "../../handlers/add/AddCustomerSupportRequestRequest";
import history from "../../../../app/utils/History";
import CustomerSupportRequestStore from "../../stores/CustomerSupportRequestStore";
import "./EditCustomerSupportRequest.scss";
import Languages from "../../../../app/constants/Languages";
const {useEffect} = React;
const { Option } = Select;

interface EditCustomerSupportRequestProps {
    customerSupportRequestStore?: CustomerSupportRequestStore;
    match?: any;
}

const EditCustomerSupportRequest: React.FC<EditCustomerSupportRequestProps> = inject(Stores.customerSupportRequestStore)(observer(({customerSupportRequestStore, match}) =>
{

    const [dataFetched, setDataFetched] = React.useState(false);
    const [customerSupportRequestId, setCustomerSupportRequestId] = React.useState(0);

    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 24 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 24 },
        },
    };

    useEffect(() => {
        onLoad();
        return onUnload;
    }, []);

    async function onLoad()
    {
        customerSupportRequestStore.onCustomerSupportRequestEditPageLoad();

        let customerSupportRequestIdParam = +match.params?.customerSupportRequestId;

        setCustomerSupportRequestId(customerSupportRequestIdParam);

        if(customerSupportRequestIdParam)
        {
            await customerSupportRequestStore.editCustomerSupportRequestViewModel.getDetailCustomerSupportRequest(customerSupportRequestIdParam);
            customerSupportRequestStore.editCustomerSupportRequestViewModel.editCustomerSupportRequestRequest.customerSupportRequestId = customerSupportRequestIdParam;
        }
        else{
            customerSupportRequestStore.editCustomerSupportRequestViewModel.addCustomerSupportRequestRequest = new AddCustomerSupportRequestRequest();
            customerSupportRequestStore.editCustomerSupportRequestViewModel.detailCustomerSupportRequestResponse = new DetailCustomerSupportRequestResponse();
        }

        setDataFetched(true);
    }

    let viewModel = customerSupportRequestStore.editCustomerSupportRequestViewModel;

    if(!viewModel) return;

    async function onFinish(values: any) {
        
        viewModel.errorMessage = "";
        if(customerSupportRequestId)
        {
            await viewModel.editCustomerSupportRequest(viewModel.editCustomerSupportRequestRequest);
        }
        else
        {
            await viewModel.addCustomerSupportRequest(viewModel.addCustomerSupportRequestRequest);
        }
        if(!viewModel.errorMessage)
            history.goBack();
    };

    function onUnload() {
        customerSupportRequestStore.onCustomerSupportRequestEditPageUnload();
    }
    function onChanged(e){
        if(customerSupportRequestId)
            viewModel.editCustomerSupportRequestRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addCustomerSupportRequestRequest[`${e.target.id}`] = e.target.value;
    }

    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={customerSupportRequestId ? `${i18next.t("CustomerSupportRequests.Edit.HeaderText")} ${customerSupportRequestId}` : i18next.t("CustomerSupportRequests.Add.HeaderText")}
            />
            {dataFetched ?
            <Form {...formItemLayout} layout={"vertical"} onFinish={onFinish} form={form}
                  key={"customerSupportRequestForm"}
                 scrollToFirstError>
                <Row gutter={[24, 16]}>
                    <Col span={8}>
                        <Form.Item name="name" initialValue={viewModel?.detailCustomerSupportRequestResponse?.name}
                                   key={"name"}
                                   label={i18next.t("CustomerSupportRequests.Label.name")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("CustomerSupportRequests.Validation.Message.name.Required")
                                       }
                                   ]}>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="phoneNumber" initialValue={viewModel?.detailCustomerSupportRequestResponse?.phoneNumber}
                                   key={"phoneNumber"}
                                   label={i18next.t("CustomerSupportRequests.Label.phoneNumber")}
                                   /*rules={[
                                       {
                                           required: true,
                                           message: i18next.t("CustomerSupportRequests.Validation.Message.phoneNumber.Required")
                                       }
                                   ]}*/>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="description" initialValue={viewModel?.detailCustomerSupportRequestResponse?.description}
                                   key={"description"}
                                   label={i18next.t("CustomerSupportRequests.Label.description")}
                                   /*rules={[
                                       {
                                           required: true,
                                           message: i18next.t("CustomerSupportRequests.Validation.Message.description.Required")
                                       }
                                   ]}*/>
                            <Input.TextArea onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider></Divider>
                {viewModel.errorMessage && (
                    <div className='response-error-msg'>{viewModel.errorMessage}</div>
                )}
                    <PageHeader
                        ghost={false}
                        extra={[
                            <Button type="primary" loading={viewModel.isProcessing} key="submit" size={"large"} htmlType="submit">
                                {i18next.t("General.Add.SaveButton")}
                            </Button>
                        ]}
                    />

            </Form>
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

export default EditCustomerSupportRequest;
