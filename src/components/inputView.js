import React from 'react';
import '../App.css';

const InputView = (props) => {
    return (
        <div className="col-12 inputview">{props.state.displayValue}</div>
    );
}

export default InputView;