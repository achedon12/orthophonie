import { useEffect, useState } from 'react'
import {formatTime} from "../../utils/Date.js";

const Timer = () => {
    const [elapsed, setElapsed] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsed(prev => prev + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="font-mono text-4xl font-semibold text-primary">
                {formatTime(elapsed)}
            </span>
        </div>
    )
}

export default Timer

