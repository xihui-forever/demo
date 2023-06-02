import React from "react"
import {BrowserRouter, Route} from "react-router-dom"
import Home from "../views/Home";

import {Routes, useNavigate} from "react-router";
import Login from "../views/Login"
import About from "../views/About";

import Admin from "../components/admin/Admin";
import TeacherList from "../components/admin/teacher/List";
import ATeacherInfo from "../components/admin/teacher/Info";
import TeacherAdd from "../components/admin/teacher/Add";
import StudentList from "../components/admin/student/List";
import AStudentInfo from "../components/admin/student/Info";
import StudentAdd from "../components/admin/student/Add";

import Teacher from "../components/teacher/Teacher";
import TeacherInfo from "../components/teacher/info/Info";
import ExamList from "../components/teacher/exam/List";
import ExamInfo from "../components/teacher/exam/Info";
import PaperList from "../components/teacher/paper/List";
import PaperInfo from "../components/teacher/paper/Info";
import PaperAdd from "../components/teacher/paper/Add";
import AppealList from "../components/teacher/appeal/List";
import AppealInfo from "../components/teacher/appeal/Info";

import Student from "../components/student/Student";
import StudentInfo from "../components/student/info/Info";
import SPaperList from "../components/student/paper/List";
import SPaperInfo from "../components/student/paper/Info";
import SAppealList from "../components/student/appeal/List";
import SAppealInfo from "../components/student/appeal/Info";
import cookie from "react-cookies";




export default function IndexRouter () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}>
                    <Route path="about" element={<About/>} />
                </Route>
                <Route path="/login" element={<Login/>} />

                <Route path="/admin" element={<Admin/>}>
                    <Route index element={<DefaultAdmin/>} />
                    <Route path="teacher_list" element={<TeacherList/>} />
                    <Route path="teacher_info" element={<ATeacherInfo/>} />
                    <Route path="teacher_add" element={<TeacherAdd/>} />
                    <Route path="student_list" element={<StudentList/>} />
                    <Route path="student_info" element={<AStudentInfo/>} />
                    <Route path="student_add" element={<StudentAdd/>} />
                    <Route path="*" element={<NotFound/>} />
                </Route>
                <Route path="/teacher" element={<Teacher/>}>
                    <Route index element={<DefaultUser/>} />
                    <Route path="info" element={<TeacherInfo/>} />
                    <Route path="exam_list" element={<ExamList/>} />
                    <Route path="exam_info" element={<ExamInfo/>} />
                    <Route path="paper_list" element={<PaperList/>} />
                    <Route path="paper_info" element={<PaperInfo/>} />
                    <Route path="paper_add" element={<PaperAdd/>} />
                    <Route path="appeal_list" element={<AppealList/>} />
                    <Route path="appeal_info" element={<AppealInfo/>} />
                    <Route path="*" element={<NotFound/>} />
                </Route>
                <Route path="/student" element={<Student/>}>
                    <Route index element={<DefaultUser/>} />
                    <Route path="info" element={<StudentInfo/>} />
                    <Route path="paper_list" element={<SPaperList/>} />
                    <Route path="paper_info" element={<SPaperInfo/>} />
                    <Route path="appeal_list" element={<SAppealList/>} />
                    <Route path="appeal_info" element={<SAppealInfo/>} />
                    <Route path="*" element={<NotFound/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

function DefaultAdmin() {
    if (cookie.load('token') === undefined) {
        console.log(1)
        window.location.reload()
    }
    const cookieData = {
        token: cookie.load('token'),
        info: cookie.load('info'),
    }
    console.log(cookieData)
    return (
        <div>
            <h2 style={{marginLeft: '350px',marginTop: '200px',fontSize: '30px',color: '#92B9DC'}}>欢迎进入互阅申诉系统! {cookieData.info.username}</h2>
        </div>
    )
}

function DefaultUser() {
    if (cookie.load('token') === undefined) {
        console.log(1)
        window.location.reload()
    }
    const cookieData = {
        token: cookie.load('token'),
        info: cookie.load('info'),
    }
    console.log(cookieData)
    return (
        <div>
            <h2 style={{marginLeft: '350px',marginTop: '200px',fontSize: '30px',color: '#92b9dc'}}>欢迎进入互阅申诉系统! {cookieData.info.name}</h2>
        </div>
    )
}

function NotFound() {
    return (
        <div>
            <h2>NotFound</h2>
        </div>
    );
}
