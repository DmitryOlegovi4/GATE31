const rootElem = document.getElementById('root');
const searchForm = document.getElementById('searchForm');

fetch('https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7')
    .then(res=>res.json())
    .then(data=>{
        rootElem.appendChild(addArticles(data));
        let arrSearchParams = window.location.search.slice(1).split('=');
        if(arrSearchParams[0] === "search"){
            filterArticles(arrSearchParams[1]);
        }
        searchForm.querySelector('#searchText').value = arrSearchParams[1];
    });

function addArticles(arr= []) {
    let container = document.createElement('div');
    arr.forEach(elem => {
        let block = document.createElement('div');
        let title = document.createElement('div');
        let body = document.createElement('div');
        let divCheckbox = document.createElement('div');
        let inputCheckbox = document.createElement('input');

        container.classList.add('article-container');
        block.classList.add('article-block');
        title.classList.add('article-title');
        body.classList.add('article-body');
        divCheckbox.classList.add('article-checkbox');
        inputCheckbox.setAttribute('type','checkbox')
        title.innerText = elem.title;
        body.innerText = elem.body;

        inputCheckbox.addEventListener('change', function() {
            if (this.checked) {
                block.classList.add('dark_theme');
            } else {
                block.classList.remove('dark_theme');
            }
        });
        container.appendChild(block);
        block.appendChild(title);
        block.appendChild(body);
        block.appendChild(divCheckbox);
        divCheckbox.appendChild(inputCheckbox);
    })
    return container;
}

searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let searchText = e.target.querySelector('#searchText').value;
    // const urlParams = new URLSearchParams(window.location.search);
    // urlParams.set('search', searchText);
    // window.location.search = urlParams;
    history.pushState(null,null, `?search=${searchText}`)
    filterArticles(searchText);
})

function filterArticles(searchText) {
    let arrArticleBlock = rootElem.querySelectorAll('.article-block');
    arrArticleBlock.forEach(item => {
            item.style.display = 'block';
            let titleVal = item.querySelector('.article-title').innerHTML;
            if(!titleVal.includes(searchText)){
                item.style.display = 'none';
            }
        }
    )
}