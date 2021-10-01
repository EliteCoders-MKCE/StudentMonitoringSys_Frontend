import settings from '../settings.json';
import { Doughnut, Line, Bar, Radar } from 'react-chartjs-2';

const DoughnutData = {
    labels: ['91-100',  '81-90', '71-80',  '61-70',  '51-60' , '< 50'],
    datasets: [
      {
        label: 'Marks splitup',
        data: [3, 2, 1, 1, 1, 2],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };



const Multilinedata = {
    labels: ['MS1', 'MS2', 'PREP', 'SEM'],
    datasets: [
      {
        label: 'Average Mark',
        data: [72,67,76,80],
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 1)',
        yAxisID: 'y-axis-1',
      },
      {
        label: 'Highest Mark',
        data: [85,90,93,95],
        fill: false,
        backgroundColor: 'rgb(124, 252, 0)',
        borderColor: 'rgba(124, 252, 0,0.3)',
        yAxisID: 'y-axis-2',
      },
      {
        label :'Failure Count',
        data: [3,5,2,4,1],
        fill: false,
        backgroundColor: 'rgb(238, 75, 43)',
        borderColor:  'rgba(238, 75, 43,0.3)',
        yAxisID: 'y-axis-3',
      },
    ],
  };
  const Bardata = {
    labels: settings[sessionStorage.getItem('classGroup')],
    datasets: [
      {
        label: 'MidSem1',
        data: [70, 75, 83, 65, 69, 57,73,77,82,80,75,67],
        backgroundColor: 'rgba(153, 102, 255, 1)',
      },
      {
        label: 'MideSem2',
        data: [60,69,78,70,73,68,71,76,79,79,71,68],
        backgroundColor: 'rgb(54, 162, 235)',
      },
      {
        label: 'Preparatory',
        data: [65,73,80,68,71,64,68,70,75,77,81,83],
        backgroundColor: 'rgba(124, 252, 0,0.5)',
      },
    ],
  };

  const Polardata = {
    labels: settings[sessionStorage.getItem('classGroup')+'-SUB'],
    datasets: [
      {
        label: 'Performance avg.',
        data: [50,60, 85, 68, 87, 85 , 70],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Attendance avg.',
        data: [50,88, 76, 79, 75, 72 , 61],
        backgroundColor:   'rgba(124, 252, 0,0.3)',
        borderColor:  'rgba(124, 252, 0,1)',
        borderWidth: 1,
      },
    ],
  };

export default function FacultyStats()
{
    return(<div className="dashboard-cont">
        <div>
        <div className="sgs-center"><span className="text-xl">Overall Statistics</span></div>
        <br/>
        <div className="row">
            <div className="col-md-4 col-sm-12">
                <div className="sgs-center" style={{color:"gray"}}>Mark Splitup</div>
                <Doughnut data={DoughnutData} /></div>
            <div className="col-md-1 col-sm-12"></div>
            <div className="col-md-7 col-sm-12"><Line data={Multilinedata} /></div>
            </div>
            <br/>
            <hr/>
            <br/>
            <div className="sgs-center"><span  className="text-xl">Student Performance</span></div>
            <br/>
            <div className="row">
            <div className="col-md-7 col-sm-12"><Bar data={Bardata}/></div>
            <div className="col-md-2 col-sm-12" ></div>
            <div className="col-md-3 col-sm-12" >
            <Radar data={Polardata}/>
            <br/><div className="sgs-center" style={{color:"gray"}}>Subject wise performance analysis</div>
            </div>
        </div>
        </div>
    </div>)
}