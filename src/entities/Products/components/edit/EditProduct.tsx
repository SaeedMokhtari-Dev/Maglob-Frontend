import React from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {
    Button, Col,
    DatePicker,
    Divider, Form, Input, InputNumber, PageHeader, Image, Row, Select, Spin, Table, message, Upload, Switch, Checkbox
} from "antd";
import i18next from "i18next";
import DetailProductResponse from "../../handlers/detail/DetailProductResponse";
import AddProductRequest from "../../handlers/add/AddProductRequest";
import history from "../../../../app/utils/History";
import ProductStore from "../../stores/ProductStore";
import "./EditProduct.scss";
import Languages from "../../../../app/constants/Languages";
import {PlusOutlined} from "@ant-design/icons";
import ImageConstants from "../../../../app/constants/ImageConstants";
import ReactQuill from "react-quill";
const {useEffect} = React;
const { Option } = Select;

interface EditProductProps {
    productStore?: ProductStore;
    match?: any;
}

const EditProduct: React.FC<EditProductProps> = inject(Stores.productStore)(observer(({productStore, match}) =>
{

    const [dataFetched, setDataFetched] = React.useState(false);
    const [productId, setProductId] = React.useState(0);
    const [languagesOptions, setLanguageOptions] = React.useState([]);
    const [certificatesOptions, setCertificateOptions] = React.useState([]);

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
        productStore.onProductEditPageLoad();

        let productIdParam = +match.params?.productId;

        setProductId(productIdParam);

        if(productIdParam)
        {
            await productStore.editProductViewModel.getDetailProduct(productIdParam);
            productStore.editProductViewModel.editProductRequest.productId = productIdParam;
        }
        else{
            productStore.editProductViewModel.addProductRequest = new AddProductRequest();
            productStore.editProductViewModel.detailProductResponse = new DetailProductResponse();
            productStore.editProductViewModel.detailProductResponse.detailDescription = "<p>Hello World</p>";
            productStore.editProductViewModel.addProductRequest.detailDescription = "<p>Hello World</p>";
        }

        let languagesOptions = [];
        for (let item of Languages) {
            languagesOptions.push(<Option key={item.value} value={item.value}>{i18next.t(item.title)}</Option>);
        }
        setLanguageOptions(languagesOptions);


        await productStore.listCertificateViewModel.getCertificateList();
        let certificatesOptions = [];
        for (let item of productStore.listCertificateViewModel?.listCertificateResponse?.items) {
            certificatesOptions.push(<Option key={item.key} value={item.key}>{item.title}</Option>);
        }
        setCertificateOptions(certificatesOptions);

        setDataFetched(true);
    }

    let viewModel = productStore.editProductViewModel;

    if(!viewModel) return;

    async function onFinish(values: any) {
        
        viewModel.errorMessage = "";
        if(productId)
        {
            await viewModel.editProduct(viewModel.editProductRequest);
        }
        else
        {
            await viewModel.addProduct(viewModel.addProductRequest);
        }
        if(!viewModel.errorMessage)
            history.goBack();
    };

    function onUnload() {
        setLanguageOptions([]);
        setCertificateOptions([]);
        productStore.onProductEditPageUnload();
    }
    function onSelectChanged(e, propName){
        
        if(productId)
            viewModel.editProductRequest[`${propName}`] = e;
        else
            viewModel.addProductRequest[`${propName}`] = e;
    }
    function onChanged(e){
        if(productId)
            viewModel.editProductRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addProductRequest[`${e.target.id}`] = e.target.value;
    }
    function onNumberChanged(e, propName){
        if(productId)
            viewModel.editProductRequest[`${propName}`] = e;
        else
            viewModel.addProductRequest[`${propName}`] = e;
    }
    function onCheckboxChange(e){
        if(productId)
            viewModel.editProductRequest[`${e.target.id}`] = e.target.checked;
        else
            viewModel.addProductRequest[`${e.target.id}`] = e.target.checked;
    }
    function onMaskChanged(e) {
        if(productId)
            viewModel.editProductRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addProductRequest[`${e.target.id}`] = e.target.value;
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
        viewModel.detailProductResponse[`${propName}`] = imageUrl;
        if(productId)
        {
            viewModel.editProductRequest[`${propName}`] = imageUrl;
            viewModel.editProductRequest[`${propName}Changed`] = true;
        }
        else{
            viewModel.addProductRequest[`${propName}`] = imageUrl;
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
    function onDetailDescriptionChanged(e){
        if(productId)
            viewModel.editProductRequest.detailDescription = e;
        else
            viewModel.addProductRequest.detailDescription = e;
    }
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={productId ? `${i18next.t("Products.Edit.HeaderText")} ${productId}` : i18next.t("Products.Add.HeaderText")}
            />
            {dataFetched ?
            <Form {...formItemLayout} layout={"vertical"} onFinish={onFinish} form={form}
                  key={"productForm"}
                 scrollToFirstError>
                <Row gutter={[24, 16]}>
                    <Col span={8}>
                        <Form.Item name="name" initialValue={viewModel?.detailProductResponse?.name}
                                   key={"name"}
                                   label={i18next.t("Products.Label.name")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Products.Validation.Message.name.Required")
                                       }
                                   ]}>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="model" initialValue={viewModel?.detailProductResponse?.model}
                                   key={"model"}
                                   label={i18next.t("Products.Label.model")}
                                   /*rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Products.Validation.Message.model.Required")
                                       }
                                   ]}*/>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="quality" initialValue={viewModel?.detailProductResponse?.quality}
                                   key={"quality"}
                                   label={i18next.t("Products.Label.quality")}
                                   /*rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Products.Validation.Message.quality.Required")
                                       }
                                   ]}*/>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="volume" initialValue={viewModel?.detailProductResponse?.volume}
                                   key={"volume"}
                                   label={i18next.t("Products.Label.volume")}
                                   /*rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Products.Validation.Message.volume.Required")
                                       }
                                   ]}*/>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="oilType" initialValue={viewModel?.detailProductResponse?.oilType}
                                   key={"oilType"}
                                   label={i18next.t("Products.Label.oilType")}
                                   /*rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Products.Validation.Message.volume.Required")
                                       }
                                   ]}*/>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="displayOrder" initialValue={viewModel?.detailProductResponse?.displayOrder}
                                   key={"displayOrder"}
                                   label={i18next.t("Products.Label.displayOrder")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Products.Validation.Message.displayOrder.Required")
                                       }
                                   ]}>
                            <InputNumber style={{width: "100%"}} onChange={(e) => onNumberChanged(e, 'displayOrder')}/>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item name="productCertificateIds" initialValue={viewModel?.detailProductResponse?.certificateItems?.map(w => w.key)}
                                   key={"productCertificateIds"}
                                   label={i18next.t("Products.Label.productCertificateIds")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Products.Validation.Message.productCertificateIds.Required")
                                       }
                                   ]}>
                            <Select mode="multiple" allowClear showSearch={true}
                                    onChange={(e) => onSelectChanged(e, "productCertificateIds")} >
                                {certificatesOptions}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="language" initialValue={viewModel?.detailProductResponse?.language}
                                   key={"language"}
                                   label={i18next.t("Products.Label.language")}
                            rules={[
                                {
                                    required: true,
                                    message: i18next.t("Products.Validation.Message.language.Required")
                                }
                            ]}>
                            <Select showSearch={true} onChange={(e) => onSelectChanged(e, "language")} >
                                {languagesOptions}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="isActive" initialValue={viewModel?.detailProductResponse?.isActive}
                                   key={"isActive"}
                                   label={i18next.t("Products.Label.isActive")}>
                            <Checkbox onChange={onCheckboxChange} defaultChecked={viewModel?.detailProductResponse?.isActive} />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item name="description" initialValue={viewModel?.detailProductResponse?.description}
                                   key={"description"}
                                   label={i18next.t("Products.Label.description")}
                                   /*rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Products.Validation.Message.description.Required")
                                       }
                                   ]}*/>
                            <Input.TextArea onChange={onChanged}/>
                            {/*<ReactQuill modules={{toolbar: toolbarOptions}} theme="snow" style={{direction: "ltr"}} onChange={onEditorChanged}/>*/}
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item name="descriptionSeo" initialValue={viewModel?.detailProductResponse?.descriptionSeo}
                                   key={"descriptionSeo"}
                                   label={i18next.t("Products.Label.descriptionSeo")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Products.Validation.Message.descriptionSeo.Required")
                                       }
                                   ]}>
                            <Input.TextArea onChange={onChanged}/>
                            {/*<ReactQuill modules={{toolbar: toolbarOptions}} theme="snow" style={{direction: "ltr"}} onChange={onEditorChanged}/>*/}
                        </Form.Item>
                    </Col>
                    <Divider>{i18next.t("Products.Label.detailDescription")}</Divider>

                    <Col span={24}>
                        <Form.Item name="detailDescription" initialValue={viewModel?.detailProductResponse?.detailDescription}
                                   key={"detailDescription"}
                                   label={i18next.t("Products.Label.detailDescription")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Products.Validation.Message.detailDescription.Required")
                                       }
                                   ]}>
                            {/*<Input.TextArea onChange={onChanged}/>*/}
                            <ReactQuill modules={{toolbar: toolbarOptions}} theme="snow" style={{direction: "ltr"}}
                                        onChange={onDetailDescriptionChanged}/>
                        </Form.Item>
                    </Col>
                    <Divider>{i18next.t("General.Section.Uploads")}</Divider>
                    <Col offset={2} span={8}>
                        <Form.Item name="largePicture" initialValue={viewModel?.detailProductResponse?.largePicture}
                                   key={"largePicture"}
                                   label={i18next.t("Products.Label.largePicture")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Products.Validation.Message.largePicture.Required")
                                       }
                                   ]}>
                            <Upload
                                key={"largePicture"}
                                className={"avatar-uploader"}
                                maxCount={1}
                                beforeUpload={async (file) =>{await beforeUpload(file, "largePicture")}}
                                customRequest={customRequest}
                                showUploadList={false}
                            >
                                {viewModel?.detailProductResponse?.largePicture ? (
                                    <div>
                                        <Image src={viewModel.detailProductResponse.largePicture}
                                               fallback={ImageConstants.fallbackImage}
                                               alt="largePicture"
                                               style={{width: '100%', height: '150px'}}/>
                                        <p>{i18next.t("General.Upload.ChangePhoto")}</p>
                                    </div>
                                ) : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col offset={2} span={8}>
                        <Form.Item name="smallPicture" initialValue={viewModel?.detailProductResponse?.smallPicture}
                                   key={"smallPicture"}
                                   label={i18next.t("Products.Label.smallPicture")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Products.Validation.Message.smallPicture.Required")
                                       }
                                   ]}>
                            <Upload
                                key={"smallPicture"}
                                className={"avatar-uploader"}
                                maxCount={1}
                                beforeUpload={async (file) =>{await beforeUpload(file, "smallPicture")}}
                                customRequest={customRequest}
                                showUploadList={false}
                            >
                                {viewModel?.detailProductResponse?.smallPicture ? (
                                    <div>
                                        <Image src={viewModel.detailProductResponse.smallPicture}
                                               fallback={ImageConstants.fallbackImage}
                                               alt="smallPicture"
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

export default EditProduct;
