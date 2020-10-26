import React, { Fragment } from 'react';
import logo from './logo.svg';
import Tour, {invokeAfterRender} from './tour/';
import Love from './love';
import './App.css';

class App extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggleTour = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  steps = [
    {
      target: '[data-tour=tour__logo]',
      content: 'this is the logo',
      style: {
        borderRadius: "0"
      },
    },
    {
      target: '[data-tour=tour__text]',
      content: (
        <Fragment>
          <h2>this is a text</h2>
          <p> the box below will who how scroll ...</p>
        </Fragment>
      ),
    },
    {
      target: '[data-tour=tour__link]',
      content: 'link to react docs',
    },
    {
      target: '[data-tour=tour__box]',
      content: (
        <Fragment>
          <h2>this is the box</h2>
          <p> the box below will who how scroll ...</p>
          <p> click on it to close the tour</p>
        </Fragment>
      ),
      style: {
        borderRadius: "0px"
      },
      action: () => {
        this.setState({isOpen:false})
        return 1;
      }

    },
  ];

  componentDidMount = () => {
    invokeAfterRender().then(() => {
      this.setState({isOpen: true})
    })
  }


  render() {
    return (
      <div className="root">

        <div className="sidebar">
          <button onClick={this.toggleTour}>
            <Love/> START TOUR
          </button> 
        </div>

        <div className="App" data-tour="root">
          <header className="App-header">

            <Tour
              open={this.state.isOpen}
              handleClose={() => { this.setState({isOpen:false}) }}
              root='[data-tour=root]'
              steps={this.steps}
            />

            <img width="400px"  data-tour="tour__logo" src={logo} className="App-logo" alt="logo" />
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
      </div>
    );
  }
}

export default App;
