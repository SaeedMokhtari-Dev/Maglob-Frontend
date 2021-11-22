import React from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {
    Button, Col,
    DatePicker,
    Divider, Form, Input, InputNumber, PageHeader, Image, Row, Select, Spin, Table, message, Upload, Switch, Checkbox
} from "antd";
import i18next from "i18next";
import DetailCertificateResponse from "../../handlers/detail/DetailCertificateResponse";
import AddCertificateRequest from "../../handlers/add/AddCertificateRequest";
import history from "../../../../app/utils/History";
import CertificateStore from "../../stores/CertificateStore";
import "./EditCertificate.scss";
import Languages from "../../../../app/constants/Languages";
import {PlusOutlined} from "@ant-design/icons";
import ImageConstants from "../../../../app/constants/ImageConstants";
const {useEffect} = React;
const { Option } = Select;

interface EditCertificateProps {
    certificateStore?: CertificateStore;
    match?: any;
}

const EditCertificate: React.FC<EditCertificateProps> = inject(Stores.certificateStore)(observer(({certificateStore, match}) =>
{

    const [dataFetched, setDataFetched] = React.useState(false);
    const [certificateId, setCertificateId] = React.useState(0);
    const [languagesOptions, setLanguageOptions] = React.useState([]);

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
        certificateStore.onCertificateEditPageLoad();

        let certificateIdParam = +match.params?.certificateId;

        setCertificateId(certificateIdParam);

        if(certificateIdParam)
        {
            await certificateStore.editCertificateViewModel.getDetailCertificate(certificateIdParam);
            certificateStore.editCertificateViewModel.editCertificateRequest.certificateId = certificateIdParam;
        }
        else{
            certificateStore.editCertificateViewModel.addCertificateRequest = new AddCertificateRequest();
            certificateStore.editCertificateViewModel.detailCertificateResponse = new DetailCertificateResponse();
        }

        let languagesOptions = [];
        for (let item of Languages) {
            languagesOptions.push(<Option key={item.value} value={item.value}>{i18next.t(item.title)}</Option>);
        }
        setLanguageOptions(languagesOptions);

        setDataFetched(true);
    }

    let viewModel = certificateStore.editCertificateViewModel;

    if(!viewModel) return;

    async function onFinish(values: any) {
        
        viewModel.errorMessage = "";
        if(certificateId)
        {
            await viewModel.editCertificate(viewModel.editCertificateRequest);
        }
        else
        {
            await viewModel.addCertificate(viewModel.addCertificateRequest);
        }
        if(!viewModel.errorMessage)
            history.goBack();
    };

    function onUnload() {
        certificateStore.onCertificateEditPageUnload();
    }
    function onSelectChanged(e, propName){

        if(certificateId)
            viewModel.editCertificateRequest[`${propName}`] = e;
        else
            viewModel.addCertificateRequest[`${propName}`] = e;
    }
    function onChanged(e){
        if(certificateId)
            viewModel.editCertificateRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addCertificateRequest[`${e.target.id}`] = e.target.value;
    }
    function onNumberChanged(e, propName){
        if(certificateId)
            viewModel.editCertificateRequest[`${propName}`] = e;
        else
            viewModel.addCertificateRequest[`${propName}`] = e;
    }
    function onCheckboxChange(e){
        if(certificateId)
            viewModel.editCertificateRequest[`${e.target.id}`] = e.target.checked;
        else
            viewModel.addCertificateRequest[`${e.target.id}`] = e.target.checked;
    }
    function onMaskChanged(e) {
        if(certificateId)
            viewModel.editCertificateRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addCertificateRequest[`${e.target.id}`] = e.target.value;
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    async function beforeUpload(file, propName) : Promise<boolean> {
        viewModel.uploadLoading = true;
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            viewModel.uploadLoading = false;
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
            viewModel.uploadLoading = false;
            return false;
        }
        let imageUrl = await toBase64(file);
        viewModel.detailCertificateResponse[`${propName}`] = imageUrl;
        if(certificateId)
        {
            viewModel.editCertificateRequest[`${propName}`] = imageUrl;
            viewModel.editCertificateRequest[`${propName}Changed`] = true;
        }
        else{
            viewModel.addCertificateRequest[`${propName}`] = imageUrl;
        }
        viewModel.uploadLoading = false;
        return true;
    }
    const uploadButton = (
        <div className={"rectangle"}>
            {viewModel.uploadLoading ? <Spin /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    function customRequest(){
        return true;
    }

    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={certificateId ? `${i18next.t("Certificates.Edit.HeaderText")} ${certificateId}` : i18next.t("Certificates.Add.HeaderText")}
            />
            {dataFetched ?
            <Form {...formItemLayout} layout={"vertical"} onFinish={onFinish} form={form}
                  key={"certificateForm"}
                 scrollToFirstError>
                <Row gutter={[24, 16]}>
                    <Col span={8}>
                        <Form.Item name="title" initialValue={viewModel?.detailCertificateResponse?.title}
                                   key={"title"}
                                   label={i18next.t("Certificates.Label.title")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Certificates.Validation.Message.title.Required")
                                       }
                                   ]}>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="language" initialValue={viewModel?.detailCertificateResponse?.language}
                                   key={"language"}
                                   label={i18next.t("Certificates.Label.language")}
                            rules={[
                                {
                                    required: true,
                                    message: i18next.t("Certificates.Validation.Message.language.Required")
                                }
                            ]}>
                            <Select showSearch={true} onChange={(e) => onSelectChanged(e, "language")} >
                                {languagesOptions}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="isActive" initialValue={viewModel?.detailCertificateResponse?.isActive}
                                   key={"isActive"}
                                   label={i18next.t("Certificates.Label.isActive")}>
                            <Checkbox onChange={onCheckboxChange} defaultChecked={viewModel?.detailCertificateResponse?.isActive} />
                        </Form.Item>
                    </Col>
                    <Divider>{i18next.t("General.Section.Uploads")}</Divider>
                    <Col offset={10} span={8}>
                        <Form.Item name="picture" initialValue={viewModel?.detailCertificateResponse?.picture}
                                   key={"picture"}
                                   label={i18next.t("Certificates.Label.picture")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Certificates.Validation.Message.picture.Required")
                                       }
                                   ]}>
                            <Upload
                                key={"picture"}
                                className={"avatar-uploader"}
                                maxCount={1}
                                beforeUpload={async (file) =>{await beforeUpload(file, "picture")}}
                                customRequest={customRequest}
                                showUploadList={false}
                            >
                                {viewModel?.detailCertificateResponse?.picture ? (
                                    <div>
                                        <Image src={viewModel.detailCertificateResponse.picture}
                                               fallback={ImageConstants.fallbackImage}
                                               alt="picture"
                                               style={{width: '100%', height: '150px'}}/>
                                        <p>{i18next.t("General.Upload.ChangePhoto")}</p>
                                    </div>
                                ) : uploadButton}
                            </Upload>
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

export default EditCertificate;
