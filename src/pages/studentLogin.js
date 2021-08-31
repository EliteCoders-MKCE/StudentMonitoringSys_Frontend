import { Link } from "react-router-dom";
import $ from 'jquery';
import '../assets/jquery.toaster';
import settings from '../settings.json';
import mkce from '../assets/MKCE_Logo_SGS.png';

function login()
{
    let register_no = document.getElementById("student-reg-no").value;
    let register_pass = document.getElementById("student-password").value;
    $.post(settings.ip+"api/student/login?register_no="+register_no+"&password="+register_pass,(data,status)=>{
        console.log(data,status);
        if(data.loginStatus==="true")
        {
            sessionStorage.setItem("registerNo",data.registerNo);
            sessionStorage.setItem("loginStatus",data.loginStatus);
            sessionStorage.setItem("classGroup",data.classGroup);
            window.location.href="/student";
        }
        else
        $.toaster('Invalid Credential...','', 'warning');
        
    }).fail(()=>{
        $.toaster('Login Request Failed...','', 'danger');
    });  
}

export default function studentLogin()
{
    $( document ).ready(function() {
    document.getElementById("student-reg-no").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          document.getElementById("student-password").focus();
        }
      });
      document.getElementById("student-password").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          login();
        }
      });
    });
    return(<div className="login-page login-page-bg">
        <div className="row">
            <div className="col-md-4 col-sm-12"></div>
            <div className="col-md-4 col-sm-12" style={{textAlign:"center",maxHeight:"100vh"}}>
                <div className="z-40 login-container">
                   <h2 className="text-xl text-white">Student Portal</h2>
                   <img style={{width:"120px",height:"90px",margin:"0 auto"}} src={mkce} alt="MKCE"></img>
                   <br/>
                    <div className="form-group" style={{textAlign:"center"}}>
                    <i style={{color:"green",marginRight:"3px"}} className='bx bx-user'></i><input type="text" placeholder="Register No"  className="login-input" id="student-reg-no"/>
                    </div>
                    <br/>
                    <div className="form-group" style={{textAlign:"center"}}>
                    <i style={{color:"green",marginRight:"3px"}} className='bx bx-lock'></i><input type="password" placeholder="Password" className="login-input" id="student-password"/>
                    </div>
                    <br/>
                    <button type="submit" onClick={()=>login()} style={{backgroundColor:"transparent",width:"50%"}} className="btn btn-success hover:bg-green-400 focus:outline-none focus:ring-2">Login</button>
                    <br/><br/><hr/>
                    <div style={{textAlign:"left"}}>
                       <br/> <Link to="/faculty-login" className="text-purple-700">Faculty Login</Link>
                      <br/>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-sm-12"></div>
        </div>
        <div className="alert alert-danger" role="alert">Login Request Failed</div>
        <div id="author-tag"> Made With <span style={{fontSize:"15px"}} id="tag-heart" className="material-icons small text-red-500">favorite</span> By EliteCoders - MKCE </div>
    </div>);
}