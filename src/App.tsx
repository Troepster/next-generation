import * as React from 'react';
import './App.css';
import Grid from './components/Grid';
import { RecoilRoot } from 'recoil';

const App: React.FC = () => {
  return (
    <div className='App'>
      <RecoilRoot>
        <Grid />
      </RecoilRoot>
    </div>
  );
};

export default App;
