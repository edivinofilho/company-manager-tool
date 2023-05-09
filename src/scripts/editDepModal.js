import { updateDepartmentsRequest, red, green, getAllDepartmentsRequest } from "./requests.js"

import { toast } from "./toast.js"

import { createAllDepartmentCards } from "./adminDashboard.js"

export async function showEditDepartmentModal() {
    const modalController = document.querySelector('.modal__controller--edit-department')

    const input = document.querySelector('.edit-department_modal__container > .add__input')

    const editButtons = document.querySelectorAll('.edition-icon__department')

    const submitButton = document.querySelector('.submit-edit-department-button')
    
    const updateBody = {}

    editButtons.forEach(button => {
        button.addEventListener('click', (event)=> {
            event.preventDefault()
            modalController.showModal()

            submitButton.addEventListener('click', async (evt)=> {
                evt.preventDefault()
                updateBody['description'] = input.value

                let idElement = event.target.id
                
                let id = idElement.substring(16)

                console.log(idElement)
                
                if(updateBody.description === ''){ 
                    toast(red, 'Por favor preencha todos os campos')
                    
                    
                } else {
                    toast(green, 'Descrição do Departamento atualizado com sucesso')
                    
                    console.log(id)

                    await updateDepartmentsRequest(id, updateBody) 

                    const allDepartments = await getAllDepartmentsRequest()

                    createAllDepartmentCards(allDepartments)

                    modalController.close()
                }

                input.value = ''
            })
        })
    })
    closeEditDepartmentModal()
}

function closeEditDepartmentModal() {
    const modalController = document.querySelector('.modal__controller--edit-department')

    const closeButton = document.querySelector('.edit-department_modal__close')

    closeButton.addEventListener('click', ()=> {
        modalController.close()
    })
}