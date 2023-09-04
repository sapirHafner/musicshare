import React, { useEffect, useState } from 'react'
import { fetchAllLogs } from '../ServerFunctions/LogsFunctions';
const LogsDisplay = () => {
    const [logs, setLogs] = useState();
    useEffect(() => {
        const fetchData = async () => {
            setLogs((await fetchAllLogs()).split(',').map(log => <div> {log} </div>));
        }
        fetchData();
    },[])

  return (
    <div className='logs'>
        {logs}
    </div>
  )
}

export default LogsDisplay