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