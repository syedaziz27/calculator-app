import React, { Component } from 'react';
import './App.css';

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
    if (!this.state.previousValue) {
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
              <div className="col-12 inputview">{this.state.displayValue}</div>
              {
              this.state.displayValue !== '0'? 
              <button type="button" className="button col-3" onClick={this.clearButton}>C</button> 
              :
              <button type="button" className="button col-3" onClick={this.clearButtonAll}>AC</button> 
              }
              <button type="button" className="button col-3" value="%" onClick={this.percentConverter}>%</button>
              <button type="button" className="button col-3" value= "±" onClick={this.negativeValue}>±</button>
              <button type="button" className="button col-3 orange" value="/" >÷</button>
              <button type="button" className="button col-3" value="7" onClick={this.showNumber}>7</button>
              <button type="button" className="button col-3" value="8" onClick={this.showNumber}>8</button>
              <button type="button" className="button col-3" value="9" onClick={this.showNumber}>9</button>
              <button type="button" className="button col-3 orange" value="*" onClick={this.multiply}>x</button>
              <button type="button" className="button col-3" value="4" onClick={this.showNumber}>4</button>
              <button type="button" className="button col-3" value="5" onClick={this.showNumber}>5</button>
              <button type="button" className="button col-3" value="6" onClick={this.showNumber}>6</button>
              <button type="button" className="button col-3 orange" value="-" onClick={this.subtractNum}>-</button>
              <button type="button" className="button col-3" value="1" onClick={this.showNumber}>1</button>
              <button type="button" className="button col-3" value="2" onClick={this.showNumber}>2</button>
              <button type="button" className="button col-3" value="3" onClick={this.showNumber}>3</button>
              <button type="button" className="button col-3 orange" value="+" onClick={this.addNum}>+</button>
              <button type="button" className="button col-6" value="0" onClick={this.showNumber}>0</button>
              <button type="button" className="button col-3" value="." onClick={this.addDecimal}>.</button>
              <button type="button" className="button col-3 orange" value="=" onClick={this.equal}>=</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
