import React, { useEffect, useState } from 'react'
import { fetchAllLogs } from '../Common/ServerFunctions/LogsFunctions';
const Logs = () => {
    const [logs, setLogs] = useState();
    useEffect(() => {
        const fetchData = async () => {
            setLogs((await fetchAllLogs()).split(',').map(log => <div> {log} </div>).reverse());
        }
        fetchData();
    },[])

  return (
    <div className='logs'>
        {logs}
    </div>
  )
}

export default Logs