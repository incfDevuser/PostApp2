import CrearPost from './components/CrearPost'
import Post from "./components/Post"
function App() {
  return (
    <div className='h-screen w-screen flex justify-center items-center gap-11'>
      <CrearPost/>
      <Post/>
    </div>
  )
}

export default App
