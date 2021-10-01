import { Bar, Doughnut, Line } from 'react-chartjs-2';
import settings from '../../settings.json';

let randomAttn = []
for(let i=0;i<6;i++)
{
    randomAttn.push(Math.floor(Math.random() * 100) + 2)
}

let randdough=Math.floor(Math.random() * 100) + 2


const doughdata = {
  labels: ['Present','On-Duty','Absent'],
  datasets: [
    {
      label: 'Attendance Split-off',
      data: [randdough*100/10,randdough*100/20,randdough*100/70],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const muldata = {
  labels: ['U1', 'MS1', 'U3', 'MS2', 'PREP'],
  datasets: [
    {
      label: 'TOTAL MARKS',
      data: [480,475,490,483,530],
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      yAxisID: 'y-axis-1',
    }
  ],
};


const Attndata = {
  labels: settings[sessionStorage.getItem('classGroup')+'-SUB'].slice(1,6),
  datasets: [
    {
      label: 'Attendance Percentage',
      data: randomAttn,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function StudentStat()
{
    let fee = Math.floor(Math.random() * 100000) + 10000;

    return(<div className="dashboard-cont">
        <div className="row font-roboto">
            <div  className="col-md-8">
                <Bar style={{maxHeight:"300px"}} data={Attndata}/>
            </div>
            <div className="col-md-4" style={{border:"1px solid red",padding:"10px",borderRadius:"10px"}}>
                <div className="sgs-center"><span className="text-xl"><b>Fee Balance</b></span><br/><br/>
                <span style={{padding:"5px",fontSize:"40px",backgroundColor:"green",borderRadius:"10px"}}>₹ {fee}</span>
                <br/>
                <br/>
                <span className="hide-onphone">
                <span><u>Detailed Balance</u></span>
                <br/>
                <div className="row">
                    <div className="col-md-6 col-sm-6 sgs-right">
                        <span>College Fee : </span><br/>
                        <span>Bus Fee : </span><br/>
                        <span>Mess Fee : </span><br/>
                        <span>Misc Fee : </span><br/>
                    </div>

                    <div className="col-md-6 col-sm-6 sgs-left">
                    <span> ₹ {(50/100*fee).toFixed(2)}</span><br/>
                        <span> ₹ {(10/100*fee).toFixed(2)}</span><br/>
                        <span> ₹ {(15/100*fee).toFixed(2)}</span><br/>
                        <span> ₹ {(25/100*fee).toFixed(2)}</span><br/>
                    </div>
                </div>
                </span>
                </div>
            </div>
        </div>
        <br/>
        <hr/>
        <br/>
        <div className="row font-roboto">
          <div className="col-md-6">
            <Line  style={{maxHeight:"350px"}} data={muldata}/>
          </div>
          <div className="col-md-6">
            <Doughnut  style={{maxHeight:"350px"}} data={doughdata}/>
          </div>
        </div>
    </div>)
}