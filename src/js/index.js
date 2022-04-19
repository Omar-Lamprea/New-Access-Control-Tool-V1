//production:
// const urlApi = 'https://acsadmin.azurewebsites.net/api/User'

//Test:
const urlApi = 'https://acsadmin.azurewebsites.net/api/test/user'
const urlRolesApi = 'https://acsadmin.azurewebsites.net/api/test/role'
const urlPermission = 'https://acsadmin.azurewebsites.net/api/test/permission'



if (window.location.href.includes('/users')) {
  pagination()
  searchInput()
  search('A')
}
if (window.location.href.includes('/roles')) {
  searchRoles()
  adminRoles()
}
if (window.location.href.includes('/permissions')) {
  addPermission()
}

