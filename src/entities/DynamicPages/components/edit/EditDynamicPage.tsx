import React from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {
    Button, Col,
    DatePicker,
    Divider, Form, Input, InputNumber, PageHeader, Image, Row, Select, Spin, Table, message, Upload, Switch, Checkbox
} from "antd";
import i18next from "i18next";
import DetailDynamicPageResponse from "../../handlers/detail/DetailDynamicPageResponse";
import AddDynamicPageRequest from "../../handlers/add/AddDynamicPageRequest";
import history from "../../../../app/utils/History";
import DynamicPageStore from "../../stores/DynamicPageStore";
import "./EditDynamicPage.scss";
import Languages from "../../../../app/constants/Languages";
import {PlusOutlined} from "@ant-design/icons";
import ImageConstants from "../../../../app/constants/ImageConstants";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const {useEffect} = React;
const { Option } = Select;


interface EditDynamicPageProps {
    dynamicPageStore?: DynamicPageStore;
    match?: any;
}

const EditDynamicPage: React.FC<EditDynamicPageProps> = inject(Stores.dynamicPageStore)(observer(({dynamicPageStore, match}) =>
{

    const [dataFetched, setDataFetched] = React.useState(false);
    const [dynamicPageId, setDynamicPageId] = React.useState(0);
    const [languagesOptions, setLanguageOptions] = React.useState([]);

    const [form] = Form.useForm();

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image'],

        ['clean']                                         // remove formatting button
    ];

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
        dynamicPageStore.onDynamicPageEditPageLoad();

        let dynamicPageIdParam = +match.params?.dynamicPageId;

        setDynamicPageId(dynamicPageIdParam);

        if(dynamicPageIdParam)
        {
            await dynamicPageStore.editDynamicPageViewModel.getDetailDynamicPage(dynamicPageIdParam);
            dynamicPageStore.editDynamicPageViewModel.editDynamicPageRequest.dynamicPageId = dynamicPageIdParam;
        }
        else{
            dynamicPageStore.editDynamicPageViewModel.addDynamicPageRequest = new AddDynamicPageRequest();
            dynamicPageStore.editDynamicPageViewModel.detailDynamicPageResponse = new DetailDynamicPageResponse();
            dynamicPageStore.editDynamicPageViewModel.addDynamicPageRequest.editor = "<p>Hello World</p>"
            dynamicPageStore.editDynamicPageViewModel.detailDynamicPageResponse.editor = "<p>Hello World</p>"
        }

        let languagesOptions = [];
        for (let item of Languages) {
            languagesOptions.push(<Option key={item.value} value={item.value}>{i18next.t(item.title)}</Option>);
        }
        setLanguageOptions(languagesOptions);

        setDataFetched(true);
    }

    let viewModel = dynamicPageStore.editDynamicPageViewModel;

    if(!viewModel) return;

    async function onFinish(values: any) {
        
        viewModel.errorMessage = "";
        if(dynamicPageId)
        {
            await viewModel.editDynamicPage(viewModel.editDynamicPageRequest);
        }
        else
        {
            await viewModel.addDynamicPage(viewModel.addDynamicPageRequest);
        }
        if(!viewModel.errorMessage)
            history.goBack();
    };

    function onUnload() {
        setLanguageOptions([]);
        dynamicPageStore.onDynamicPageEditPageUnload();
    }
    function onSelectChanged(e, propName){

        if(dynamicPageId)
            viewModel.editDynamicPageRequest[`${propName}`] = e;
        else
            viewModel.addDynamicPageRequest[`${propName}`] = e;
    }
    function onEditorChanged(e){
        
        if(dynamicPageId)
            viewModel.editDynamicPageRequest.editor = e;
        else
            viewModel.addDynamicPageRequest.editor = e;
    }
    function onChanged(e){
        
        if(dynamicPageId)
            viewModel.editDynamicPageRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addDynamicPageRequest[`${e.target.id}`] = e.target.value;
    }
    function onNumberChanged(e, propName){
        if(dynamicPageId)
            viewModel.editDynamicPageRequest[`${propName}`] = e;
        else
            viewModel.addDynamicPageRequest[`${propName}`] = e;
    }
    function onCheckboxChange(e){
        if(dynamicPageId)
            viewModel.editDynamicPageRequest[`${e.target.id}`] = e.target.checked;
        else
            viewModel.addDynamicPageRequest[`${e.target.id}`] = e.target.checked;
    }

    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={dynamicPageId ? `${i18next.t("DynamicPages.Edit.HeaderText")} ${dynamicPageId}` : i18next.t("DynamicPages.Add.HeaderText")}
            />
            {dataFetched ?
            <Form {...formItemLayout} layout={"vertical"} onFinish={onFinish} form={form}
                  key={"dynamicPageForm"}
                 scrollToFirstError>
                <Row gutter={[24, 16]}>
                    <Col span={8}>
                        <Form.Item name="title" initialValue={viewModel?.detailDynamicPageResponse?.title}
                                   key={"title"}
                                   label={i18next.t("DynamicPages.Label.title")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("DynamicPages.Validation.Message.title.Required")
                                       }
                                   ]}>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="language" initialValue={viewModel?.detailDynamicPageResponse?.language}
                                   key={"language"}
                                   label={i18next.t("DynamicPages.Label.language")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("DynamicPages.Validation.Message.language.Required")
                                       }
                                   ]}>
                            <Select showSearch={true} onChange={(e) => onSelectChanged(e, "language")} >
                                {languagesOptions}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="isActive" initialValue={viewModel?.detailDynamicPageResponse?.isActive}
                                   key={"isActive"}
                                   label={i18next.t("DynamicPages.Label.isActive")}>
                            <Checkbox onChange={onCheckboxChange} defaultChecked={viewModel?.detailDynamicPageResponse?.isActive} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="descriptionSeo" initialValue={viewModel?.detailDynamicPageResponse?.descriptionSeo}
                                   key={"descriptionSeo"}
                                   label={i18next.t("DynamicPages.Label.descriptionSeo")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("DynamicPages.Validation.Message.descriptionSeo.Required")
                                       }
                                   ]}>
                            <Input.TextArea onChange={onChanged}/>
                            {/*<ReactQuill modules={{toolbar: toolbarOptions}} theme="snow" style={{direction: "ltr"}} onChange={onEditorChanged}/>*/}
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="editor" initialValue={viewModel?.detailDynamicPageResponse?.editor}
                                   key={"editor"}
                                   label={i18next.t("DynamicPages.Label.editor")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("DynamicPages.Validation.Message.editor.Required")
                                       }
                                   ]}>
                            {/*<Input.TextArea onChange={onChanged}/>*/}
                            <ReactQuill modules={{toolbar: toolbarOptions}} theme="snow" style={{direction: "ltr"}} onChange={onEditorChanged}/>
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

export default EditDynamicPage;
