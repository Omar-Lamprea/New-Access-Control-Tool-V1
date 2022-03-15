function searchInput(){
  const searchUser = document.getElementById('searchUser')
  let typingtimer = null;

  searchUser.addEventListener('keyup', e =>{

    if(e.key === 'Escape'){
      e.target.value = ''
      // search('A')
    } 
    if(e.key === "Enter") search(e.target.value);
  
    if(e.target.value === ''){
      search('A')
    }else{
      clearTimeout(typingtimer)
      typingtimer = setTimeout(() => {
        search(e.target.value)
        clearTimeout(typingtimer)
      }, 1000);
    }
  })
}