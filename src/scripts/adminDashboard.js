import{ toast } from './toast.js'
import { red, green, getAllCompanies, getAllDepartmentsRequest, getAllEmployeesRequest, filterCompaniesByIdRequest } from './requests.js'

function logOut() {
    const button = document.querySelector('.logout')

    button.addEventListener('click', () =>{

        toast(green, 'Até breve, estou fazendo seu logout!')
        
        setTimeout(() => {    
            location.replace('../../index.html')
        }, 3000)
    })
}

logOut()

const allCompanies = await getAllCompanies()
// console.log(allCompanies)

function selectCompany(array) {
    const select = document.querySelector('#select')
    
    array.forEach(company => {
        const option = document.createElement('option')
        option.id = company.id 
        option.value = company.name
        option.innerText = company.name
        
        select.appendChild(option)
    })
}

selectCompany(allCompanies)

function createDepartmentCard(array) {
    const departmentListContainer = document.querySelector('.department__container')

    departmentListContainer.innerHTML = ''

    array.forEach(element => {
        const departmentCard = document.createElement('li')

        const departmentDescriptionContainer = document.createElement('div')
        departmentDescriptionContainer.classList.add('department__description-container')

        const departmentName = document.createElement('h3')
        departmentName.innerText = element.name
        
        const departmentDescription = document.createElement('p')
        departmentDescription.innerText = element.description

        const companyName = document.createElement('p')
        companyName.innerText = element.company_id

        const iconsContainer = document.createElement('div')
        iconsContainer.classList.add('icons__container')

        const visualizationIcon = document.createElement('img')
        visualizationIcon.src = '../img/visualizar.svg'
        visualizationIcon.classList.add('visualization-icon')

        const editionIcon = document.createElement('img')
        editionIcon.src = '../img/editar.svg'
        editionIcon.classList.add('edition-icon')
        
        const deletionIcon = document.createElement('img')
        deletionIcon.src = '../img/deletar.svg'
        deletionIcon.classList.add('deletion-icon')

        departmentDescriptionContainer.append(departmentName, departmentDescription, companyName)

        iconsContainer.append(visualizationIcon, editionIcon, deletionIcon)

        departmentCard.append(departmentDescriptionContainer, iconsContainer)

        departmentListContainer.appendChild(departmentCard)

        return departmentCard
    })
}

const allDepartments = await getAllDepartmentsRequest()

// console.log(allDepartments)

function createAllDepartmentCards() {
    
    const departmentByCompanyName = allDepartments.map(department => {
        const company = allCompanies.find(company => company.id === department.company_id) 

        if (company) {
            return {
                ...department,
                company_id: company.name 
            }
        }
        return department
    })


   createDepartmentCard(departmentByCompanyName)
}

createAllDepartmentCards()

const allEmployees = await getAllEmployeesRequest()

function createUserCard(array) {
    const userCardContainer = document.querySelector('.user__container')

    userCardContainer.innerHTML = ''

    array.forEach(element => {
        const card = document.createElement('li')

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
        
        const deletionIcon = document.createElement('img')
        deletionIcon.src = '../img/deletar.svg'
        deletionIcon.classList.add('deletion-icon') 

        iconsContainer.append(editionIcon, deletionIcon)

        userDetails.append(userName, companyName)
        
        card.append(userDetails, iconsContainer)

        userCardContainer.appendChild(card)
    })
}

function createAllUserCards(array) {
    createUserCard(array)
}

createAllUserCards(allEmployees)

function filterCompanyById() {
    const select = document.querySelector('#select');

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
            message.innerText = `Empresa ${companyName} não possui departamentos`

            departmentList.append(message)
            
        } else {
            const departments = filteredCompany.departments;

            createDepartmentCard(departments)
            console.log(departments);
        }
      }
    });
  }

filterCompanyById()