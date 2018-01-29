window.onload = () => { 
  
    const checklistItems = document.getElementsByClassName("checklistItemBox");
    const checklistSubtask = document.getElementsByClassName("checklistSubtask");
    
    
    
    for(var i=0; i< checklistItems.length; i++) {
        
       checklistItems[i].children[0].children[1].addEventListener("click", bindClick(i));
    }

    
    
    
 function bindClick(i) {
    return function(){
        if (checklistSubtask[i].style.display == "none") {
            checklistSubtask[i].style.display = "block";
        } else {
            checklistSubtask[i].style.display = "none";
        }  
    };  
 };
 
    
};