import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {Button, Form, Image, Input, message} from "antd";
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

    /*if (state.type === 1) {
        document.getElementById("reviewer_info").setAttribute("readOnly", true)
    }
    if (state.type === 2) {
        document.getElementById("appeal_info").setAttribute("readOnly", true)
    }*/

    const readOne = state.type === 2
    const readTwo = state.appeal.state == '等待阅卷人处理'
    const readThree = state.appeal.state == '等待阅卷人处理' || state.appeal.state == '等待教师处理'
    console.log(readOne,readTwo,readThree)
    const navigate = useNavigate()
    function back() {
        navigate("/student/appeal_list")
    }

    const [img,setImg] = useState('')
    const [info,setInfo] = useState('')
    const [review,setReview] = useState('')
    const [reviewAt,setReviewAt] = useState('')
    const [result,setResult] = useState('')
    const [resultAt,setResultAt] = useState('')
    useEffect(()=>{
        if (state.type === 1) {
            console.log(1)
            axios.post("https://xihui.luoxin.live/examiner/appeal/get",{
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
                console.log(a,p,a.appeal_info)
                setInfo(a.appeal_info)
                if (a.review_info != null){
                    setReview(a.review_info)
                }
                if (a.reviewer_at != null){
                    setReviewAt(new Date(a.reviewer_at *1000).toLocaleString())
                }
                if (a.appeal_result != null){
                    setResult(a.appeal_result)
                }
                if (a.result_at != null){
                    setResultAt(new Date(a.result_at *1000).toLocaleString())
                }
                setImg(p.img_url)
                console.log(review,result)
            }).catch(error => console.log(error));
        }
        if (state.type === 2) {
            console.log(2)
            axios.post("https://xihui.luoxin.live/reviewer/appeal/get",{
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
                console.log(a,p,a.appeal_info)
                setInfo(a.appeal_info)
                setImg(p.img_url)
                if (a.review_info != null){
                    setReview(a.review_info)
                }
                if (a.reviewer_at != null){
                    setReviewAt(new Date(a.reviewer_at *1000).toLocaleString())
                }
                if (a.appeal_result != null){
                    setResult(a.appeal_result)
                }
                if (a.result_at != null){
                    setResultAt(new Date(a.result_at *1000).toLocaleString())
                }
                console.log(result)
            }).catch(error => console.log(error));
        }

    },[])

    const onFinish = (values: any) => {
        console.log(values.appeal.appeal_info);
        if (state.type === 1) {
            let appeal_info = values.appeal.appeal_info
            console.log(appeal_info)
            axios.post("https://xihui.luoxin.live/examiner/appeal/set",{
                appeal_id: parseInt(state.appeal.id),
                appeal_info: appeal_info,
            },{
                headers: {
                    "X-Session-Id": cookie.token
                }
            }) .then(res =>{
                if (res.data.code >= 10007 && res.data.code <= 10010){
                    message.info("该申诉已超过两小时，无法修改申诉理由")
                }else{
                    message.info("Success!")
                    window.location.reload()
                }

            }).catch(error => console.log(error));

        }
        if (state.type === 2) {
            console.log(values.appeal.review_info);
            let review_info = values.appeal.review_info
            console.log(review_info)
            axios.post("https://xihui.luoxin.live/reviewer/appeal/set",{
                appeal_id: parseInt(state.appeal.id),
                review_info: review_info,
            },{
                headers: {
                    "X-Session-Id": cookie.token
                }
            }) .then(res =>{
                console.log(res.data)
                message.info("Success!")
                window.location.reload()
            }).catch(error => console.log(error));

        }
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
                <Form.Item name={readOne&&readThree?null:['appeal', 'appeal_info']} label="申诉理由">
                    {/*状态不同，可编辑的不同*/}
                    <Input id="appeal_info" placeholder={info} readOnly={readOne&&readThree?true:false} value={info}/>
                </Form.Item>
                <Form.Item label="申诉时间">
                    <Input value={state.appeal.create_at} readOnly={true} />
                </Form.Item>
                <Form.Item name={readOne&&readTwo?['appeal', 'review_info']:null}  label="批改理由" initialValue={review} >
                    {/*状态不同，可编辑的不同*/}
                    <Input id="review_info" readOnly={readOne&&readTwo?false:true} value={review} />
                </Form.Item>
                <Form.Item label="批改时间">
                    <Input  value={reviewAt} readOnly={true} />
                </Form.Item>
                <Form.Item label="申诉结果">
                    <Input value={result} readOnly={true} />
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