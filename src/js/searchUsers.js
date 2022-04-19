localStorage.setItem('search', 'A')

async function search(key) {

  SetDisplayById('loader', 'block');

  let getUsers;
  let getUsersByStartLetter
  key.value ? getUsers = key.value : key.id ? getUsers = key.id : getUsers = key

  //Retrieve the Token
  let token2 = await NetGetToken();

  var url = new URL(USERAPI, AdminApiUrl)
  var url2 = new URL(`${USERAPI}?search="displayName:${getUsers}"&filter=startswith(displayName,'${getUsers}')`, AdminApiUrl)

  getUsers.length > 0 ?
      getUsersByStartLetter = await (fetch(url2.href, { headers: { "Apikey": token2 } })): //`${urlApi}/?search="displayName:${getUsers}"&filter=startswith(displayName,'${getUsers}')`)):
      getUsersByStartLetter = await (fetch(url.href, { headers: { "Apikey": token2 } }))
  pagination(getUsers)

  closeUserDetails()
  let table = document.getElementById('table-users')

  for (let i = localStorage.getItem('count'); i > 0; i--) {
      if (table.children[i] !== undefined) {
          table.removeChild(table.children[i])
      }
  }

  SetDisplayById('loader', 'none');
  if (!(getUsersByStartLetter == null) && getUsersByStartLetter.ok) {
      let content = await getUsersByStartLetter.json()

      showUsers(content.data)
  }
}

async function search_old(letter){
  closeUserDetails()
  const loader = document.getElementById('loader')
  const table = document.getElementById('table-users')

  loader.classList.remove('d-none')
  
  for (let i = localStorage.getItem('count'); i > 0; i--) {
    if (table.children[i] !== undefined) {
      table.removeChild(table.children[i])
    }
  }

  let getUsers;
  letter.id ? getUsers = letter.id : getUsers = letter

  const alphabetList = document.getElementsByClassName('btn-search')
  for (let i = 0; i < alphabetList.length; i++) {
    if (getUsers.length === 1) {
      alphabetList[i].classList.contains('active-search') 
        ? alphabetList[i].classList.remove('active-search') 
        : false

      const btnEl = document.getElementById(getUsers)
      btnEl.classList.add('active-search')
    }
  }


  const getUsersByStartLetter = await(fetch(`${urlApi}/?search="displayName:${getUsers}"&filter=startswith(displayName,'${getUsers}')`))
  if (getUsersByStartLetter.ok) {
    const content = await getUsersByStartLetter.json()
    
    loader.classList.add('d-none')
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