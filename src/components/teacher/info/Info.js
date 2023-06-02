import '../Teacher.css';
import React, {useEffect} from "react";
import { Button, Form, Input } from 'antd';
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
    axios.post("https://xihui.luoxin.live/teacher/change",{
        "change_type" : 1,
        "email": email,
    },{
        headers: {
            "X-Session-Id": cookie.token
        }
    }) .then(res =>{
       if (res.data.code !== -1){
           alert("Success!")
       }else{
           alert(res.data.msg)
       }

    }).catch(error => console.log(error));
};



export default function Info () {
    useEffect(()=>{
        const cookie = GetCookieData()
        console.log(cookie)
        axios.post("https://xihui.luoxin.live/teacher/get",{
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            console.log(res.data.data)
            document.getElementById("teacher_id").setAttribute("value",res.data.data.teacher.teacher_id)
            document.getElementById("name").setAttribute("value",res.data.data.teacher.name)
            document.getElementById("email").setAttribute("value",res.data.data.teacher.email)
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
                    <Form.Item name={['user', 'teacher_id']} label="教师工号" >
                        <Input id="teacher_id" readOnly={true}/>
                    </Form.Item>
                    <Form.Item name={['user', 'name']} label="姓名" >
                        <Input id="name" readOnly={true} />
                    </Form.Item>
                    <Form.Item name={['user', 'email']} label="邮箱" rules={[{ type: 'email'}]}>
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