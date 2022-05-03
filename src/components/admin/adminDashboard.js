import {Component} from 'react';

class AdminDashboard extends Component {
    render() {
        return <>
        <nav className="navbar navbar-dark bg-primary" style={{height:"8vh",paddingLeft:"45vw"}}>
            <span className="navbar-brand text-2xl" href="#">Heims Portal</span>
        </nav>
        <div className="sgs-center" style={{height:"92vh",backgroundColor:"whitesmoke",width:"300px",padding:"5px"}}>
            <span className="admin-opts">Departments</span>
        </div>
        </>
    }
}
export default AdminDashboard;
