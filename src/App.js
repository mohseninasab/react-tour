import React from 'react';
import logo from './logo.svg';
import Tour from './tour/';
import Love from './love';
import './App.css';

const steps = [
  {
    target: '[data-tour=tour__logo]',
    content: 'this is the logo'
  },
  {
    target: '[data-tour=tour__text]',
    content: (
      <>
        <h2>this is a text</h2>
        <p> the box below will who how scroll ...</p>
      </>
    )
  },
  {
    target: '[data-tour=tour__link]',
    content: 'link to react docs'
  },
  {
    target: '[data-tour=tour__box]',
    content: (
        <>
          <h2>this is the box</h2>
          <p> the box below will who how scroll ...</p>
        </>
      )
  },

]

function App() {
  const [isOpen, setOpen] = React.useState(false);

  const toggleTour = () => {
    if(isOpen) document.getElementsByTagName("html")[0].style.overflow = "auto"
    setOpen(!isOpen)
  }
  return (
    <div className="App">
      <header className="App-header">
        <Love onClick={toggleTour}/>

        <Tour
          open={isOpen}
          // root='[data-tour=root]'
          steps={steps}
        />

        <img data-tour="tour__logo" src={logo} className="App-logo" alt="logo" />
        <p data-tour="tour__text">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          data-tour="tour__link"
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div data-tour="tour__box" className="box" />
      </header>
    </div>
  );
}

export default App;
