fetch('./content.json').then(response => {
  return response.json()
}).then(data => {
  renderEmployees(data)
})

const renderEmployees = (data) => {
  const employeeContainer = document.querySelector('.employee-container'),
        employeeList = data.employees

  employeeList.forEach(function(employee) {
    const currentEmployee = {
          image: document.createElement('img'),
          h3: document.createElement('h3'),
          position: document.createElement('span'),
          phone: document.createElement('span'),
          email: document.createElement('span')
    }

    currentEmployee.image.src = employee.image
    currentEmployee.h3.textContent = employee.name
    currentEmployee.position.textContent = employee.position

    if (employee.phone) {
      currentEmployee.phone.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="phone" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="7" y="4" width="10" height="16" rx="1" /><line x1="11" y1="5" x2="13" y2="5" /><line x1="12" y1="17" x2="12" y2="17.01" /></svg>` + employee.phone
    }

    if (employee.email) {
      currentEmployee.email.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="email" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></svg>` + employee.email
    }

    const container = document.createElement('div'),
          keys = Object.keys(currentEmployee)
          
    keys.forEach(function(key) {
      container.appendChild(currentEmployee[key])
    })

    employeeContainer.appendChild(container)
  })
}