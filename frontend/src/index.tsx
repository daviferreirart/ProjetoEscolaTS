import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CadastrarAluno from './pages/CadastrarAluno';

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <Switch>
            <Route path="/CadastrarAluno" component={CadastrarAluno} />
            {
               // <Route path='/CadastrarProfessor' component={CadastrarProfessor}/>
            }
         </Switch>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root'),
);
