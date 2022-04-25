

const tableContainer = document.getElementById('table-container')
const details = document.getElementById('details-user')


async function openDetails(id){
  loader.classList.remove('d-none')
  var url = new URL(USERAPI, AdminApiUrl)

    //Retrieve the Token
    let token2 = await NetGetToken();

  const getUser = await fetch(`${url.href}/${id}`, { headers: { "Apikey": token2 } })
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
  const availableRoles= []
  const ulActiveRoles = document.getElementById('ul-active-roles')
  const ulAviableRoles = document.getElementById('ul-available-roles')

    roles.forEach(role => {
      role.isActive ? activeRoles.push(role) : availableRoles.push(role)
    });

    if (activeRoles.length > 0) {
      activeRoles.forEach(active => {
        const li = `
        <li style="border-bottom: 1px solid rgb(197, 197, 197)" class="d-flex justify-content-between align-items-center">
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

    if (availableRoles.length > 0) {
      availableRoles.forEach(available => {
        // console.log(aviable);
        const li = `
        <li style="border-bottom: 1px solid rgb(197, 197, 197)" class="d-flex justify-content-between align-items-center">
          <p>
            ${available.roleName}
          </p>
          <span>
            <i class="fa-solid fa-plus" data-availablerole="${available.roleId}"></i>
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
  var url = new URL(USERAPI, AdminApiUrl)

    //Retrieve the Token
    let token2 = await NetGetToken();

    const desactivate = await fetch(`${url.href}/UpdateUserRole/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type' : 'application/json',
      "Apikey": token2 
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
  var url = new URL(USERAPI, AdminApiUrl)

    //Retrieve the Token
    let token2 = await NetGetToken();

    const activate = await fetch(`${url.href}/UpdateUserRole/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type' : 'application/json',
      "Apikey": token2 
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
  const ulAvailableRoles = document.getElementById('ul-available-roles')

  while(ulActiveRoles.firstChild){
    ulActiveRoles.removeChild(ulActiveRoles.firstChild)
  }
  while(ulAvailableRoles.firstChild){
    ulAvailableRoles.removeChild(ulAvailableRoles.firstChild)
  }
}