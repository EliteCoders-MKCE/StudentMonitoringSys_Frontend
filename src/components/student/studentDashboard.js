import { Component } from "react";
import $ from 'jquery';
import StdCardOnline from "./stdAttnDone";
import StdCardOffline from "./stdAttnNotDone";
import mkce from '../../assets/MKCE_Logo_SGS.png';
import '../../assets/jquery.toaster';

require('@tensorflow/tfjs-core')
require('@tensorflow/tfjs-converter')
require('@tensorflow/tfjs-backend-webgl')
const blazeface = require('@tensorflow-models/blazeface');

let intr;
let detectFaces;
let streameo;
let count = 0;
function ModalOpenAttnOnce()
{   
    function giveAttendance()
    {
        if(count===1)
        {
            let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
            let registerNo = sessionStorage.getItem('registerNo');
            let attendnceId = sessionStorage.getItem('attnId');
            $.get('http://localhost:8080/api/attn/give-attendance?class_group='+classGroup+'&register_no='+registerNo+'&attendance_id='+attendnceId,(data,status)=>{
            if(status==="success")    
               $.toaster(data,'','success');
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

/*function clrIntr()
    {
      clearInterval(intr);
    }
     
    function strtIntr()
    {
      intr =  setInterval(()=>{
        detectFaces();
      },200)
    }*/


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
      console.log("Exception at closing/stop video from webcam")
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
        ctx.lineWidth = "4";
        ctx.strokeStyle = "blue";
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
        ctx.fillStyle = "red";
        pred.landmarks.forEach((landmark) => {
          ctx.fillRect(landmark[0], landmark[1], 5, 5);
        });
        
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
    },5000);
}

class StudentDashboard extends Component{
    constructor(props)
    {
        super();     
        this.state={data:null}
        let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
        let registerNo = sessionStorage.getItem('registerNo');
        $.get("http://localhost:8080/api/attn/get-enabled?class_group="+classGroup+"&register_no="+registerNo,(data,status)=>{
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
                var btn = document.getElementById("open-once-attn");
                var span = document.getElementById("close-once-atn-modal");
                if(btn)
                {
                    btn.onclick = function() {
                        startEverythingOnceAttendance();
                        modal.style.display = "block";
                        }
                        span.onclick = function() {
                        stopBothVideoAndAudio();
                        modal.style.display = "none";
                        }
                }
                

                //update
               /* var umodal = document.getElementById("upd-atn-modal");
                var uspan = document.getElementById("close-upd-atn-modal");
                uspan.onclick = function() {
                umodal.style.display = "none";
                }*/
                window.onclick = function(event) {
                if (event.target===modal) {
                    stopBothVideoAndAudio();
                    modal.style.display = "none";
                    //umodal.style.display = "none";
                }
                }
            });
            let main = <div className="sgs-center text-green-400">
                <img style={{margin:"0 auto"}} alt="mkce" className="mkce-logo-dash" src={mkce}/>
                <br/>No attendance available at the moment...</div>;
            console.log(this.state.data.length)
            if(this.state.data.length>0)
            {
                main =  this.state.data.map((item,i)=>{
                   
                    if(item.atn_status==="true")
                        return(<StdCardOnline key={i} data={item}/>)
                    else
                     return (<StdCardOffline key={i} data={item}/>)
                });
            }
        return(<div className="dashboard-cont ">
        <div>
            <span className="text-2xl">Dashboard</span>
        </div>
      {<ModalOpenAttnOnce/>}
        <br/>
        <div className="row font-roboto">
           {main}
        </div>
    </div>)
        }
    else
    return(<>Loading...</>)
       
    }
}
export default StudentDashboard;