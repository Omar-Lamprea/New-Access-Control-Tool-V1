// Juntar el script en una funcion puede ser util para poder activarlo solo en la pagina deseada
// En Blazor no esta la posibilidad de ejecutar scripts especificos para cada pagina, 
// por lo que en ese caso es mejor manejarlo como una libreria general.
// Todos los event listeners fueron movidos a un archivo consolidado.


let roleMainContainer = document.getElementById('role-main')

//let loader = document.getElementById('loader')
let adminRole = document.getElementById('addRole')
let roledetails = document.getElementById('details-role')

async function openRoleDetails(id) {
    var url = new URL(SEARCHROLEAPI, AdminApiUrl)

    //Retrieve the Token
    let token2 = await NetGetToken();

    loader.classList.remove('d-none')
    const response = await fetch(`${url.href}/${id}`, { headers: { "Apikey": token2 } })
    if (response.ok) {

        roleMainContainer.classList.add('d-none')
        roledetails.classList.remove('d-none')
        loader.classList.add('d-none')

        adminRole.classList.remove('d-lg-flex')
        adminRole.classList.add('d-none')


        let content = await response.json()
        roleId = content.data.roleId
        let ulList = document.getElementById('ul-role-details')
        let ulInfoRole = document.getElementById('ul-info-roles')
        let ulActivePermission = document.getElementById('ul-active-permissions')
        let ulAvailablePermission = document.getElementById('ul-available-permissions')


        const liInfoRole = `
        <li>Role name: <span> ${content.data.roleName}</span></li>
        <li>Role id: <span> ${content.data.roleId}</span></li>`
        ulInfoRole.innerHTML += liInfoRole

        let activePermission = []
        let availablePermission = []
        content.data.persmisions.forEach(details => {

            details.isActive
                ? activePermission.push(details)
                : availablePermission.push(details)

            // let li = `
            //   <li>name: <span>${details.name}</span></li>
            //   <li>id: <span>${details.id}</span></li>
            //   <li style="border-bottom: 1px solid grey">active: <span>${details.isActive}</span></li>
            //   `
            // ulList.innerHTML += li
        });
        activePermission.forEach(prs => {
            let liActivePrs = `
        <li style="border-bottom: 1px solid rgb(197, 197, 197)" class="d-flex justify-content-between align-items-center">
          <p>
            ${prs.name}
          </p>
          <span>
            <i class="oi oi-minus" data-activepermission="${prs.id}"></i>
          </span>
        </li>
        `
            // <li>name: <span>${prs.name}</span></li>
            // <li>id: <span>${prs.id}</span></li>
            // <li style="border-bottom: 1px solid rgb(197, 197, 197)">active: <span>${prs.isActive}</span></li>

            ulActivePermission.innerHTML += liActivePrs
        })

        availablePermission.forEach(prs => {
            let liAviablePrs = `
          <li style="border-bottom: 1px solid rgb(197, 197, 197)" class="d-flex justify-content-between align-items-center">
            <p>
              ${prs.name}
            </p>
            <span>
              <i class="oi oi-plus" data-aviablepermission="${prs.id}"></i>
            </span>
          </li>
        `
            // <li>name: <span>${prs.name}</span></li>
            // <li>id: <span>${prs.id}</span></li>
            // <li style="border-bottom: 1px solid rgb(197, 197, 197)">active: <span>${prs.isActive}</span></li>

            ulAvailablePermission.innerHTML += liAviablePrs
        });
    }
}

//UPDATE PERMISSIONS
async function desactivatePermission(prId, roleId) {
    // console.log('des', prId, roleId);
    var url = new URL(SEARCHROLEAPI, AdminApiUrl)
    //Retrieve the Token
    let token2 = await NetGetToken();

    const desactivate = await fetch(`${url.href}/UpdateRolePermission`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Apikey": token2
        },
        body: JSON.stringify({
            "roleId": roleId,
            "permissionId": prId,
            "action": "delete"
        })
    })
    if (desactivate.ok) {
        const content = await desactivate.json()
        clearPermissions()
        openRoleDetails(roleId)
    }
}

async function activatePermission(prId, roleId) {
    // console.log('act', prId, roleId);
    var url = new URL(SEARCHROLEAPI, AdminApiUrl)

    //Retrieve the Token
    let token2 = await NetGetToken();

    const activate = await fetch(`${url.href}/UpdateRolePermission`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Apikey": token2
        },
        body: JSON.stringify({
            "roleId": roleId,
            "permissionId": prId,
            "action": "insert"
        })
    })
    if (activate.ok) {
        const content = await activate.json()
        clearPermissions()
        openRoleDetails(roleId)
    }
}

//CLEAR DATA
function closeRoleDetails() {
    clearPermissions()
    roleMainContainer.classList.remove('d-none')
    roledetails.classList.add('d-none')

    adminRole.classList.add('d-lg-flex')
    adminRole.classList.remove('d-none')
}
function clearPermissions() {
    let ulInfoList = document.getElementById('ul-info-roles')
    let ulActivePermission = document.getElementById('ul-active-permissions')
    let ulAvailablePermission = document.getElementById('ul-available-permissions')

    while (ulInfoList.firstChild) {
        ulInfoList.removeChild(ulInfoList.firstChild)
    }
    while (ulActivePermission.firstChild) {
        ulActivePermission.removeChild(ulActivePermission.firstChild)
    }
    while (ulAvailablePermission.firstChild) {
        ulAvailablePermission.removeChild(ulAvailablePermission.firstChild)
    }
}