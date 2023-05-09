import { toast } from "./toast.js"
import { createAllDepartmentCards, selectCompany } from './adminDashboard.js'
import { getAllCompanies, green, red, createNewDepartmentRequest } from "./requests.js"

export async function showCreateDepartmentModal() {
    const modalController = document.querySelector('.modal__controller--create-department')  
    
    const departmentName = document.querySelector('#dpto_name')

    const departmentDescription = document.querySelector('#dpto_description')
    
    const button = document.querySelector('.create-department')

    
    const submitButton = document.querySelector('.submit-create-dpto-button')
    
    const updateBody = {}
    
    const allCompanies = await getAllCompanies()
    selectCompanyCreateDpto(allCompanies)
    
    
    button.addEventListener('click', async (event)=> {
        event.preventDefault()
        modalController.showModal()
        
        const select = document.querySelector('#select-create-dpto-modal')
        

        submitButton.addEventListener('click', ()=> {
            let selectedCompany = select.options[select.selectedIndex].id

            console.log(selectedCompany)

            updateBody['name'] = departmentName.value
            updateBody['description'] = departmentDescription.value
            updateBody['company_id'] = selectedCompany
            
            console.log(updateBody)
            
            const isAnyValueEmpty = (obj) => {
                for (let key in obj) {
                  if (obj.hasOwnProperty(key)) {
                    if (obj[key] === "") {
                      return true 
                    }
                  }
                }
                return false
              }
    
            if(isAnyValueEmpty(updateBody)){
                toast(green, 'Departamento criado com sucesso')
            } else {
                toast(red, 'Por favor preencha todos os campos')
            }

            createNewDepartmentRequest(updateBody)
            modalController.close()
        })
        
    })
    closeCreateDepartmentModal()
}

function closeCreateDepartmentModal() {
    const modalController = document.querySelector('.modal__controller--create-department')
    const closeButton = document.querySelector('.create-department_modal__close')

    closeButton.addEventListener('click', ()=> {
        modalController.close()
    })
}

function selectCompanyCreateDpto(array) {
    const select = document.querySelector('.select-create-department')
    
    array.forEach(company => {
        const option = document.createElement('option')
        option.id = company.id 
        option.value = company.name
        option.innerText = company.name
        
        select.appendChild(option)
    })
}



