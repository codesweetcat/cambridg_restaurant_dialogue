import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
// import SpeechFormContainer from './components/SpeechFormContainer';
import PageSpeechContainer from './components/Page/PageSpeechContainer/PageSpeechContainer';

import PageTextContainer from './components/Page/PageTextContainer/PageTextContainer';
import DemoContainer from './components/Page/DemoContainer/DemoContainer'


const publicPath = '/dialogue/';

export const routeCodes = {
  textFormContainer: `${ publicPath }exp_text`,
  speechFormContainer: `${ publicPath }exp_voice`,
  demoContainer: `${ publicPath }demo`
};

function App() {
  return (
    <div className="App">
      <Header/>
        <Switch>
            <Route  exact path={routeCodes.textFormContainer}><PageTextContainer/></Route>
            <Route  exact path={routeCodes.speechFormContainer}> <PageSpeechContainer /></Route>
            <Route  exact path={routeCodes.demoContainer}> <DemoContainer /></Route>

        </Switch>
    </div>
  );
}

export default App;
