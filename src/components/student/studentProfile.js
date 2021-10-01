import profileImg from '../../assets/profile.png';
import $ from 'jquery';
import settings from '../../settings.json';


function ChangePassword()
{   
    function Change()
    {
        let old  = document.getElementById("old-pass").value;
        let newp  = document.getElementById("new-pass").value;
        let conf  = document.getElementById("conf-pass").value;
        let registerNo = sessionStorage.getItem('registerNo');
        if(newp!==conf)
        $.toaster('Password Mismatch..','', 'danger');
        else if(newp==="")
        $.toaster('Invalid input...','', 'danger');
        else if(old===newp)
        $.toaster('New password and old password cant be same','', 'danger');
        else
        {
            $.post(settings.ip+'api/student/reset-pass?register_no='+registerNo+'&old_pass='+old+'&new_pass='+newp,(data,status)=>{
                if(status==="success")
                {
                    $.toaster(data,'', 'success');
                    setTimeout(()=>{window.location.reload();},2000);
                }
                
            });
        }
    }
    
    return(
    <div id="chg-pwd-modal" className="modal font-roboto">
    <div className="modal-content">
        <div className="modal-container sgs-center">
            <div className="sgs-center">
                <span className="text-xl">Change Password</span>
            </div>
            <br/>
        <input type="password" placeholder="Old Password" id="old-pass" className="modal-input" required/><br/>
        <input type="password" placeholder="New password" id="new-pass" className="modal-input" required/><br/>
        <input type="password" placeholder="Confirm password" id="conf-pass" className="modal-input" required/><br/>
            <br/>
            <button type="submit" onClick={()=>Change()} className="btn btn-success" style={{marginRight:"15px"}}>Continue..</button>
            <button id="close-chg-pwd-modal" className="btn btn-danger">Close</button><br/>
        </div> 
    </div>
    </div>);
}



export default function StudentProfile()
{
    $( document ).ready(function() {
        let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
        let registerNo = sessionStorage.getItem('registerNo');
        $.get(settings.ip+'api/student-details/get?class_group='+classGroup+'&register_no='+registerNo,(data,status)=>{
            document.getElementById("prof-reg").innerHTML=data[0].register_no;
            document.getElementById("prof-name").innerHTML=data[0].name.toUpperCase();
            document.getElementById("prof-gender").innerHTML=data[0].gender.toUpperCase();
            document.getElementById("prof-mail").innerHTML=data[0].e_mail;
            document.getElementById("prof-class").innerHTML=data[0].dept_class;
        });
        var modal = document.getElementById("chg-pwd-modal");
        var btn = document.getElementById("open-chg-pwd");
        var span = document.getElementById("close-chg-pwd-modal");
        btn.onclick = function() {
        modal.style.display = "block";
        }
        span.onclick = function() {
        modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target===modal) {
                modal.style.display = "none";
            }
            }
    });
    return(
        <div className="row dashboard-cont">
            <div className="col-md-3"></div>
            <div className="col-md-6 margin-top-profile" style={{textAlign:"center",marginTop:"20px",padding:"20px",border:"2px solid #4723D9",borderRadius:"15px"}}>
                <span className="text-xl"><b>M KUMARASAMY COLLEGE OF ENGINEERING<br/>THALAVAPALAYAM, KARUR</b><br/><br/></span>
    <img src={profileImg} alt="student_profile" style={{height:"100px",width:"100px",margin:"0 auto"}}/>
    <br/>
    <br/>
    <div className="sgs-left row">
        <div className="col-md-2"></div>
    <div className="sgs-left col-md-8 prof-opts" >
       <span className="text-profile" style={{marginRight:"25px"}}>REGISTER NO</span>:  <span className="prof-aft-colon" id="prof-reg">...</span><br/>
       <span className="text-profile" style={{marginRight:"78px"}}>NAME</span>:  <span className="prof-aft-colon" id="prof-name">...</span><br/>
       <span className="text-profile" style={{marginRight:"61px"}}>GENDER</span>:  <span className="prof-aft-colon" id="prof-gender">...</span><br/>
       <span className="text-profile" style={{marginRight:"77px"}}>EMAIL</span>:  <span  className="prof-aft-colon" id="prof-mail">...</span><br/>
       <span className="text-profile" style={{marginRight:"77px"}}>CLASS</span>:  <span className="prof-aft-colon" id="prof-class">...</span><br/>
    </div>
    <div className="col-md-2"></div>
    </div>
   {<ChangePassword/>}
   <br/>
    <button id="open-chg-pwd" className="btn btn-danger">Change Password</button>
    </div>
    <div className="col-md-3"></div>
            </div>
    )
}