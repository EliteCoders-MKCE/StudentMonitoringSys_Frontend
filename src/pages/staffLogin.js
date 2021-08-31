import { Link } from "react-router-dom";
import $ from 'jquery';
import '../assets/jquery.toaster';
import settings from "../settings.json";
import mkce from '../assets/MKCE_Logo_SGS.png';

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
    $( document ).ready(function() {
        document.getElementById("log-staff-id").addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
              event.preventDefault();
              document.getElementById("staff-password").focus();
            }
          });
        document.getElementById("staff-password").addEventListener("keyup", function(event) {
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
               <h2 className="text-xl text-white">Faculty Portal</h2>
               
                 <img style={{width:"120px",height:"90px",margin:"0 auto"}} src={mkce} alt="MKCE"></img>
                 <br/>
                <div className="form-group" style={{textAlign:"center"}}>
                <i style={{color:"green",marginRight:"3px"}} className='bx bx-user'></i><input type="text" placeholder="Faculty Id" className="login-input" id="log-staff-id"/>
                </div>
                <br/>
                <div className="form-group" style={{textAlign:"center"}}>
                <i style={{color:"green",marginRight:"3px"}} className='bx bx-lock'></i><input type="password" placeholder="Password" className="login-input" id="staff-password"/>
                </div>
                <br/>
                <button type="submit" onClick={()=>login()} style={{backgroundColor:"transparent",width:"50%"}} className="btn btn-success hover:bg-green-100 focus:outline-none focus:ring-2">Login</button>
                <br/><br/><hr/>
                <div style={{textAlign:"left"}}>
                   <br/> <Link to="/" className="text-purple-700">Student Login</Link>
                  <br/>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-sm-12"></div>
    </div>
    <div id="author-tag"> Made With <span style={{fontSize:"15px"}} id="tag-heart" className="material-icons small text-red-500">favorite</span> By EliteCoders - MKCE </div>
</div>);
}