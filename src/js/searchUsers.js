

localStorage.setItem('search', 'A')

function searchUsers(key){
  const searchUser = document.getElementById('searchUser')
  let typingtimer = null;

  let getUsers;
  let getUsersByStartLetter
  key.value ? getUsers = key.value : key.id ? getUsers = key.id : getUsers = key
  pagination(getUsers)
  SetDisplayByElement(loader, 'block');
  search(getUsers).then(response => { SetDisplayByElement(loader, 'none') })
}

async function search(text) {

  //Retrieve the Token
  let token2 = await NetGetToken();

  var url = new URL(USERAPI, AdminApiUrl)
  var url2 = new URL(`${USERAPI}?search="displayName:${text}"&filter=startswith(displayName,'${text}')`, AdminApiUrl)

  text.length > 0 ?
      getUsersByStartLetter = await (fetch(url2.href, { headers: { "Apikey": token2 } })): //`${urlApi}/?search="displayName:${getUsers}"&filter=startswith(displayName,'${getUsers}')`)):
      getUsersByStartLetter = await (fetch(url.href, { headers: { "Apikey": token2 } }))
 
  closeUserDetails()
  let table = document.getElementById('table-users')

  for (let i = localStorage.getItem('count'); i > 0; i--) {
      if (table.children[i] !== undefined) {
          table.removeChild(table.children[i])
      }
  }

  if (!(getUsersByStartLetter == null) && getUsersByStartLetter.ok) {
      let content = await getUsersByStartLetter.json()

      showUsers(content.data)
  }
}



const showUsers = (data)=>{
  const table = document.getElementById('table-users')

  if (data.length > 0) {
    data.forEach(user => {
      const row = `
      <div class="table-body d-flex justify-content-between">
        <p class="py-1 pe-1 px-lg-3">${user.displayName}</p>
        <p class="py-1 pe-1 px-lg-3">${user.mail}</p>
        <p class="py-1 pe-1 px-lg-3 justify-content-center">
          <button data-id="${user.id}">Details</button>
        </p>
      </div>`
      table.innerHTML += row
    });
  
    localStorage.setItem('count', table.children.length)
  }else{
    table.innerHTML += `
      <div class='text-center mt-5'><h5>We didn't find any results</h5></div>`
  }
}