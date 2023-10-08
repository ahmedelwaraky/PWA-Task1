//----------------------------------Start global
var documentHtml = document;
var siteName =documentHtml.getElementById('siteName')
var siteUrl =documentHtml.getElementById('siteUrl')
var btnAdd =documentHtml.getElementById('btnAdd')
var btnUpdate=documentHtml.getElementById('btnUpdate')
var searchBook=documentHtml.getElementById('searchBook')
var alertName=documentHtml.getElementById('alertName')
var alertUrl=documentHtml.getElementById('alertUrl')
var alertExite=documentHtml.getElementById('alertExite')
var indexUpdate=0
var booksContainer=[];
//--------------------c--------------When Start
if (getLocal()!==null){
    booksContainer= getLocal()
    displayData()
}
btnAdd.onclick = function(){
    addBook()
}
btnUpdate.onclick=function(){
    updateDat()
}
searchBook.oninput=function(){
    searchData()
}
//----------------------------------Start Function
function addBook(){
    if((nameValidation() == true) & (urlValidation() == true)){ /////validation      //&& x   //& 
        var book ={
            name : siteName.value,
            url : siteUrl.value,
        }
        booksContainer.push(book)
        // console.log(booksContainer)
        displayData()
        setLocal()
        resetForm()
    }
}

function displayData(){ 
    var tableData=``
    for(var i = 0; i < booksContainer.length; i++){
    tableData +=  ` 
        <tr>
            <td>${booksContainer[i].name}</td>
            <td> 
                <p class="small text-truncate" style="max-width: 100px;">${booksContainer[i].url}</p>
            </td>
            <td>
                <div class="hstack gap-2 justify-content-center">
                    <a href="${booksContainer[i].url}" target="_blank" class="btn btn-outline-light">
                        <i class="fas fa-eye"></i>
                    </a>

                    <button class="btn btn-outline-warning" onclick="setUpdateInput(${i})">
                        <i class="fas fa-pencil-alt"></i>
                    </button>

                    <button class="btn btn-outline-danger" onclick="deleteRow(${i})" >
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
        `
    }
    document.getElementById('tableBody').innerHTML=tableData
}

function setLocal(){
    localStorage.setItem("books",JSON.stringify(booksContainer))
}

function getLocal(){
    return JSON.parse(localStorage.getItem("books"))
}

function resetForm(){
    siteName.value=""
    siteUrl.value=""
}

function deleteRow(index){
    booksContainer.splice(index,1)
    displayData()
    setLocal()
}

function setUpdateInput(index){
    indexUpdate=index;
// console.log(booksContainer.at(index));
siteName.value = booksContainer.at(index).name
siteUrl.value = booksContainer.at(index).url

btnAdd.classList.add('d-none')
btnUpdate.classList.remove('d-none')
}

function updateDat(){
    var book ={
        name : siteName.value,
        url : siteUrl.value,
    }
booksContainer.splice(indexUpdate,1,book)
setLocal()
displayData()
resetForm()
btnUpdate.classList.add('d-none')
btnAdd.classList.remove('d-none')
}

function searchData(){
    var tableData = ``
    var term = searchBook.value.toLowerCase()

    for(var i = 0; i < booksContainer.length; i++){

        if(booksContainer[i].name.toLowerCase().includes(term)){
            tableData +=  ` 
            <tr>
                <td>${booksContainer[i].name.toLowerCase().replaceAll(term,`<span class="bg-info">${term}</span>`)}</td>
                <td>
                    <p class="small text-truncate" style="max-width: 100px; ">${booksContainer[i].url}</p>
                </td>
                <td>
                    <div class="hstack gap-2 justify-content-center">
                        <a href="${booksContainer[i].url}" target="_blank" class="btn btn-outline-light">
                            <i class="fas fa-eye"></i>
                        </a>
    
                        <button class="btn btn-outline-warning" onclick="setUpdateInput(${i})">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
    
                        <button class="btn btn-outline-danger" onclick="deleteRow(${i})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
            `
        }
    }
    document.getElementById('tableBody').innerHTML=tableData
}
//----------------------------------Start Validation

function nameValidation(){
    if(siteName.value ===""){
        alertName.classList.remove('d-none') //show alert
        return false;
    }else{
        alertName.classList.add('d-none') // hide alert
        return true;

    }
}

function urlValidation(){
    if(siteUrl.value ===""){
        alertUrl.classList.remove('d-none') //show alert
        return false;
    }else{


        var isExite=false
        for(var i = 0; i<booksContainer.length; i++){
            if(booksContainer[i].url ===siteUrl.value){
                isExite=true;
                break;
            }
        }

        if(isExite === true){
            alertExite.classList.remove('d-none')  //show alert
            return false;
        }else{
            alertExite.classList.add('d-none') //hide alert
        }

        alertUrl.classList.add('d-none') // hide alert required
        return true;
    }
}



//check First Way
//1-check whether service worker supported or not 
// if("ServiceWorker" in navigator){
// }


//check Second Way
if(navigator.serviceWorker){
    navigator.serviceWorker.register("./SW.js")
    .then(res=> console.log("file register" + res))
    .catch(err => console.log(err));
}


//notifCTION
const btn =document.getElementById('btn')
btn.addEventListener("click" , ()=>{
    Notification.requestPermission().then((p)=>{
        console.log(p );
        if(p === "granted"){
            let notification = new Notification("Hello" , 
                {
                    body : 'welcome to our website',
                    tag : 'Welcome',
                }
            )
        }else {
            notification.close()
        }
        
    })
})


//check iam in main page or not
let notification;
document.addEventListener("visibilitychange" , ()=>{
    if(document.visibilityState === 'hidden'){
        notification = new Notification("come Back Again", {
            body:'please',
            tag:'back'
        })
    }else {
        notification.close()
    }
})