import { Component } from "react";
import $ from 'jquery';
import StdCardOnline from "./stdAttnDone";
import StdCardOffline from "./stdAttnNotDone";
import mkce from '../../assets/MKCE_Logo_SGS.png';
import '../../assets/jquery.toaster';
import settings from '../../settings.json';
import StudentMeet from "./studentMeet";

require('@tensorflow/tfjs-core')
require('@tensorflow/tfjs-converter')
require('@tensorflow/tfjs-backend-webgl')
const blazeface = require('@tensorflow-models/blazeface');

let intr;
let intr1;
let intr2;
let detectFaces;
let cdetectFaces;
let cstreameo;
let streameo;
let count = 0;
let ccount=0;
function ModalOpenAttnOnce()
{   
    function giveAttendance()
    {
        if(count===1)
        {
            let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
            let registerNo = sessionStorage.getItem('registerNo');
            let attendnceId = sessionStorage.getItem('attnId');
            $.get(settings.ip+'api/attn/give-attendance?class_group='+classGroup+'&register_no='+registerNo+'&attendance_id='+attendnceId,(data,status)=>{
            if(status==="success")    
               $.toaster(data,'','success');
               setTimeout(()=>{
                stopBothVideoAndAudio();
                document.getElementById("once-atn-modal").style.display = "none";
                window.location.reload();
               },800);
            });
        }
        else if (count===0)
        {
            $.toaster("No face detected",'','danger');
        }
        else if(count>1)
        {
            $.toaster("More than 1 face detected..",'','warning');
        }
    }

    return(
    <div id="once-atn-modal" className="modal font-roboto">
    <div className="modal-content">
        <div className="modal-container sgs-center">
            <span className="text-xl">Single Attendance</span><br/>
                <div>
                  <span style={{fontSize:"12px"}} className="hide-onpc text-gray-500">Use Landscape mode for better performance</span>
                <div style={{color:"white",margin:"0 auto"}}>
      <div>
        <div >
          <br/>
          <video id="video" style={{display:"none"}} autoPlay></video>
          <canvas id="canvas" width="600px" height="400px" style={{margin:"0 auto"}}></canvas><br/>
        </div>
      </div>
    {/*  <button className="btn btn-success" onClick={()=>startEverything()}> StartCam</button>
         <button className="btn btn-danger" onClick={()=>stopBothVideoAndAudio()}> StopCam</button>
         <button className="btn btn-danger" onClick={()=>clrIntr()}>Pause</button>
    <button className="btn btn-success" onClick={()=>strtIntr()}> Start</button>*/} 
         <span>Face count : <span id="span-count">{count}</span></span><br/>
         <button onClick={()=>{giveAttendance()}} className="btn btn-success">Give Attendance</button>
    </div>
                </div>
            </div><br/>
            <div className="sgs-center">
            <button id="close-once-atn-modal"className="btn btn-danger">Close</button>
            </div>
        </div> 
    </div>
    );
}

function ModalOpenAttnCont()
{   
    return(
    <div id="cont-atn-modal" className="modal font-roboto">
    <div className="modal-content">
        <div className="modal-container sgs-center">
            <span className="text-xl">Continuous Monitoring</span><br/>
                <div>
                  <span style={{fontSize:"12px"}} className="hide-onpc text-gray-500">Use Landscape mode for better performance</span>
                <div style={{color:"white",margin:"0 auto"}}>
      <div>
        <div >
          <br/>
          <video id="cvideo" style={{display:"none"}} autoPlay></video>
          <canvas id="ccanvas" width="600px" height="400px" style={{margin:"0 auto"}}></canvas><br/>
        </div>
      </div>
         <span>Face count : <span id="cspan-count">{ccount}</span></span><br/>
    </div>
                </div>
            </div><br/>
            <div className="sgs-center">
            <button id="close-cont-atn-modal"className="btn btn-danger">Exit</button>
            </div>
        </div> 
    </div>
    );
}

