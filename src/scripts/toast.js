// function e estilização do toast feitos com base nas aulas dadas por Rafael Bertoldo, instrutor da Kenzie Academy Brasil

export function toast(color, text) {
    const toastContainer = document.querySelector('.toast__container')
    const toastText = document.querySelector('.toast__container > p')

    toastContainer.classList.remove('hidden')

    toastText.innerText = text
    toastText.style = `color: ${color}`

    setTimeout(() => {
        toastContainer.classList.add('toast__fadeOut')
      }, 3000);
    
      setTimeout(() => {
        toastContainer.classList.remove('toast__fadeOut')
        toastContainer.classList.add('hidden')
      }, 3990)
}