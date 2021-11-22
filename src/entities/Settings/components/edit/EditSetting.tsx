import React from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {
    Button, Col,
    DatePicker,
    Divider, Form, Input, InputNumber, PageHeader, Image, Row, Select, Spin, Table, message, Upload, Switch, Checkbox
} from "antd";
import i18next from "i18next";
import DetailSettingResponse from "../../handlers/detail/DetailSettingResponse";
import AddSettingRequest from "../../handlers/add/AddSettingRequest";
import history from "../../../../app/utils/History";
import SettingStore from "../../stores/SettingStore";
import "./EditSetting.scss";
import Languages from "../../../../app/constants/Languages";
import {PlusOutlined} from "@ant-design/icons";
import ImageConstants from "../../../../app/constants/ImageConstants";
const {useEffect} = React;
const { Option } = Select;

interface EditSettingProps {
    settingStore?: SettingStore;
    match?: any;
}

const EditSetting: React.FC<EditSettingProps> = inject(Stores.settingStore)(observer(({settingStore, match}) =>
{

    const [dataFetched, setDataFetched] = React.useState(false);
    const [settingId, setSettingId] = React.useState(0);
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
        settingStore.onSettingEditPageLoad();

        let settingIdParam = +match.params?.settingId;

        setSettingId(settingIdParam);

        if(settingIdParam)
        {
            await settingStore.editSettingViewModel.getDetailSetting(settingIdParam);
            settingStore.editSettingViewModel.editSettingRequest.settingId = settingIdParam;
        }
        else{
            settingStore.editSettingViewModel.addSettingRequest = new AddSettingRequest();
            settingStore.editSettingViewModel.detailSettingResponse = new DetailSettingResponse();
        }

        let languagesOptions = [];
        for (let item of Languages) {
            languagesOptions.push(<Option key={item.value} value={item.value}>{i18next.t(item.title)}</Option>);
        }
        setLanguageOptions(languagesOptions);

        setDataFetched(true);
    }

    let viewModel = settingStore.editSettingViewModel;

    if(!viewModel) return;

    async function onFinish(values: any) {
        
        viewModel.errorMessage = "";
        if(settingId)
        {
            await viewModel.editSetting(viewModel.editSettingRequest);
        }
        else
        {
            await viewModel.addSetting(viewModel.addSettingRequest);
        }
        if(!viewModel.errorMessage)
            history.goBack();
    };

    function onUnload() {
        settingStore.onSettingEditPageUnload();
    }
    function onSelectChanged(e, propName){

        if(settingId)
            viewModel.editSettingRequest[`${propName}`] = e;
        else
            viewModel.addSettingRequest[`${propName}`] = e;
    }
    function onChanged(e){
        if(settingId)
            viewModel.editSettingRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addSettingRequest[`${e.target.id}`] = e.target.value;
    }
    function onNumberChanged(e, propName){
        if(settingId)
            viewModel.editSettingRequest[`${propName}`] = e;
        else
            viewModel.addSettingRequest[`${propName}`] = e;
    }
    function onCheckboxChange(e){
        if(settingId)
            viewModel.editSettingRequest[`${e.target.id}`] = e.target.checked;
        else
            viewModel.addSettingRequest[`${e.target.id}`] = e.target.checked;
    }
    function onMaskChanged(e) {
        if(settingId)
            viewModel.editSettingRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addSettingRequest[`${e.target.id}`] = e.target.value;
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
        viewModel.detailSettingResponse[`${propName}`] = imageUrl;
        if(settingId)
        {
            viewModel.editSettingRequest[`${propName}`] = imageUrl;
            viewModel.editSettingRequest[`${propName}Changed`] = true;
        }
        else{
            viewModel.addSettingRequest[`${propName}`] = imageUrl;
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
                title={settingId ? `${i18next.t("Settings.Edit.HeaderText")} ${settingId}` : i18next.t("Settings.Add.HeaderText")}
            />
            {dataFetched ?
            <Form {...formItemLayout} layout={"vertical"} onFinish={onFinish} form={form}
                  key={"settingForm"}
                 scrollToFirstError>
                <Row gutter={[24, 16]}>
                    <Col span={8}>
                        <Form.Item name="websiteTitle" initialValue={viewModel?.detailSettingResponse?.websiteTitle}
                                   key={"websiteTitle"}
                                   label={i18next.t("Settings.Label.websiteTitle")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Settings.Validation.Message.websiteTitle.Required")
                                       }
                                   ]}>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="language" initialValue={viewModel?.detailSettingResponse?.language}
                                   key={"language"}
                                   label={i18next.t("Settings.Label.language")}
                            rules={[
                                {
                                    required: true,
                                    message: i18next.t("Settings.Validation.Message.language.Required")
                                }
                            ]}>
                            <Select showSearch={true} onChange={(e) => onSelectChanged(e, "language")} >
                                {languagesOptions}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Divider>{i18next.t("General.Section.Uploads")}</Divider>
                    <Col offset={10} span={8}>
                        <Form.Item name="websiteLogo" initialValue={viewModel?.detailSettingResponse?.websiteLogoImage}
                                   key={"websiteLogoImage"}
                                   label={i18next.t("Settings.Label.websiteLogoImage")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Settings.Validation.Message.websiteLogoImage.Required")
                                       }
                                   ]}>
                            <Upload
                                key={"websiteLogoImage"}
                                className={"avatar-uploader"}
                                maxCount={1}
                                beforeUpload={async (file) =>{await beforeUpload(file, "websiteLogoImage")}}
                                customRequest={customRequest}
                                showUploadList={false}
                            >
                                {viewModel?.detailSettingResponse?.websiteLogoImage ? (
                                    <div>
                                        <Image src={viewModel.detailSettingResponse.websiteLogoImage}
                                               fallback={ImageConstants.fallbackImage}
                                               alt="websiteLogoImage"
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

export default EditSetting;
