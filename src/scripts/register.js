// import { handleLogin } from "./login.js"

import { createUserRequest } from "./requests.js"

export function backHome() {
    const buttons = document.querySelectorAll('.back-home-button')

    buttons.forEach(button => {
        button.addEventListener('click', (event)=> {
            event.preventDefault()
            location.replace('../../index.html')
        })
    })
}

backHome()

export async function handleRegister() {
    const inputs = document.querySelectorAll('.register_input')

    const button = document.querySelector('#register_button')

    let userData = {}
    let count = 0
    
    button.addEventListener('click', async (event) => {
        event.preventDefault()

        inputs.forEach(input => {
            if(input.value.trim() === ''){
                count++
            }
            userData[input.name] = input.value
        })
        if(count !== 0){
            count = 0
            return toast(red, 'Por favor preencha os dados necessários')
        } else {
            const user = await createUserRequest(userData)
            return user
        }
    })
}

handleRegister()