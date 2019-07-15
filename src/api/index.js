import ajax from './ajax'
// const BASE = 'http://localhost:5000'
const BASE = ''
// export const reqLogin = (username,password) =>(
//     ajax({
//         method:'post',
//         url:BASE+'/login',
//         data:{
//             username,
//             password
//         }
//     })
// )
export const reqLogin = (username,password) =>  ajax.post(BASE + '/login', {username, password})

// const name = 'liu'
// const pwd = '123'
// reqLogin(name,pwd)