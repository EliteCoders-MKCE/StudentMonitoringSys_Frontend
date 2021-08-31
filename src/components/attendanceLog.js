import $ from 'jquery';
import { Component } from 'react';
import settings from '../settings.json';

function ListItem(props)
{
    function download(fileId)
    {
        let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
        window.open(settings.ip+'api/attn/download?class_group='+classGroup+'&file_id='+fileId);
    }
    function deleteLog(fileId)
    {
        let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
        $.get(settings.ip+'api/attn/delete-log?class_group='+classGroup+'&file_id='+fileId,(data,status)=>{
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
    return(
        <div style={{marginTop:"5px"}} >
        <div className="row sgs-center log-row dyn-margintop-log-row">
            <div className="col-md-4">{props.data.attendance_id}</div>
            <div className="col-md-4">{props.data.date_time}</div>
            <div className="col-md-4">
                <button className="btn btn-primary bg-blue-500" onClick={()=>download(props.data.date_time)} style={{padding:"4px"}}><i className="material-icons small">cloud_download</i> Download</button>
                <button className="btn btn-danger bg-red-500 give-topmargin"onClick={()=>deleteLog(props.data.date_time)} style={{padding:"5px",marginLeft:"10px"}}><i className="material-icons small">delete</i> Delete</button>
            </div>
        </div>
        </div>
    )
}

class AttendanceLog extends Component
{
    constructor()
    {
        super();
        this.state={data:null}
        let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
        $.get(settings.ip+'api/attn/get-log?class_group='+classGroup,(data,status)=>{
            if(status==="success")
                this.setState({data:data});
            });
    }
    render()
    {   
        if(this.state.data)
        {
            return(<div className="dashboard-cont">
                <div className="sgs-center">
                    <span className="text-xl">ATTENDANCE LOGS</span>
                </div>
                <br/>
                <div style={{marginTop:"5px"}} className="hide-onphone">
        <div className="row sgs-center"  style={{color:"lightsalmon",padding:"10px",borderRadius:"5px",border:"1px dotted #4723D9"}}>
            <div className="col-md-4">TITLE</div>
            <div className="col-md-4">DATE-TIME</div>
            <div className="col-md-4">FILE</div>
        </div>
        </div>
                <div>
            {
                this.state.data.map((item,i)=>{
                   return <ListItem key={i} data={item}/>
                })
            }
            </div>
        </div>)
        }
        else
        return(<>loading...</>)
       
    }
}
export default AttendanceLog;