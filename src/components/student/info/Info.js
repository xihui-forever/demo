import React, {useEffect} from "react";
import {Button, Form, Input, message} from 'antd';
import axios from "axios";
import GetCookieData from "../../../GetCookieData";



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
    },
};

const onFinish = (values: any) => {
    console.log(values);
    let email = values.user.email;
    console.log(email)
    axios.post("https://xihui.luoxin.live/student/change",{
        "change_type" : 1,
        "email": email,
    },{
        headers: {
            "X-Session-Id": cookie.token
        }
    }) .then(res =>{
        if (res.data.code !== -1){
            message.info("Success!")
        }else{
            alert(res.data.msg)
        }

    }).catch(error => console.log(error));
};



export default function Info() {
    useEffect(()=>{
        axios.post("https://xihui.luoxin.live/student/get",{
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            console.log(res.data.data)
            document.getElementById("student_id").setAttribute("value",res.data.data.student.student_id)
            document.getElementById("name").setAttribute("value",res.data.data.student.name)
            document.getElementById("email").setAttribute("value",res.data.data.student.email)
        }).catch(error => console.log(error));
    },[])

    return (
        <div style={{
            marginLeft: '200px',
            marginTop: '100px',
        }}>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
            >
                <Form.Item name={['user', 'student_id']} label="学生学号" >
                    <Input id="student_id" readOnly={true}/>
                </Form.Item>
                <Form.Item name={['user', 'name']} label="姓名" >
                    <Input id="name" readOnly={true} />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="邮箱" rules={[{ required: true, type: "email", message: '请输入邮箱!' }]}>
                    <Input id="email" />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button style={{
                        marginLeft:'300px',
                        marginRight:'30px',
                    }} type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}