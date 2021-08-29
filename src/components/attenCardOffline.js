import $ from 'jquery';
import settings from '../settings.json';

export default function CardOffline(props)
{

    function changeStatusToTrue()
    {
        let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
        let attnId = props.data.attendance_id;
        $.post(settings.ip+"api/attn/update-status?class_group="+classGroup+"&attn_id="+attnId+"&status=true",
        (data,status)=>{
                    if(status==="success")
                    {
                        alert(data);
                        window.location.reload();
                    }
        }).fail(()=>{
            alert('Request Failed');
        });
    }


    function insertDataToForm()
    {
        let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
        let attnId = props.data.attendance_id;
        $.get(settings.ip+"api/attn/get?class_group="+classGroup+"&attn_id="+attnId,
        (data,status)=>{
                    if(status==="success")
                    {
                        document.getElementById("upd-atn-modal").style.display="block";
                        document.getElementById("upd-attn-title").value=data[0].attendance_title;
                        document.getElementById("upd-attn-desc").value=data[0].attendance_desc;
                        document.getElementById("upd-attn-id").value=attnId;
                        document.getElementById("upd-attn-date").value=data[0].date.replace(/\//g,'-');
                        document.getElementById("upd-attn-strtm").value=data[0].start_time;
                        document.getElementById("upd-attn-endtm").value=data[0].end_time;
                        (data[0].type==="once")?document.getElementById("upd-attn-single").checked=true:document.getElementById("upd-attn-cont").checked=true;
                        document.getElementById("upd-attn-rsltselect").value=data[0].result_log;
                        document.getElementById("upd-attn-status").checked=(data[0].status==="true")?true:false;

                    }
        }).fail(()=>{
            alert('Request Failed');
        });
    }

    function deleteAttendance()
    {
        let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
        let attnId = props.data.attendance_id;
        $.post(settings.ip+"api/attn/delete?class_group="+classGroup+"&attn_id="+attnId,
        (data,status)=>{
                    if(status==="success")
                    {
                        alert(data);
                        window.location.reload();
                    }
        }).fail(()=>{
            alert('Request Failed');
        });
    }

    function resetAndReport()
    {
        let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
        let attnId = props.data.attendance_id;
        $.post(settings.ip+"api/attn/reset-save?class_group="+classGroup+"&attn_id="+attnId,
        (data,status)=>{
                    if(status==="success")
                    {
                        alert(data);
                        window.location.reload();
                    }
        }).fail(()=>{
            alert('Request Failed');
        });
    }

 return(
 <div className="col-md-5 col-sm-12 p-2 attendance-card card-offline m-2">
                    <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <span className="text-2xl">{props.data.attendance_title}</span>
                        <br/>
                         <span style={{color:"gray"}}>{props.data.attendance_id}</span>
                    </div>
                    <div className="col-md-6 col-sm-12 sgs-right">
                        Status : {(props.data.status==="true")?"online":"offline"}
                    </div>
                    </div>
                    <br/>
                    <hr/>
                    <br/><p>&nbsp;&nbsp;&nbsp;&nbsp;{props.data.attendance_desc}</p>
                    <br/>
                    <div className="sgs-right">
                        <button type="button" onClick={()=>deleteAttendance()} className="btn btn-danger" style={{marginRight:"15px",marginBottom:"10px"}}><span className="material-icons small">cancel</span> Delete</button>
                        <button type="button" onClick={()=>resetAndReport()}className="btn btn-primary" style={{marginRight:"15px",marginBottom:"10px"}}><span className="material-icons small">view_list</span> Report</button>
                        <button type="button" onClick={()=>insertDataToForm()} className="btn btn-light hover:bg-gray-200" style={{marginRight:"15px",marginBottom:"10px"}}><span className="material-icons small">settings</span> Edit</button>
                        <button type="button" onClick={()=>changeStatusToTrue()} className="btn btn-success" style={{marginRight:"15px",marginBottom:"10px"}}><i className="material-icons small">play_arrow</i> Start</button>
                    </div>
                </div>)
}