import { editUserDetailsRequest, red, green, getAllEmployeesRequest } from './requests.js'
import { toast } from './toast.js'
import { createUserCard } from './adminDashboard.js'

export async function showEditModal() {
    const modalController = document.querySelector('.modal__controller--edit')

    const inputs = document.querySelectorAll('.edit_modal__container > .add__input')

    const editButtons = document.querySelectorAll('.edition-icon')

    const submitButton = document.querySelector('.submit-edit-button')
    
    const updateBody = {}
    let count = 0

    editButtons.forEach(button => {
        button.addEventListener('click',(event) => {
            event.preventDefault()
            modalController.showModal()

            submitButton.addEventListener('click', async (evt) => {
                evt.preventDefault()

                inputs.forEach(({value, name}) => {
                    if(value.trim() === ''){
                        count++
                    }
                    updateBody[name] = value

                })

                if(count !== 0){
                    count = 0
                    toast(red, 'Por favor preencha todos os campos') 
                } else {
                    let idElement = event.target.id
                
                    let id = idElement.substring(10)

                    // console.log(id)
                    await editUserDetailsRequest(id, updateBody)

                    toast(green, 'Dados do usuário atualizado com sucesso')
                    
                    
                    inputs.forEach(input=> {
                        input.value = ''
                    })
                    const allEmployees = await getAllEmployeesRequest()
                    
                    createUserCard(allEmployees)

                    modalController.close()
                }
            }) 
        })
    })
    closeEditModal()
}

function closeEditModal() {
    const modalController = document.querySelector('.modal__controller--edit')
    const closeButton = document.querySelector('.edit_modal__close')

    closeButton.addEventListener('click', ()=> {
        modalController.close()
    })
}