import { deleteDepartmentRequest, getAllDepartmentsRequest } from "./requests.js";

import { createDepartmentCard } from "./adminDashboard.js"; 

// Falta adicionar a função para demitir todos os funcionários
export async function showDeleteDepartmentModal() {
    const deleteButtons = document.querySelectorAll('.deletion-icon__department')

    const modalController = document.querySelector('.modal__controller--delete-department')

    const modalText = document.querySelector('.delete_modal__container-department > h2')

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault()
            modalController.showModal()
            
            const deleteButton = document.querySelector('.delete-department-button')

            modalText.innerText = `Realmente deseja remover o departamento ${event.target.dataset.name} e demitir seus funcionários?`

            deleteButton.addEventListener('click', async (evt)=> {
                evt.preventDefault()

                let idElement = event.target.id
                
                let id = idElement.substring(18)

                await deleteDepartmentRequest(id)

                const allDepartments = await getAllDepartmentsRequest()

                createDepartmentCard(allDepartments)
            })
        })
    })
    closeDeleteDepartmentModal()
}

function closeDeleteDepartmentModal() {
    const modalController = document.querySelector('.modal__controller--delete-department')

    const closeButton = document.querySelector('.delete-department_modal__close')

    closeButton.addEventListener('click', ()=> {
        modalController.close()
    })
}