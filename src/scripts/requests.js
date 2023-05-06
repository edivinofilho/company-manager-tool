import { toast } from "./toast.js";

const token = JSON.parse(localStorage.getItem('@kenzieEmpresas:token'))
const baseUrl = 'http://localhost:3333'
const requestHeaders = {
    'Content-Type': 'Application/json',
    Authorization: `Bearer ${token}`
}

export const red = '#B80000';
export const green = '#006B00'

export async function getAllCategories() {
    const categories = await fetch(`${baseUrl}/categories/readAll`, {
        method: 'GET'
    })

    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else {
            const response = await res.json()
            // console.log(response)
            // toast(red, response.message)
        }
    })
    // console.log(categories)
    return categories
}

export async function getAllCompanies() {
    const companies = await fetch(`${baseUrl}/companies/readAll`,  {
        method: 'GET'
    })

    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else {
            const response = await res.json()
            // console.log(response)
            // toast(red, response.message)
        }
    })
    // console.log(companies)
    return companies
}

export async function getCompanyByCategoryName (categoryName) {
    const company = await fetch(`${baseUrl}/companies/readByCategory/${categoryName}`,  {
        method: 'GET'
    })

    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else {
            const response = await res.json()
            // console.log(response)
            // toast(red, response.message)
        }
    })
    // console.log(company)
    return company
}

export async function loginRequest(loginBody) {
    const token = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(loginBody)
    })
    .then (async (res)=> {
        if(res.ok) {
            const responseJson = await res.json()
            const {authToken, isAdm} = responseJson

            localStorage.setItem('@kenzieEmpresas:token', JSON.stringify(authToken))
            localStorage.setItem('@kenzieEmpresas:isAdm', JSON.stringify(isAdm))

            toast(green, 'Login realizado com sucesso')

            setTimeout(() => {
                if(isAdm === true) {
                    location.replace('./adminDashboard.html')

                } else {
                    location.replace('./userDashboard.html')
                }
              }, 2000)
        } else {
            const responseJson = await res.json()

            toast(red, responseJson.message)
        }
    })
    return token
}

export async function createUserRequest(userData) {
    const userDetails = await fetch(`${baseUrl}/employees/create`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(userData)
    }) 
    .then(async (res) => {
        if(res.ok) {
          toast(green, 'User criado com sucesso')
            
          setTimeout(() => {
            location.replace('./login.html')
          }, 2000)

          return res.json()
        } else {
          const response = await res.json()
    
          toast(red, response.message)
        }
      })
    
      return userDetails
}