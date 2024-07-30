import { useState } from 'react'

import './App.css'
import Calender from './components/Calender/Calender'
import Clock from './components/Clock/Clock'
import News from './components/News/News'
import ShoppingList from './components/ShoppingList/ShoppingList'
import Todo from './components/Todo/Todo'

function App() {

  return (
    <>
      <h1>Sluggans Magic Mirror</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Calender />
        <Clock />
        <News />
        <ShoppingList />
        <Todo />
      </div>
    </>
  )
}

export default App
