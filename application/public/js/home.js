var uploadButton = document.getElementById("upload");
uploadButton.addEventListener("click", () =>{
  $("#fileupload").trigger('click');
  addWatermark();
})

var galleryButton = document.getElementById("gallery");
galleryButton.addEventListener("click", () =>{
  window.location.href = 'gallery';
})

async function addWatermark() {
  let photo = document.getElementById("fileupload").files[0];
  let formData = new FormData();
  let url = '/addImageWatermark';
  
  formData.append('image', photo);

  const options = {
      method: 'POST',
      body:formData
    };
  const response = await fetch(url, options);
  const log = await response.json();
  
  sessionStorage.setItem('path', log.path);

}

