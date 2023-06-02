import {Button, Checkbox, Input, Pagination, PaginationProps, Space, Table} from 'antd';
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import axios from "axios";
import GetCookieData from "../../../GetCookieData";
import {message} from "antd/lib";

const cookie = GetCookieData()
console.log(cookie)

function Delete(value) {
    axios.post("https://xihui.luoxin.live/paper/del",{
        id: parseInt(value),
    },{
        headers: {
            "X-Session-Id": cookie.token
        }
    }) .then(res =>{
        console.log(res.data.data)
        message.info("Success")
        window.location.reload()
    }).catch(error => console.log(error));
}

const columns = [
    {
        title: '试卷编号',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '考试人学号',
        dataIndex: 'examiner',
        key: 'examiner',
    },
    {
        title: '考试人姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '成绩',
        dataIndex: 'grade',
        key: 'grade',
    },
    {
        title: '阅卷人学号',
        dataIndex: 'reviewer',
        key: 'reviewer',
    },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Space wrap>
                <Button type="link" onClick={()=>Detail(record)}>详情</Button>
                <Button type="link" onClick={()=>Delete(record.id)}>删除</Button>
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
        let reviewer = ''
        for (let key in student) {
            if (student[key].student_id === value.reviewer) {
                console.log(student[key].name)
                reviewer = student[key].name
            }
        }
        const paper = {
            id: value.id,
            examiner_id: value.examiner,
            examiner_name: value.name,
            reviewer_id: value.reviewer,
            reviewer_name: reviewer,
            grade: value.grade,
        }

        navigate("/teacher/paper_info",{state: {paper: paper}})
    }

    const location = useLocation()
    const {state} = location
    console.log(location,state)

    const [student,setStudent] = useState([])
    const [total,setTotal] = useState(0)
    const [data,setData] = useState([])
    let optionsSelect = [{
        key: 1,
        val: state.exam_id,
    }]
    useEffect(()=>{
        axios.post("https://xihui.luoxin.live/teacher/paper/list",{
            options: {
                options: optionsSelect,
                offset: 0,
                limit: 6,
                show_total: true,
            },
            show_student: true,
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            let da = []
            let s = res.data.data.student_map
            console.log(student)
            for(let i = 0; i < res.data.data.paper_list.length; i++){
                let d = res.data.data.paper_list[i]
                console.log(d,d.examiner_id)
                setTotal(res.data.data.page.total)
                da.push({
                    key: ''+(i+1)+'',
                    id: d.id,
                    examiner: s[d.examiner_id].student_id,
                    name: s[d.examiner_id].name,
                    reviewer: s[d.reviewer_id].student_id,
                    grade: parseFloat(d.grade/100),
                })
                console.log(da)
            }
            setData(da)
            setStudent(res.data.data.student_map)
        }).catch(error => console.log(error));
    },[])

    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        console.log('Page: ', pageNumber);
        let examiner = ''
        let reviewer = ''
        cond.map((element)=>{
            if (element === 2){
                examiner = document.getElementById("examiner").value
                optionsSelect.push({
                    key: 2,
                    val: examiner,
                })
            }
            if (element === 3){
                reviewer = document.getElementById("reviewer").value
                optionsSelect.push({
                    key: 3,
                    val: reviewer,
                })
            }
        })
        axios.post("https://xihui.luoxin.live/teacher/paper/list",{
            options: {
                options: optionsSelect,
                offset: 6*(pageNumber-1),
                limit: 6,
                show_total: true,
            },
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            let da = []
            for(let i = 0; i < res.data.data.paper_list.length; i++){
                let d = res.data.data.paper_list[i]
                console.log(d,d.examiner_id)
                setTotal(res.data.data.page.total)
                da.push({
                    key: ''+(i+1)+'',
                    id: d.id,
                    examiner: student[d.examiner_id].student_id,
                    name: student[d.examiner_id].name,
                    reviewer: student[d.reviewer_id].student_id,
                    grade: parseFloat(d.grade/100),
                })
                console.log(da)
            }
            setData(da)
        }).catch(error => console.log(error));
    };

    const AddPaper= () => {
        navigate("/teacher/paper_add",{state:{exam_id: state.exam_id}})
    }

    const options = [
        {
            label: '考试人学号',
            value: 2,
        },
        {
            label: '阅卷人学号',
            value: 3,
        },
    ];
    const [cond,setCond] = useState([])
    const onSelect = (checkedValues) => {
        console.log('checked = ', checkedValues);
        setCond(checkedValues)
    };
    const onResult = () => {
        let examiner = ''
        let reviewer = ''
        cond.map((element)=>{
            if (element === 2){
                examiner = document.getElementById("examiner").value
                console.log(1)
                console.log(student.length)
                for(let key in student) {
                    if (student[key].student_id === examiner) {
                        examiner = student[key].id
                    }
                }
            console.log(examiner)
                optionsSelect.push({
                    key: 2,
                    val: examiner,
                })
            }
            if (element === 3){
                reviewer = document.getElementById("reviewer").value
                for(let key in student) {
                    if (student[key].student_id === reviewer) {
                        reviewer = student[key].id
                    }
                }
                optionsSelect.push({
                    key: 3,
                    val: reviewer,
                })
            }
        })
        axios.post("https://xihui.luoxin.live/teacher/paper/list",{
            options: {
                options: optionsSelect,
                offset: 0,
                limit: 6,
                show_total: true,
            },
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            let da = []
            for(let i = 0; i < res.data.data.paper_list.length; i++){
                let d = res.data.data.paper_list[i]
                console.log(d,d.examiner_id)
                setTotal(res.data.data.page.total)
                da.push({
                    key: ''+(i+1)+'',
                    id: d.id,
                    examiner: student[d.examiner_id].student_id,
                    name: student[d.examiner_id].name,
                    reviewer: student[d.reviewer_id].student_id,
                    grade: parseFloat(d.grade/100),
                })
                console.log(da)
            }
            setData(da)
        }).catch(error => console.log(error));

    }
    function back() {
        navigate("/teacher/exam_list")
    }

    return (
        <div>
            <div style={{
                marginLeft: '30px',
            }}>
                <Button type="primary" onClick={AddPaper}>
                    添加
                </Button>
                <Button style={{marginLeft: '20px'}} type="primary" onClick={back}>返回</Button>
                <Checkbox.Group style={{marginLeft:'240px',marginRight:'20px',marginBottom:'20px'}} options={options} defaultValue={['Id']} onChange={onSelect} />
                <Input style={{width:'150px',marginRight:'20px'}} id='examiner' placeholder="根据考试人学号查询"/>
                <Input style={{width:'150px',marginRight:'20px'}} id='reviewer' placeholder="根据阅卷人学号查询"/>
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
