

async function searchRoles(){
  var url = new URL(SEARCHROLEAPI, AdminApiUrl)

  //Retrieve the Token
  let token2 = await NetGetToken();

  const response = await fetch(`${url.href}`, { headers: { "Apikey": token2 } })
  if (response.ok) {
    const content = await response.json()
    const loader = document.getElementById('loader')
    const table = document.getElementById('table-roles')

    loader.classList.add('d-none')
    content.data.query.forEach(role => {
      const row = `
      <div class="table-body d-flex justify-content-between">
        <p class="py-1 pe-1 px-lg-3">${role.roleName}</p>
        <p class="py-1 pe-1 px-lg-3">${role.roleId}</p>
        <p class="py-1 pe-1 px-lg-3 justify-content-center">
          <button data-roleid="${role.roleId}">Details</button>
        </p>
      </div>`
      table.innerHTML += row
    });
  }
}