function countToContinuous()
{
  console.log('2mins interval faces-'+ccount)
  let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
  let registerNo = sessionStorage.getItem('registerNo');
  let attendnceId = sessionStorage.getItem('attnId');
  if(ccount>0)
  {
    $.get(settings.ip+"/api/attn/count-cont?class_group="+classGroup+"&attn_id="+attendnceId+"&register_no="+registerNo,(data,status)=>{
      if(status==="success")
      {
        if(data==="continue")
        {
          //Continue..
          console.log("cont - continue")
        }
        else if(data==="stop")
        {
          $.toaster("Attendance Ended and Submitted Successfully","","success")
          setTimeout(()=>{
            document.getElementById("cont-atn-modal").style.display="none";
              stopBothVideoAndAudiocont();
              window.location.reload();
          },1500);
        }
      }
    }).fail(()=>{
      $.toaster("Attendance failed...","","danger");
    });
  }
  else if(ccount===0)
    $.toaster("No face detected","","warning");
  
  else
  $.toaster("Attendance failed...","","danger");
}

function stopBothVideoAndAudio() {
  try
  {
    clearInterval(intr);
  let video  = document.getElementById("video");
  for (const track of video.srcObject.getTracks()) {
    track.stop();
  }
  video.srcObject = null;
  streameo.getTracks().forEach(function(track) {
      if (track.readyState === 'live') {
          track.stop();
      }
  });
  }
  catch(Exception)
  {
    console.log("Exception at closing/stop video from webcam - once")
  }
  
}

function stopBothVideoAndAudiocont() {
    try
    {
      clearInterval(intr1);
      clearInterval(intr2);
    let video  = document.getElementById("cvideo");
    for (const track of video.srcObject.getTracks()) {
      track.stop();
    }
    video.srcObject = null;
    cstreameo.getTracks().forEach(function(track) {
        if (track.readyState === 'live') {
            track.stop();
        }
    });
    }
    catch(Exception)
    {
      console.log("Exception at closing/stop video from webcam - cont")
    }
    
}


function startEverythingOnceAttendance()
{

  let video = document.getElementById("video");
  let model;
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  const setupCamera = () => {
  navigator.mediaDevices
      .getUserMedia({
      audio: false,
      video: { width: 600, height: 400 },
      })
      .then((stream) => {
        streameo=stream;
      // stream is a MediaStream object
      video.srcObject = stream;
      });
  };

      detectFaces = async () => {
        let prediction;
      try{
         prediction = await model.estimateFaces(video, false);
           // print the prediction
     // console.log(prediction);
      //console.log(prediction.length)
      count=prediction.length;
      document.getElementById("span-count").innerText=count;
      // draw the video first
      ctx.drawImage(video, 0, 0, 600, 400);

      prediction.forEach((pred) => {
        
        // draw the rectangle enclosing the face
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "green";
        // the last two arguments are width and height
        // since blazeface returned only the coordinates, 
        // we can find the width and height by subtracting them.
        ctx.rect(
          pred.topLeft[0],
          pred.topLeft[1],
          pred.bottomRight[0] - pred.topLeft[0],
          pred.bottomRight[1] - pred.topLeft[1]
        );
        ctx.stroke();
        
        // drawing small rectangles for the face landmarks
      /*  ctx.fillStyle = "red";
        pred.landmarks.forEach((landmark) => {
          ctx.fillRect(landmark[0], landmark[1], 5, 5);
        });*/
        
      });
      }
        catch(Exception)
        {
            console.log("Exception occured at face detection")
        }
    
    };
    

  setupCamera();

  video.addEventListener("loadeddata", async () => {
      model = await blazeface.load();
      detectFaces();
    });

    setTimeout(()=>{
    intr =  setInterval(()=>{
        detectFaces();
      },200)
    },2000);
}


