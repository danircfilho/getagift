/* BrowserRouter como roteador (Router), switch (Switch) e rotas (Route) */
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

/* components */
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

/* pages import */
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'
import Profile from './components/pages/User/Profile'
import Container from './components/layout/Container'

/* Context */
import { UseProvider } from './context/UserContext'
import Message from './components/layout/Message'
import MyThgs from './components/pages/Thg/MyThgs'
import AddThg from './components/pages/Thg/AddThg'
import EditThg from './components/pages/Thg/EditThg'
import ThgDetails from './components/pages/Thg/ThgDetails'

function App() {
  return (
    <Router>
      <UseProvider>
        <Navbar />
        <Message />
          <Container>
            <Switch>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/register'>
                <Register />
              </Route>
              <Route path='/user/profile'>
                <Profile />
              </Route>
              <Route path='/thg/mythgs'>
                <MyThgs />
              </Route>
              <Route path='/thg/add'>
                <AddThg />
              </Route>
              <Route path='/thg/edit/:id'>
                <EditThg />
              </Route>
              <Route path='/thg/:id'>
                <ThgDetails />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </Container>
        <Footer />
      </UseProvider>
    </Router>
  );
}

export default App;

/*
//Router = roteador das páginas
//Switch = onde as páginas são roteadas (mudam de uma para outra)
//Route = onde aconstam os paths (caminho, localização) das rotas 
*/