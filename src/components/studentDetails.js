import * as $ from 'jquery';
import 'datatables/media/css/jquery.dataTables.min.css';
import 'datatables/media/js/jquery.dataTables.min.js';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import 'datatables.net-buttons/js/dataTables.buttons';
import 'datatables.net-buttons/js/buttons.html5';


export default function StudentDetails()
{
  $(document).ready(function() {
    if ( $.fn.dataTable.isDataTable( '#example' ) ) {
     $('#example').DataTable();
  }
  else {
      $('#example').DataTable( {
        pageLength:0,
        dom: 'Bfrltip',
        lengthMenu:[10, 20, 50, 100, 200, 500],
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]
      } );
      let classGroup = sessionStorage.getItem('classGroup').toLowerCase().replace(/-/g,'_');
      $.get("http://localhost:8080/api/student-details/get-all/?class_group="+classGroup,(data,status)=>{
      if(status==="success")
      {
        for(let i=0;i<data.length;i++)
        {
          $('#example').DataTable().row.add([i+1,data[i].register_no,data[i].name,data[i].gender,data[i].e_mail,data[i].dept_class]);
        }
        $('#example').DataTable().draw();
      }
    }).fail(()=>{
      alert('failed');
    });
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }
} );

    return(<div className="dashboard-cont font-roboto" style={{backgroundColor:"whitesmoke",color:"black"}}>
    
     <table id="example" className="display text-center" style={{width:"100%"}}>
        <thead>
            <tr>
                <th>S.no</th>
                <th>Reg No</th>
                <th>Name</th>
                <th>Gender</th>
                <th>E Mail</th>
                <th>Dept-Class</th>
            </tr>
        </thead>
        <tbody >
        </tbody>
        <tfoot>
            <tr>
                <th>S.no</th>
                <th>Reg No</th>
                <th>    Name   </th>
                <th>Gender</th>
                <th>E Mail</th>
                <th>Dept-Class</th>
          
            </tr>
        </tfoot>
    </table>
    </div>)
}