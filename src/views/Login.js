import React from "react";
import axios from "axios";
import cookie from "react-cookies";
import md5 from "js-md5";
import {useLocation, useNavigate} from "react-router";
import {Button, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";



const Login = () =>{
    const location = useLocation()
    const {state} = location
    console.log(parseInt(state.key))
    const navigate = useNavigate()
    const handleClick= ()=>{
        console.log(md5(document.getElementById("password").value))
        const input = {
            role_type: parseInt(state.key),
            username: document.getElementById("username").value,
            password: md5(document.getElementById("password").value),
        }

        axios.post("https://xihui.luoxin.live/login", input)
            .then(res =>{
                console.log(res.data)
                if (res.data.data == null) {
                    alert(res.data.msg)
                    window.location.reload()
                }else{
                    console.log(JSON.stringify(res.data.data.info))
                    if (res.data.data.info.teacher_id != null) {
                        console.log(2)
                        navigate("/teacher")
                        //let inFifteenMinutes = new Date(new Date().getTime() + 24 * 3600 * 1000);//一天
                        cookie.save("token",res.data.data.token,
                            {
                                expire: res.data.data.expire,
                                path: '/teacher',
                            }
                        )
                        cookie.save("info",res.data.data.info,
                            {
                                expire: res.data.data.expire,
                                path: '/teacher',
                            }
                        )
                    }else if (res.data.data.info.student_id != null) {
                        console.log(3)
                        navigate("/student")
                        //let inFifteenMinutes = new Date(new Date().getTime() + 24 * 3600 * 1000);//一天
                        cookie.save("token",res.data.data.token,
                            {
                                expire: res.data.data.expire,
                                path: '/student',
                            }
                        )
                        cookie.save("info",res.data.data.info,
                            {
                                expire: res.data.data.expire,
                                path: '/student',
                            }
                        )
                    }else {
                        console.log(1)
                        navigate("/admin")
                        //let inFifteenMinutes = new Date(new Date().getTime() + 24 * 3600 * 1000);//一天
                        cookie.save("token",res.data.data.token,
                            {
                                expire: res.data.data.expire,
                                path: '/admin',
                            }
                        )
                        cookie.save("info",res.data.data.info,
                            {
                                expire: res.data.data.expire,
                                path: '/admin',
                            }
                        )
                    }
                }
            })
            .catch(error => console.log(error));

    }

    return (
        <div>
            <div style={{
                paddingLeft: '580px',paddingTop: '200px',
                /*border: '2px',borderBlockColor: "black",borderBlockStyle: 'solid',*/
                width: '300px',

            }}>
                <h1 style={{marginLeft: '60px',alignContent: 'center'}}>登录</h1>
                <Input style={{marginLeft: '20px',width: '200px',marginTop: '20px'}} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" type="text" id="username"/>
                <br />
                <Input style={{marginLeft: '20px',width: '200px',marginTop: '20px'}} prefix={<LockOutlined className="site-form-item-icon" />}
                       placeholder="密码"
                       type="password" id="password"/>
                <br />
                <Button style={{marginLeft: '20px',marginBottom: '20px',width: '200px',marginTop: '20px'}} type="primary" onClick={()=>handleClick()}>
                    进入
                </Button>
            </div>
        </div>
    );


}
export default Login;