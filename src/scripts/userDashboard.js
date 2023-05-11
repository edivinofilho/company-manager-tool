import { toast } from "./toast.js"
import {green, getEmployeesProfileRequest, getDepartmentById, getAllCompanies } from "./requests.js"

function authentication() {
    const token = localStorage.getItem('@kenzieEmpresas:token')

    if(!token){
        location.replace('../../index.html')
    }
}

authentication()

function logOut() {
    const button = document.querySelector('.logout')

    button.addEventListener('click', () => {
        toast(green, 'Logging out')
        
        setTimeout(() => {
            location.replace('../../index.html')            
          }, 2000)
          localStorage.clear()
    })
}

logOut()

function userdetails(obj) {
    const allCompanies = getAllCompanies()
    const username = document.querySelector('.user-details__username')
    const userEmail = document.querySelector('.user-details__userEmail')
    
    const userCompanyDepartment = document.querySelector('.user-department__company-title > h2')
    
    const notHiredMsg = document.querySelector('.not-hired-message')
    const departmentDetails = document.querySelector('.user-department__container')
    const departmentCardsContainer = document.querySelector('.user-department__cards-container')

    allCompanies.then(function(array) {
        const companyName = array
        companyName.forEach(element => {
            if (obj.company_id === element.id){
                userCompanyDepartment.innerText = `${element.name}`
                console.log(element)
            }
        })
    })

    username.innerText = obj.name
    userEmail.innerText = obj.email

    if(obj.department_id !== null){
        notHiredMsg.classList.add('hidden')

        departmentCardsContainer.innerHTML = ''
        
        const departmentDataPromise = getDepartmentById(obj.department_id)

        departmentDataPromise.then(function(result) {
            const employees = result.employees
            departmentEmployeesCard(employees)
            console.log(employees)
        })


    } else {
        notHiredMsg.classList.remove('hidden')
        departmentDetails.classList.add('hidden')
    }

}

async function renderUserDetails() {
    const employeesProfile = await getEmployeesProfileRequest()
    userdetails(employeesProfile)
}

renderUserDetails()

function departmentEmployeesCard(array) {
    const departmentContainer = document.querySelector('.user-department__container')

    const departmentCardsContainer = document.querySelector('.user-department__cards-container')

    array.forEach(element=> {

        const card = document.createElement('li')
        card.classList.add('user-department__card')
    
        const employeeName = document.createElement('p')
        employeeName.innerText = element.name
        
        card.append(employeeName)
    
        departmentCardsContainer.append(card)
    })


    departmentContainer.appendChild(departmentCardsContainer)
}
