
import React,{Component} from 'react'
import PropTypes from 'prop-types'

export default class Counter extends Component{
    static propTypes ={
        count:PropTypes.number.isRequired,
        increment:PropTypes.func.isRequired,
        incrementAsync:PropTypes.func.isRequired,
        decrement:PropTypes.func.isRequired,
    }
    increment = ()=>{
        const number = this.refs.selectRef.value*1
        this.props.increment(number)
    }
    decrement = ()=>{
        const number = this.refs.selectRef.value*1
        this.props.decrement(number)
    }
    incrementOfOdd = ()=>{
        const {count} = this.props
        const number = this.refs.selectRef.value*1
        if(count%2===1){
            this.props.increment(number)
        }
    }
    incrementAsync = ()=>{
        const number = this.refs.selectRef.value*1
        this.props.incrementAsync(number)
    }
    render(){
        const {count} = this.props
        return(
           <div>
               <div> click {count} times</div>
               <select ref='selectRef'>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementOfOdd}>incrementOfOdd</button>&nbsp;
                <button onClick={this.incrementAsync}>incrementAsync</button>&nbsp;
           </div>
        )
    }
}
   