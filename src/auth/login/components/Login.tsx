import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import AuthStore from "auth/stores/AuthStore";
import "auth/login/components/Login.scss";
import {Button, Form, Input} from "antd";
import i18next from "i18next";
import {withTranslation} from "react-i18next";
import Routes from "app/constants/Routes";
import { Link } from "react-router-dom";

import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import NavigationService from "../../../app/services/NavigationService";

interface LoginProps {
    authStore?: AuthStore
}

const Login: React.FC<LoginProps> = inject('authStore')(observer(({authStore}) =>
{
    useEffect(() =>
    {
        onLoad();
        return onUnload;
    }, []);

    function onLoad()
    {
        document.body.classList.add('auth-page');
        authStore.onLoginPageLoad();
    }

    function onUnload()
    {
        authStore.onLoginPageUnload();
        document.body.classList.remove('auth-page');
    }

    let viewModel = authStore.loginViewModel;

    if(!viewModel) return null;

    async function onFinish()
    {
        viewModel.errorMessage = null;
        await viewModel.login();
    }

    function onUsernameChanged(e)
    {
        viewModel.username = e.target.value;
    }

    function onPasswordChanged(e)
    {
        viewModel.password = e.target.value;
    }

    function resetPasswordPage(){
        NavigationService.navigate(Routes.resetPassword);
    }
    function resetRegisterPage(){
        NavigationService.navigate(Routes.register);
    }
    return (
        <div>
                <div className={"mainContent"}>
                    <div className="signup-connect">
                        <img src="/images/maglube-logo.jpeg" className="login-logo" alt="logo"/>
                    </div>
                    <div className="signup-classic">
                        <Form layout="vertical" onFinish={onFinish} >
                            <Form.Item initialValue={viewModel.username} name="username" label={i18next.t("Authentication.Label.Username")} required={false}
                                       rules={[
                                           {
                                               required: true,
                                               message: i18next.t("Authentication.Validation.Message.Username.Required")
                                           }
                                       ]}>
                                <Input  prefix={<UserOutlined className="site-form-item-icon" />} onChange={onUsernameChanged} className="text-input"/>
                            </Form.Item>
                            <Form.Item initialValue={viewModel.password} name="password" label={i18next.t("Authentication.Label.Password")} required={false}
                                       rules={[
                                           {
                                               required: true,
                                               message: i18next.t("Authentication.Validation.Message.Password.Required")
                                           }
                                       ]}>
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    onChange={onPasswordChanged}
                                    className="text-input"
                                />
                            </Form.Item>
                            {viewModel.errorMessage && (
                                <div className='response-error-msg'>{viewModel.errorMessage}</div>
                            )}
                            <Button type="primary" className={"button"} loading={viewModel.isProcessing} htmlType="submit">
                                {i18next.t("Authentication.Button.Login")}
                            </Button>
                            <div className="link">
                                <Button type="link" onClick={resetRegisterPage}>
                                    {i18next.t('Authentication.Link.Register')}
                                </Button>
                            </div>
                            {/*<div className="link">
                                <Link to={Routes.resetPassword}></Link>
                                <Button type="link" onClick={resetPasswordPage}>
                                    {i18next.t('Authentication.Link.ForgotPassword')}
                                </Button>
                            </div>*/}
                        </Form>
                    </div>
                </div>
        </div>
    );
}));

export default withTranslation()(Login);
