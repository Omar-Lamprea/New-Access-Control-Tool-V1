//production:
const urlApi = 'https://acsadmin.azurewebsites.net/api/User'
//Test:
// const urlApi = 'https://acsadmin.azurewebsites.net/api/TestUser'



if (window.location.href.includes('/users.html')) {
  pagination()
  searchInput()
  search('A')
}