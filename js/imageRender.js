const imageFilter = () => {
  const categories = document.getElementsByName('category')
        // Initialize the image render with the first category
        categories[0].checked = true
        getJson(categories[0])

        categories.forEach(function(category) {
          category.addEventListener('click', () => {
            // Clear out the parent element before rendering new images
            clear()

            getJson(category)
          })
        })
}

const clear = () => {
  const imageContainer = document.querySelector('.image-container')
        imageContainer.innerHTML = ''
}

const getJson = (category) => {
  fetch('./content.json').then(response => {
    return response.json()
  }).then(data => {
    data.images.forEach(function(image) {
      if (category.id === image.kategori) {
        render(image, image.filnamnStor)
      }
    })
  })
}



const render = (image, modalImage) => {
  const newImage = document.createElement('img')
        newImage.src = image.filnamn

  const imageContainer = document.querySelector('.image-container')
        imageContainer.appendChild(newImage)

  imageModal(newImage, image, modalImage)
}

const imageModal = (newImage, image, modalImage) => {
  newImage.addEventListener('click', () => {
    imageHandler(image, modalImage)
  })
}

const imageHandler = (image, modalImage) => {
  const modalHolder = document.querySelector('.modal-holder')
        modalHolder.className = 'modal-holder-active'
  
  const modal = document.createElement('img')
  modalImage ? modal.src = modalImage : modal.src = image.filnamn

  modalHolder.appendChild(modal)

  imageModalControl(modalHolder)
}

const imageModalControl = (modalHolder) => {
  const closeModalButton = document.querySelector('.close-modal'),
        image = document.querySelector('.modal-holder-active').children[1]

  const closeModal = () => {
    image.remove()
    modalHolder.className = 'modal-holder'
  }

  // Escape key listener
  document.addEventListener('keydown', e => {
    if (e.keyCode === 27) {
      closeModal()
    }
  })
  
  // Clicking anywhere outside of the image
  modalHolder.addEventListener('click', e => {
    if (e.path[0] === modalHolder) {
      closeModal()
    }
  })

  // Close button
  closeModalButton.addEventListener('click', () => {
    closeModal()
  })
}

imageFilter()