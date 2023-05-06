import { toast } from "./toast.js";
import { getAllCategories, getAllCompanies, getCompanyByCategoryName } from "./requests.js";

const allCategories = await getAllCategories()

//function authentication(){}

function selectCategory(array) {
    const select = document.querySelector('#select')
    
    array.forEach(category => {
        const option = document.createElement('option')
        option.id = category.id 
        option.value = category.name
        option.innerText = category.name
        
        select.appendChild(option)
        // console.log(option.id)
    })
}

selectCategory(allCategories)

function filterCompaniesByCategory() {
    const select = document.querySelector('#select')

    select.addEventListener('change', async(event) => {
        const value = select.value
        const categoryName = event.target.value

        if(value === ''){
            const companies = await getAllCompanies()
            
            createCompanyCard(companies)
                                
        } else {
    
            const companiesByCategory = await getCompanyByCategoryName(categoryName)
            
            createCompanyCard(companiesByCategory)
        }
    })
}

filterCompaniesByCategory()

function createCompanyCard(array) {
    const companiesList = document.querySelector('.container__company-list')

    companiesList.innerHTML = ''

    array.forEach(element => {
        const companyCard = document.createElement('li')

        const companyName = document.createElement('h2')
        companyName.innerText = element.name

        const sector = document.createElement('span')
        sector.innerText = element.category_id

        companyCard.append(companyName, sector)
        companiesList.appendChild(companyCard)

        return companiesList
    })
}
