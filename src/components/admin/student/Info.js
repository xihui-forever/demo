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
        axios.post("https://xihui.luoxin.live/admin/student/set",{
            student: {
                id: parseInt(state.student.id),
                student_id: state.student.student_id,
                name: values.student.name,
                email: values.student.email,
            }
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            if (res.data.code !== -1){
                alert("Success!")
                window.location.replace("http://localhost:3000/admin/student_list");
            }else{
                alert(res.data.msg)
            }

        }).catch(error => console.log(error));
    };

    const navigate = useNavigate()
    function back() {
        navigate("/admin/student_list")
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
                <Form.Item name={['student', 'id']} label="学生学号" initialValue={state.student.student_id}>
                    <Input readOnly={true} />
                </Form.Item>
                <Form.Item name={['student', 'name']} label="姓名" rules={[{ required: true, message: '请输入姓名!' }]} initialValue={state.student.name} >
                    <Input readOnly={true}  />
                </Form.Item>
                <Form.Item name={['student', 'email']} label="邮箱" rules={[{ required: true, type: "email", message: '请输入邮箱!' }]} initialValue={state.student.email} >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button style={{
                        marginRight:'20px',
                    }} type="primary" htmlType="submit">
                        修改
                    </Button>
                    <Button type="primary" onClick={back}>返回</Button>
                </Form.Item>
            </Form>
        </div>
    )
}