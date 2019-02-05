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

  showNumber = (e) => {
    let num = this.state.displayValue;
    console.log(num)
    let num2 = e.target.value;

    if (num === '0') {
      this.state.displayValue = num2;
      this.setState({ displayValue: num2 })
    }

    else {
      this.setState({ displayValue: num.concat(num2) });
    }

    // console.log(e.target.value)
  }

  addDecimal = (e) => {
    let decimal = e.target.value;
    // console.log(decimal)
    if (this.state.displayValue.includes(decimal)) {
      this.setState({ displayValue: this.state.displayValue })
    }
    else {
      this.setState({ displayValue: (this.state.displayValue).concat(decimal) });
    }
  }



  render() {
    return (
      <>
        <div className="holder">
          <div className="calculator">
            <div className="row">
              <div className="col-12 inputview">{this.state.displayValue}</div>
              <button type="button" className="button col-3">AC</button>
              <button type="button" className="button col-3">%</button>
              <button type="button" className="button col-3">±</button>
              <button type="button" className="button col-3 orange">÷</button>
              <button type="button" className="button col-3" value="7" onClick={this.showNumber}>7</button>
              <button type="button" className="button col-3" value="8" onClick={this.showNumber}>8</button>
              <button type="button" className="button col-3" value="9" onClick={this.showNumber}>9</button>
              <button type="button" className="button col-3 orange">x</button>
              <button type="button" className="button col-3" value="4" onClick={this.showNumber}>4</button>
              <button type="button" className="button col-3" value="5" onClick={this.showNumber}>5</button>
              <button type="button" className="button col-3" value="6" onClick={this.showNumber}>6</button>
              <button type="button" className="button col-3 orange">-</button>
              <button type="button" className="button col-3" value="1" onClick={this.showNumber}>1</button>
              <button type="button" className="button col-3" value="2" onClick={this.showNumber}>2</button>
              <button type="button" className="button col-3" value="3" onClick={this.showNumber}>3</button>
              <button type="button" className="button col-3 orange">+</button>
              <button type="button" className="button col-6" value="0" onClick={this.showNumber}>0</button>
              <button type="button" className="button col-3" value="." onClick={this.addDecimal}>.</button>
              <button type="button" className="button col-3 orange">=</button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default App;