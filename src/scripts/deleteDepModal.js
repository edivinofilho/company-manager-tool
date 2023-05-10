import { deleteDepartmentRequest, getAllDepartmentsRequest, dismissingEmployees, filterCompaniesByIdRequest, getAllEmployeesRequest } from "./requests.js";

import { createAllUserCards } from "./adminDashboard.js"; 


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
                console.log(id)
                
                await deleteDepartmentRequest(id)

                const allDepartments = await getAllDepartmentsRequest()
                console.log(allDepartments)

                allDepartments.forEach(department => {
                    if(id === department.id){
                        const companyById =  filterCompaniesByIdRequest(department.company_id)
                        
                        companyById.then(function(result) {
                            const employees = result.employees

                            employees.forEach(employee => {
                                dismissingEmployees(employee.id)
                                
                            })
                        })
                    }
                })              
                
            })
        })
        createAllUserCards()
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