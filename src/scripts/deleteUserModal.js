import { deleteUserRequest, getAllEmployeesRequest } from "./requests.js"
import { createUserCard } from "./adminDashboard.js"

export async function showDeleteModal() {
    const buttons = document.querySelectorAll('.deletion-icon')
    const modalController = document.querySelector('.modal__controller--delete')
    const modalText = document.querySelector('.delete_modal__container > h2')
    
    buttons.forEach(button => {
        button.addEventListener('click', (event)=> {
            event.preventDefault()
            modalController.showModal()
            
            const deleteButton = document.querySelector('.delete-button')

            deleteButton.type = 'button'
            
            modalText.innerText = `Deseja deletar o user ${event.target.dataset.name}?`

            deleteButton.addEventListener('click', async (evt)=> {
                evt.preventDefault()
                
                let idElement = event.target.id
                
                let id = idElement.substring(12)

                // console.log(id)

                await deleteUserRequest(id)
        
                const allEmployees = await getAllEmployeesRequest() 

                createUserCard(allEmployees)

                modalController.close()
            })
        })
    })
    closeDeleteModal()
}

function closeDeleteModal() {
    const modalController = document.querySelector('.modal__controller--delete')
    const closeButton = document.querySelector('.delete_modal__close')

    closeButton.addEventListener('click', ()=> {
        modalController.close()
    })
}