function startEverythingContAttendance()
{

  let video = document.getElementById("cvideo");
  let model;
  let canvas = document.getElementById("ccanvas");
  let ctx = canvas.getContext("2d");

  const setupCamera = () => {
  navigator.mediaDevices
      .getUserMedia({
      audio: false,
      video: { width: 600, height: 400 },
      })
      .then((stream) => {
        cstreameo=stream;
      // stream is a MediaStream object
      video.srcObject = stream;
      });
  };

      cdetectFaces = async () => {
        let prediction;
      try{
         prediction = await model.estimateFaces(video, false);
           // print the prediction
     // console.log(prediction);
      //console.log(prediction.length)
      ccount=prediction.length;
      document.getElementById("cspan-count").innerText=ccount;
      // draw the video first
      ctx.drawImage(video, 0, 0, 600, 400);

      prediction.forEach((pred) => {
        
        // draw the rectangle enclosing the face
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "green";
        // the last two arguments are width and height
        // since blazeface returned only the coordinates, 
        // we can find the width and height by subtracting them.
        ctx.rect(
          pred.topLeft[0],
          pred.topLeft[1],
          pred.bottomRight[0] - pred.topLeft[0],
          pred.bottomRight[1] - pred.topLeft[1]
        );
        ctx.stroke();
        
        // drawing small rectangles for the face landmarks
        /*ctx.fillStyle = "red";
        pred.landmarks.forEach((landmark) => {
          ctx.fillRect(landmark[0], landmark[1], 5, 5);
        });*/
        
      });
      }
        catch(Exception)
        {
            console.log("Exception occured at face detection")
        }
    
    };
    

  setupCamera();

  video.addEventListener("loadeddata", async () => {
      model = await blazeface.load();
      cdetectFaces();
    });

    setTimeout(()=>{
    intr1 =  setInterval(()=>{
        cdetectFaces();
      },200)
    },2000);

    setTimeout(()=>{
      intr2 = setInterval(() => {
        countToContinuous();
      }, 120000);
    },2500);
}

class StudentDashboard extends Component{
    constructor(props)
    {
        super();     
        this.state={data:null}
        let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
        let registerNo = sessionStorage.getItem('registerNo');
        $.get(settings.ip+"api/attn/get-enabled?class_group="+classGroup+"&register_no="+registerNo,(data,status)=>{
            if(status==="success")
            this.setState({data:data});
            //console.log(this.state);
        });


    }

    render()
    {   if(this.state.data)
        {
            $( document ).ready(function() {
                var modal = document.getElementById("once-atn-modal");
                var btn = document.getElementsByClassName("open-once-attn")[0];
                var span = document.getElementById("close-once-atn-modal");
                if(btn)
                {
                    btn.onclick = function() {
                      $.toaster("Please wait...",'','success');
                      setTimeout(()=>{
                          if(sessionStorage.getItem("atn_type")==="once")
                        {
                          startEverythingOnceAttendance();
                          modal.style.display = "block";
                        }
                        else
                        {
                          startEverythingContAttendance();
                          document.getElementById("cont-atn-modal").style.display="block";
                        }
                      },1000);
                      
                        }
                        span.onclick = function() {
                        stopBothVideoAndAudio();
                        modal.style.display = "none";
                        }
                }
                

                //continuous
                var umodal = document.getElementById("cont-atn-modal");
                var uspan = document.getElementById("close-cont-atn-modal");
                uspan.onclick = function() {
                stopBothVideoAndAudiocont();
                umodal.style.display = "none";
                }
                window.onclick = function(event) {
                if (event.target===modal) {
                    stopBothVideoAndAudiocont();
                    modal.style.display = "none";
                    umodal.style.display = "none";
                }
                }
            });
            let main = <div className="sgs-center text-green-400">
                <img style={{margin:"0 auto"}} alt="mkce" className="mkce-logo-dash" src={mkce}/>
                <br/>No attendance available at the moment...</div>;
            //console.log(this.state.data.length)
            if(this.state.data.length>0)
            {
                main =  this.state.data.map((item,i)=>{
                   
                    if(item.atn_status==="present")
                        return(<StdCardOnline key={i} data={item}/>)
                    else
                     return (<StdCardOffline key={i} data={item}/>)
                });
            }
        return(<div className="dashboard-cont">
        <div>
            <span className="text-2xl">Dashboard</span>
        </div>
      {<ModalOpenAttnCont/>}
      {<ModalOpenAttnOnce/>}
        <br/>
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <StudentMeet/>
          </div>
          <div className="col-md-8 col-sm-12 meet-create-div">
          <div className="sgs-center">
            <span className="text-xl">Available Attendance</span>
        </div>
        <br/>
          <div className="row font-roboto">
           {main}
        </div>
          </div>
        </div>
    </div>)
        }
    else
    return<>
    <div class="text-center">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></>
       
    }
}
export default StudentDashboard;