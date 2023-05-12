import { loginRequest, red } from './requests.js'
import { toast } from "./toast.js"

export function handleLogin() {
    const inputs = document.querySelectorAll('.login_input')
    
    const button = document.querySelector('#login_button')

    let loginBody = {}
    let count = 0

    button.addEventListener('click', async (event)=> {
        event.preventDefault()
        
        inputs.forEach(input => {
            if(input.value.trim() === ''){
                count++
            }
            loginBody[input.name] = input.value
        })
        if(count !== 0){
            count = 0
            return toast(red, 'Por favor preencha os dados necessários')
        } else {
            const token = await loginRequest(loginBody)
            return token
        }
    })
}

handleLogin()

function registerPageFromLogin() {
    const buttons = document.querySelectorAll('.register')
    
    buttons.forEach(button => {
        button.addEventListener('click', (event)=> {
            event.preventDefault()
            location.replace('./register.html')
        })
    }
    )
}

registerPageFromLogin()


function backHomeFromLogin() {
    const button = document.querySelector('.back-home-button')

    button.addEventListener('click', (event)=> {
        event.preventDefault()
        location.replace('../../index.html')
    })
}

backHomeFromLogin()


