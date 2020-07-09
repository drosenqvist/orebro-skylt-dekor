const init = () => {
  getJson()
}

const renderEmployees = (jsonResponse) => {
  const employeeContainer = document.querySelector('.container'),
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
    phone.textContent = employee.phone
    email.textContent = employee.email

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

  const imageContainer = document.querySelector('.modal-container'),
        modalHolder = document.querySelector('.modal-holder'),
        modal = document.createElement('img')

  modalHolder.className = 'modal-holder-active'
  imageContainer.className = 'modal-container-active'
  modal.src = index.src

  // Increase size of smaller images
  if (index.height < 300) {
    imageContainer.classList.add('big-modal-image')
  }

  imageContainer.appendChild(modal)

  imageModalControl(imageContainer, modalHolder)
}


const imageModalControl = (imageContainer, modalHolder) => {
  const closeModal = document.querySelector('.close-modal-container'),
        image = document.querySelector('.modal-container-active').children[1]

  const close = () => {
    image.remove()
    imageContainer.className = 'modal-container'
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
            if (category.checked === true) {
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