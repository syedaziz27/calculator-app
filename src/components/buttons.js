import React from 'react';
import '../App.css';

const Buttons = (props) => {
    return (
        <>
        {
              props.state.previousValue ? 
              <button type="button" className="button col-3" onClick={props.clearButton}>C</button> 
              :
              <button type="button" className="button col-3" onClick={props.clearButtonAll}>AC</button> 
              }
        <button type="button" className="button col-3" value="%" onClick={props.percentConverter}>%</button>
              <button type="button" className="button col-3" value= "±" onClick={props.negativeValue}>±</button>
              <button type="button" className="button col-3 orange" value="/" onClick={props.divide}>÷</button>
              <button type="button" className="button col-3" value="7" onClick={props.showNumber}>7</button>
              <button type="button" className="button col-3" value="8" onClick={props.showNumber}>8</button>
              <button type="button" className="button col-3" value="9" onClick={props.showNumber}>9</button>
              <button type="button" className="button col-3 orange" value="*" onClick={props.multiply}>x</button>
              <button type="button" className="button col-3" value="4" onClick={props.showNumber}>4</button>
              <button type="button" className="button col-3" value="5" onClick={props.showNumber}>5</button>
              <button type="button" className="button col-3" value="6" onClick={props.showNumber}>6</button>
              <button type="button" className="button col-3 orange" value="-" onClick={props.subtractNum}>-</button>
              <button type="button" className="button col-3" value="1" onClick={props.showNumber}>1</button>
              <button type="button" className="button col-3" value="2" onClick={props.showNumber}>2</button>
              <button type="button" className="button col-3" value="3" onClick={props.showNumber}>3</button>
              <button type="button" className="button col-3 orange" value="+" onClick={props.addNum}>+</button>
              <button type="button" className="button col-6" value="0" onClick={props.showNumber}>0</button>
              <button type="button" className="button col-3" value="." onClick={props.addDecimal}>.</button>
              <button type="button" className="button col-3 orange" value="=" onClick={props.equal}>=</button>
              </>
    )
}

export default Buttons;