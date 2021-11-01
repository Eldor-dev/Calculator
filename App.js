const operatorStyle = {background: "#797D7F"}

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      input: "0",
      currentInput: 0
    }
  }
  
  handleReset = () => {
    this.setState({input: "0", currentInput: "0"});
  }
  
  handleDigit = (e) => {
    const digit = e.target.value;
    const input = this.state.input;
    const currentInput = this.state.currentInput
   
    if (input === "0")
      this.setState({input: digit, currentInput: digit});
    if (input !== "0")
      this.setState({input: input + digit, currentInput: currentInput + digit })
  }
  
  handleOperator = (e) => {
    const operator = e.target.value;
    const input = this.state.input;
    const currentInput = this.state.currentInput;
    
    if(/[+-/*][+-/*]$/.test(currentInput)) {
        const slicedInput = currentInput.split('').slice(0, currentInput.length - 2).join('');
        this.setState({currentInput: slicedInput + operator, input: operator})
    } else if(/[+-/*]$/.test(currentInput) && operator !== "-") {
      const slicedInput = currentInput.split('').slice(0, currentInput.length - 1).join('');
      this.setState({currentInput: slicedInput + operator, input: operator})
      
    }  else {
      this.setState({currentInput: currentInput + operator, input: operator})
    }
      
  }
  
  handleDecimal = (e) => {
    const value = e.target.value;
    const input = this.state.input;
    const currentInput = this.state.currentInput;
    
    if(/[.]+/.test(input)) {
      this.setState({input: input + ""})
    } else {
      this.setState(
        {input: input + value, 
         currentInput: currentInput + value}
      )
    }
  }
  
  handleResult = () => {
    const result = eval(this.state.currentInput);
    this.setState(
      {currentInput: result, input: result}
    )
  }
  
  render() {
    return (
      <div id="App">
        <div id="display">
          {this.state.currentInput}
        </div>
          <div id="input">{this.state.input}</div>
        <Button 
          handleReset={this.handleReset} 
          handleDigit={this.handleDigit} 
          handleDecimal={this.handleDecimal} 
          handleOperator={this.handleOperator}
          handleResult={this.handleResult}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));

function Button ({handleReset, handleDigit, handleDecimal, handleOperator, handleResult}) {
  
  return (
    <div >
      <button id="clear" onClick={handleReset}>
        AC
      </button>
      <button 
        id="divide" 
        style={operatorStyle} 
        value="/" 
        onClick={handleOperator}
      >
        /
      </button>
      <button 
        id="multiply" 
        style={operatorStyle} 
        value="*" 
        onClick={handleOperator}
       >
         X
      </button>
      <button 
        id="one" value="1" onClick={handleDigit}
      >
        1
      </button>
      <button 
        id="two" value="2" onClick={handleDigit}
      >
        2
      </button>
      <button
        id="three" value="3" onClick={handleDigit}
      >
        3
      </button>
      <button 
        id="add" 
        style={operatorStyle} 
        value="+" 
        onClick={handleOperator}
      >
        +
      </button>
      <button 
        id="four" value="4" onClick={handleDigit}
      >
        4
      </button>
      <button 
        id="five" value="5" onClick={handleDigit}
      >
        5
      </button>
      <button 
        id="six" value="6" onClick={handleDigit}
      >
        6
      </button>
      <button 
        id="subtract" style={operatorStyle} 
        value="-" onClick={handleOperator}
      >
        -
      </button>
      <button 
        id="seven" value="7" onClick={handleDigit}
      >
        7
      </button>
      <button 
        id="eight" value="8" onClick={handleDigit}
      >
        8
      </button>
      <button 
        id="nine" value="9" onClick={handleDigit}
      >
        9
      </button>
      <button 
        id="equals" onClick={handleResult}
      >
        =
      </button>
      <button 
        id="zero" value="0" onClick={handleDigit}
      >
        0
      </button>
      <button 
        id="decimal" value="." onClick={handleDecimal} 
      >
        .
      </button>
    </div>
  )
}
