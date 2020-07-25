fetch('./content.json').then(response => {
  return response.json()
}).then(data => {
  renderImages(data)
})

renderImages = (data) => {
  const imageList = data.images

  imageList.forEach(function (image) {
    const currentImage = document.createElement('img')
          currentImage.src = image.filnamn
          currentImage.classList.add(image.kategori)

          if (currentImage.classList[0] === 'skyltar') {
            currentImage.classList.add('checked')
          }

    const imageContainer = document.querySelector('.image-container')
          imageContainer.appendChild(currentImage)
  })

  imageModal()
  imageFilter()
}

const imageModal = () => {
  const images = document.querySelectorAll('.image-container > img')

    images.forEach(function(image) {
      image.addEventListener('click', () => {
        imageHandler(image)
      })
    })
  }

const imageHandler = (image) => {
  // Functionality unnecessary on mobile, thus we break it
  if (this.innerWidth < 660) {
    return false
  }

  const modalHolder = document.querySelector('.modal-holder'),
        modal = document.createElement('img')

  modalHolder.className = 'modal-holder-active'
  modal.src = image.src

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
            matchWithImages(category)
          })
        })

  const matchWithImages = (category) => {
    const images = document.querySelectorAll('.image-container > img')
          images.forEach(function(image) {
            if (image.classList[0] === category.id) {
              image.classList.add('checked')
            } else {
              image.classList.remove('checked')
            }
          })
  }
}