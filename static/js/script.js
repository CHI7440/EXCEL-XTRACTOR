// const wrapper = document.querySelector(".wrapper");
// const fileName = document.querySelector(".file-name");
// const uploadBtn = document.querySelector("#upload-btn");
// const idImageBtn = document.getElementById('id_image');
// const customBtn = document.querySelector("#custom-btn");
// const cancelBtn = document.querySelector("#cancel-btn i");
// const playlistBtn = document.getElementById("#playlist-btn");
// const songBtn = document.getElementById("#song=btn");
// const img = document.querySelector("img");
// let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
// customBtn.addEventListener("click",function(){
//   idImageBtn.click();
// });

// idImageBtn.addEventListener("change", function(){
//   const file = this.files[0];
//   if(file){
//     const reader = new FileReader();
//     reader.onload = function(){
//       const result = reader.result;
//       img.src = result;
//       wrapper.classList.add("active");
//       uploadBtn.disabled = false;
//       uploadBtn.style.cursor = 'pointer';
//     }
//     cancelBtn.addEventListener("click", function(){
//       img.src="";
//       wrapper.classList.remove("active");
//       uploadBtn.disabled = true;
//       uploadBtn.style.cursor = 'not-allowed';
//     })
//     reader.readAsDataURL(file);
//   }
//   if(this.value){
//     let valueStore = this.value.match(regExp);
//     fileName.textContent = valueStore;
//   }
// });

// // script for second.html

// function recommend_playlist(playlist_uri)
// {
//   if(playlist_uri!='')
//   {
//     console.log(playlist_uri);
//     window.open(playlist_uri);
//   }
// }


// function open_song(song_url)
// {
//   if(song_url!='')
//   {
//     console.log(song_url);
//     window.open(song_url);
//   }
// }

//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input"),
fileInfo = dropArea.querySelector(".file-info"),
fileIcon = fileInfo.querySelector(".file-icon"),
fileName = fileInfo.querySelector(".file-name");
button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  dropArea.classList.add("active");
  file = event.dataTransfer.files[0];
  showFile();
  enableUploadButton(); 
});

function showFile(){
  let fileType = file.type; //getting selected file type
  let validExtensions = ["text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-excel.sheet.macroEnabled.12"]; //adding some valid csv/excel extensions in array
  console.log(fileType)
  if(validExtensions.includes(fileType)){ //if user selected file is an image file
    fileName.textContent = file.name; // displaying the file name
    fileInfo.style.display = "flex"; // displaying the file info container  
  }else{
    alert("File Format Not Supported");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}



function enableUploadButton() {
  document.getElementById('upload-btn').disabled = false;
  document.getElementById('upload-btn').style.cursor = 'pointer';
}