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

const onFinish = (values: any) => {
    console.log(values);
    axios.post("https://xihui.luoxin.live/exam/set",{
        exam: {
            id: values.exam.id,
            name: values.exam.name,
        }
    },{
        headers: {
            "X-Session-Id": cookie.token
        }
    }) .then(res =>{
        if (res.data.code !== -1){
            alert("Success!")
            window.location.replace("http://localhost:3000/teacher/exam_list");
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
        navigate("/teacher/exam_list")
    }
    return (
        <div style={{
            marginLeft: '200px',
            alignContent:'center',
            marginTop:'100px',
        }}>
            <h1 style={{marginLeft:'300px',marginRight:'20px',fontSize:'25px'}}>考试信息</h1>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
            >
                <Form.Item name={['exam', 'id']} label="编号" initialValue={state.exam.id}>
                    <Input id="" readOnly={true}/>
                </Form.Item>
                <Form.Item name={['exam', 'name']} label="名称" rules={[{ required: true, message: '请输入新的名称!' }]} initialValue={state.exam.name} >
                    <Input id="name" />
                </Form.Item>
                <Form.Item name={['exam', 'time']} label="创建时间" initialValue={state.exam.time}>
                    <Input id="time" readOnly={true}/>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
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