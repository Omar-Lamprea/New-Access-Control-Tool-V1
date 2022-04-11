function addPermission(){
  let btnAddPermission = document.getElementById('btnAddPermission')
  let btnSetPermission = document.getElementById('btnSetPermission')

  let permissionName = document.getElementById('permissionName')
  let permissionId = document.getElementById('permissionId')
  let setPermissionName = document.getElementById('setPermissionName')

  // permissionName.addEventListener('keyup',e =>{
  //   e.target.value === '' 
  //     ? btnAddPermission.setAttribute('disabled', '')
  //     : btnAddPermission.removeAttribute('disabled', '')
  // })

  btnAddPermission.addEventListener('click', async e =>{
    let textAddResponse = document.getElementById('textAddResponse')
    if (permissionName.value) {
      let response = await fetch(`${urlPermission}/CreatePermission`,{
        method : "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          "normalizedName": permissionName.value.toUpperCase(),
        })
      })
      if (response.ok) {
        textAddResponse.style.color = '#425AC1'
        textAddResponse.innerText = 'permission create'
      }else{
        console.error(response.status);
        textAddResponse.style.color = 'red'
        textAddResponse.innerText = 'ops failed creation'
      }
    }else{
      textAddResponse.style.color = 'red'
      textAddResponse.innerText = 'complete the field to create a permission'
      permissionName.focus()
    }
  })



  btnSetPermission.addEventListener('click', async e =>{
    let textSetResponse = document.getElementById('textSetResponse')
    if (permissionId.value && setPermissionName.value) {
      console.log(permissionId.value);
      console.log(setPermissionName.value.toUpperCase());
      let response = await fetch(`${urlPermission}/UpdatePermission/${permissionId.value}`,{
        method : "PUT",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          "normalizedName": setPermissionName.value.toUpperCase(),
        })
      })
      if (response.ok) {
        textSetResponse.style.color = '#425AC1'
        textSetResponse.innerText = 'permission updated'
      }else{
        console.error(response.status);
        textSetResponse.style.color = 'red'
        textSetResponse.innerText = 'ops failed update'


      }
    }else{
      textSetResponse.style.color = 'red'
      if (!permissionId.value && setPermissionName.value) {
        textSetResponse.innerText = 'complete the permission id field'
        permissionId.focus()
      }else if(permissionId.value && !setPermissionName.value){
        textSetResponse.innerText = 'complete the permission name field'
        setPermissionName.focus()
      }else{
        textSetResponse.innerText = 'complete the permission id field'
        permissionId.focus()
      }
    }
  })
}