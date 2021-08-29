import { Link } from "react-router-dom";
import $ from 'jquery';
import '../assets/jquery.toaster';
import settings from '../settings.json';

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
    return(<div className="login-page login-page-bg">
        <div className="row">
            <div className="col-md-4 col-sm-12"></div>
            <div className="col-md-4 col-sm-12" style={{textAlign:"center",maxHeight:"100vh"}}>
                <div className="z-40 login-container">
                   <h2 className="text-xl text-white">Student Portal</h2>
                   <br/>
                    <div className="form-group" style={{textAlign:"left"}}>
                        <label htmlFor="student-reg-no" style={{color:"gray"}}>Register Number</label>
                        <input type="text" className="form-control" id="student-reg-no"/>
                    </div>
                    <br/>
                    <div className="form-group" style={{textAlign:"left"}}>
                        <label htmlFor="student-password" style={{color:"gray"}}>Password</label>
                        <input type="password" className="form-control" id="student-password"/>
                    </div>
                    <br/>
                    <button type="submit" onClick={()=>login()} className="btn btn-success hover:bg-green-400 focus:outline-none focus:ring-2">Login</button>
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
    </div>);
}