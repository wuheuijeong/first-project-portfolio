import './App.css'
import Hero from './components/sections/Hero/Hero'
import CareerTimeline from './components/sections/Career/CareerTimeline'
import Skills from './components/sections/Skills/Skills'
import Projects from './components/sections/Projects/Projects'
import Activity from './components/sections/Activity/Activity'
import Blog from './components/sections/Blog/Blog'
import Closing from './components/sections/Closing/Contact'

export default function App() {

  return (
    <>
      <Hero />
      <CareerTimeline />
      <Skills />
      <Projects />
      <Activity />
      <Blog />
      <Closing />
    </>
  )
}