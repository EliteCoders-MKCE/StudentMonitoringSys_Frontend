import { Link } from "react-router-dom";
import React, { Suspense, lazy } from 'react';
import {Switch,Route } from "react-router-dom";

const StudentDashboard = lazy(() => import("../components/student/studentDashboard"));
const NoticeBoard = lazy(() => import("../components/student/noticeBoard"));
const StudentProfile = lazy(() => import("../components/student/studentProfile"));
const StudentStat = lazy(() => import("../components/student/studentStats"));

export default function studentPortal()
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
    });

    function logout()
    {
        sessionStorage.clear();
        window.location.href="/";
    }


return(<div id="body-pd" className="bg-dark">
<header className="header" id="header">
    <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"></i> </div>
    <div className="header_text text-white text-xl font-roboto"><h2>Student Portal</h2></div>
    <div className="header_text text-white text-xl"><h2>{sessionStorage.getItem('classGroup').replace(/-/g,' ')}</h2></div>
</header>
<div className="l-navbar" id="nav-bar">
    <nav className="nav">
        <div> <a href="/student" className="nav_logo"> <i className='bx bx-layer nav_logo-icon'></i> <span className="nav_logo-name font-roboto">Student Portal</span> </a>
            <div className="nav_list">
                 <Link to="/student" className="nav_link active"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </Link> 
                 <Link to="/student/me" className="nav_link"> <i className='bx bx-user nav_icon'></i> <span className="nav_name">Students</span> </Link>
             {/*<Link to="/faculty" className="nav_link"> <i className='bx bx-bookmark nav_icon'></i> <span className="nav_name">Bookmark</span> </Link>*/}
             <Link to="/student/notice" className="nav_link"> <i className='bx bx-message-alt-detail nav_icon'></i> <span className="nav_name">NoticeBoard</span> </Link> 
             <Link to="/student/stat" className="nav_link"> <i className='bx bx-bar-chart-alt-2 nav_icon'></i> <span className="nav_name">Stats</span> </Link> </div>
        </div> <button onClick={()=>logout()} className="nav_link logout-btn"> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">Log Out</span> </button>
    </nav>
</div>

<div className="height-100 bg-dark cont-div">
  <Switch>
  <Suspense fallback={<div>Loading...</div>}>
      <Route exact path="/student" component={StudentDashboard}></Route>
      <Route exact path="/student/me" component={StudentProfile}></Route>
      <Route exact path="/student/notice" component={NoticeBoard}></Route>
      <Route exact path="/student/stat" component={StudentStat}></Route>
      </Suspense>
  </Switch>
</div>
</div>);
}