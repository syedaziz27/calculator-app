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

  clearButton = () => {

    if (this.state.operation === '+') {
      this.setState({previousValue: (this.state.previousValue - parseFloat(this.state.displayValue)), displayValue: '0', }, () => {
        console.log(this.state)
      });
      return;
    }

    if (this.state.operation === '-') {
      this.setState({previousValue: (this.state.previousValue + parseFloat(this.state.displayValue)), displayValue: '0', }, () => {
        console.log(this.state)
      });
      return;
    }
    this.setState({displayValue: '0'})
  }

  clearButtonAll = () => {
    this.setState({displayValue: '0', previousValue: null, operation: null, waitingForNewValue: false}, () => {
      console.log(this.state);
    })
  }

  percentConverter = (e) => {
    let num = this.state.displayValue / 100;

    if (num === 0) this.clearButton();
    else {
    this.setState({displayValue: num, operation: '%'}, () => {
      console.log(this.state)
    });
  }
}

  addNum = (e) => {
    if (!this.state.previousValue) {
      this.setState({operation: '+', waitingForNewValue: true, previousValue: this.state.displayValue}, ()=> {
        console.log('clicked plus', this.state);
      });
    }
    else {
      this.setState({operation: '+', waitingForNewValue: true}, () => {
        console.log('clicked plus', this.state)
      })
    }
  } 

  subtractNum = (e) => {
    if (!this.state.previousValue) {
      this.setState({operation: '-', waitingForNewValue: true, previousValue: this.state.displayValue}, ()=> {
        console.log('clicked plus', this.state);
      });
    }
    else {
      this.setState({operation: '-', waitingForNewValue: true}, () => {
        console.log('clicked subtract', this.state)
      })
    }
  }

  showNumber = (e) => {
    let num = this.state.displayValue;
    let num2 = e.target.value;

    if (this.state.operation === '+') {
      if(this.state.previousValue) {
        this.setState({previousValue: (parseFloat(this.state.previousValue) + parseFloat(num2)), displayValue: num2, operation: null}, () => {
          console.log(this.state)
        });
      }
      else {
        this.setState({previousValue: (parseFloat(num) + parseFloat(num2)), displayValue: num2, operation: null}, () => {
          console.log(this.state)
        });
      }
      return;
    }

    if (this.state.operation === '-') {
      if(this.state.previousValue) {
        this.setState({previousValue: (parseFloat(this.state.previousValue) - parseFloat(num2)), displayValue: num2, operation: null}, () => {
          console.log(this.state)
        });
      }
      else {
        this.setState({previousValue: (parseFloat(num) - parseFloat(num2)), displayValue: num2, operation: null}, () => {
          console.log(this.state)
        });
      }
      return;
    }

    if (this.state.operation === '%') {
      this.setState({displayValue: num2, operation: null});
      return;
    }

    if (num === '0') {
      this.setState({ displayValue: num2 })
    }
    else {
      this.setState({ displayValue: num.toString().concat(num2) });
    }
  }

  negativeValue=(e)=>{
    let num= this.state.displayValue;
    num=num*(-1);
   this.setState({displayValue:num})
  }

  addDecimal = (e) => {
    let decimal = e.target.value;
    // console.log(decimal)
    if (this.state.displayValue.toString().includes(decimal)) {
      return;
    }
    else {
      this.setState({ displayValue: this.state.displayValue.toString().concat(decimal)});
    }
  }

  negativeValue=(e)=>{
    let num= this.state.displayValue;
    num=num*(-1);
   this.setState({displayValue:num})
  }

  addDecimal = (e) => {
    let decimal = e.target.value;
    // console.log(decimal)
    if (this.state.displayValue.toString().includes(decimal)) {
      return
    }
    else {
      this.setState({ displayValue: (this.state.displayValue).toString().concat(decimal) });
    }
  }

  render() {
    return (
      <>
        <div className="holder">
          <div className="calculator">
            <div className="row">
              <div className="col-12 inputview">{this.state.displayValue}</div>
              {
              this.state.displayValue !== '0' ? 
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
              <button type="button" className="button col-3 orange" value="*" >x</button>
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
              <button type="button" className="button col-3 orange">=</button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default App;