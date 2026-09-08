import './App.css'
import './index.css'
import Hero from './components/sections/Hero/Hero'
import CareerTimeline from './components/sections/Career/CareerTimeline'
import Skills from './components/sections/Skill/Skills'
import Projects from './components/sections/Projects/Projects'
import Activity from './components/sections/Activity/Activity'
import Blog from './components/sections/Blog/Blog'
import Closing from './components/sections/Closing/Contact'
import WordCloudChat from './components/sections/WordColudChat/WordCloudChat'
import Navbar from './components/Navbar/Navbar'

export default function App() {

  return (
    <>
      {/* 각 섹션을 id로 구분해 순서대로 배치 */}
      <section id="navbar"><Navbar /></section>
      <section id="hero"><Hero /></section>
      <section id="about"><WordCloudChat /></section>
      <section id="career"><CareerTimeline /></section>
      <section id="skills"><Skills /></section>
      <section id="activity"><Activity /></section>
      <section id="projects"><Projects /></section>
      <section id="blog"><Blog /></section>
      <section id="closing"><Closing /></section>
    </>
  )
}