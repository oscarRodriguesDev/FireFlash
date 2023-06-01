var isOpen = 1;
function reveal_section(sectionId) {
    var section = document.getElementById(sectionId);
    var content = section.querySelectorAll(":scope > *:not(h2)");
      if (isOpen==0) {
        content.forEach(function(element) {
          element.style.visibility = "hidden";
          element.style.display ='none'
          isOpen = 1;
         
        });
      } else {
        content.forEach(function(element) {
          element.style.visibility = "visible";
          element.style.display ='block'
          isOpen = 0;
        
        });
    }
    
  }
  