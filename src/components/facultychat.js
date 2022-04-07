import { Component } from "react";
import $ from 'jquery';
import settings from '../settings.json';

function deleteMessage(msgId)
{
    let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
    $.get(settings.ip+'api/misc/delete-msg?class_group='+classGroup+"&message_id="+msgId,(data,status)=>{
        if(status==="success")
        {
                 $.toaster(data,'', 'warning');
                setTimeout(()=>window.location.reload(),500);
        }
    })
}

function Message(props)
{
    let border = "blue";
    if(props.data.priority==="urgent")
        border="red";
    else if(props.data.priority==="warn")
        border="yellow";
    return(
    <>
    <div className="sgs-left chat-msg" style={{borderColor:border}}>
        <div className="text-green-500">@ {props.data.sender}
        <button style={{float:"right"}} onClick={()=>deleteMessage(props.data.date_time)}><i className="material-icons small text-red-400">delete</i></button>
        </div><br/>
        <div className="sgs-left" style={{whiteSpace:"pre-line"}}>{props.data.message}</div>
        <br/>
        <div className="sgs-right text-gray-500">{props.data.date_time}</div>
        </div>
    </>)
}

function sendMessage()
{
    let message = document.getElementById("chat-msg-txtbx").value;
    message = message.replace(/\n/g,'/n');
    let type = document.getElementById("chat-msg-type").value;
    let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
    let staffName = sessionStorage.getItem('staffName');
    $.post(settings.ip+'api/misc/save-message?class_group='+
    classGroup+"&message="+message+"&sender="+staffName+'&priority='+type,(data,status)=>{
        if(status==="success")
            {
                $.toaster(data,'', 'success');
                setTimeout(()=>window.location.reload(),500);
            }
    });
}

class FacultyChat extends Component
{
    constructor()
    {
        super();
        this.state={data:null}
        let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
        $.get(settings.ip+"api/misc/get-chat?class_group="+classGroup,(data,status)=>{
            if(status==="success")
                this.setState({data:data});
        });

       
    }


    render()
    {
        if(this.state.data)
        {
            //console.log(this.state.data)
            $(document).ready(function() {
                document.getElementById("chat-faculty").scrollTop = document.getElementById("chat-faculty").scrollHeight;
              })
            return(
                <div className="dashboard-cont">
                    <div id="chat-faculty" className="font-roboto" style={{overflowY:"auto",maxHeight:"65vh",padding:"5px"}}>
                    {
                       this.state.data.map((item,i)=>{
                           return <Message key={i} data={item}/>
                       })
                    }
                    </div>
                    <div style={{borderRadius:"15px"}} className="row">
                        <div className="col-md-8">
                        <textarea style={{marginTop:"25px",width:"100%"}} id="chat-msg-txtbx" placeholder="Type a message" className="login-input"/>
                        </div>
                        <div className="col-md-2 sgs-center" >
                        <br/>
                        <br/>
                        <select style={{backgroundColor:"transparent",color:"turquoise",outline:"none",margin:"0 auto"}} className="form-select" id="chat-msg-type">
                            <option value="info">Info</option>
                            <option  value="warn">Warn/Remind</option>
                            <option  value="urgent">Urgent</option>
                        </select>
                        </div>

                        <div className="col-md-2 sgs-center" >
                            <br/>
                            <br/>
                            <button onClick={()=>sendMessage()} style={{backgroundColor:"transparent"}} className="btn btn-success"><i className="material-icons small text-green-500">send</i> Send</button>
                        </div>
                        
                    </div>
                </div>)
        }
        else  return<>
        <div class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div></>
    }
}
export default FacultyChat;