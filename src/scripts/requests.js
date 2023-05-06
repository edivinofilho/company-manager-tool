import { toast } from "./toast.js";

const baseUrl = 'http://localhost:3333'
const red = '#B80000';
const green = '#006B00'

export async function getAllCategories() {
    const categories = await fetch(`${baseUrl}/categories/readAll`, {
        method: 'GET'
    })

    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else {
            const response = await res.json()
            console.log(response)
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
            console.log(response)
            // toast(red, response.message)
        }
    })
    console.log(companies)
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
            console.log(response)
            // toast(red, response.message)
        }
    })
    console.log(company)
    return company
}

