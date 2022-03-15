localStorage.setItem('search', 'A')
async function search(letter){
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
  // console.log(data);
  const table = document.getElementById('table-users')
  data.forEach(user => {
    const row = `
    <tr class="">
      <td class="py-3 pe-1 px-lg-3">${user.displayName}</td>
      <td class="py-3 pe-1 px-lg-3">${user.mail}</td>
      <td class="py-3 pe-1 px-lg-3 text-center"><button>Details</button></td>
    </tr>
    `
    table.innerHTML += row
  });

  localStorage.setItem('count', table.children.length)
}
