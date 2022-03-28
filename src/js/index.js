//production:
// const urlApi = 'https://acsadmin.azurewebsites.net/api/User'
//Test:
const urlApi = 'https://acsadmin.azurewebsites.net/api/TestUser'
const urlRolesApi = 'https://acsadmin.azurewebsites.net/api/TestRole'



if (window.location.href.includes('/users.html')) {
  pagination()
  searchInput()
  search('A')
}

if (window.location.href.includes('/roles.html')) {
  searchRoles()
}
