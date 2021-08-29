import profileImg from '../../assets/profile.png';
import $ from 'jquery';
import settings from '../../settings.json';

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
   {/* <br/>
    <input className="prof-input" placeholder="Enter Password" type="password"/><br/>
    <input className="prof-input" placeholder="Confirm Password" type="password"/><br/>
   <br/>*/}
   <br/>
    <button className="btn btn-danger">Change Password</button>
    </div>
    <div className="col-md-3"></div>
            </div>
    )
}