function roleDetails(){
  let roleId;
  document.addEventListener('click', e =>{
    if(e.target.dataset.roleid) openRoleDetails(e.target.dataset.roleid);
    if(e.target.id === 'close-role-details') closeRoleDetails()
    if(e.target.dataset.activepermission) desactivatePermission(e.target.dataset.activepermission, roleId)
    if(e.target.dataset.aviablepermission) activatePermission(e.target.dataset.aviablepermission, roleId)


  })

  const tableContainer = document.getElementById('table-container')
  const details = document.getElementById('details-role')
  const loader = document.getElementById('loader')

  async function openRoleDetails(id){
    loader.classList.remove('d-none')
    const response = await fetch(`${urlRolesApi}/${id}`)
    if (response.ok) {

      tableContainer.classList.add('d-none')
      details.classList.remove('d-none')
      loader.classList.add('d-none')

      let content = await response.json()
      roleId = content.data.roleId
      let ulList = document.getElementById('ul-role-details')
      let ulInfoRole = document.getElementById('ul-info-roles')
      let ulAcvidePermission = document.getElementById('ul-active-permissions')
      let ulAviablePermission = document.getElementById('ul-aviable-permissions')


      const liInfoRole = `
        <li>Role name: <span> ${content.data.roleName}</span></li>
        <li>Role id: <span> ${content.data.roleId}</span></li>`
      ulInfoRole.innerHTML += liInfoRole

      let activePermission = []
      let aviablePermission = []
      content.data.persmisions.forEach(details => {

        details.isActive 
          ? activePermission.push(details)
          : aviablePermission.push(details)

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
            <i class="fa-solid fa-minus" data-activepermission="${prs.id}"></i>
          </span>
        </li>
        `
        // <li>name: <span>${prs.name}</span></li>
        // <li>id: <span>${prs.id}</span></li>
        // <li style="border-bottom: 1px solid rgb(197, 197, 197)">active: <span>${prs.isActive}</span></li>

        ulAcvidePermission.innerHTML += liActivePrs
      })

      aviablePermission.forEach(prs => {
        let liAviablePrs = `
          <li style="border-bottom: 1px solid rgb(197, 197, 197)" class="d-flex justify-content-between align-items-center">
            <p>
              ${prs.name}
            </p>
            <span>
              <i class="fa-solid fa-plus" data-aviablepermission="${prs.id}"></i>
            </span>
          </li>
        `
          // <li>name: <span>${prs.name}</span></li>
          // <li>id: <span>${prs.id}</span></li>
          // <li style="border-bottom: 1px solid rgb(197, 197, 197)">active: <span>${prs.isActive}</span></li>

        ulAviablePermission.innerHTML += liAviablePrs
      });
    }
  }
  
  //UPDATE PERMISSIONS
  async function desactivatePermission (prId, roleId){
    // console.log('des', prId, roleId);
    const desactivate = await fetch(`${urlRolesApi}/UpdateRolePermission`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
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
  async function activatePermission(prId, roleId){
    // console.log('act', prId, roleId);
    const activate = await fetch(`${urlRolesApi}/UpdateRolePermission`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
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
  function closeRoleDetails(){
    clearPermissions()
    tableContainer.classList.remove('d-none')
    details.classList.add('d-none')
  }
  function clearPermissions(){
    let ulInfoList = document.getElementById('ul-info-roles')
    let ulAcvidePermission = document.getElementById('ul-active-permissions')
    let ulAviablePermission = document.getElementById('ul-aviable-permissions')
  
    while(ulInfoList.firstChild){
      ulInfoList.removeChild(ulInfoList.firstChild)
    }
    while(ulAcvidePermission.firstChild){
      ulAcvidePermission.removeChild(ulAcvidePermission.firstChild)
    }
    while(ulAviablePermission.firstChild){
      ulAviablePermission.removeChild(ulAviablePermission.firstChild)
    }
  }

}
roleDetails()
