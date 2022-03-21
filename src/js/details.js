document.addEventListener('click', e =>{
  if(e.target.dataset.id) openDetails(e.target.dataset.id);
  if(e.target.id === 'close-user-details') closeUserDetails()
})


const tableContainer = document.getElementById('table-container')
const details = document.getElementById('details-user')

async function openDetails(id){
  const getUser = await fetch(`${urlApi}/${id}`)
  if (getUser.ok) {
    tableContainer.classList.add('d-none')
    details.classList.remove('d-none')

    const content = await getUser.json()

    const ulList = document.getElementById('ul-user-details')
    const contentDetails = content.data.userGraph
    const roles = content.data.query

    

    for (const key in contentDetails) {
        const element = contentDetails[key];
        if (element !== null && element.length > 0) {
          const li = `
            <li>
              ${key.toUpperCase()}: <span>${element}</span>
            </li>`
          ulList.innerHTML += li
        }
    }

    showRoles(roles)

  }
}


function showRoles(roles){
  const activeRoles = []
  const aviableRoles= []
  const ulActiveRoles = document.getElementById('ul-active-roles')
  const ulAviableRoles = document.getElementById('ul-aviable-roles')

    roles.forEach(role => {
      role.isActive ? activeRoles.push(role) : aviableRoles.push(role)
    });

    console.log(activeRoles);
    console.log(aviableRoles);

    if (activeRoles.length > 0) {
      activeRoles.forEach(active => {
        const li = `
        <li>
          <p>
            ${active.roleName}
          </p>
          <span>
            <i class="fa-solid fa-minus"></i>
          </span>
        </li>`
        ulActiveRoles.innerHTML += li
      });
    }else{
      ulActiveRoles.innerHTML = `<li>no hay roles activos</li>`
    }

    if (aviableRoles.length > 0) {
      aviableRoles.forEach(aviable => {
        const li = `
        <li>
          <p>
            ${aviable.roleName}
          </p>
          <span>
            <i class="fa-solid fa-plus"></i>
          </span>
        </li>`
        ulAviableRoles.innerHTML += li
      });
    }else{
      ulAviableRoles.innerHTML = `<li>no hay roles disponibles</li>`
    }
}

function closeUserDetails(){
  const ulList = document.getElementById('ul-user-details')
  const ulActiveRoles = document.getElementById('ul-active-roles')
  const ulAviableRoles = document.getElementById('ul-aviable-roles')

  while(ulList.firstChild){
    ulList.removeChild(ulList.firstChild)
  }
  while(ulActiveRoles.firstChild){
    ulActiveRoles.removeChild(ulActiveRoles.firstChild)
  }
  while(ulAviableRoles.firstChild){
    ulAviableRoles.removeChild(ulAviableRoles.firstChild)
  }

  tableContainer.classList.remove('d-none')
  details.classList.add('d-none')
}
