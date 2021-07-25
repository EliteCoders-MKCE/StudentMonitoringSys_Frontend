import $ from 'jquery';

export default function CardOffline(props)
{
    function changeStatusToTrue()
    {
        let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
        let attnId = props.data.attendance_id;
        $.post("http://localhost:8080/api/attn/update-status?class_group="+classGroup+"&attn_id="+attnId+"&status=true",
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

    function deleteAttendance()
    {
        let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
        let attnId = props.data.attendance_id;
        $.post("http://localhost:8080/api/attn/delete?class_group="+classGroup+"&attn_id="+attnId,
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
                        <button type="button" className="btn btn-primary" style={{marginRight:"15px",marginBottom:"10px"}}><span className="material-icons small">view_list</span> View</button>
                        <button type="button" className="btn btn-light hover:bg-gray-200" style={{marginRight:"15px",marginBottom:"10px"}}><span className="material-icons small">settings</span> Edit</button>
                        <button type="button" onClick={()=>changeStatusToTrue()} className="btn btn-success" style={{marginRight:"15px",marginBottom:"10px"}}><i className="material-icons small">play_arrow</i> Start</button>
                    </div>
                </div>)
}