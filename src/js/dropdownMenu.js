const btnDropDown = document.getElementById('btnDropDown')
const sidebarMenu = document.getElementById('sidebarMenu')
const content = document.getElementById('content')
const ulList = document.getElementById('ulList')

let contentMaxWidth = '93%'
let contentMinWidth = '75%'
let sidebarMenuMaxWidth = '25%'
let sidebarMenuMinWidth = '7%'
let transition = 'all ease .5s'

const dropdownMenu = () =>{
  btnDropDown.classList.remove('d-none')

  
  if(localStorage.getItem('start-menu') === 'closed'){
    btnDropDown.classList.add('btnDropDown-closed')
    sidebarMenu.style.width = sidebarMenuMinWidth
    content.style.width = contentMaxWidth
    ulList.classList.add('ulList-closed')
  }else{
    btnDropDown.classList.add('btnDropDown-open')
    sidebarMenu.style.width = sidebarMenuMaxWidth
    content.style.width = contentMinWidth
  }

  btnDropDown.addEventListener('click', e =>{
    btnDropDown.classList.toggle('btnDropDown-open')
    btnDropDown.classList.toggle('btnDropDown-closed')

    if(btnDropDown.classList.contains('btnDropDown-closed')){
      localStorage.setItem('start-menu', 'closed')

      sidebarMenu.style.width = sidebarMenuMinWidth
      sidebarMenu.style.transition = transition

      content.style.width = contentMaxWidth
      content.style.transition = transition

    ulList.classList.add('ulList-closed')
      
    }else{
      localStorage.setItem('start-menu', 'open')
      sidebarMenu.style.width = sidebarMenuMaxWidth
      sidebarMenu.style.transition = transition

      content.style.width = contentMinWidth
      content.style.transition = transition

      ulList.classList.remove('ulList-closed')
    }
  })
}

const restoreMenu = () =>{
  btnDropDown.classList.add('d-none')
  sidebarMenu.style.width = '100%'
  content.style.width = '100%'
  ulList.classList.remove('ulList-closed')
}

window.innerWidth > 992 ? dropdownMenu() : btnDropDown.classList.add('d-none')

window.addEventListener('resize', e =>{
  e.target.innerWidth > 992 ? dropdownMenu() : restoreMenu()
})