//import $ from 'jquery';
require('@tensorflow/tfjs-core')
require('@tensorflow/tfjs-converter')
require('@tensorflow/tfjs-backend-webgl')
const blazeface = require('@tensorflow-models/blazeface');

let intr;
let detectFaces;
let streameo;
let count = 0;
export default function OnceAttendance()
{ 

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
    function startEverything()
    {

      let video = document.getElementById("video");
      let model;
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");

      const setupCamera = () => {
      navigator.mediaDevices
          .getUserMedia({
          audio: false,
          video: { width: 360, height: 240 },
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
          ctx.drawImage(video, 0, 0, 360, 240);

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
    
   /* $(document).ready(()=>{


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
          

    });*/

    function clrIntr()
    {
      clearInterval(intr);
    }
     
    function strtIntr()
    {
      intr =  setInterval(()=>{
        detectFaces();
      },200)
    }
     

    return(<div style={{color:"white"}}>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <br/>
          <video id="video" style={{display:"none"}} autoPlay></video>
          <canvas id="canvas" width="360px" height="240px"></canvas><br/>
        </div>
        <div className="col-md-2"></div>
      </div>
      <button className="btn btn-success" onClick={()=>startEverything()}> StartCam</button>
         <button className="btn btn-danger" onClick={()=>stopBothVideoAndAudio()}> StopCam</button>
         <button className="btn btn-danger" onClick={()=>clrIntr()}>Pause</button>
         <button className="btn btn-success" onClick={()=>strtIntr()}> Start</button>
         
         <br/>
         <span>Face count : <span id="span-count">{count}</span></span>
    </div>)
}