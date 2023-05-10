import { getAllCategories, getAllCompanies, getCompanyByCategoryName } from "./requests.js";

const allCategories = await getAllCategories()

function authentication() {
    const token = localStorage.getItem('@kenzieEmpresas:token')

    if(token){
        location.replace('./src/pages/adminDashboard.html')
    }
}

authentication()

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

selectCategory(allCategories)

function createAllCompanyCards() {
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

function filterCompaniesByCategory() {
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

        const companyName = document.createElement('h2')
        companyName.innerText = element.name

        const sector = document.createElement('span')

        sector.innerText = element.category_id

        companyCard.append(companyName, sector)
        companiesList.appendChild(companyCard)

        return companyCard
    })
}