const searchBar = document.getElementById("searchBar")
const searchButton = document.getElementById("searchButton")
const getAllUsers = document.getElementById("getAllUsers")
const cardContainer = document.getElementById("cardContainer")

getAllUsers.addEventListener("click",(e)=>{
    e.preventDefault();
    cardContainer.innerHTML = ""
    getUser();
})

searchButton.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchedValue = searchBar.value
    console.log(searchedValue);
    getUser(searchedValue)
})


function getUser(searchedValue){
    let apiResponse
    if(searchedValue==="" || searchedValue===undefined){
         apiResponse = `https://api.github.com/users`
    }else{
         apiResponse = `https://api.github.com/users/${searchedValue}`
    }
    const promise = fetch(apiResponse)
    promise.then((response)=>{
        // console.log(response);
        return response.json()
    }).then((result)=>{
        let answer = result
        if(searchedValue==="" || searchedValue===undefined){
            cardContainer.innerHTML = ""
            answer.map((ele)=>{
                const card = document.createElement("div")
                const heading = document.createElement("h2")
                const link = document.createElement("a")
                const img = document.createElement("img")
                heading.innerHTML = ele.login
                link.href = ele.html_url
                link.innerHTML = "Github Link"
                img.src = ele.avatar_url
                card.appendChild(img)
                card.appendChild(heading)
                card.appendChild(link)
                cardContainer.appendChild(card)
            })
        }else{
            cardContainer.innerHTML = ""
            if (answer.message==="Not Found") {
                const heading = document.createElement("h2");
                heading.innerHTML = "User Not Found!!"
                cardContainer.appendChild(heading)
            } else {
                const card = document.createElement("div")
                const heading = document.createElement("h2")
                const link = document.createElement("a")
                const img = document.createElement("img")
                heading.innerHTML = answer.login
                link.href = answer.html_url
                link.innerHTML = "Github Link"
                img.src = answer.avatar_url
                card.appendChild(img)
                card.appendChild(heading)
                card.appendChild(link)
                cardContainer.appendChild(card)
            }
        }
        
        console.log(answer);
    })
}
