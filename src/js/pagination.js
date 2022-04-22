  function pagination(activeLetter) {
    const alphabet =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',]
    let alphabetPager = document.getElementById('alphabet-pager')
    
    alphabetPager.innerHTML = ''
    let First
    activeLetter[0] ? First = activeLetter.toUpperCase()[0] : First = ''
    alphabet.forEach(el => {
        let btn
        if (el == First)
            btn = `<button class="btn-search active-search" id="${el}" onclick="search(${el})">${el}</button>`
        else
            btn = `<button class="btn-search" id="${el}" onclick="searchUsers(${el})">${el}</button>`
        alphabetPager.innerHTML += btn
    });
}

