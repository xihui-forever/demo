import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {Button, Form, Input} from "antd";
import GetCookieData from "../../../GetCookieData";
import axios from "axios";
import md5 from "js-md5";


const cookie = GetCookieData()
console.log(cookie)
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
};

const onFinish = (values: any) => {
    const psw = document.getElementById("password").value
    console.log(md5(psw));
    axios.post("https://xihui.luoxin.live/admin/student/add",{
        student: {
            student_id: values.student.student_id,
            name: values.student.name,
            email: values.student.email,
            password: md5(psw),
        }
    },{
        headers: {
            "X-Session-Id": cookie.token
        }
    }) .then(res =>{
        if (res.data.code !== -1){
            alert("Success!")
            window.location.reload()
        }else{
            alert(res.data.msg)
        }

    }).catch(error => console.log(error));
};

export default function ExamInfo () {
    const location = useLocation()
    const {state} = location
    console.log(location,state)

    const navigate = useNavigate()
    function back() {
        navigate("/admin/student_list")
    }

    const [psw,setPsw] = useState("")
    function genPsd() {
        const str = '0123456789abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 15; i > 0; i--)
            result += str[Math.floor(Math.random() * str.length)];
        console.log(result)
        setPsw(result)
    }

    return (
        <div>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
            >
                <Form.Item name={['student', 'student_id']} rules={[{ required: true, message: '请输入编号!' }]} label="学生编号">
                    <Input />
                </Form.Item>
                <Form.Item name={['student', 'name']} rules={[{ required: true,message: '请输入姓名!' }]} label="姓名">
                    <Input />
                </Form.Item>
                <Form.Item name={['student', 'email']} rules={[{ required: true, type: "email", message: '请输入邮箱!' }]} label="邮箱">
                    <Input />
                </Form.Item>
                <Form.Item name={['student', 'password']} label="密码" initialValue={psw}>
                    <Input style={{
                        width:'320px',
                        marginRight:'10px',
                    }} id="password" value={psw}/>
                    <Button type="primary" onClick={genPsd}>生成</Button>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button style={{
                        marginRight:'20px',
                    }} type="primary" htmlType="submit">
                        提交
                    </Button>
                    <Button type="primary" onClick={back}>返回</Button>
                </Form.Item>
            </Form>
        </div>
    )
}