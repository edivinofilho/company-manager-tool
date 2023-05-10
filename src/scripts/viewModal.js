import { getAllOutOfWorkEmployeesRequest, hireEmployeeRequest, filterCompaniesByIdRequest, getAllDepartmentsRequest, getAllCompanies, dismissingEmployees } from './requests.js'

function selectOutOfWorkEmployees(array) {
    const select = document.querySelector('#select-view-modal')
    
    array.forEach(user => {
        const option = document.createElement('option')
        option.id = user.id 
        option.value = user.name
        option.innerText = user.name
        
        select.appendChild(option)
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

        firedButton.addEventListener('click', () =>{
            dismissingEmployees(firedButton.id)
            console.log(firedButton.id)
        })

        userDetails.append(username, companyName, firedButton)

        hiredEmployeesList.appendChild(userDetails)
    })
}

const allDepartments = await getAllDepartmentsRequest()

const allCompanies = await getAllCompanies()

const arrayWithCompanyNames = getArraywithCompanyName(allDepartments)

export async function viewDepartmentModal() {
    const modalController = document.querySelector('.modal__controller--view')

    const viewButtons = document.querySelectorAll('.visualization-icon__department')

    const departmentTitle = document.querySelector('.view-department_title')

    const departmentDescription = document.querySelector('.view-department_description')

    const companyName = document.querySelector('.view-department_company-name')
    
    const allOutOfWorkEmployees = await getAllOutOfWorkEmployeesRequest()
    
    selectOutOfWorkEmployees(allOutOfWorkEmployees)
    
    const updateBody = {}
    
    viewButtons.forEach(button => {
        button.addEventListener('click', async (event)=> {
            event.preventDefault()
            modalController.showModal()
            
            const departmentID = event.target.id
            
            let dptoId = departmentID.substring(16)

            allDepartments.forEach(element => {
                if(dptoId === element.id){
                    const companyById =  filterCompaniesByIdRequest(element.company_id)

                    companyById.then(async function (result) {
                        const id = result.id

                        const companyDetails = await filterCompaniesByIdRequest(id)

                        const arrayWithCompanyName = getArraywithCompanyName(companyDetails.employees)
                        
                        console.log(arrayWithCompanyName)

                        createHiredEmployeesCards(arrayWithCompanyName)

                    })

                }
            })

            arrayWithCompanyNames.forEach(department => {

                if(department.id === dptoId){
                    departmentTitle.innerText = department.name

                    departmentDescription.innerText = department.description

                    companyName.innerText = department.company_id

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

function getArraywithCompanyName(array) {
    const departments = array;

    const companyByNameArray = departments.map(department => {
        const matchingCompany = allCompanies.find(company => company.id === department.company_id)

        if(matchingCompany){
            return {
                ...department,
                company_id: matchingCompany.name
            }
        }
    })
    return companyByNameArray
}

