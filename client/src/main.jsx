
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react';
import {BrowserRouter} from "react-router-dom"
import { AuthContextProvider } from './context/AuthContextProvider.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
   
  <ChakraProvider>
    <Provider store={store}>
    <AuthContextProvider>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </AuthContextProvider>
    </Provider>
  </ChakraProvider>
)
