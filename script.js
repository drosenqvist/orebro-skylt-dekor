const init = () => {
  getJson()
}

const renderEmployees = (jsonResponse) => {
  const employeeContainer = document.querySelector('.employee-container'),
        employeeList = jsonResponse.employees

  employeeList.forEach(function(employee) {
    const image = document.createElement('img'),
          h3 = document.createElement('h3'),
          position = document.createElement('span'),
          phone = document.createElement('span'),
          email = document.createElement('span')

    image.src = employee.image
    h3.textContent = employee.name
    position.textContent = employee.position

    if (employee.phone) {
      phone.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="phone" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="7" y="4" width="10" height="16" rx="1" /><line x1="11" y1="5" x2="13" y2="5" /><line x1="12" y1="17" x2="12" y2="17.01" /></svg>` + employee.phone
    }

    if (employee.email) {
      email.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="email" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></svg>` + employee.email
    }

    const container = document.createElement('div')

    container.appendChild(image)
    container.appendChild(h3)
    container.appendChild(position)
    container.appendChild(phone)
    container.appendChild(email)

    employeeContainer.appendChild(container)
  })
}


renderImages = (jsonResponse) => {
  const imageList = jsonResponse.images

  imageList.forEach(function (image) {
    const currentImage = document.createElement('img')
          currentImage.src = image.filnamn
          currentImage.className = 'modal'
          currentImage.classList.add(image.kategori)

          if (currentImage.classList[1] === 'skyltar') {
            currentImage.classList.add('checked')
          }

    const imageContainer = document.querySelector('.image-container')

    imageContainer.appendChild(currentImage)
  })

  imageFilter()
  imageModal()
}

const getJson = () => {
  const requestUrl = './content.json',
        request = new XMLHttpRequest()
  request.open('GET', requestUrl)

  request.responseType = 'json'
  request.send()

  request.onload = () => {
    const jsonResponse = request.response,
          path = window.location.pathname

    if (path === "/products.html") {
      renderImages(jsonResponse)
    } else {
      renderEmployees(jsonResponse)
    }
  }
}


const imageModal = () => {
  const images = document.querySelectorAll('.modal')

    images.forEach(function(index) {
      index.addEventListener('click', () => {
        imageHandler(index)
      })
    })
  }


const imageHandler = (index) => {
  // Functionality unnecessary on mobile, thus we break it
  if (this.innerWidth < 660) {
    return false
  }

  const modalHolder = document.querySelector('.modal-holder'),
        modal = document.createElement('img')

  modalHolder.className = 'modal-holder-active'
  modal.src = index.src

  modalHolder.appendChild(modal)

  imageModalControl(modalHolder)
}


const imageModalControl = (modalHolder) => {
  const closeModal = document.querySelector('.close-modal'),
        image = document.querySelector('.modal-holder-active').children[1]

  const close = () => {
    image.remove()
    modalHolder.className = 'modal-holder'
  }

  document.addEventListener('keydown', e => {
    if (e.keyCode === 27) {
      close()
    }
  })
  
  modalHolder.addEventListener('click', e => {
    if (e.path[0] != modalHolder) {
      return false
    } else {
      close()
    }
  })

  closeModal.addEventListener('click', () => {
    close()
  })
}


const imageFilter = () => {
  const categories = document.getElementsByName('category')
        categories[0].checked = true

        categories.forEach(function(category) {
          category.addEventListener('click', () => {
            if (category.checked) {
              matchWithImages(category)
            }
          })
        })

  const matchWithImages = (category) => {
    const images = document.querySelectorAll('.modal')
          images.forEach(function(image) {
            if (image.classList[1] === category.id) {
              image.classList.add('checked')
            } else {
              image.classList.remove('checked')
            }
          })
  }
}


init()