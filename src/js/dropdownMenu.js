const menu = ()=>{
  
  const btnDropDown = document.getElementById('btnDropDown')
  const sidebarMenu = document.getElementById('sidebarMenu')
  const content = document.getElementById('content')
  const ulList = document.getElementById('ulList')
  const itemMenu = document.getElementById('itemMenu')
  
  let contentMaxWidth = '93%'
  let contentMinWidth = '80%'
  let sidebarMenuMaxWidth = '20%'
  let sidebarMenuMinWidth = '7%'
  let transition = 'all ease .5s'


  document.addEventListener('click', (e)=>{
    // console.log(e.target.dataset.usermenu);
    if (e.target.dataset.usermenu) {
      itemMenu.classList.toggle('item-active')
    }
  })
  if (window.location.href.includes('users')) {
    const subItemUser = document.getElementById('subItemUser')
    subItemUser.classList.add('liActiveMenu')
    itemMenu.classList.add('item-active')
  }
  if (window.location.href.includes('roles')) {
    const subItemRoles = document.getElementById('subItemRoles')
    subItemRoles.classList.add('liActiveMenu')
    itemMenu.classList.add('item-active')
  }

  
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
  
  // window.innerWidth > 992 
  //   ? dropdownMenu() 
  //   : btnDropDown.classList.add('d-none')
  
  // window.addEventListener('resize', e =>{
  //   e.target.innerWidth > 992 
  //     ? dropdownMenu() 
  //     : restoreMenu()
  // })

  let breakPoint = window.matchMedia('(min-width: 992px)')
  const responsive = (e) =>{
    if(e.matches){
      dropdownMenu()
    }else{
      // btnDropDown.classList.add('d-none')
      restoreMenu()
    }
  }
  breakPoint.addListener(responsive)
  responsive(breakPoint)

}
menu()