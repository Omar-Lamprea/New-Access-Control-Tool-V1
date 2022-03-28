let userId;
document.addEventListener('click', e =>{
  if(e.target.dataset.id) openDetails(e.target.dataset.id);
  if(e.target.id === 'close-user-details') closeUserDetails()
  if(e.target.dataset.activerole) desactivateRole(e.target.dataset.activerole, userId)
  if(e.target.dataset.aviablerole) activateRole(e.target.dataset.aviablerole, userId)
})


const tableContainer = document.getElementById('table-container')
const details = document.getElementById('details-user')
const loader = document.getElementById('loader')

async function openDetails(id){
  loader.classList.remove('d-none')
  
  const getUser = await fetch(`${urlApi}/${id}`)
  if (getUser.ok) {
    tableContainer.classList.add('d-none')
    loader.classList.add('d-none')
    details.classList.remove('d-none')

    const content = await getUser.json()

    const ulList = document.getElementById('ul-user-details')
    const contentDetails = content.data.userGraph
    const roles = content.data.query
    userId = contentDetails.id
    
    if (ulList.childElementCount < 1) {
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

    if (activeRoles.length > 0) {
      activeRoles.forEach(active => {
        const li = `
        <li>
          <p>
            ${active.roleName}
          </p>
          <span>
            <i class="fa-solid fa-minus" data-activerole="${active.roleId}"></i>
          </span>
        </li>`
        ulActiveRoles.innerHTML += li
      });
    }else{
      ulActiveRoles.innerHTML = `<li>no active roles</li>`
    }

    if (aviableRoles.length > 0) {
      aviableRoles.forEach(aviable => {
        // console.log(aviable);
        const li = `
        <li>
          <p>
            ${aviable.roleName}
          </p>
          <span>
            <i class="fa-solid fa-plus" data-aviablerole="${aviable.roleId}"></i>
          </span>
        </li>`
        ulAviableRoles.innerHTML += li
      });
    }else{
      ulAviableRoles.innerHTML = `<li>no roles available</li>`
    }
}





//update Roles
async function desactivateRole(roleId, userId){
  // console.log('des', roleId, 'userId:', userId);
  const desactivate = await fetch(`${urlApi}/UpdateUserRole/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      "roleId": roleId,
      "action": "delete"
    })
  })
  if (desactivate.ok) {
    const content = await desactivate.json()
    clearRoles()
    openDetails(userId)
  }
}

async function activateRole(roleId, userId){
  // console.log('act', roleId, 'userId:',userId);
  const activate = await fetch(`${urlApi}/UpdateUserRole/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      "roleId": roleId,
      "action": "insert"
    })
  })
  if (activate.ok) {
    const content = await activate.json()
    clearRoles()
    openDetails(userId)
  }
}

function closeUserDetails(){
  const ulList = document.getElementById('ul-user-details')

  while(ulList.firstChild){
    ulList.removeChild(ulList.firstChild)
  }

  clearRoles()
  tableContainer.classList.remove('d-none')
  details.classList.add('d-none')
}

function clearRoles(){

  const ulActiveRoles = document.getElementById('ul-active-roles')
  const ulAviableRoles = document.getElementById('ul-aviable-roles')

  while(ulActiveRoles.firstChild){
    ulActiveRoles.removeChild(ulActiveRoles.firstChild)
  }
  while(ulAviableRoles.firstChild){
    ulAviableRoles.removeChild(ulAviableRoles.firstChild)
  }
}