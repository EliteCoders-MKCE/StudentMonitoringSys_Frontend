import { Component } from 'react';
import $ from 'jquery';
import settings from "../settings.json";

let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');


class Meet extends Component{
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
   <div className="dashboard-cont">
        <div className="row">
            <div className="col-md-6 col-sm-12 sgs-center">
                <div className="meet-create-div">
                    <h3 className="text-xl">Create New Meet</h3>
                <input type="text" placeholder="Meet Title" id="meet-title" className="modal-input" required/><br/>
                <br/><textarea placeholder="Meet Description" id="meet-description" className="modal-input" required/><br/>
                <br/><button onClick={()=>createMeet()} type="button" id="create-meet" className="btn btn-success"><i className="bx bx-plus"></i>Create Meet</button>
                </div>
            </div>
            <div className="col-md-6 col-sm-12">
                <div className="meet-create-div">
                <h3 className="text-xl sgs-center">Available Meetings</h3><br/>
                <div className="row sgs-center">
        <div className="col-sm-3 " style={{color:"gray"}}>Meet Name</div>
        <div className="col-sm-3 hide-onphone" style={{color:"gray"}}>Description</div>
        <div className="col-sm-6"></div>
    </div>
                {
                this.state.meet.map((item,i)=>{
                   return <MeetList key={i} data={item}/>
               })
           }
                </div>   
            </div>
        </div>
    </div>
    </>
else
    return<>Loading..</>
}
}
export default Meet;

function createMeet(){
    let title = document.getElementById("meet-title").value;
    let desc = document.getElementById("meet-description").value;
    
    $.get(settings.ip+'api/meet/create?class_group='+classGroup+'&title='+title+'&desc='+desc,(data,status)=>{
        if(status==="success")
        {
            $.toaster(data,'', 'success');
            setTimeout(()=>{
                window.location.reload();
            },800);
        }
            
    }).fail(()=>{
        $.toaster('Request Failed...','', 'danger');
    });
}

function MeetList(props){

    function deleteMeet(){
        alert('delete meet method on dev')
        let meetId = props.data.meet_id;
        $.get(settings.ip+'api/meet/delete?class_group='+classGroup+'&meet_id='+meetId,(data,status)=>{
            if(status==="success")
            {
                $.toaster(data,'', 'success');
                setTimeout(()=>{
                    window.location.reload();
                },800);
            }
                
        }).fail(()=>{
            $.toaster('Request Failed...','', 'danger');
        });
    }

    function joinMeet(){
        let meetId = props.data.meet_id;
        let name = sessionStorage.getItem('staffName')+' SuperUser'
        const url = 'https://simclair-sms.azurewebsites.net/build?groupId='+meetId+'&name='+name+'&auth=bmkfbvf224vgcbhb7vjsv45vfnnmbd'
        window.open(url, '_blank').focus();
    }

    return<>
    <div className="row meet-list sgs-center">
        <div className="col-sm-3" >{props.data.title}</div>
        <div className="col-sm-3" >{props.data.desc}</div>
        <div className="col-sm-6">
            <button onClick={()=>joinMeet()} style={{marginRight:"10px"}} type="button" id="join-meet" className="btn btn-success"><i style={{marginRight:"6px"}} className="material-icons small left">send</i>Join</button>
            <button onClick={()=>deleteMeet()} type="button" id="delete-meet" className="btn btn-danger"><i style={{marginRight:"6px"}} className="material-icons small left">delete</i>Delete</button>
        </div>
    </div>
    </>
}