import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // Plugin for monthly view
import timeGridPlugin from '@fullcalendar/timegrid' // Plugin for weekly/daily view
import interactionPlugin from '@fullcalendar/interaction' // Plugin for interactions like drag-and-drop

export default function Calendar() {
    return (
        <div style={{ padding: "10px", width: "100%", height: "80%" }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                themeSystem="bootstrap"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true} // allow "more" link when too many events
                weekends={true} // show weekends
                events={[
                    { title: 'Meeting', date: '2024-07-30' },
                    { title: 'Lunch', date: '2024-07-31' }
                ]}
                eventClick={(info) => {
                    alert('Event: ' + info.event.title);
                }}
                dateClick={(info) => {
                    alert('Date: ' + info.dateStr);
                }}
                eventAdd={(info) => {
                    console.log('Event added:', info.event);
                }}
                eventChange={(info) => {
                    console.log('Event changed:', info.event);
                }}
                eventRemove={(info) => {
                    console.log('Event removed:', info.event);
                }}
                eventContent={renderEventContent} // Custom rendering for events
            />
        </div>
    )
}

// Custom rendering for events
function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}
