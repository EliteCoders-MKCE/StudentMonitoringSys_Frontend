import { Link } from "react-router-dom";
import React, { Suspense, lazy } from 'react';
import {Switch,Route } from "react-router-dom";
import $ from 'jquery';
import settings from "../settings.json";

const Dashboard = lazy(() => import("../components/dashboard"));
const StudentDetails = lazy(() => import("../components/studentDetails"));
const FacultyStats = lazy(() => import("../components/facultyStats"));
const AttendanceLog = lazy(() => import("../components/attendanceLog"));
const FacultyChat = lazy(() => import("../components/facultychat"));

export default function staffPortal()
{
    document.addEventListener("DOMContentLoaded", function(event) {

        const showNavbar = (toggleId, navId, bodyId, headerId) =>{
        const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId)
        

        if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click', ()=>{
        nav.classList.toggle('show')
        toggle.classList.toggle('bx-x')
        bodypd.classList.toggle('body-pd')
        headerpd.classList.toggle('body-pd')
        })
        }
        }
        
        showNavbar('header-toggle','nav-bar','body-pd','header')
        const linkColor = document.querySelectorAll('.nav_link')
        
        function colorLink(){
        if(linkColor){
        linkColor.forEach(l=> l.classList.remove('active'))
        this.classList.add('active')
        }
        }
        linkColor.forEach(l=> l.addEventListener('click', colorLink))


        $.get(settings.ip+'api/loginstaff/get-name?staff_id='+sessionStorage.getItem("staffId"),(data,status)=>{
            if(status==="success")
            sessionStorage.setItem('staffName',data);
        });
        });

        function logout()
        {
            sessionStorage.clear();
            window.location.href="/";
        }

    return(<div id="body-pd" className="bg-dark">
   <header className="header" id="header">
        <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"></i> </div>
        <div className="header_text text-white text-xl font-roboto"><h2>Faculty Portal</h2></div>
        <div className="header_text text-white text-xl"><h2>{sessionStorage.getItem('classGroup').replace(/-/g,' ')}</h2></div>
    </header>
    <div className="l-navbar" id="nav-bar">
        <nav className="nav">
            <div> <a href="/faculty" className="nav_logo"> <i className='bx bx-layer nav_logo-icon'></i> <span className="nav_logo-name font-roboto"><b>{sessionStorage.getItem('staffName')}</b></span> </a>
                <div className="nav_list">
                     <Link to="/faculty" className="nav_link active"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </Link> 
                     <Link to="/faculty/student" className="nav_link"> <i className='bx bx-user nav_icon'></i> <span className="nav_name">Students</span> </Link>
                 {/*<Link to="/faculty" className="nav_link"> <i className='bx bx-bookmark nav_icon'></i> <span className="nav_name">Bookmark</span> </Link>*/}
                 <Link to="/faculty/chat" className="nav_link"> <i className='bx bx-message-alt-detail nav_icon'></i> <span className="nav_name">NoticeBoard</span> </Link>
                 <Link to="/faculty/stats" className="nav_link"> <i className='bx bx-bar-chart-alt-2 nav_icon'></i> <span className="nav_name">Stats</span> </Link>
                 <Link to="/faculty/log" className="nav_link"> <i className='bx bx-folder nav_icon'></i> <span className="nav_name">Files</span> </Link> 
                </div>
            </div> <button onClick={()=>{logout()}} className="nav_link logout-btn"> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">Log Out</span> </button>
        </nav>
    </div>
   
    <div className="height-100 bg-dark cont-div">
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/faculty" component={Dashboard}></Route>
          <Route exact path="/faculty/student" component={StudentDetails}></Route>
          <Route exact path="/faculty/log" component={AttendanceLog}></Route>
          <Route exact path="/faculty/stats" component={FacultyStats}></Route>
          <Route exact path="/faculty/chat" component={FacultyChat}></Route>
        </Suspense>
      </Switch>
    </div>
    </div>);
}