const pagination = () =>{
  const alphabet =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',]
  const alphabetPager = document.getElementById('alphabet-pager')
  
  
  alphabet.forEach(el => {
    const btn = `<button class="btn-search" id="${el}" onclick="search(${el})">${el}</button>`
    alphabetPager.innerHTML += btn
  });
}

pagination()