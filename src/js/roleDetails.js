function roleDetails(){
  document.addEventListener('click', e =>{
    if(e.target.dataset.roleid) openRoleDetails(e.target.dataset.roleid);
    if(e.target.id === 'close-role-details') closeRoleDetails()

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

      const content = await response.json()
      const ulList = document.getElementById('ul-role-details')
      const ulInfoRole = document.getElementById('ul-info-roles')
      
      const liInfoRole = `
        <li>Role name: <span> ${content.data.roleName}</span></li>
        <li>Role id: <span> ${content.data.roleId}</span></li>`
      ulInfoRole.innerHTML += liInfoRole

      content.data.persmisions.forEach(details => {
        const li = `
          <li>name: <span>${details.name}</span></li>
          <li>id: <span>${details.id}</span></li>
          <li style="border-bottom: 1px solid grey">active: <span>${details.isActive}</span></li>
          `
        ulList.innerHTML += li
      });
    }
  }

  function closeRoleDetails(){
    const ulList = document.getElementById('ul-role-details')
    const ulInfoList = document.getElementById('ul-info-roles')

    while(ulInfoList.firstChild){
      ulInfoList.removeChild(ulInfoList.firstChild)
    }

    while(ulList.firstChild){
      ulList.removeChild(ulList.firstChild)
    }

    tableContainer.classList.remove('d-none')
    details.classList.add('d-none')
  }
}
roleDetails()