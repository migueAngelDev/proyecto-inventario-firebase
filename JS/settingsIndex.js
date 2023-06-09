// const labelRedirect = document.querySelector(".img-format");
import { saveItem, getItems, onGetItems } from "./firesbase.js";
const inputFile = document.getElementById("bookImage");
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const formModal = document.querySelector(".modalForm");
const preview = document.getElementById("preview");
const form = document.getElementById("item-form");
const labelImage = document.querySelector(".img-format");

openModal.addEventListener("click", () => {
	formModal.classList.remove("hide-modal");
	form.reset();
	preview.innerHTML = "";
	labelImage.textContent = "Escoge una portada";
});

closeModal.addEventListener("click", () => {
	formModal.classList.add("hide-modal");
});

let previewImg = document.getElementById("preview");

let url;

inputFile.addEventListener("change", ({ target: { files } }) => {
	let reader = new FileReader();
	reader.readAsDataURL(files[0]);
	reader.onload = () => {
		url = reader.result;
		previewImg.innerHTML = `<img src="${url}" alt="${files[0].name}" id="fileProps">`;
	};
});
