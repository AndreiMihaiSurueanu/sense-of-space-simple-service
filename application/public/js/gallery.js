var path = sessionStorage.getItem('path');
if (path != "") {
  path = path.substring(7);
  let image = document.createElement('img');
  image.src = path;
  image.id = 'lala';
  let prevImg = document.getElementById("sechelt");
  prevImg.parentNode.insertBefore(image, prevImg);
}