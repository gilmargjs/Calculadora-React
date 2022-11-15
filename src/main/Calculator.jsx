import React, { Component } from "react";
import "./Calculator.css";

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: '0',
  clearDisplay: '0',
  operation: null,
  values: [0, 0],
  current: 0
}


export default class Calculator extends Component {
  
  state = { ...initialState }
  
  constructor(props) {
    super(props);

    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  //função para limpar
  clearMemory() {
    //caso o clearMemory for apertado volta o estado para inicial
   this.setState({ ...initialState })
  }

  //função pra ver qual operação foi selecionada
  setOperation(operation) {
    
    if(this.state.current === 0) {
      this.setState({ operation, current:1, clearDisplay: true })
    }else{
      const equals = operation === '='
      const currentOperation = this.state.operation

      const values = [ ...this.state.values]
      try{
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)

      }catch(e){
        values[0] = this.state.values[0]
      }
      values[1] = 0

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
    }
  }

  //função de adicionar digitos
  addDigit(n) {
    //se o usuario já estiver digitado ponto saia da função
    if(n === '.' && this.state.displayValue.includes('.')){
      return
    }
    //constante para evitar o '0' a esquerda
    const clearDisplay = this.state.displayValue === '0'
    || this.state.clearDisplay

    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({ displayValue, clearDisplay: false })

    if(n !== '.'){
      const i = this.state.current
      const newValue = parseFloat(displayValue)
      const values = [ ...this.state.values ]
      values[i] = newValue
      this.setState({ values })
    }
  }

  render() {
    return (
      <div className="Calculator">
        {/* renderizando o display e os buttons e enviando valor para display */}
        <Display value={this.state.displayValue} />
        {/* renderizando button com evento click e style css */}
        {/* a função (addDigit) vai capturar o valor do button */}
        {/* a função (clearMemory) vai limpar os valores do display */}
        {/* a função (setOperation) verifica qual operação foi selecionanda (+ - * / =) */}
        {/* E TAMBÉM ESTAMOS APLICANDO OS STYLES COM (triple, operation, double) */}
        <Button label="AC"click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
