import './App.css'
import Footer from './Components/Footer'
import Hero from './Components/Hero'
import TopMenu from './Components/TopMenu'
import LibraryGrid from './Components/LibraryGrid'


function App() {

  return (
    <>
      <div className="app-content">
        <TopMenu />
        <Hero />
        <LibraryGrid/>
        <Footer />
      </div>
    </>
  )
}

export default App
