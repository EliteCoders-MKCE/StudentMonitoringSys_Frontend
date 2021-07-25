import { Component } from "react";
import CardOnline from './attenCardOnline';
import CardOffline from "./attenCardOffline";
import $ from 'jquery';

function ModalAddNewAttn()
{   
    function addNewAttendance()
    {
        let title = document.getElementById("new-attn-title").value;
        let desc = document.getElementById("new-attn-desc").value;
        let date = document.getElementById("new-attn-date").value;
        let startTime = document.getElementById("new-attn-strtm").value;
        let endTime = document.getElementById("new-attn-endtm").value;
        let type = (document.getElementById("new-attn-single").checked)?"once":"cont";
        let resultLog = document.getElementById("new-attn-rsltselect").value;

        /*send to server*/
        let data ={
            class_group : sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_') ,   // dyn. fromo browser
            attendance_title : title ,
            attendance_desc : desc ,
            attendance_type : type ,
            attendance_date : date ,
            attendance_strtm : startTime ,
            attendance_endtm : endTime ,
            attendance_rsltlog : resultLog ,
            attendance_status : "false" ,
            staff_id : sessionStorage.getItem('staffId')         // dyn. fromo browser
        }
        console.log(data)
        let xhr = new XMLHttpRequest();
        let url = "http://localhost:8080/api/attn/new";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert(this.responseText);
                document.getElementById("add-atn-modal").style.display="none";
                window.location.reload();
            }
        };
        var jdata = JSON.stringify(data);
        xhr.send(jdata);
    }
    
    return(
    <div id="add-atn-modal" className="modal font-roboto">
    <div className="modal-content">
        <div className="modal-container sgs-center">
            <span className="text-xl">Create New Attendance</span><br/>
            <input type="text" placeholder="Attendance Title" id="new-attn-title" className="modal-input" required/><br/>
            <textarea placeholder="Attendance Description" id="new-attn-desc" className="modal-input"/><br/>
            <input type="date" id="new-attn-date" className="modal-input" required/><br/>
            <div className="row">
                <div className="col-md-6" style={{marginTop:"15px"}}>
                    <label htmlFor="new-attn-strtm">Start Time :</label>&nbsp;&nbsp;&nbsp;
                    <input type="time" id="new-attn-strtm" name="new-attn-strtm" style={{backgroundColor:"gray",padding:"5px"}} required></input>
                </div>
                <div className="col-md-6" style={{marginTop:"15px"}}>
                    <label htmlFor="new-attn-endtm">End Time :</label>&nbsp;&nbsp;&nbsp;
                    <input type="time" id="new-attn-endtm" name="new-attn-endtm" style={{backgroundColor:"gray",padding:"5px"}} required></input>
                </div>
            </div>
           <br/>
           <div className="row">
                <div className="col-md-6" style={{marginTop:"15px"}}>
                    <label htmlFor="new-attn-rsltselect">Choose a Log: </label>&nbsp;&nbsp;&nbsp;
                    <select required name="rsltselect" id="new-attn-rsltselect" style={{backgroundColor:"gray",padding:"5px"}}>
                    <option value="iii_ece_a_res1">Result log 1</option>    {/*NOTE HERE*/}
                    <option value="iii_ece_a_res2">Result Log 2</option>
                    </select>
                </div>
                <div className="col-md-6" style={{marginTop:"15px"}}>
                    <div className="sgs-center">
                        <div className="sgs-center">
                       <input defaultChecked type="radio" id="new-attn-single" name="type_aatn" value="single"/>
                          <label htmlFor="new-attn-single">Single</label><br/>
                           &nbsp;  &nbsp;  &nbsp; &nbsp; <input type="radio" id="cont" name="type_aatn" value="continuous"/>
                          <label htmlFor="cont">Continuous</label><br/>
                            </div>
                    </div>
                </div>
            </div><br/>
            <button type="submit" onClick={()=>addNewAttendance()} id="=create-add-atn-modal" className="btn btn-success" style={{marginRight:"15px"}}>Create</button>
            <button id="close-add-atn-modal" className="btn btn-danger">Close</button><br/>
        </div> 
    </div>
    </div>);
}

class Dashboard extends Component{
    constructor(props)
    {
        super();     
        this.state={data:null}
        let classGroup = "iii_ece_a";
        $.get("http://localhost:8080/api/attn/get-all?class_group="+classGroup,(data,status)=>{
            if(status==="success")
            this.setState({data:data});
        });


    }

    render()
    {   if(this.state.data)
        {
            $( document ).ready(function() {
                var modal = document.getElementById("add-atn-modal");
                var btn = document.getElementById("add-atn-modal-btn");
                var span = document.getElementById("close-add-atn-modal");
                btn.onclick = function() {
                modal.style.display = "block";
                }
                span.onclick = function() {
                modal.style.display = "none";
                }
                window.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
                }
            });

        return(<div className="dashboard-cont ">
        <div>
            <span className="text-2xl">Dashboard</span>
        </div>
       <ModalAddNewAttn/>
        <div className="sgs-right">
            <button type="button" id="add-atn-modal-btn" className="btn btn-primary"><i className="bx bx-plus"></i>Add New</button>
        </div><br/>
        <div className="row font-roboto">
           {
               this.state.data.map((item,i)=>{
                   if(item.status==="true")
                       return(<CardOnline key={i} data={item}/>)
                   else
                    return (<CardOffline key={i} data={item}/>)
               })
           }
        </div>
    </div>)
        }
    else
    return(<>Loading...</>)
       
    }
}
export default Dashboard;