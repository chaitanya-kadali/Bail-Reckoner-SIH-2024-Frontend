import React,{useEffect,useState} from 'react';
import PrintdrugList from './PrintdrugList';
import '../styles/Drugindash.css';
import Header from '../Header';

export default function Drugindash() {


const data = [
  {
    name: "Ravi Kumar",
    caseNumber: "FIR123456",
    charges: "Section 420 IPC (Cheating)",
    courtName: "District Court, Delhi",
    dateOfArrest: "2023-08-15",
    groundsForBail: "First-time offender, sole breadwinner of family."
  },
  {
    name: "Anjali Singh",
    caseNumber: "FIR654321",
    charges: "Section 307 IPC (Attempt to Murder)",
    courtName: "Sessions Court, Mumbai",
    dateOfArrest: "2023-06-10",
    groundsForBail: "Serious health issues, requires medical treatment."
  }];
  const data2 = [
  {
    name: "Mohammed Faizal",
    caseNumber: "FIR987654",
    charges: "Section 379 IPC (Theft)",
    courtName: "District Court, Jaipur",
    dateOfArrest: "2023-07-05",
    groundsForBail: "Non-serious offense, ready to cooperate with investigation."
  },
  {
    name: "Priya Nair",
    caseNumber: "FIR456789",
    charges: "Section 498A IPC (Cruelty by Husband or Relatives)",
    courtName: "Family Court, Kochi",
    dateOfArrest: "2023-05-22",
    groundsForBail: "Falsely implicated, young child dependent on her."
  }];

  const data3 = [
  {
    name: "Suresh Patil",
    caseNumber: "FIR112233",
    charges: "Section 304A IPC (Causing Death by Negligence)",
    courtName: "Sessions Court, Pune",
    dateOfArrest: "2023-09-12",
    groundsForBail: "Unintentional act, willing to provide compensation."
  },
  {
    name: "Reena Gupta",
    caseNumber: "FIR778899",
    charges: "Section 323 IPC (Voluntarily Causing Hurt)",
    courtName: "Magistrate Court, Ahmedabad",
    dateOfArrest: "2023-04-18",
    groundsForBail: "Minor offense, primary caregiver of elderly parents."
  },
  {
    name: "Rahul Sharma",
    caseNumber: "FIR556677",
    charges: "Section 506 IPC (Criminal Intimidation)",
    courtName: "District Court, Bhopal",
    dateOfArrest: "2023-03-25",
    groundsForBail: "Non-serious offense, no previous criminal record."
  },
  {
    name: "Kavita Reddy",
    caseNumber: "FIR332211",
    charges: "Section 326 IPC (Voluntarily Causing Grievous Hurt)",
    courtName: "Sessions Court, Hyderabad",
    dateOfArrest: "2023-07-30",
    groundsForBail: "Accidental involvement, no flight risk."
  }
];

const containerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  width: "90vw",
  backgroundColor: "#a1e2ebb1",
  borderRadius: "10px",
  alignItems: "center",
  padding: "10px",
  marginBottom:"20px"
};
   return (
    <>
    <Header/>
    <div id="drug-dash-id"> 
    <p className='drug-dash-head'>Lawyer Dashboard</p>
    </div>
 <center> 
<div className='drug-con'>
  <p id="drug-top"> Pending for judge review</p>
  <PrintdrugList data={data} />
    </div>

    <div className='drug-con'>
  <p id="drug-top">Judge Approved Bail</p>
  <PrintdrugList data={data2} />
    </div>

    <div className='drug-con'>
  <p id="drug-top">Judge Rejected Bail</p>
  <PrintdrugList data={data3} />
    </div>
    </center> 
    </>
  )
}
