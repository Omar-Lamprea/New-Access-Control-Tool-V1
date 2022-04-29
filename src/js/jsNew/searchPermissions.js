async function searchPermissions(){
  var url = new URL(SEARCHPERMISSIONAPI, AdminApiUrl)

  //Retrieve the Token
  let token2 = await NetGetToken();

  const response = await fetch(`${url.href}`, { headers: { "Apikey": token2 } })
  if (response.ok) {
    const content = await response.json()

    const loader = document.getElementById('loader')
    const table = document.getElementById('table-permissions')

    SetDisplayByElement(loader, 'none')
    content.data.query.forEach(permission => {
      const row = `
      <div class="table-body d-flex justify-content-between">
        <p class="py-1 pe-1 px-lg-3">${permission.normalizedName}</p>
        <p class="py-1 pe-1 px-lg-3" style="width: 100%;">${permission.id}</p>
      </div>`
      table.innerHTML += row
    });
  }
}