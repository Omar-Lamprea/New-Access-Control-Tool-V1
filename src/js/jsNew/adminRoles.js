function adminRoles(){
  let btnAddRole = document.getElementById('btnAddRole')
  let btnSetRole = document.getElementById('btnSetRole')

  let roleName = document.getElementById('roleName')
  let roleId = document.getElementById('roleId')
  let setRoleName = document.getElementById('setRoleName')

  // roleName.addEventListener('keyup',e =>{
  //   e.target.value === '' 
  //     ? btnAddRole.setAttribute('disabled', '')
  //     : btnAddRole.removeAttribute('disabled', '')
  // })

  btnAddRole.addEventListener('click', async e =>{
    let textAddResponse = document.getElementById('textAddResponse')
    if (roleName.value) {
      let loader = document.getElementById('loader-newRole')
      loader.classList.remove('d-none')

      let response = await fetch(`${urlRolesApi}/CreateRole`,{
        method : "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          "name": roleName.value,
          "status" : true
        })
      })
      if (response.ok) {
        loader.classList.add('d-none')
        textAddResponse.style.color = '#425AC1'
        textAddResponse.innerText = 'Created role!'

        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }else{
        console.error(response.status);
        textAddResponse.style.color = 'red'
        textAddResponse.innerText = 'Ops creation failed, please try again.'
      }
    }else{
      textAddResponse.style.color = 'red'
      textAddResponse.innerText = 'Complete the role name field.'
      roleName.focus()
    }
  })



  btnSetRole.addEventListener('click', async e =>{
    let textSetResponse = document.getElementById('textSetResponse')
    if (roleId.value && setRoleName.value) {
      console.log(roleId.value);
      console.log(setRoleName.value);

      let loader = document.getElementById('loader-setRole')
      loader.classList.remove('d-none')

      let response = await fetch(`${urlRolesApi}/UpdateRole/${roleId.value}`,{
        method : "PUT",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          "name": setRoleName.value,
          "status": true
        })
      })
      if (response.ok) {
        loader.classList.add('d-none')
        textSetResponse.style.color = '#425AC1'
        textSetResponse.innerText = 'Updated Role!'

        setTimeout(() => {
          window.location.reload()
        }, 1000);

      }else{
        console.error(response.status);
        textSetResponse.style.color = 'red'
        textSetResponse.innerText = 'Ops update failed, please try again.'
      }
    }else{
      textSetResponse.style.color = 'red'
      if (!roleId.value && setRoleName.value) {
        textSetResponse.innerText = 'Complete the Role id field.'
        roleId.focus()
      }else if(roleId.value && !setRoleName.value){
        textSetResponse.innerText = 'Complete the Role name field.'
        setRoleName.focus()
      }else{
        textSetResponse.innerText = 'Complete the Role id field.'
        roleId.focus()
      }
    }
  })
}

