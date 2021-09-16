import React from 'react'
import Timer from './Timer'

function CountDownFunc() {
    const hoursMinSecs = {hours:1, minutes: 20, seconds: 40}
    return (
        <div>
            <Timer hoursMinSecs={hoursMinSecs}/>
        </div>
    )
}

export default CountDownFunc
