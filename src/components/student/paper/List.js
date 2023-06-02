import {Button, Checkbox, Input, message, Pagination, PaginationProps, Space, Table} from 'antd';
import React, {useEffect, useState} from "react";
import Modal from "antd/es/modal/Modal";
import {ExclamationCircleFilled} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router";
import axios from "axios";
import GetCookieData from "../../../GetCookieData";

const cookie = GetCookieData()
console.log(cookie)


const columns = [
    {
        title: '试卷编号',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '考试名称',
        dataIndex: 'exam',
        key: 'exam',
    },
    {
        title: '教师工号',
        dataIndex: 'teacher_id',
        key: 'teacher_id',
    },
    {
        title: '成绩',
        dataIndex: 'grade',
        key: 'grade',
    },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Space wrap>
                <Button type="link" onClick={()=>Detail(record)}>详情</Button>
            </Space>
        ),
    },
];

let Detail = ''

export default function List () {
    const navigate = useNavigate()
    Detail = (value)=>{
        alert(value)
        console.log(value)
        navigate("/student/paper_info",{state:{paper: value}})
    }

    const [total,setTotal] = useState(0)
    const [data,setData] = useState([])
    useEffect(()=>{
        let optionsSelect = []
        axios.post("https://xihui.luoxin.live/examiner/paper/list",{
            options: {
                options: optionsSelect,
                offset: 0,
                limit: 6,
                show_total: true,
            },
            show_exam: true,
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            let da = []
            console.log(res.data.data)
            const exams = res.data.data.exam_map
            for(let i = 0; i < res.data.data.paper_list.length; i++){
                let d = res.data.data.paper_list[i]
                setTotal(res.data.data.page.total)
                da.push({
                    key: ''+(i+1)+'',
                    id: d.id,
                    exam: exams[d.exam_id].name,
                    teacher_id: d.teacher_id,
                    grade: parseFloat(d.grade/100),
                })
                console.log(da)
            }
            setData(da)
        }).catch(error => console.log(error));
    },[])

    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        console.log('Page: ', pageNumber);
        let optionsSelect = []
        let id = ''
        let teacher = ''
        cond.map((element)=>{
            if (element === 5){
                id = document.getElementById("id").value
                optionsSelect.push({
                    key: 5,
                    val: parseInt(id),
                })
            }
            if (element === 4){
                teacher = document.getElementById("teacher").value
                optionsSelect.push({
                    key: 4,
                    val: parseInt(teacher),
                })
            }
        })
        axios.post("https://xihui.luoxin.live/examiner/paper/list",{
            options: {
                options: optionsSelect,
                offset: 6*(pageNumber-1),
                limit: 6,
                show_total: true,
            }
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            let da = []
            const exams = res.data.data.exam_map
            for(let i = 0; i < res.data.data.paper_list.length; i++){
                let d = res.data.data.paper_list[i]
                setTotal(res.data.data.page.total)
                da.push({
                    key: ''+(i+1)+'',
                    id: d.id,
                    exam: exams[d.exam_id].name,
                    teacher_id: d.teacher_id,
                    grade: parseFloat(d.grade/100),
                })
                console.log(da)
            }
            setData(da)
        }).catch(error => console.log(error));
    };


    const options = [
        {
            label: '试卷编号',
            value: 5,
        },
        {
            label: '教师工号',
            value: 4,
        },
    ];
    const [cond,setCond] = useState([])
    const onSelect = (checkedValues) => {
        console.log('checked = ', checkedValues);
        setCond(checkedValues)
    };
    const onResult = () => {
        let optionsSelect = []
        let id = ''
        let teacher = ''
        cond.map((element)=>{
            if (element === 5){
                id = document.getElementById("id").value
                optionsSelect.push({
                    key: 5,
                    val: parseInt(id),
                })
            }
            if (element === 4){
                teacher = document.getElementById("teacher").value
                optionsSelect.push({
                    key: 4,
                    val: parseInt(teacher),
                })
            }
        })
        axios.post("https://xihui.luoxin.live/examiner/paper/list",{
            options: {
                options: optionsSelect,
                offset: 0,
                limit: 6,
                show_total: true,
            },
            show_exam: true,
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            console.log(res.data.data)
            let da = []
            const exams = res.data.data.exam_map
            for(let i = 0; i < res.data.data.paper_list.length; i++){
                let d = res.data.data.paper_list[i]
                setTotal(res.data.data.page.total)
                da.push({
                    key: ''+(i+1)+'',
                    id: d.id,
                    exam: exams[d.exam_id].name,
                    teacher_id: d.teacher_id,
                    grade: parseFloat(d.grade/100),
                })
                console.log(da)
            }
            setData(da)
        }).catch(error => console.log(error));

    }

    return (
        <div>
            <div style={{
                marginLeft: '30px',
            }}>
                <Checkbox.Group style={{marginLeft:'440px',marginRight:'20px',marginBottom:'20px'}} options={options} defaultValue={['Id']} onChange={onSelect} />
                <Input style={{width:'150px',marginRight:'20px'}} id='id' placeholder="根据试卷编号查询"/>
                <Input style={{width:'150px',marginRight:'20px'}} id='teacher' placeholder="根据教师编号查询"/>
                <Button type='primary' onClick={onResult}>查询</Button>
            </div>
            <Table style={{
                marginLeft: '30px',
                marginTop: '20px',
            }} pagination={false} columns={columns} dataSource={data} />
            <div style={{
                marginLeft: '800px',
                marginTop: '30px',
            }}>
                <Pagination
                    total={total}
                    defaultCurrent={1}
                    onChange={onChange}
                    defaultPageSize={6}
                    showTotal={(total) => `共 ${total} 条`}
                />
            </div>

        </div>
    )
}