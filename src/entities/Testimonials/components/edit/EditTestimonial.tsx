import React from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {
    Button, Col,
    DatePicker,
    Divider, Form, Input, InputNumber, PageHeader, Image, Row, Select, Spin, Table, message, Upload, Switch, Checkbox
} from "antd";
import i18next from "i18next";
import DetailTestimonialResponse from "../../handlers/detail/DetailTestimonialResponse";
import AddTestimonialRequest from "../../handlers/add/AddTestimonialRequest";
import history from "../../../../app/utils/History";
import TestimonialStore from "../../stores/TestimonialStore";
import "./EditTestimonial.scss";
import Languages from "../../../../app/constants/Languages";
import {PlusOutlined} from "@ant-design/icons";
import ImageConstants from "../../../../app/constants/ImageConstants";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const {useEffect} = React;
const { Option } = Select;


interface EditTestimonialProps {
    testimonialStore?: TestimonialStore;
    match?: any;
}

const EditTestimonial: React.FC<EditTestimonialProps> = inject(Stores.testimonialStore)(observer(({testimonialStore, match}) =>
{

    const [dataFetched, setDataFetched] = React.useState(false);
    const [testimonialId, setTestimonialId] = React.useState(0);
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
        testimonialStore.onTestimonialEditPageLoad();

        let testimonialIdParam = +match.params?.testimonialId;

        setTestimonialId(testimonialIdParam);

        if(testimonialIdParam)
        {
            await testimonialStore.editTestimonialViewModel.getDetailTestimonial(testimonialIdParam);
            testimonialStore.editTestimonialViewModel.editTestimonialRequest.testimonialId = testimonialIdParam;
        }
        else{
            testimonialStore.editTestimonialViewModel.addTestimonialRequest = new AddTestimonialRequest();
            testimonialStore.editTestimonialViewModel.detailTestimonialResponse = new DetailTestimonialResponse();
        }

        let languagesOptions = [];
        for (let item of Languages) {
            languagesOptions.push(<Option key={item.value} value={item.value}>{i18next.t(item.title)}</Option>);
        }
        setLanguageOptions(languagesOptions);

        setDataFetched(true);
    }

    let viewModel = testimonialStore.editTestimonialViewModel;

    if(!viewModel) return;

    async function onFinish(values: any) {
        
        viewModel.errorMessage = "";
        if(testimonialId)
        {
            await viewModel.editTestimonial(viewModel.editTestimonialRequest);
        }
        else
        {
            await viewModel.addTestimonial(viewModel.addTestimonialRequest);
        }
        if(!viewModel.errorMessage)
            history.goBack();
    };

    function onUnload() {
        testimonialStore.onTestimonialEditPageUnload();
    }
    function onSelectChanged(e, propName){

        if(testimonialId)
            viewModel.editTestimonialRequest[`${propName}`] = e;
        else
            viewModel.addTestimonialRequest[`${propName}`] = e;
    }
    function onCommentChanged(e){
        debugger;
        if(testimonialId)
            viewModel.editTestimonialRequest.comment = e;
        else
            viewModel.addTestimonialRequest.comment = e;
    }
    function onChanged(e){
        debugger;
        if(testimonialId)
            viewModel.editTestimonialRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addTestimonialRequest[`${e.target.id}`] = e.target.value;
    }
    function onNumberChanged(e, propName){
        if(testimonialId)
            viewModel.editTestimonialRequest[`${propName}`] = e;
        else
            viewModel.addTestimonialRequest[`${propName}`] = e;
    }
    function onCheckboxChange(e){
        if(testimonialId)
            viewModel.editTestimonialRequest[`${e.target.id}`] = e.target.checked;
        else
            viewModel.addTestimonialRequest[`${e.target.id}`] = e.target.checked;
    }
    function onMaskChanged(e) {
        if(testimonialId)
            viewModel.editTestimonialRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addTestimonialRequest[`${e.target.id}`] = e.target.value;
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
        viewModel.detailTestimonialResponse[`${propName}`] = imageUrl;
        if(testimonialId)
        {
            viewModel.editTestimonialRequest[`${propName}`] = imageUrl;
            viewModel.editTestimonialRequest[`${propName}Changed`] = true;
        }
        else{
            viewModel.addTestimonialRequest[`${propName}`] = imageUrl;
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
                title={testimonialId ? `${i18next.t("Testimonials.Edit.HeaderText")} ${testimonialId}` : i18next.t("Testimonials.Add.HeaderText")}
            />
            {dataFetched ?
            <Form {...formItemLayout} layout={"vertical"} onFinish={onFinish} form={form}
                  key={"testimonialForm"}
                 scrollToFirstError>
                <Row gutter={[24, 16]}>
                    <Col span={8}>
                        <Form.Item name="title" initialValue={viewModel?.detailTestimonialResponse?.title}
                                   key={"title"}
                                   label={i18next.t("Testimonials.Label.title")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Testimonials.Validation.Message.title.Required")
                                       }
                                   ]}>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="language" initialValue={viewModel?.detailTestimonialResponse?.language}
                                   key={"language"}
                                   label={i18next.t("Testimonials.Label.language")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Testimonials.Validation.Message.language.Required")
                                       }
                                   ]}>
                            <Select showSearch={true} onChange={(e) => onSelectChanged(e, "language")} >
                                {languagesOptions}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="isActive" initialValue={viewModel?.detailTestimonialResponse?.isActive}
                                   key={"isActive"}
                                   label={i18next.t("Testimonials.Label.isActive")}>
                            <Checkbox onChange={onCheckboxChange} defaultChecked={viewModel?.detailTestimonialResponse?.isActive} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="comment" initialValue={viewModel?.detailTestimonialResponse?.comment}
                                   key={"comment"}
                                   label={i18next.t("Testimonials.Label.comment")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Testimonials.Validation.Message.comment.Required")
                                       }
                                   ]}>
                            {/*<Input.TextArea onChange={onChanged}/>*/}
                            <ReactQuill modules={{toolbar: toolbarOptions}} theme="snow" style={{direction: "ltr"}} onChange={onCommentChanged}/>
                        </Form.Item>
                    </Col>
                    <Divider>{i18next.t("General.Section.Uploads")}</Divider>
                    <Col offset={10} span={8}>
                        <Form.Item name="picture" initialValue={viewModel?.detailTestimonialResponse?.picture}
                                   key={"picture"}
                                   label={i18next.t("Testimonials.Label.picture")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Testimonials.Validation.Message.picture.Required")
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
                                {viewModel?.detailTestimonialResponse?.picture ? (
                                    <div>
                                        <Image src={viewModel.detailTestimonialResponse.picture}
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

export default EditTestimonial;
