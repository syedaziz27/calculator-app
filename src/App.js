import React, { Component } from 'react';
import './App.css';
import Buttons from './components/buttons';
import InputView from './components/inputView';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayValue: '0',
      previousValue: null,
      operation: null,
      waitingForNewValue: false
    }
  }

  clearButton = () => {
    this.setState({displayValue: 0}, () => console.log(this.state));
  }

  clearButtonAll = () => {
    this.setState({displayValue: 0, previousValue: null, operation: null, waitingForNewValue: false});
  }

  percentConverter = () => {
    let num = this.state.displayValue / 100;
    if (num === 0) this.clearButton();
    else {
      this.setState({ displayValue: num, waitingForNewValue: true }, () => {
        console.log(this.state)
      });
    }
  }

  showNumber = (e) => {
    if (this.state.displayValue === '.') {
      this.setState({ displayValue: this.state.displayValue.concat(e.target.value) }, () => console.log(this.state));
      return;
    }

    if (!this.state.waitingForNewValue) {
      if (e.target.value === '0') {
        if (this.state.displayValue === '0') return;
        else this.setState({ displayValue: this.state.displayValue.toString().concat(e.target.value) }, () => {
          console.log(this.state);
        });
      }
      else this.setState({ displayValue: parseFloat(this.state.displayValue.toString().concat(e.target.value)) }, () => {
        console.log(this.state);
      });
    }
    else {
      this.setState({ previousValue: this.state.displayValue, displayValue: e.target.value, waitingForNewValue: false }, () => {
        console.log(this.state);
      });
    }
  }

  addNum = () => {
    if (this.state.displayValue === 0 && this.state.operation) {
      this.setState({operation: '+'}, () => console.log(this.state));
      return;
    }
    if (this.state.waitingForNewValue) {
      this.setState({ operation: '+' }, () => console.log(this.state));
      return;
    }
    else {
      this.setState({ operation: '+', waitingForNewValue: true }, () => console.log(this.state));
    }
    if (!this.state.previousValue) {
      this.setState({ operation: '+', previousValue: this.state.displayValue, waitingForNewValue: true }, () => {
        console.log(this.state)
      });
    }
    if (this.state.operation === '+') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) + parseFloat(this.state.displayValue), operation: '+', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) + parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    if (this.state.operation === '*') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) * parseFloat(this.state.displayValue), operation: '+', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) * parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    if (this.state.operation === '=') {
      this.setState({ previousValue: this.state.displayValue, operation: '+' }, () => console.log(this.state));
      return;
    }
  }

  multiply = () => {
    if (this.state.displayValue === 0 && this.state.operation) {
      this.setState({operation: '*'}, () => console.log(this.state));
      return;
    }
    if (this.state.waitingForNewValue) {
      this.setState({ operation: '*' }, () => console.log(this.state));
      return;
    }
    else {
      this.setState({ operation: '*', waitingForNewValue: true }, () => console.log(this.state));
    }
    if (!this.state.previousValue) {
      this.setState({ operation: '*', previousValue: this.state.displayValue, waitingForNewValue: true }, () => {
        console.log(this.state)
      });
    }
    if (this.state.operation === '+') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) + parseFloat(this.state.displayValue), operation: '*', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) + parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    if (this.state.operation === '*') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) * parseFloat(this.state.displayValue), operation: '*', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) * parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    if (this.state.operation === '=') {
      this.setState({ previousValue: this.state.displayValue, operation: '*' }, () => console.log(this.state));
      return;
    }
  }

  equal = () => {
    if (!this.state.operation === '=' || (!this.state.previousValue)) {
      this.setState({waitingForNewValue: true}, () => {console.log(this.state)});
      return;
    }
    if (this.state.waitingForNewValue) {
      this.setState({ displayValue: this.state.displayValue, previousValue: null, operation: '=', waitingForNewValue: false }, () => {
        console.log(this.state);
      })
    }
    else {
      if (this.state.operation === '+') this.setState({ displayValue: parseFloat(this.state.previousValue) + parseFloat(this.state.displayValue), previousValue: null, operation: '=', waitingForNewValue: true }, () => {
        console.log(this.state);
      });

      if (this.state.operation === '*') this.setState({ displayValue: parseFloat(this.state.previousValue) * parseFloat(this.state.displayValue), previousValue: null, operation: '=', waitingForNewValue: true }, () => {
        console.log(this.state);
      });
    }
  }

  addDecimal = () => {
    let decimal = '.';
    if (this.state.waitingForNewValue === true) {
      this.setState({previousValue: this.state.displayValue, displayValue: decimal, waitingForNewValue: false }, () => {
        console.log(this.state)
      });
      return;
    }
    if (this.state.displayValue.toString().includes(decimal)) return
    else this.setState({ displayValue: (this.state.displayValue).toString().concat(decimal) });
  }

  negativeValue = () => {
    if (this.state.displayValue === '.') return;
    let num = this.state.displayValue;
    num = num * -1;
    this.setState({ displayValue: num })
  }

  render() {
    return (
      <>
        <div className="holder">
          <div className="calculator">
            <div className="row">
            <InputView state={this.state}/>
              <Buttons state={this.state} clearButton={this.clearButton} clearButtonAll={this.clearButtonAll} 
              percentConverter={this.percentConverter} showNumber={this.showNumber} 
              addNum={this.addNum} addDecimal={this.addDecimal} multiply={this.multiply} equal={this.equal} 
              negativeValue={this.negativeValue}/>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
