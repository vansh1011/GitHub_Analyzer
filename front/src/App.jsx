
import { Home } from './Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Analysis from './Analysis'
import All from './All'


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/analysis' element={<Analysis />} />
                <Route path='/all' element={<All />} />
            </Routes>

        </BrowserRouter>
    )

}

export default App