import{ toast } from './toast.js'
import { red, green, getAllCompanies, getAllDepartmentsRequest, getAllEmployeesRequest, filterCompaniesByIdRequest } from './requests.js'

import { showDeleteModal } from './deleteUserModal.js'

import { showEditModal } from './editUserModal.js'

import { showCreateDepartmentModal } from './createDepModal.js'

import { showDeleteDepartmentModal } from './deleteDepModal.js'

import { showEditDepartmentModal } from './editDepModal.js'

import { viewDepartmentModal } from './viewModal.js'

function authentication() {
    const token = JSON.parse(localStorage.getItem('@kenzieEmpresas:token'))

    const isAdm = JSON.parse(localStorage.getItem('@kenzieEmpresas:isAdm'))

    if(token){
        if(!isAdm){
            location.replace('./userDashboard.html')
        } 
    } else {
        location.replace('../../index.html')
    }
}

authentication()


function logOut() {
    const button = document.querySelector('.logout')

    button.addEventListener('click', () =>{

        toast(green, 'Até breve, estou fazendo seu logout!')

        localStorage.clear()
        
        setTimeout(() => {    
            location.replace('../../index.html')
        }, 3000)
    })
}

logOut()

export function selectCompany(array) {
    const select = document.querySelector('.select')
    
    array.forEach(company => {
        const option = document.createElement('option')
        option.id = company.id 
        option.value = company.name
        option.innerText = company.name
        
        select.appendChild(option)
    })
}

async function renderSelectCompany() {
    const allCompanies = await getAllCompanies()
    selectCompany(allCompanies)
}

renderSelectCompany()

export function createDepartmentCard(array) {
    const departmentListContainer = document.querySelector('.department__container')

    departmentListContainer.innerHTML = ''

    array.forEach(element => {
        const departmentCard = document.createElement('li')
        departmentCard.id = `department-${element.id}`
        departmentCard.dataset.name = element.name
        departmentCard.classList.add('department-card__container')

        const departmentDescriptionContainer = document.createElement('div')
        departmentDescriptionContainer.classList.add('department__description-container')

        const departmentName = document.createElement('h3')
        departmentName.classList.add('department_name')
        departmentName.innerText = element.name
        
        const departmentDescription = document.createElement('p')
        departmentDescription.classList.add('department_description')
        departmentDescription.innerText = element.description

        const companyName = document.createElement('p')
        companyName.innerText = element.company_id
        companyName.classList.add('company_name')

        const iconsContainer = document.createElement('div')
        iconsContainer.classList.add('icons__container')

        const visualizationIcon = document.createElement('img')
        visualizationIcon.src = '../img/visualizar.svg'
        visualizationIcon.classList.add('visualization-icon__department')
        visualizationIcon.dataset.name = element.name
        visualizationIcon.id = `department-view-${element.id}`

        const editionIcon = document.createElement('img')
        editionIcon.src = '../img/editar.svg'
        editionIcon.classList.add('edition-icon__department')
        editionIcon.dataset.name = element.name
        editionIcon.id = `department-edit-${element.id}`
        
        const deletionIcon = document.createElement('img')
        deletionIcon.src = '../img/deletar.svg'
        deletionIcon.classList.add('deletion-icon__department')
        deletionIcon.dataset.name = element.name
        deletionIcon.id = `department-delete-${element.id}`

        departmentDescriptionContainer.append(departmentName, departmentDescription, companyName)

        iconsContainer.append(visualizationIcon, editionIcon, deletionIcon)

        departmentCard.append(departmentDescriptionContainer, iconsContainer)

        departmentListContainer.appendChild(departmentCard)

        return departmentCard
    })

    showDeleteDepartmentModal()
    showEditDepartmentModal()
    viewDepartmentModal()
}

export async function createAllDepartmentCards() {
    const allCompanies = await getAllCompanies()
    const allDepartments = await getAllDepartmentsRequest()

    const departmentByCompanyName = allDepartments.map(department => {
        const company = allCompanies.find(company => company.id === department.company_id) 
        
        if (company) {
            return {
                ...department,
                company_id: company.name 
            }
        }
        console.log(department)
        return department
    })

    createDepartmentCard(departmentByCompanyName)

}

createAllDepartmentCards()

export function createUserCard(array) {
    const userCardContainer = document.querySelector('.user__container')

    userCardContainer.innerHTML = ''

    array.forEach(element => {
        const card = document.createElement('li')
        card.id = `user-card-${element.id}`
        card.classList.add('user-card__container')

        const userDetails = document.createElement('div')

        const userName = document.createElement('h3')
        userName.innerText = element.name

        const companyName = document.createElement('p')
        companyName.innerText = element.company_id

        const iconsContainer = document.createElement('div')
        iconsContainer.classList.add('icons__container')

        const editionIcon = document.createElement('img')
        editionIcon.src = '../img/editar.svg'
        editionIcon.classList.add('edition-icon')
        editionIcon.dataset.name = element.name
        editionIcon.id = `edit-icon-${element.id}`
        
        const deletionIcon = document.createElement('img')
        deletionIcon.src = '../img/deletar.svg'
        deletionIcon.classList.add('deletion-icon')
        deletionIcon.dataset.name = element.name
        deletionIcon.id = `delete-icon-${element.id}` 

        iconsContainer.append(editionIcon, deletionIcon)

        userDetails.append(userName, companyName)
        
        card.append(userDetails, iconsContainer)

        userCardContainer.appendChild(card)
    })
    showEditModal()
    showDeleteModal()
}

export async function createAllUserCards() {
    const allEmployees = await getAllEmployeesRequest()
    const allCompanies = await getAllCompanies()
    const userWithCompanyName = allEmployees.map(user => {
        const company = allCompanies.find(company => company.id === user.company_id) 

        if (company) {
            return {
                ...user,
                company_id: company.name 
            }
        }
        return user
    })
    createUserCard(userWithCompanyName)
}

createAllUserCards()

async function filterCompanyById() {
    const allCompanies = await getAllCompanies()

    const select = document.querySelector('.select');

    const departmentList = document.querySelector('.department__container')

    select.addEventListener('change', async (event) => {
      const value = select.value;
      const option = select.selectedOptions[0]; 
      const companyName = option.innerText; 
  
      if (value === '') {
        createAllDepartmentCards();

      } else {
        const companyId = option.id; 

        const filteredCompany = await filterCompaniesByIdRequest(companyId);

        if (filteredCompany.departments.length === 0) {

            departmentList.innerHTML = ''

            const message = document.createElement('p')
            message.classList.add('no-department-message')
            message.innerText = `Empresa ${companyName} não possui departamentos`

            departmentList.append(message)
            
        } else {
            const departments = filteredCompany.departments;

            const companyByNameArray = departments.map(department => {
                const matchingCompany = allCompanies.find(company => company.id === department.company_id)

                if(matchingCompany){
                    return {
                        ...department,
                        company_id: matchingCompany.name
                    }
                }
            })

            createDepartmentCard(companyByNameArray)
            console.log(departments);
        }
      }
    });
  }

filterCompanyById()
showCreateDepartmentModal()
showDeleteDepartmentModal()
showEditDepartmentModal()
viewDepartmentModal()