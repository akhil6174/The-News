const apiKey= "5dfb38766e7440bebef39f3e3c4cdfee";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener("load",()=>fetchNews("India"));
async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data=await res.json();
    console.log(data);
    bindData(data.articles);
}
function bindData(articles){
    const cardContainer=document.getElementById("cards-container");
    const cardTemplate=document.getElementById("card-template-container");
    cardContainer.innerHTML="";
    articles.forEach((article)=>{
        if(!article.urlToImage || !article.title)return;
        const cardClone=cardTemplate.content.cloneNode(true);
        console.log(article);
        fillCardCloneData(cardClone,article);
        cardContainer.appendChild(cardClone);
    })
}
function fillCardCloneData(cardClone,article){
    const cardImg=cardClone.querySelector("#card-image");
    const cardTitle=cardClone.querySelector("#card-heading");
    const cardDate=cardClone.querySelector("#card-date");
    const cardDes=cardClone.querySelector("#descrip");
    cardImg.src=article.urlToImage;
    console.log(article.title);
    console.log(cardTitle);
    cardTitle.textContent=article.title;
    console.log(cardDes);
    cardDes.innerHTML=article.description;

    //the time in the article (of pubshish )is a computeried article hence to make it humanreadable time with a needed timezone..
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    console.log(date);
    cardDate.innerHTML=(`${article.source.name} •  ${date}`);

    cardClone.firstElementChild.addEventListener("click",()=>
    {
        window.open(article.url,"_blank");
    });
}
const india=document.getElementById("india");
let currentSelectedItem=null;
function newarival(id){
    fetchNews(id);
    if(id!="India"){
        india.classList.remove('active');
        const newItem=document.getElementById(id);
        currentSelectedItem?.classList.remove('active');
        currentSelectedItem=newItem;
        currentSelectedItem.classList.add('active');
    }
    else{
        india.classList.add('active');
        currentSelectedItem.classList.remove("active");
    }
}
const searchbutton=document.getElementById("searchbutton");
const searchbar=document.getElementById("searchbar");

searchbutton.addEventListener("click",()=>{
    let query=searchbar.value;
    if(!query)return;
    fetchNews(query);
    currentSelectedItem.classList.remove('active');
    currentSelectedItem=null;
    india.classList.remove('active');
});