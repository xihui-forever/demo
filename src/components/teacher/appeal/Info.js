import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {Button, Form, Image, Input} from "antd";
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

    const navigate = useNavigate()
    function back() {
        navigate("/teacher/appeal_list")
    }

    const read = state.appeal.state == '等待教师处理'

    //console.log(read)
    const [img,setImg] = useState('')
    const [info,setInfo] = useState('')
    const [review,setReview] = useState('')
    const [reviewAt,setReviewAt] = useState('')
    const [grade,setGrade] = useState('')
    const [result,setResult] = useState('')
    const [resultAt,setResultAt] = useState('')
    useEffect(()=>{
        console.log(1)
        axios.post("https://xihui.luoxin.live/teacher/appeal/get",{
            id: state.appeal.id,
            show_paper: true,
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            console.log(res.data.data)
            let a = res.data.data.appeal
            let p = res.data.data.paper
            console.log(a.appeal_result,a.grade)
            setInfo(a.appeal_info)
            setReview(a.review_info)
            if (a.reviewer_at != null){
                setReviewAt(new Date(a.reviewer_at *1000).toLocaleString())
            }
            if (a.grade != null){
                setGrade(parseFloat(a.grade/100))
            }
            if (a.appeal_result != null){
                setResult(a.appeal_result)
                console.log(result)
            }
            if (a.result_at != null){
                setResultAt(new Date(a.result_at *1000).toLocaleString())
            }
            console.log(result,grade)
            setImg(p.img_url)
        }).catch(error => console.log(error));
    },[])

    const onFinish = (values: any) => {
        console.log(values.appeal.grade);
        let grade = values.appeal.grade
        console.log(grade)
        axios.post("https://xihui.luoxin.live/teacher/appeal/set",{
            appeal_id: parseInt(state.appeal.id),
            grade: parseInt(grade)*100,
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            if (res.data.code !== -1){
                alert("Success!")
                //window.location.reload()
            }else{
                alert(res.data.msg)
            }

        }).catch(error => console.log(error));
    };
    return (
        <div>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
            >
                <Form.Item name={['appeal', 'id']} label="编号" initialValue={state.appeal.id}>
                    <Input id="id" readOnly={true}/>
                </Form.Item>
                <Form.Item name={['appeal', 'state']} label="状态" initialValue={state.appeal.state} >
                    <Input id="state" readOnly={true} />
                </Form.Item>
                <Form.Item name={['appeal', 'paper']} label="试卷图片">
                    <Image
                        width={50}
                        src={img}
                    />
                </Form.Item>
                <Form.Item label="申诉理由">
                    {/*状态不同，可编辑的不同*/}
                    <Input value={info} readOnly={true}/>
                </Form.Item>
                <Form.Item label="申诉时间">
                    <Input value={state.appeal.create_at} readOnly={true} />
                </Form.Item>
                <Form.Item label="批改理由">
                    {/*状态不同，可编辑的不同*/}
                    <Input value={review} readOnly={true}/>
                </Form.Item>
                <Form.Item label="批改时间">
                    <Input  value={reviewAt} readOnly={true} />
                </Form.Item>
                <Form.Item name={read?['appeal', 'grade']:null} label="分数加减">
                    <Input id='grade' value={grade} readOnly={read?false:true} placeholder='请输入分数' />
                </Form.Item>
                <Form.Item label="申诉结果">
                    <Input id='result' value={result} readOnly={true}/>
                </Form.Item>
                <Form.Item label="处理时间">
                    <Input value={resultAt} readOnly={true} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                    <Button style={{marginLeft: '20px'}} type="primary" onClick={back}>返回</Button>
                </Form.Item>
            </Form>
        </div>
    )
}