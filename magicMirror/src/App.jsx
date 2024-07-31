import { useState } from 'react'

import './App.css'
import Calender from './components/Calender/Calender'
import Clock from './components/Clock/Clock'
import News from './components/News/News'
import ShoppingList from './components/ShoppingList/ShoppingList'
import Todo from './components/Todo/Todo'
import Stocks from './components/Stocks/Stocks'
import Weather from './components/Weather/Weather'

function App() {

  return (
    <>
      <div className="parent">
        <div className='rowOne'>
          <div>
            <Clock />
            <Weather />
          </div>
          <Calender />
          <Todo />
        </div>
        <div className='rowTwo'>
          <ShoppingList />
          <News />
          <Stocks />
        </div>

      </div>
    </>
  )
}

export default App
