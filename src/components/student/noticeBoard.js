import { Component } from "react";
import $ from 'jquery';
import settings from '../../settings.json';


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
        </div><br/>
        <div className="sgs-left" style={{whiteSpace:"pre-line"}}>{props.data.message}</div>
        <br/>
        <div className="sgs-right text-gray-500">{props.data.date_time}</div>
        </div>
    </>)
}

class NoticeBoard extends Component
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
                    <div className="sgs-center" style={{marginBottom:"10px"}}>
                        <span className="text-xl text-green-300"><i className="material-icons small">event_note</i> NOTICE BOARD</span>
                        </div>
                    <div id="chat-faculty" className="font-roboto" style={{overflowY:"auto",maxHeight:"72vh",padding:"5px"}}>
                    {
                       this.state.data.map((item,i)=>{
                           return <Message key={i} data={item}/>
                       })
                    }
                    </div>
                </div>)
        }
        else return(<div>Loading..</div>)
    }
}
export default NoticeBoard;