import { editUserDetailsRequest, red, green, getAllEmployeesRequest, getAllCompanies } from './requests.js'
import { toast } from './toast.js'
import { createUserCard, createAllUserCards } from './adminDashboard.js'

export async function showEditModal() {
    const modalController = document.querySelector('.modal__controller--edit')

    const inputs = document.querySelectorAll('.edit_modal__container > .add__input')

    const editButtons = document.querySelectorAll('.edition-icon')

    const submitButton = document.querySelector('.submit-edit-button')
    
    const updateBody = {}
    let count = 0

    editButtons.forEach(button => {
        button.addEventListener('click',(event) => {
            event.preventDefault()
            modalController.showModal()

            submitButton.addEventListener('click', async (evt) => {
                evt.preventDefault()

                inputs.forEach(({value, name}) => {
                    if(value.trim() === ''){
                        count++
                    }
                    updateBody[name] = value

                })

                console.log(updateBody)

                if(count !== 0){
                    count = 0
                    toast(red, 'Por favor preencha todos os campos') 
                } else {
                    let idElement = event.target.id
                
                    let id = idElement.substring(10)

                    await editUserDetailsRequest(id, updateBody)

                    toast(green, 'Dados do usuário atualizado com sucesso')
                    
                    
                    inputs.forEach(input=> {
                        input.value = ''
                    })

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

                    modalController.close()
                }
            }) 
        })
    })
    closeEditModal()
}

function closeEditModal() {
    const modalController = document.querySelector('.modal__controller--edit')
    const closeButton = document.querySelector('.edit_modal__close')

    closeButton.addEventListener('click', ()=> {
        modalController.close()
    })
}