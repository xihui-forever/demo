import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";
import {Button, Form, Input} from "antd";
import GetCookieData from "../../../GetCookieData";
import axios from "axios";


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

export default function Info () {
    const location = useLocation()
    const {state} = location
    console.log(location,state)

    const onFinish = (values: any) => {
        console.log(values);
        axios.post("https://xihui.luoxin.live/admin/teacher/set",{
            teacher: {
                id: parseInt(state.teacher.id),
                teacher_id: state.teacher.teacher_id,
                name: values.teacher.name,
                email: values.teacher.email,
            }
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            if (res.data.code !== -1){
                alert("Success!")
                window.location.replace("http://localhost:3000/admin/teacher_list");
            }else{
                alert(res.data.msg)
            }

        }).catch(error => console.log(error));
    };

    const navigate = useNavigate()
    function back() {
        navigate("/admin/teacher_list")
    }
    return (
        <div style={{
            marginLeft: '200px',
            marginTop: '30px',
        }}>
            <h1 style={{marginLeft:'300px',marginRight:'20px',fontSize:'25px'}}>教师信息</h1>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
            >
                <Form.Item name={['teacher', 'id']} label="教师编号" initialValue={state.teacher.teacher_id}>
                    <Input readOnly={true} />
                </Form.Item>
                <Form.Item name={['teacher', 'name']} label="姓名" rules={[{ required: true, message: '请输入姓名!' }]} initialValue={state.teacher.name} >
                    <Input/>
                </Form.Item>
                <Form.Item name={['teacher', 'email']} label="邮箱" rules={[{ required: true, type: "email", message: '请输入邮箱!' }]} initialValue={state.teacher.email} >
                    <Input />
                </Form.Item>
                <Form.Item style={{marginTop:'30px'}} wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button style={{
                        marginLeft:'220px',
                        marginRight:'30px',
                    }} type="primary" htmlType="submit">
                        修改
                    </Button>
                    <Button type="primary" onClick={back}>返回</Button>
                </Form.Item>
            </Form>
        </div>
    )
}