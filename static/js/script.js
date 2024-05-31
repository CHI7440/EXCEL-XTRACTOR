//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input"),
form = document.getElementById("upload-form");
let file;
button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
}
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission
  const formData = new FormData(this); // Create FormData object to send form data
  formData.append("file", file); // Append the selected file to FormData object
  fetch(this.action, {
    method: this.method,
    body: formData
  })
  .then(response => {
    // Handle response as needed
    console.log(response)
    window.location.href = response.url
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  checkFile(); //calling function
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
  checkFile();
});

function checkFile(){
  console.log("checkFile")
  console.log(file)
  let fileType = file.type; //getting selected file type
  let validExtensions = ["text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-excel.sheet.macroEnabled.12"]; //adding some valid csv/excel extensions in array
  console.log(fileType)
  if(validExtensions.includes(fileType)){ //if user selected file is an image file
    let event = new Event('submit')
    form.action = "upload-file"
    form.dispatchEvent(event)
  }else{
    alert("File Format Not Supported");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
