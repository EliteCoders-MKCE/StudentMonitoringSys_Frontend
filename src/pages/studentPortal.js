import { Link } from "react-router-dom";
import {Switch,Route } from "react-router-dom";
import UnderConstruction from "../components/underConstruction";


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
    <div className="header_text text-white text-xl"><h2>III ECE A</h2></div>
</header>
<div className="l-navbar" id="nav-bar">
    <nav className="nav">
        <div> <a href="/student" className="nav_logo"> <i className='bx bx-layer nav_logo-icon'></i> <span className="nav_logo-name font-roboto">Faculty Portal</span> </a>
            <div className="nav_list">
                 <Link to="/student" className="nav_link active"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </Link> 
                 <Link to="/student" className="nav_link"> <i className='bx bx-user nav_icon'></i> <span className="nav_name">Students</span> </Link>
             {/*<Link to="/faculty" className="nav_link"> <i className='bx bx-bookmark nav_icon'></i> <span className="nav_name">Bookmark</span> </Link>*/}
             <Link to="/student" className="nav_link"> <i className='bx bx-folder nav_icon'></i> <span className="nav_name">Files</span> </Link> 
             <Link to="/student" className="nav_link"> <i className='bx bx-bar-chart-alt-2 nav_icon'></i> <span className="nav_name">Stats</span> </Link> </div>
        </div> <button onClick={()=>logout()} className="nav_link"> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">Log Out</span> </button>
    </nav>
</div>

<div className="height-100 bg-dark cont-div">
  <Switch>
      <Route exact path="/student" component={UnderConstruction}></Route>
  </Switch>
</div>
</div>);
}