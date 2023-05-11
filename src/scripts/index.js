import { getAllCategories, getAllCompanies, getCompanyByCategoryName } from "./requests.js";

function authenticationAdmin() {
    const token = localStorage.getItem('@kenzieEmpresas:token')

    if(token){
        location.replace('./src/pages/adminDashboard.html')
    }
}
authenticationAdmin()

function loginPage() {
    const button = document.querySelector('.login')

    button.addEventListener('click', ()=> {
        location.replace('./src/pages/login.html')
    })
}

loginPage()

function registerPage() {
    const button = document.querySelector('.register')

    button.addEventListener('click', ()=> {
        location.replace('./src/pages/register.html')
    })
}

registerPage()

export function selectCategory(array) {
    const select = document.querySelector('#select')
    
    array.forEach(category => {
        const option = document.createElement('option')
        option.id = category.id 
        option.value = category.name
        option.innerText = category.name
        
        select.appendChild(option)
    })
}

async function renderSelect() {
    const allCategories = await getAllCategories()
    selectCategory(allCategories)
}

renderSelect()

async function createAllCompanyCards() {
    const allCategories = await getAllCategories()
    getAllCompanies().then(companies => {
      const companyCategory = companies.map(company => {
        const category = allCategories.find(category => category.id === company.category_id);
  
        if (category) {
          return {
            ...company,
            category_id: category.name
          };
        }
        return company;
      });
  
      createCompanyCard(companyCategory);
    });
}

createAllCompanyCards()

async function filterCompaniesByCategory() {
    const allCategories = await getAllCategories() 

    const select = document.querySelector('#select')

    select.addEventListener('change', async(event) => {
        const value = select.value
        const categoryName = event.target.value

        
        if(value === ''){
           createAllCompanyCards()
                                
        } else {   
            
            const companiesByCategory = await getCompanyByCategoryName(categoryName)
            
            const filteredCompanyCategory = companiesByCategory.map(company => {
                const category = allCategories.find(category => category.id === company.category_id)

                if(category) {
                    return {
                        ...company,
                        category_id: category.name
                    }
                }
                return company
            })

            createCompanyCard(filteredCompanyCategory)
        }
    })
}

filterCompaniesByCategory()

function createCompanyCard(array) {
    const companiesList = document.querySelector('.container__company-list')

    companiesList.innerHTML = ''

    array.forEach(element => {
        const companyCard = document.createElement('li')
        companyCard.classList.add('company-list-item')

        const companyName = document.createElement('h2')
        companyName.innerText = element.name

        const sector = document.createElement('span')
        sector.classList.add('company-list-item-sector')

        sector.innerText = element.category_id

        companyCard.append(companyName, sector)
        companiesList.appendChild(companyCard)

        return companyCard
    })
}