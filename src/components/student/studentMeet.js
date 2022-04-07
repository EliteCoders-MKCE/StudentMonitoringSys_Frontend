import { Component } from 'react';
import $ from 'jquery';
import settings from "../../settings.json";

let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
let registerNo = sessionStorage.getItem('registerNo');
let studentName = null
$.get(settings.ip+'api/student-details/get?class_group='+classGroup+'&register_no='+registerNo,(data,status)=>{
    studentName = data[0].name.toUpperCase();
});

class StudentMeet extends Component{
    constructor(props){
        super();
        this.state = {meet:null};
        $.get(settings.ip+'api/meet/get-meets?class_group='+classGroup,(data,status)=>{
            if(status==="success")
            {
               this.setState({meet:data});
            }
                
        }).fail(()=>{
            $.toaster('Request Failed...','', 'danger');
        });
    }

render(){
    if(this.state.meet)
    return<>
                <div className="meet-create-div">
                <h3 className="text-xl sgs-center">Available Meetings</h3><br/>
                <div className="row sgs-center">
        <div className="col-sm-4 " style={{color:"gray"}}>Meet Name</div>
        <div className="col-sm-4 hide-onphone" style={{color:"gray"}}>Description</div>
        <div className="col-sm-4"></div>
    </div>
                {
                this.state.meet.map((item,i)=>{
                   return <MeetList key={i} data={item}/>
               })
           }
                </div>   
           
    </>
else
    return<>
    <div class="text-center">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></>
}
}
export default StudentMeet;


function MeetList(props){

    function joinMeet(){
        let meetId = props.data.meet_id;
        let name = (studentName)?studentName:"Student"
        const url = 'https://simclair-sms.azurewebsites.net/build?groupId='+meetId+'&name='+registerNo+'%20'+name+'&auth=bmkfbvf224vgcbhb7vjsv45vfnnmbd'
        window.open(url, '_blank').focus();
    }

    return<>
    <div className="row meet-list sgs-center">
        <div className="col-sm-4" >{props.data.title}</div>
        <div className="col-sm-4" >{props.data.desc}</div>
        <div className="col-sm-4">
            <button onClick={()=>joinMeet()} style={{marginRight:"10px"}} type="button" id="join-meet" className="btn btn-success"><i style={{marginRight:"6px"}} className="material-icons small left">send</i>Join</button>
        </div>
    </div>
    </>
}