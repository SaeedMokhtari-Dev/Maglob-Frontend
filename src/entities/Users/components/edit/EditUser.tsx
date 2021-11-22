import React from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {
    Button, Col,
    DatePicker,
    Divider, Form, Input, InputNumber, PageHeader, Image, Row, Select, Spin, Table, message, Upload, Switch, Checkbox
} from "antd";
import i18next from "i18next";
import DetailUserResponse from "../../handlers/detail/DetailUserResponse";
import AddUserRequest from "../../handlers/add/AddUserRequest";
import history from "../../../../app/utils/History";
import UserStore from "../../stores/UserStore";
import "./EditUser.scss";
import GlobalRegex from "../../../../app/constants/GlobalRegex";
import {PasswordInput} from "antd-password-input-strength";
import NavigationService from "../../../../app/services/NavigationService";
const {useEffect} = React;

interface EditUserProps {
    userStore?: UserStore;
    match?: any;
}

const EditUser: React.FC<EditUserProps> = inject(Stores.userStore)(observer(({userStore, match}) =>
{

    const [dataFetched, setDataFetched] = React.useState(false);
    const [userId, setUserId] = React.useState(0);

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
        userStore.onUserEditPageLoad();

        let userIdParam = +match.params?.userId;

        setUserId(userIdParam);

        if(userIdParam)
        {
            await userStore.editUserViewModel.getDetailUser(userIdParam);
            if(userStore.editUserViewModel.errorMessage)
                NavigationService.goBack();
            userStore.editUserViewModel.editUserRequest.userId = userIdParam;
        }
        else{
            userStore.editUserViewModel.addUserRequest = new AddUserRequest();
            userStore.editUserViewModel.detailUserResponse = new DetailUserResponse();
        }

        setDataFetched(true);
    }

    let viewModel = userStore.editUserViewModel;

    if(!viewModel) return;

    async function onFinish(values: any) {
        
        viewModel.errorMessage = "";
        if(userId)
        {
            await viewModel.editUser(viewModel.editUserRequest);
        }
        else
        {
            await viewModel.addUser(viewModel.addUserRequest);
        }
        if(!viewModel.errorMessage)
            history.goBack();
    };

    function onUnload() {
        userStore.onUserEditPageUnload();
    }
    function onSelectChanged(e, propName){

        if(userId)
            viewModel.editUserRequest[`${propName}`] = e;
        else
            viewModel.addUserRequest[`${propName}`] = e;
    }
    function onChanged(e){
        if(userId)
            viewModel.editUserRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addUserRequest[`${e.target.id}`] = e.target.value;
    }

    function onCheckboxChange(e){
        if(userId)
            viewModel.editUserRequest[`${e.target.id}`] = e.target.checked;
        else
            viewModel.addUserRequest[`${e.target.id}`] = e.target.checked;
    }
    function onMaskChanged(e) {
        if(userId)
            viewModel.editUserRequest[`${e.target.id}`] = e.target.value;
        else
            viewModel.addUserRequest[`${e.target.id}`] = e.target.value;
    }

    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={userId ? `${i18next.t("Users.Edit.HeaderText")} ${userId}` : i18next.t("Users.Add.HeaderText")}
            />
            {dataFetched ?
            <Form {...formItemLayout} layout={"vertical"} onFinish={onFinish} form={form}
                  key={"userForm"}
                 scrollToFirstError>
                <Row gutter={[24, 16]}>
                    <Divider>{i18next.t("Users.Section.CertificateInformation")}</Divider>
                    <Col span={8}>
                        <Form.Item name="firstName" initialValue={viewModel?.detailUserResponse?.firstName}
                                   key={"firstName"}
                                   label={i18next.t("Users.Label.firstName")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Users.Validation.Message.firstName.Required")
                                       }
                                   ]}>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="lastName" initialValue={viewModel?.detailUserResponse?.lastName}
                                   key={"lastName"}
                                   label={i18next.t("Users.Label.lastName")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Users.Validation.Message.lastName.Required")
                                       }
                                   ]}>
                            <Input onChange={onChanged}/>
                        </Form.Item>
                    </Col>
                    <Divider>{i18next.t("Users.Section.AuthenticationInformation")}</Divider>
                    <Col span={8}>
                        <Form.Item name="username" initialValue={viewModel?.detailUserResponse?.username}
                                   key={"username"}
                                   label={i18next.t("Users.Label.username")}
                                   rules={[
                                       {
                                           required: true,
                                           message: i18next.t("Users.Validation.Message.username.Required")
                                       },
                                       {
                                           pattern: GlobalRegex.onlyEnglishCharacterAndNumbers,
                                           message: i18next.t("Users.Validation.Message.username.Valid"),
                                       }
                                   ]}>
                            <Input onChange={onChanged} style={{direction: "ltr"}}/>
                        </Form.Item>
                    </Col>
                    {!userId &&
                        <React.Fragment>
                            <Col>
                                <Form.Item name="password"
                                           label={i18next.t("Users.Label.password")} required={false}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: i18next.t("Users.Validation.Message.password.Required")
                                               },
                                               {
                                                   pattern: /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g,
                                                   message: i18next.t("Users.Validation.Message.password.Valid"),
                                               }
                                           ]}>
                                    <PasswordInput onChange={onChanged}/>
                                </Form.Item>
                            </Col>
                                <Col>
                                <Form.Item name="confirmPassword"
                                label={i18next.t("Users.Label.confirmPassword")} required={false}
                                dependencies={['password']}
                                rules={[
                            {
                                required: true,
                                message: i18next.t("Users.Validation.Message.confirmPassword.Required")
                            },
                                ({getFieldValue}) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                                return Promise.reject(new Error(i18next.t("Users.Validation.Message.confirmPassword.Valid")));
                            },
                            }),
                                ]}>
                                <PasswordInput onChange={onChanged}/>
                                </Form.Item>
                                </Col>
                        </React.Fragment>
                    }
                    <Col span={8}>
                        <Form.Item name="email" initialValue={viewModel?.detailUserResponse?.email}
                                   key={"email"}
                                   label={i18next.t("Users.Label.email")}
                                   rules={[
                                       {
                                           type:"email",
                                           message: i18next.t("General.Email.Valid")
                                       },
                                       {
                                           required: true,
                                           message: i18next.t("Users.Validation.Message.email.Required")
                                       }
                                   ]}>
                            <Input type={"email"} onChange={onChanged} style={{direction: "ltr"}}/>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item name="isActive" initialValue={viewModel?.detailUserResponse?.isActive}
                                   key={"isActive"}
                                   label={i18next.t("Users.Label.isActive")}>
                            <Checkbox onChange={onCheckboxChange} defaultChecked={viewModel?.detailUserResponse?.isActive} />
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

export default EditUser;
