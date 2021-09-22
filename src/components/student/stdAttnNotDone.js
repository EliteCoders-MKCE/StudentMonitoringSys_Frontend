export default function StdCardOffline(props)
{
 return(
 <div className="col-md-5 col-sm-12 p-2 attendance-card card-offline m-2">
                    <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <span className="text-2xl">{props.data.attendance_title}</span>
                        <br/>
                         <span style={{color:"gray"}}>{props.data.attendance_id}</span>
                    </div>
                    <div className="col-md-6 col-sm-12 sgs-right text-green-500">
                        Status : {(props.data.status==="true")?"online":"offline"}<br/>
                        Type : {(props.data.type==="once")?"Once":"Continuous"}
                    </div>
                    </div>
                    
                    <hr/>
                    <br/><p>&nbsp;&nbsp;&nbsp;&nbsp;{props.data.attendance_desc}</p>
                    <br/>
                    <div className="sgs-right">
                        <button type="button" onClick={()=>{sessionStorage.setItem("attnId",props.data.attendance_id);sessionStorage.setItem("atn_type",props.data.type)}} className="btn btn-success open-once-attn" style={{marginRight:"15px",marginBottom:"10px"}}><i className="material-icons small">play_arrow</i> Mark Attendance</button>
                    </div>
                </div>)
}