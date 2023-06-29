const accessKey = "4of_yvkY_UO59P4KGQGgPqF3dv6lhAs18TmxtyMiRLg";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");


let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const respone = await fetch(url);
    const data = await respone.json();

    if(page == 1){
        searchResult.innerHTML = "";
    }

    const results = data.results;
    
    results.map((result) =>{
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.setAttribute('target', '_blank');

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
        
        
    })
    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    page = 1;
    searchImages();
    searchBox.select();
})

showMoreBtn.addEventListener("click", ()=>{
    page++;
    searchImages();
})