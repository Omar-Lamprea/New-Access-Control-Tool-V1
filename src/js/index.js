//production:
// const urlApi = 'https://acsadmin.azurewebsites.net/api/User'

//Test:
//const urlApi = 'https://acsadmin.azurewebsites.net/api/test/Users/user'
//const urlRolesApi = 'https://acsadmin.azurewebsites.net/api/test/Users/role'
const urlPermission = 'https://acsadmin.azurewebsites.net/api/test/Users/permission'

const AdminApiUrl = "https://acsadmin.azurewebsites.net/api/test/";

const USERAPI = 'Users/User'
const UPDTUSERROLEAPI = 'Users/User/UpdateUserRole'
const SEARCHROLEAPI = 'Users/Role';

let userId;
let roleId;


if (window.location.href.includes('/users')) {
  searchUsers('')
  document.addEventListener('click', e =>{
    if(e.target.dataset.id) openDetails(e.target.dataset.id);
    if(e.target.id === 'close-user-details') closeUserDetails()
    if(e.target.dataset.activerole) desactivateRole(e.target.dataset.activerole, userId)
    if(e.target.dataset.availablerole) activateRole(e.target.dataset.availablerole, userId)
  })
}

if (window.location.href.includes('/roles')) {
  searchRoles()
  adminRoles()

  document.addEventListener('click', e =>{
    if(e.target.dataset.roleid) openRoleDetails(e.target.dataset.roleid);
    if(e.target.id === 'close-role-details') closeRoleDetails()
    if(e.target.dataset.activepermission) desactivatePermission(e.target.dataset.activepermission, roleId)
    if(e.target.dataset.aviablepermission) activatePermission(e.target.dataset.aviablepermission, roleId)
  })
}

if (window.location.href.includes('/permissions')) {
  addPermission()
}


