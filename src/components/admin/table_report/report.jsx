import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { Table,Button } from 'reactstrap';
import { useHistory, useParams } from 'react-router';

Report.propTypes = {
    
};

function Report(props) {
    const params = useParams()
    const [report,setReport] = useState([])
    console.log(report)
    useEffect(() => {
        function getUser() {
                const url = `http://localhost:8080/report/all${params.role === "true" ? `/learner` : `/talker`}`;
                const option = {
                    method : 'POST',
                    mode : 'cors',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body:JSON.stringify({
                        id:params.id
                    })
                }
                fetch(url,option)
                .then(response => response.json())
                .then(data => {
                setReport(data);
                })
        }
        getUser();
    },[])
    return (
        <div>
                        <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Người báo cáo</th>
                    <th>Người nhận</th>
                    <th>Bài học</th>
                    <th>Nội dung</th>
                    <th>Ngày báo cáo</th>
                    </tr>
                </thead>
                <tbody>
                   {report.map((report,index) => {
                       return  <tr>
                       <th scope="row">{index}</th>
                       <td>{report.id_learner}</td>
                       <td>{report.id_talker}</td>
                       <td>{report.id_lecture}</td>
                       <td>{report.report_templete},{report.content}</td>
                       <td>{report.date_create.split('T').slice(0,1)}</td>
                      
                       </tr>
                   })}
                
                </tbody>
            </Table>
        </div>
    );
}

export default Report;