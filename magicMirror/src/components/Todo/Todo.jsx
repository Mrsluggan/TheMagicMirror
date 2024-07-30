import React from 'react'
import { useState } from 'react';
import GoogleAuth from '../Auth/GoogleAuth';
import { gapi } from 'gapi-script';

const Todo = () => {
    const [tasks, setTasks] = useState([]);

    const handleAuthSuccess = (authResponse) => {
        const { access_token } = authResponse;

        gapi.client.load('tasks', 'v1', () => {
            gapi.client.request({
                path: 'https://www.googleapis.com/tasks/v1/users/@me/',
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }).then(response => {
                const tasklists = response.result.items;
                console.log(tasklists);
                setTasks(tasklists);
            });
        });
    };

    return (
        <div>
            <h1>Google Tasks</h1>
            <GoogleAuth onAuthSuccess={handleAuthSuccess} />
            <ul>
                {tasks.map(tasklist => (
                    <li key={tasklist.id}>{tasklist.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
