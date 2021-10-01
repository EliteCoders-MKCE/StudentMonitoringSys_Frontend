import $ from 'jquery';
import settings from '../settings.json';

export default function CardOnline(props)
{
    let result_log = props.data.result_log;
    function changeStatusToFalse()
    {
        let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
        let attnId = props.data.attendance_id;
        $.post(settings.ip+"api/attn/update-status?class_group="+classGroup+"&attn_id="+attnId+"&status=false",
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

                    }
        }).fail(()=>{
            alert('Request Failed');
        });
    }

    function viewModal()
    {
        // View Insert data here 
       sessionStorage.setItem('live_result_log',result_log);
        $.get(settings.ip+'api/attn/get-liveatn?result_log='+result_log,(data,status)=>{
            if(status==="success")
                sessionStorage.setItem('live_atn_data',JSON.stringify(data));
        }).fail(()=>{console.log('failed to load live data from API')});


        document.getElementById("view-atn-modal").style.display = "block";
    }

 return(
 <div className="col-md-5 col-sm-12 p-2 attendance-card card-online m-2">
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
                        <button type="button" onClick={()=>viewModal()} className="btn btn-success" style={{marginRight:"15px",marginBottom:"10px"}}><span className="material-icons small">view_list</span> View</button>
                        <button type="button" onClick={()=>insertDataToForm()} className="btn btn-light hover:bg-gray-200" style={{marginRight:"15px",marginBottom:"10px"}}><span className="material-icons small">settings</span> Edit</button>
                        <button type="button" onClick={()=>changeStatusToFalse()} className="btn btn-danger" style={{marginRight:"15px",marginBottom:"10px"}}><i className="bx bx-x"></i> Stop</button>
                    </div>
                </div>)
}