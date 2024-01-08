function saveTolocalStorage(e){
    e.preventDefault();
    // get the details for booking
    const customerName = e.target.username.value;
    const customerEmail = e.target.useremail.value;
    const cus_callTime = e.target.usertime.value;

    // converting into the object
    let customerDetails = {
        name:customerName,
        emailId:customerEmail,
        time:cus_callTime
    }

   //=====now store the data on cloud using network calls=======//

   // 1) sending the data over the cloud using PUT  request

   axios.post('https://crudcrud.com/api/7270365647cf46599c73a15b8ed073b9/appointmentData',customerDetails)
   .then((response)=>{
    showUserOnScreen(response.data);
    //console.log(response.data);
   })
   .catch((error)=>{
    document.body.innerHTML = document.body.innerHTML + `<h3 style = "color:red;">Error code:404 - Something went wrong</h3>`
   });
  
}
// Adding  the button showlist and heading

let buttonshowList = document.getElementById('showList');
let headingList = document.getElementById('listheading');

headingList.appendChild(buttonshowList);

// making a seperate function to show the details on screen

function showDetails(){
    axios.get('https://crudcrud.com/api/7270365647cf46599c73a15b8ed073b9/appointmentData')
    .then((res)=>{
        for(var i =0;i<res.data.length;i++){
            showUserOnScreen(res.data[i]);
        }
    })
    .catch((err)=>{
        document.body.innerHTML = document.body.innerHTML + `<h3>Something went wrong</h3>`
    });
}

function showUserOnScreen(cus_obj){

    // getting the parent element where we need to attch the details
    let list_parentElement = document.getElementById('listOfItems');

    // creating the child element 
    let childElement = document.createElement('li');

    // Adding the textcontent of user to the childelement

    childElement.textContent = cus_obj.name + "  "+cus_obj.emailId+"  "+cus_obj.time;
    
    // now append this child to its parent

    //==========now adding the delete button to it==============//
    let deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.value = 'X';
    deleteButton.className = 'btn-1';

    // ==========createing Edit button ================

    let editButton = document.createElement('input');
    editButton.type = 'button';
    editButton.value = 'Edit';
    editButton.className = 'btn-2';

    // Adding color to the delete button and edit button//
    deleteButton.style.color = 'red';

    editButton.style.color = 'blue';
    // adding the deleteOperation and edit Operation to the buttons ========
    deleteButton.onclick = ()=>{

        // removing from the local storage
       // localStorage.removeItem(cus_obj.emailId);

       //===================deleteing from the crucrud using DELETE request=======

       axios.delete(`https://crudcrud.com/api/7270365647cf46599c73a15b8ed073b9/appointmentData/${cus_obj._id}`)
       .then((res)=>{
        console.log('object deleted');
       })
       .catch((err)=>{
        console.log('something went wrong');
       })

        // removing from the dom

        list_parentElement.removeChild(childElement);

    }

    editButton.onclick =()=>{
        // removing the previous stored value from localstorage
        localStorage.removeItem(cus_obj.emailId);

        // removing from the dom 

        list_parentElement.removeChild(childElement);
    }
       

    // add deletebutton to li tag

    childElement.appendChild(deleteButton);

    // now add edit button to the li tag

    childElement.appendChild(editButton);

    // now finally adding the child element li tag to the parent element 
    list_parentElement.appendChild(childElement);

    

}



