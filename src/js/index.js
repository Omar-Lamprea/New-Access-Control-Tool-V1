//production:
// const urlApi = 'https://acsadmin.azurewebsites.net/api/User'

//Test:
const urlApi = 'https://acsadmin.azurewebsites.net/api/test/Users/user'
const urlRolesApi = 'https://acsadmin.azurewebsites.net/api/test/Users/role'
const urlPermission = 'https://acsadmin.azurewebsites.net/api/test/Users/permission'

const AdminApiUrl = "https://acsadmin.azurewebsites.net/api/test/";


if (window.location.href.includes('/users')) {
  ///pagination('')  //pagination se llama dentro de search
  //searchInput()    //searchInput reemplazado por onclick en cada letra
  searchUsers('')
}
if (window.location.href.includes('/roles')) {
  searchRoles()
  adminRoles()
}
if (window.location.href.includes('/permissions')) {
  addPermission()
}


