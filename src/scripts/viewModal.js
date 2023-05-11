import { getAllOutOfWorkEmployeesRequest, hireEmployeeRequest, filterCompaniesByIdRequest, getAllDepartmentsRequest, getAllCompanies, dismissingEmployees } from './requests.js'


function selectOutOfWorkEmployees(array) {
    const select = document.querySelector('#select-view-modal')
    
    array.forEach(user => {
        const option = document.createElement('option')
        option.id = user.id 
        option.value = user.name
        option.innerText = user.name
        
        select.append(option)
    })
}

function createHiredEmployeesCards(array) {
    const hiredEmployeesList = document.querySelector('.working-employees__container')

    hiredEmployeesList.innerHTML = ''

    array.forEach(element => {
        const userDetails = document.createElement('li')
        userDetails.classList.add('working-employees__user-container')

        const username = document.createElement('h3')
        username.classList.add('working-employees__username')
        username.innerText = element.name

        const companyName = document.createElement('p')
        companyName.innerText = element.company_id

        const firedButton = document.createElement('button')
        firedButton.innerText = 'Desligar'
        firedButton.classList.add('fire-employee')
        firedButton.id = element.id

        console.log(firedButton.id)
        firedButton.addEventListener('click', () =>{
            dismissingEmployees(firedButton.id)
            
        })

        userDetails.append(username, companyName, firedButton)

        hiredEmployeesList.appendChild(userDetails)
    })
}

export async function viewDepartmentModal() {

    const modalController = document.querySelector('.modal__controller--view')

    const viewButtons = document.querySelectorAll('.visualization-icon__department')

    const departmentTitle = document.querySelector('.view-department_title')

    const departmentDescription = document.querySelector('.view-department_description')

    const companyName = document.querySelector('.view-department_company-name')
    
    const updateBody = {}
    
    viewButtons.forEach(button => {
        button.addEventListener('click', async (event)=> {
            event.preventDefault()
            modalController.showModal()
            const allCompanies = await getAllCompanies()

            const allOutOfWorkEmployees = await getAllOutOfWorkEmployeesRequest()
            
            selectOutOfWorkEmployees(allOutOfWorkEmployees)
           
            const departmentID = event.target.id
            
            let dptoId = departmentID.substring(16)

            const allDepartments = await getAllDepartmentsRequest()

            allDepartments.forEach(element => {
                if(dptoId === element.id){

                    departmentDescription.innerText = element.description
                    departmentTitle.innerText = element.name
                    
                    const matchedCompany = allCompanies.find(
                        (company) => company.id === element.company_id)
                        if(matchedCompany){
                            companyName.innerText = matchedCompany.name

                            const companyDptoEmployeesPromise = filterCompaniesByIdRequest(matchedCompany.id)

                            companyDptoEmployeesPromise.then(({ employees }) => {

                                const arrayWithName = replaceCompanyId(employees, matchedCompany)

                                createHiredEmployeesCards(arrayWithName)
                                console.log(arrayWithName)

                            })

                        }
                }
            })

            const select = document.querySelector('#select-view-modal')
                        
            const hireButton = document.querySelector('.hire-submit-button')
            
            hireButton.addEventListener('click', async (event)=> {
                event.preventDefault()

                let selectedElementId = select.options[select.selectedIndex].id
                
                updateBody['department_id'] = dptoId

                await hireEmployeeRequest(selectedElementId, updateBody)
            })

        })
    })
    closeViewDepartmentModal()
} 

function closeViewDepartmentModal() {
    const modalController = document.querySelector('.modal__controller--view')
    const closeButton = document.querySelector('.view-department_modal__close')

    closeButton.addEventListener('click', (evt)=> {
        evt.preventDefault()
        modalController.close()
    })
}

function replaceCompanyId(employees, matchedCompany) {
    return employees.map(employee => {

      const newEmployee = { ...employee }
      
      newEmployee.company_id = matchedCompany.name

      return newEmployee
    })
  }
