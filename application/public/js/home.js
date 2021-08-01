var uploadButton = document.getElementById("upload");
uploadButton.addEventListener("click", () =>{
  $("#fileupload").trigger('click');
})

var mark = document.getElementById("mark");
mark.addEventListener("click", () =>{
  if (document.getElementById("fileupload").files.length != 0){
    $("#uploadbutton").trigger('click');
  }
})

var galleryButton = document.getElementById("gallery");
galleryButton.addEventListener("click", () =>{
  window.location.href = 'gallery';
})