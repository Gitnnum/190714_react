
import React,{Component} from 'react'

export default class App extends Component{
    state = {
        count:0
    }
    increment = ()=>{
        const {count} = this.state
        this.setState({
            count: count + this.refs.selectRef.value*1
        })
    }
    decrement = ()=>{
        const {count} = this.state
        this.setState({
            count: count - this.refs.selectRef.value*1
        })
    }
    incrementOfOdd = ()=>{
        const {count} = this.state
        if(count%2===1){
            this.setState({
                count: count + this.refs.selectRef.value*1
            })
        }
    }
    incrementAsync = ()=>{
        const {count} = this.state
        setTimeout(()=>{
            this.setState({
                count: count + this.refs.selectRef.value*1
            })
        },1000)
    }
    render(){
        const {count} = this.state
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
   