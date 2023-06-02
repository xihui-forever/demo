import './Teacher.css';

import {Outlet, useNavigate} from "react-router";
import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Button, Dropdown, Input, Layout, Menu, MenuProps, message, Space, theme} from 'antd';
import cookie from "react-cookies";
import axios from "axios";
import md5 from "js-md5";
import Modal from "antd/es/modal/Modal";
import GetCookieData from "../../GetCookieData";
const { Header, Sider, Content } = Layout;

const cookieData = GetCookieData()
console.log(cookieData)

export default function Teacher () {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleOnClick = (e) =>{
        console.log(e.key)
        if(e.key === "1"){
            navigate("/teacher/info")
        }else if(e.key === '2'){
            navigate("/teacher/exam_list")
        }else if(e.key === '3'){
            navigate("/teacher/appeal_list")
        }

    };

    function logOut() {
        cookie.remove("token",{
            expire: 0,
            path: '/teacher',
        })
        cookie.remove("info",{
            expire: 0,
            path: '/teacher',
        })
        navigate("/")
    }

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        let oldPsw = document.getElementById("oldPsw").value
        let newPsw = document.getElementById("newPsw").value
        console.log(oldPsw,newPsw)

        axios.post("https://xihui.luoxin.live//change-password",{
            old_password: md5(oldPsw),
            new_password: md5(newPsw),
        },{
            headers: {
                "X-Session-Id": cookieData.token
            }
        }) .then(res =>{
            console.log(2)
            if (res.data.code !== -1){
                console.log(res.data.data)
                setConfirmLoading(true);
                setTimeout(() => {
                    message.info(`成功`);
                    setOpen(false);
                    setConfirmLoading(false);
                }, 2000);
                window.location.reload()
            }else{
                alert(res.data.msg)
            }

        }).catch(error => console.log(error));
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div>
                    <Button onClick={showModal}>修改密码</Button>
                    <Modal
                        title="修改密码"
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <label>旧密码:</label>
                        <Input id="oldPsw"/>
                        <label>新密码:</label>
                        <Input id="newPsw"/>
                    </Modal>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <Button onClick={logOut}>退出登录</Button>
            ),
        },
    ];

    return (
        <Layout className="layout">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">ITest</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={(e)=>handleOnClick(e)}
                >
                    <Menu.Item key="1" icon={<UserOutlined/>}>
                        个人信息
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined/>} >
                        考试记录
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined/>}>
                        申诉记录
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header  style={{padding: 0, background: colorBgContainer }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <Space wrap style={{marginLeft: '1000px'}}>
                        <Dropdown menu={{ items }} placement="bottomLeft">
                            <Button>账号</Button>
                        </Dropdown>
                    </Space>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}