y
// 主模块
export function createStore(reducer){
    let state = reducer(undefined,{type:'@@redux/init'})
    let listeners = []
    function getState (){
        return state
    }
    function dispatch (action){
        const newState = reducer(state,action)
        state = newState
        listeners.forEach((listener)=>listener())
    }
    function subscribe (listener){
        listeners.push(listener)
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}
export function combineReducers(reducers){   
    return (state = {},action)=>{
        let totalState = {}
        Object.keys(reducers).forEach((key)=>{
            totalState[key] = reducers[key](state[key],action)
        })
       return totalState
    }
}