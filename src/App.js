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
    this.setState({displayValue: 0}, () => console.log(this.state)); // clears value being displayed only
  }

  clearButtonAll = () => {
    this.setState({displayValue: 0, previousValue: null, operation: null, waitingForNewValue: false}, () => console.log(this.state)); // resets state to initial conditions
  }

  percentConverter = () => {
    let num = this.state.displayValue / 100; // gets decimal val
    this.setState({ displayValue: num, waitingForNewValue: true }, () => console.log(this.state)); // displays the decimal val (num), causes next number input to display and remove num
  }

  showNumber = (e) => {
    if (this.state.displayValue === '.') {
      this.setState({ displayValue: this.state.displayValue.concat(e.target.value) }, () => console.log(this.state));
      return; // allows for a number to be attached to a number that starts with a decimal , if this function wasn't here, the decimal would dissappear due to parseInt in later parts of this function.
    }
    if (!this.state.waitingForNewValue) { // if we're not waiting for a new number, we will be pressing multiple buttons to create a multi- digit number. example: 12312
      if (e.target.value === '0') {
        if (this.state.displayValue === '0') return; // this prevents 0s from concatting and displayin a bunch of 0s on screen if u press 0 multiple times. example: 0000 is prevented
        else this.setState({ displayValue: this.state.displayValue.toString().concat(e.target.value) }, () => {
          console.log(this.state); // this just concats 0 to the end of the number being displayed. ex: 30
        });
      }
      else this.setState({ displayValue: parseFloat(this.state.displayValue.toString().concat(e.target.value)) }, () => {
        console.log(this.state); // this just concats any other number u press other than 0 to the end of the displayed number. ex: 34
      });
    }
    else { // here is the case if we are waiting for a new number, it will take the displayed number and store it in state.previousNumber, it will also display the num number u press and set waitingForNewValue to false so u can add more digits to this number.
      this.setState({ previousValue: this.state.displayValue, displayValue: e.target.value, waitingForNewValue: false }, () => {
        console.log(this.state);
      });
    }
  }

  addNum = () => {
    if (this.state.displayValue === 0 && this.state.operation) {
      this.setState({operation: '+'}, () => console.log(this.state));
      return; // this will be useful when we use the C button to clear the display number and if we want to also use a different operation than the one we pressed 
    }         // it override any other operation button that was pressed and make the new operation +, ex we pressed 15 - 6, then we pressed C to clear the 6, but we 
              // also want to do + instead of -, this will allow that
    if (this.state.waitingForNewValue) { // checks if were waiting for a new value or were we pressing in more digits
      this.setState({ operation: '+' }, () => console.log(this.state));
      return; // this allows us to change the operation that we just pressed to +  ex: we pressed 10 * and we want to now do 10 +
    }
    else {
      this.setState({ operation: '+', waitingForNewValue: true }, () => console.log(this.state)); //this will change the operation to + and now we can press in a new value to add to the displayed value
    }
    if (!this.state.previousValue) { 
      this.setState({ operation: '+', previousValue: this.state.displayValue, waitingForNewValue: true }, () => {
        console.log(this.state);
        // this works in the case that the calc was just cleared of mem (AC button) or it just loaded with a default state
        // this will set previousValue to the displayed value after we press + and it will also make waitingForNewValue = true so that we can press in a new number
      });
    }
    // the next if statements check which operator we just used right before we just pressed plus
    // this code is needed in order to chain operations without necessarily pressing enter in between each operation we do
    // it will check to see which operator was just used and perform that operation using the previous val and display value
    // it will then store that value in state.previousValue and will also display it
    // EXAMPLE : u press 5 + 6, then u press - , this code will do 5 + 6 and store 11 in the prevVal and also display 11
    //            now u press 8 , 8 will be displayed and 11 is stored, u then press = and it will do 11 - 8 and display 3.

    // ---> THIS SAME LOGIC GOES FOR THE OTHER OPERATORS AND THIS NEEDS TO BE THERE BUT SLIGHTLY TWEAKED FOR EACH OPERATION
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
    if (this.state.operation === '-') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) - parseFloat(this.state.displayValue), operation: '+', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) - parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    if (this.state.operation === '/') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) / parseFloat(this.state.displayValue), operation: '+', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) / parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    
    if (this.state.operation === '=') {
      this.setState({ previousValue: this.state.displayValue, operation: '+' }, () => console.log(this.state));
      return;
    }
  }

  subtractNum = () => {
    if (this.state.displayValue === 0 && this.state.operation) {
      this.setState({operation: '-'}, () => console.log(this.state));
      return; // this will be useful when we use the C button to clear the display number and if we want to also use a different operation than the one we pressed 
    }         // it override any other operation button that was pressed and make the new operation +, ex we pressed 15 - 6, then we pressed C to clear the 6, but we 
              // also want to do + instead of -, this will allow that
    if (this.state.waitingForNewValue) { // checks if were waiting for a new value or were we pressing in more digits
      this.setState({ operation: '-' }, () => console.log(this.state));
      return; // this allows us to change the operation that we just pressed to +  ex: we pressed 10 * and we want to now do 10 +
    }
    else {
      this.setState({ operation: '-', waitingForNewValue: true }, () => console.log(this.state)); //this will change the operation to + and now we can press in a new value to add to the displayed value
    }
    if (!this.state.previousValue) { 
      this.setState({ operation: '-', previousValue: this.state.displayValue, waitingForNewValue: true }, () => {
        console.log(this.state);
        // this works in the case that the calc was just cleared of mem (AC button) or it just loaded with a default state
        // this will set previousValue to the displayed value after we press + and it will also make waitingForNewValue = true so that we can press in a new number
      });
    }
    if (this.state.operation === '-') { 
      this.setState({ previousValue: parseFloat(this.state.previousValue) - parseFloat(this.state.displayValue), operation: '-', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) - parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    if (this.state.operation === '*') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) * parseFloat(this.state.displayValue), operation: '-', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) * parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    if (this.state.operation === '+') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) + parseFloat(this.state.displayValue), operation: '-', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) + parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    if (this.state.operation === '/') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) / parseFloat(this.state.displayValue), operation: '-', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) / parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    if (this.state.operation === '=') {
      this.setState({ previousValue: this.state.displayValue, operation: '-' }, () => console.log(this.state));
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
    if (this.state.operation === '-') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) - parseFloat(this.state.displayValue), operation: '*', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) - parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    if (this.state.operation === '*') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) * parseFloat(this.state.displayValue), operation: '*', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) * parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    if (this.state.operation === '/') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) / parseFloat(this.state.displayValue), operation: '*', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) / parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    if (this.state.operation === '=') {
      this.setState({ previousValue: this.state.displayValue, operation: '*' }, () => console.log(this.state));
      return;
    }
  }
  
  divide = () => {
    if (this.state.displayValue === 0 && this.state.operation) {
      this.setState({operation: '/'}, () => console.log(this.state));
      return;
    }
    if (this.state.waitingForNewValue) {
      this.setState({ operation: '/' }, () => console.log(this.state));
      return;
    }
    else {
      this.setState({ operation: '/', waitingForNewValue: true }, () => console.log(this.state));
    }
    if (!this.state.previousValue) {
      this.setState({ operation: '/', previousValue: this.state.displayValue, waitingForNewValue: true }, () => {
        console.log(this.state)
      });
    }
    if (this.state.operation === '+') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) + parseFloat(this.state.displayValue), operation: '/', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) + parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    if (this.state.operation === '-') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) - parseFloat(this.state.displayValue), operation: '/', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) - parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    if (this.state.operation === '/') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) / parseFloat(this.state.displayValue), operation: '/', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) / parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    if (this.state.operation === '*') {
      this.setState({ previousValue: parseFloat(this.state.previousValue) * parseFloat(this.state.displayValue), operation: '/', waitingForNewValue: true, displayValue: parseFloat(this.state.previousValue) * parseFloat(this.state.displayValue) }, () => {
        console.log(this.state);
      });
    }
    
    if (this.state.operation === '=') {
      this.setState({ previousValue: this.state.displayValue, operation: '/' }, () => console.log(this.state));
      return;
    }
  }

  equal = () => {
    if (!this.state.operation === '=' || (!this.state.previousValue)) {
      this.setState({waitingForNewValue: true}, () => {console.log(this.state)});
      return; // this line of code stops users from pressing equal multiple times and causing the display number to keep changing, the equal funct should only work the first time u press it and not constantly repeat the last operation (+, -, *, /) that was done
    }
    if (this.state.waitingForNewValue) { // if u press 5, then + and then =, this code will run to just display the 5 and reset the prev value, set waiting for new val to true, and operation to =
      this.setState({ displayValue: this.state.displayValue, previousValue: null, operation: '=', waitingForNewValue: true}, () => {
        console.log(this.state);
      })
    }
    else { // this is the case if waiting is false (we want to add more digits to the displayed number)
      // these if statements below will check which operation was just pressed. ex: if u pressed +, this function will now add the previous val and new value
      if (this.state.operation === '+') this.setState({ displayValue: parseFloat(this.state.previousValue) + parseFloat(this.state.displayValue), previousValue: null, operation: '=', waitingForNewValue: true }, () => {
        console.log(this.state);
      });
      if (this.state.operation === '-') this.setState({ displayValue: parseFloat(this.state.previousValue) - parseFloat(this.state.displayValue), previousValue: null, operation: '=', waitingForNewValue: true }, () => {
      console.log(this.state);
    });
      if (this.state.operation === '/') this.setState({ displayValue: parseFloat(this.state.previousValue) / parseFloat(this.state.displayValue), previousValue: null, operation: '=', waitingForNewValue: true }, () => {
      console.log(this.state);
    });
      if (this.state.operation === '*') this.setState({ displayValue: parseFloat(this.state.previousValue) * parseFloat(this.state.displayValue), previousValue: null, operation: '=', waitingForNewValue: true }, () => {
        console.log(this.state);
      });
    }
  }

  addDecimal = () => {
    let decimal = '.'; 
    if (this.state.waitingForNewValue === true) { // if were waiting for a new value, this code will allow us to display just a decimal if thats the first value of our new number
      this.setState({previousValue: this.state.displayValue, displayValue: decimal, waitingForNewValue: false }, () => {
        console.log(this.state) // sets the display to .  sets waiting to false so we can add more numbers now after the decimal
      });
      return;
    }
    if (this.state.displayValue.toString().includes(decimal)) return // this stops us from putting more than one decimal in the number
    else this.setState({ displayValue: (this.state.displayValue).toString().concat(decimal) }); // this just concats any number we press to the decimal
  }

  negativeValue = () => {  // converts the displayed num to positive or negative
    let num = this.state.displayValue; // stores num as a variable
    num = num * -1; // changes the sign on it  ex: +1 becomes -1 and -1 becomes +1
    this.setState({ displayValue: num }); // renders the num to the display
  }

  render() {
    return (
      <>
        <div className="holder">
          <div className="calculator">
            <div className="row">
            <InputView state={this.state}/>  {/* component for the input view, state is passed in a prop (inputView.js) */}
              <Buttons state={this.state} clearButton={this.clearButton} clearButtonAll={this.clearButtonAll} 
              percentConverter={this.percentConverter} showNumber={this.showNumber} 
              addNum={this.addNum} subtractNum={this.subtractNum} addDecimal={this.addDecimal} multiply={this.multiply} divide={this.divide} equal={this.equal} 
              negativeValue={this.negativeValue}/> {/* this tag holds all the buttons on the calc, state and all of the class methods created are passed in as props so that component can do all function calculations on its end (button.js) */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
