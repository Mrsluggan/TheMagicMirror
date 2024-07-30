import React, { useState, useEffect } from 'react';

export default function Clock() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentDay, setCurrentDay] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            setCurrentDay(now);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedDate = currentDay.toLocaleDateString('sv-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

    const capitalizedDate = capitalizeFirstLetter(formattedDate);
    const formattedTime = currentTime.toLocaleTimeString('sv-SE');

    return (
        <div style={{ flex: "1 0 auto", paddingTop: "20px", padding: "20px", textAlign: "left" }}>
            <p style={{ fontSize: "30px", margin: "0" }}>{capitalizedDate}</p>
            <hr></hr>
            <p style={{ fontSize: "30px", margin: "0" }}>{formattedTime}</p>
        </div>

    );
}
