import {Outlet, useNavigate} from "react-router";
import {Link} from "react-router-dom";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import img from "../views/img.png";

function Home() {
    const items = [
        {
            label: '管理员登录',
            key: 1,
        },
        {
            label: '教师登录',
            key: 2,
        },
        {
            label: '学生登录',
            key: 3,
        },
    ];

    const navigate = useNavigate()
    const onClick = ({ key }) => {
        console.log(key)
        navigate("/login",{state:{key: key}})
        message.info(`Click on item ${key}`);
    };


    return (
        <div>
            <div style={{
                height: '60px',
                backgroundColor: '#d4e4f6'
            }}></div>
            <div style={{
                margin: '0px',
                backgroundImage: 'url('+img+')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '630px',
            }}>
                <nav style={{
                    marginLeft: '1000px',
                    paddingTop: '30px',
                    width: '200px',
                    height: '30px',
                    fontSize: '18px',
                }}>
                    <Dropdown
                        menu={{
                            items,
                            onClick,
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space style={{
                                marginRight: '20px'
                            }}>
                                登录
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                    <Link to="/about">关于我们</Link>
                </nav>
                <h1 style={{
                    margin: 'auto',
                    marginLeft: '450px',
                    marginTop: '80px',
                }}>欢迎!</h1>
                <Outlet />
            </div>
            <div style={{
                marginTop: '-2px',
                height: '55px',
                backgroundColor: '#d4e4f6'
            }}></div>

        </div>
    )
}

export default Home;