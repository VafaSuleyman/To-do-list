let listes = [];
const inputToDo = document.getElementById('listName');
const list = document.querySelector('.do-list');
const actionButton = document.getElementById('button');
const removeButton = document.querySelector('.remove');
const filterButton = document.querySelector('.filter')
const filtElements = document.querySelectorAll('.filt-element');
const filterUp = document.querySelector('.filter-up')


//for input value add arrays. Firstly control
function addToList(){
    if(inputToDo.value.length == 0){
        alert('Zəhmət olmazsa qeyd əlavə edin');
    }else{
        listes.push(inputToDo.value);
    }
}


//for arrays add to list and together changing style
function addMyList(){
    list.innerHTML= '';

    listes.forEach(function(n,i){
        list.innerHTML += `<li class='list-item-self'>${n}<div class="click-button"> 
                <a class='edit' onclick= 'editItem(${i})'>e</a>
                <a onclick='deleteItem(${i})'>
                    <svg class="remove" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4"/>
                    <path class="remove" d="M6 6L14 14" stroke="#C4C4C4"/>
                    <path class="remove" d="M6 14L14 6" stroke="#C4C4C4"/>
                    </svg>
                </a>
            </div>
         </li>`;
    })

    list.style.display = 'block';

    inputToDo.style.marginBottom = 0;
    inputToDo.style.borderBottomStyle = 'none';
    inputToDo.style.borderBottomLeftRadius = 0;
    inputToDo.style.borderBottomRightRadius= 0;


    for (let i = 0; i < filtElements.length; i++) {
        filtElements[i].style.fill = 'black';
    }
}


// for clear input
function clearToInput(){
    if(inputToDo.value.length == 0){
        alert('Heç bir dəyər daxil etməmisiniz');
    }else{
        inputToDo.value= "";
    }
}


// for clear list item and emptylist with control
function deleteItem(i){
    if(listes.length == '1'){
        listes.splice(i,1);
        list.style.display = 'none';
        inputToDo.style.marginBottom = '18px';
        inputToDo.style.borderBottomStyle = 'solid';
        inputToDo.style.borderBottomLeftRadius = '10px';
        inputToDo.style.borderBottomRightRadius= '10px';

    }else{
        listes.splice(i,1);
        addMyList();
    }
    
}

// for edit item
function editItem(i){
    let newValue = prompt("Zəhmət olmazsa yeni dəyəri daxil edin");
    if(!newValue){
        alert('Boş buraxa bilməzsiniz');
    }else{
        listes.splice(i,1,newValue);
        addMyList();
    }
}

// for sort list items

let ascending = true;

function sortList(){
    const sortList = Array.from(list.querySelectorAll("li"));

    sortList.sort((a, b) => {
        const sortA = a.textContent.toLocaleLowerCase();
        const sortB = b.textContent.toLocaleLowerCase();
        if (sortA < sortB){
            return ascending ? -1 : 1;
        }

        if(sortA > sortB){
            return ascending ? 1 : -1;
        }
        return 0;
    });

    sortList.forEach((task) => list.appendChild(task));
    ascending = !ascending;

    filterButton.style.display = 'none';
    filterUp.style.display = 'block';


}

// action for clearing
removeButton.addEventListener('click', () => {
    clearToInput();
})


actionButton.addEventListener('click', (event) => {
    event.preventDefault();
    addToList();
    clearToInput();
    addMyList();
});


filterButton.addEventListener('click', () => {
    sortList();
})
