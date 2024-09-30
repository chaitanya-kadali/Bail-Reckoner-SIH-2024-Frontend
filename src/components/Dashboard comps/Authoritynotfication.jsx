import React, { useEffect , useState} from 'react'
import '../styles/Authoritynotification.css';
import axios from 'axios';
import NotificationCard from './NotificationCard';

export default function Authoritynotification({email}) {
  
  const [notifications, setnotifications] = useState([]);
  const items=[{lname:"M.Madhusudhan Rao",name:"Ravi Kumar",
charges:"Section 420 IPC (Cheating)",
ground:"First-time offender, sole breadwinner of family.",
date:"2023-08-15"}];
  

  return (
    <div className='drug-noti-head'>
<center>
    <div>
        {items.map((item,index) => (
          <li key={index}>
            <NotificationCard data={item} />
          </li>
        ))}
       </div>
       </center>
    </div>
  )
}
