import {Button, Checkbox, Input, Pagination, PaginationProps, Space, Table} from 'antd';
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import axios from "axios";
import GetCookieData from "../../../GetCookieData";

const cookie = GetCookieData()
console.log(cookie)


const columns = [
    {
        title: '申诉编号',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },{
        title: '试卷编号',
        dataIndex: 'paper_id',
        key: 'paper_id',
    },
    {
        title: '创建时间',
        dataIndex: 'create_at',
        key: 'create_at',
    },
    {
        title: '更新时间',
        dataIndex: 'update_at',
        key: 'update_at',
    },
    {
        title: '申诉状态',
        dataIndex: 'state',
        key: 'state',
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
        navigate("/teacher/appeal_info",{state:{appeal: value}})
    }

    const location = useLocation()
    const {state} = location
    console.log(location,state)

    const [data,setData] = useState([])
    const [total,setTotal] = useState(0)
    useEffect(()=>{
        let optionsSelect = []
        axios.post("https://xihui.luoxin.live/teacher/appeal/list",{
            options: {
                options: optionsSelect,
                offset: 0,
                show_total: true,
            },
            show_paper: false,
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            let da = []
            let count = 0
            let state = ''
            console.log(res.data.data)
            for(let i = 0; i < res.data.data.list.length; i++){
                let d = res.data.data.list[i]
                console.log(d.created_at)
                if (d.state === 2) {
                    state = '等待教师处理'
                }
                if (d.state === 3) {
                    state = '已结束'
                }
                if (d.state === 2 || d.state === 3) {
                    count += 1
                    if (count <= 6) {
                        da.push({
                            key: '' + (i + 1) + '',
                            id: d.id,
                            paper_id: d.paper_id,
                            create_at: new Date(d.created_at * 1000).toLocaleString(),
                            update_at: new Date(d.updated_at * 1000).toLocaleString(),
                            state: state,
                        })
                    }
                }
                console.log(da)
            }
            setTotal(count)
            setData(da)
        }).catch(error => console.log(error));
    },[])

    const change: PaginationProps['onChange'] = (pageNumber) => {
        console.log('Page: ', pageNumber);
        let optionsSelect = []
        let state = ''
        let id = ''
        let paper = ''
        cond.map((element)=>{
            if (element === 6){
                state = document.getElementById("state").value
                if (state === '等待教师处理') {
                    state = 2
                }
                if (state === '已结束') {
                    state = 3
                }
                optionsSelect.push({
                    key: 6,
                    val: state,
                })
            }
            if (element === 5){
                id = document.getElementById("id").value
                optionsSelect.push({
                    key: 5,
                    val: parseInt(id),
                })
            }
            if (element === 4){
                paper = document.getElementById("paper").value
                optionsSelect.push({
                    key: 4,
                    val: parseInt(paper),
                })
            }
        })
        axios.post("https://xihui.luoxin.live/teacher/appeal/list",{
            options: {
                options: optionsSelect,
                offset: 0,
                show_total: true,
            }
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            let da = []
            let count = 0
            for(let i = 0; i < res.data.data.list.length; i++){
                let d = res.data.data.list[i]
                setTotal(res.data.data.page.total)
                if (d.state === 2) {
                    state = '等待教师处理'
                }
                if (d.state === 3) {
                    state = '已结束'
                }
                if (d.state === 2 || d.state === 3) {
                    count += 1
                    if (count > 6*(pageNumber-1) && count <= 6*pageNumber) {
                        da.push({
                            key: ''+(i+1)+'',
                            id: d.id,
                            paper_id: d.paper_id,
                            create_at: new Date(d.created_at *1000).toLocaleString(),
                            update_at: new Date(d.updated_at *1000).toLocaleString(),
                            state: state,
                        })
                    }
                }
            }
            setTotal(count)
            setData(da)
        }).catch(error => console.log(error));
    };


    const [cond,setCond] = useState([])
    const onSelect = (checkedValues) => {
        console.log('checked = ', checkedValues);
        setCond(checkedValues)
    };
    const options = [
        {
            label: '申诉状态',
            value: 6,
        },
        {
            label: '申诉编号',
            value: 5,
        },
        {
            label: '试卷编号',
            value: 4,
        },
    ];
    const onResult = () => {
        let optionsSelect = []
        let state = ''
        let id = ''
        let paper = ''
        cond.map((element)=>{
            if (element === 6){
                state = document.getElementById("state").value
                if (state === '等待教师处理') {
                    state = 2
                }
                if (state === '已结束') {
                    state = 3
                }
                optionsSelect.push({
                    key: 6,
                    val: state,
                })
            }
            if (element === 5){
                id = document.getElementById("id").value
                optionsSelect.push({
                    key: 5,
                    val: parseInt(id),
                })
            }
            if (element === 4){
                paper = document.getElementById("paper").value
                console.log(paper)
                optionsSelect.push({
                    key: 4,
                    val: parseInt(paper),
                })
            }
        })
        axios.post("https://xihui.luoxin.live/teacher/appeal/list",{
            options: {
                options: optionsSelect,
                offset: 0,
                limit: 6,
                show_total: false,
            }
        },{
            headers: {
                "X-Session-Id": cookie.token
            }
        }) .then(res =>{
            let da = []
            let state = ''
            let count = 0
            for(let i = 0; i < res.data.data.list.length; i++){
                let d = res.data.data.list[i]
                setTotal(res.data.data.page.total)
                if (d.state === 2) {
                    state = '等待教师处理'
                }
                if (d.state === 3) {
                    state = '已结束'
                }
                if (d.state === 2 || d.state === 3) {
                    count += 1
                    da.push({
                        key: ''+(i+1)+'',
                        id: d.id,
                        paper_id: d.paper_id,
                        create_at: new Date(d.created_at *1000).toLocaleString(),
                        update_at: new Date(d.updated_at *1000).toLocaleString(),
                        state: state,
                    })
                }
                console.log(da)
            }
            setTotal(count)
            setData(da)
        }).catch(error => console.log(error));
    }

    return (
        <div>
            <div style={{
                marginLeft: '30px',
            }}>
                <Checkbox.Group style={{marginLeft:'240px',marginRight:'20px',marginBottom:'20px'}} options={options} defaultValue={['State']} onChange={onSelect} />
                <Input style={{width:'150px',marginRight:'20px'}} id='state' placeholder="根据申诉状态查询"/>
                <Input style={{width:'150px',marginRight:'20px'}} id='id' placeholder="根据申诉编号查询"/>
                <Input style={{width:'150px',marginRight:'20px'}} id='paper' placeholder="根据试卷编号查询"/>
                <Button type='primary' onClick={onResult}>查询</Button>
            </div>
            <Table pagination={false} columns={columns} dataSource={data} />
            <div style={{
                marginLeft: '800px',
                marginTop: '30px',
            }}>
                <Pagination
                    total={total}
                    defaultCurrent={1}
                    onChange={change}
                    defaultPageSize={6}
                    showTotal={(total) => `共 ${total} 条`}
                />
            </div>
        </div>
    )
}