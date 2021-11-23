import React from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {
    Button, Col,
    DatePicker,
    Divider, Form, Input, InputNumber, PageHeader, Image, Row, Select, Spin, Table, message, Upload, Switch, Checkbox
} from "antd";
import i18next from "i18next";
import DetailMenuResponse from "../../handlers/detail/DetailMenuResponse";
import AddMenuRequest from "../../handlers/add/AddMenuRequest";
import history from "../../../../app/utils/History";
import MenuStore from "../../stores/MenuStore";
import "./EditMenu.scss";
import Languages from "../../../../app/constants/Languages";
const {useEffect} = React;
const { Option } = Select;

interface EditMenuProps {
    menuStore?: MenuStore;
    match?: any;
}

const EditMenu: React.FC<EditMenuProps> = inject(Stores.menuStore)(observer(({menuStore, match}) =>
{

    const [dataFetched, setDataFetched] = React.useState(false);
    const [menuId, setMenuId] = React.useState(0);
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
        menuStore.onMenuEditPageLoad();

        let menuIdParam = +match.params?.menuId;

        setMenuId(menuIdParam);

        if(menuIdParam)
        {
            await menuStore.editMenuViewModel.getDetailMenu(menuIdParam);
            menuStore.editMenuViewModel.editMenuRequest.menuId = menuIdParam;
        }
        else{
            menuStore.editMenuViewModel.addMenuRequest = new AddMenuRequest();
            menuStore.editMenuViewModel.detailMenuResponse = new DetailMenuResponse();
        }

        let languagesOptions = [];
        for (let item of Languages) {
            languagesOptions.push(<Option key={item.value} value={item.value}>{i18next.t(item.title)}</Option>);
        }
        setLanguageOptions(languagesOptions);

        setDataFetched(true);
    }

    let viewModel = menuStore.editMenuViewModel;

    if(!viewModel) return;

    async function onFinish(values: any) {
        
        viewModel.errorMessage = "";
        if(menuId)
        {
            await viewModel.editMenu(viewModel.editMenuRequest);
        }
        else
        {
            await viewModel.addMenu(viewModel.addMenuRequest);
        }
        if(!viewModel.errorMessage)
            history.goBack();
    };

    function onUnload() {
        setLanguageOptions([]);
        menuStore.onMenuEditPageUnload();
    }
    function onSelectChanged(e, propName){

        if(menuId)
            viewModel.editMenuRequest[`${propName}`] = e;
        else
            viewModel.addMenuRequest[`${propName}`] = e;
    }
    function onChanged(e){
        if(menuId)
            viewModel.editMenuRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addMenuRequest[`${e.target.id}`] = e.target.value;
    }
    function onNumberChanged(e, propName){
        if(menuId)
            viewModel.editMenuRequest[`${propName}`] = e;
        else
            viewModel.addMenuRequest[`${propName}`] = e;
    }
    function onCheckboxChange(e){
        if(menuId)
            viewModel.editMenuRequest[`${e.target.id}`] = e.target.checked;
        else
            viewModel.addMenuRequest[`${e.target.id}`] = e.target.checked;
    }
    function onMaskChanged(e) {
        if(menuId)
            viewModel.editMenuRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addMenuRequest[`${e.target.id}`] = e.target.value;
    }

    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={menuId ? `${i18next.t("Menus.Edit.HeaderText")} ${menuId}` : i18next.t("Menus.Add.HeaderText")}
            />
            {dataFetched ?
            <Form {...formItemLayout} layout={"vertical"} onFinish={onFinish} form={form}
                  key={"menuForm"}
                 scrollToFirstError>
                <Row gutter={[24, 16]}>
                    <Col span={8}>
                        <Form.Item name="title" initialValue={viewModel?.detailMenuResponse?.title}
                                   key={"title"}
                                   label={i18next.t("Menus.Label.title")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Menus.Validation.Message.title.Required")
                                       }
                                   ]}>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="displayOrder" initialValue={viewModel?.detailMenuResponse?.displayOrder}
                                   key={"displayOrder"}
                                   label={i18next.t("Menus.Label.displayOrder")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Menus.Validation.Message.displayOrder.Required")
                                       }
                                   ]}>
                            <InputNumber style={{width: "100%"}} onChange={(e) => onNumberChanged(e, 'displayOrder')}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="language" initialValue={viewModel?.detailMenuResponse?.language}
                                   key={"language"}
                                   label={i18next.t("Menus.Label.language")}
                            rules={[
                                {
                                    required: true,
                                    message: i18next.t("Menus.Validation.Message.language.Required")
                                }
                            ]}>
                            <Select showSearch={true} onChange={(e) => onSelectChanged(e, "language")} >
                                {languagesOptions}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item name="url" initialValue={viewModel?.detailMenuResponse?.url}
                                   key={"url"}
                                   label={i18next.t("Menus.Label.url")}
                            rules={[
                                {
                                    required: true,
                                    message: i18next.t("Menus.Validation.Message.url.Required")
                                }
                            ]}>
                            <Input style={{direction: "ltr"}} onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="isActive" initialValue={viewModel?.detailMenuResponse?.isActive}
                                   key={"isActive"}
                                   label={i18next.t("Menus.Label.isActive")}>
                            <Checkbox onChange={onCheckboxChange} defaultChecked={viewModel?.detailMenuResponse?.isActive} />
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

export default EditMenu;
