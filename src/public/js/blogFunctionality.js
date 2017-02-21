window.onload = () => { 
    const glossaryContent = document.getElementById("glossaryContent");
    glossaryContent.style.display = "none"
    
    document.getElementById("glossaryh1Selector").addEventListener("click", function() {
        
        
        if (glossaryContent.style.display === "none") {
            glossaryContent.style.display = "initial";
            
        } else if (glossaryContent.style.display === "initial"){
            glossaryContent.style.display = "none"
        }
         
    });

};