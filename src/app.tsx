import type { Component } from 'solid-js'
import { Route, Router } from '@solidjs/router'
import { lazy } from 'solid-js'

import Home from '@/pages/home'

const App: Component = () => {
  return (
    <>
      <nav class='bg-gray-200 text-gray-900 px-4'>
        <ul class='flex items-center'>
          <li class='py-2 px-4'>
            <a href='/' class='no-underline hover:underline'>
              Home
            </a>
          </li>
          <li class='py-2 px-4'>
            <a href='/about' class='no-underline hover:underline'>
              About
            </a>
          </li>
          <li class='py-2 px-4'>
            <a href='/error' class='no-underline hover:underline'>
              Error
            </a>
          </li>
        </ul>
      </nav>

      <main>
        <Router>
          <Route path='/' component={Home} />
          <Route path='**' component={lazy(() => import('./errors/404'))} />
        </Router>
      </main>
    </>
  )
}

export default App
