export default function StdCardOnline(props)
{
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
                    <hr/>
                    <br/><p>&nbsp;&nbsp;&nbsp;&nbsp;{props.data.attendance_desc}</p>
                    <br/>
                    <div className="sgs-center">
                        <span className="text-gray-500">You've already done this.</span>
                    </div>
                </div>)
}