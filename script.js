const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("upload");
const fileName = document.getElementById("file-name");

// Click opens file picker
dropArea.addEventListener("click", () => fileInput.click());

// Drag events
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.style.borderColor = "#007BFF";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.style.borderColor = "#aaa";
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  fileInput.files = e.dataTransfer.files;
  showFileName();
});

// Show file name
fileInput.addEventListener("change", showFileName);

function showFileName() {
  if (fileInput.files.length > 0) {
    fileName.innerText = "Selected: " + fileInput.files[0].name;
  }
}

// Convert function
function convertImage() {
  const format = document.getElementById("format").value;
  const file = fileInput.files[0];

  if (!file) {
    alert("Upload an image first");
    return;
  }

  const supportedFormats = ["image/png", "image/jpeg", "image/webp"];

  if (!supportedFormats.includes(format)) {
    alert("Only PNG, JPG, WEBP supported currently.");
    return;
  }

  const reader = new FileReader();
  const img = new Image();

  reader.onload = (e) => img.src = e.target.result;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const url = canvas.toDataURL(format);

    const link = document.getElementById("download");
    link.href = url;

    let ext = format.split("/")[1];
    link.download = "converted." + ext;

    link.style.display = "block";
    link.innerText = "⬇ Download " + ext.toUpperCase();
  };

  reader.readAsDataURL(file);
}