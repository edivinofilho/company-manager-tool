import { toast } from "./toast.js"
import {green} from "./requests.js" 

function logOut() {
    const button = document.querySelector('.logout')

    button.addEventListener('click', () => {
        toast(green, 'Logging out')
        
        setTimeout(() => {
            location.replace('../../index.html')            
          }, 2000)
    })
}

logOut()