import qs from "qs";
import React, { Component } from "react";
import axios from "../../axios";
import { Navigate } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import "./Login.css";

class Login extends Component {
  state = {
    isLogin: false,
  };
  onFinish = (values: any) => {
    axios
      .post("/api/login", qs.stringify(values), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        const data: responseResult.login = res.data;
        if (data) {
          this.setState({
            isLogin: true,
          });
        } else {
          message.error("Login Failed");
        }
      });
  };
  render() {
    const { isLogin } = this.state;
    return isLogin ? (
      <Navigate to="/" />
    ) : (
      <div className="login-page">
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish}>
          <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;
