import { Link } from "react-router-dom";
import $ from 'jquery';
import '../assets/jquery.toaster';
import settings from "../settings.json";

function login()
{
    let staffId = document.getElementById("log-staff-id").value;
    let staffPass = document.getElementById("staff-password").value;
    $.post(settings.ip+"api/loginstaff/login?staff_id="+staffId+"&password="+staffPass,(data,status)=>{
        //console.log(data,status);
        if(data.loginStatus==="true")
        {
            sessionStorage.setItem("staffId",data.staffId);
            sessionStorage.setItem("loginStatus",data.loginStatus);
            sessionStorage.setItem("classGroup",data.classGroup);
            window.location.href="/faculty";
        }
        else
        $.toaster('Invalid Credential...','', 'warning');
        
    }).fail(()=>{
        $.toaster('Login Request Failed...','', 'danger');
    });  
}

export default function staffLogin()
{
    return(<div className="login-page login-page-bg">
    <div className="row">
        <div className="col-md-4 col-sm-12"></div>
        <div className="col-md-4 col-sm-12" style={{textAlign:"center",maxHeight:"100vh"}}>
            <div className="z-40 login-container">
               <h2 className="text-xl text-white">Faculty Portal</h2>
               <br/>
                <div className="form-group" style={{textAlign:"left"}}>
                    <label htmlFor="log-staff-id" style={{color:"gray"}}>Staff Id</label>
                    <input type="text" className="form-control" id="log-staff-id"/>
                </div>
                <br/>
                <div className="form-group" style={{textAlign:"left"}}>
                    <label htmlFor="staff-password" style={{color:"gray"}}>Password</label>
                    <input type="password" className="form-control" id="staff-password"/>
                </div>
                <br/>
                <button type="submit" onClick={()=>login()} className="btn btn-success hover:bg-green-400 focus:outline-none focus:ring-2">Login</button>
                <br/><br/><hr/>
                <div style={{textAlign:"left"}}>
                   <br/> <Link to="/" className="text-purple-700">Student Login</Link>
                  <br/>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-sm-12"></div>
    </div>
</div>);
}