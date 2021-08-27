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
                    <div className="col-md-6 col-sm-12 sgs-right">
                        Status : {(props.data.status==="true")?"online":"offline"}
                    </div>
                    </div>
                    
                    <hr/>
                    <br/><p>&nbsp;&nbsp;&nbsp;&nbsp;{props.data.attendance_desc}</p>
                    <br/>
                    <div className="sgs-right">
                        <button type="button" id="open-once-attn" onClick={()=>{sessionStorage.setItem("attnId",props.data.attendance_id)}} className="btn btn-success" style={{marginRight:"15px",marginBottom:"10px"}}><i className="material-icons small">play_arrow</i> Mark Attendance</button>
                    </div>
                </div>)
}