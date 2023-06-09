const inputFile = document.getElementById("bookImage");
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const formModal = document.querySelector(".modalForm");
const preview = document.getElementById("preview");
const form = document.getElementById("item-form");
const labelImage = document.querySelector(".img-format");
const saveBtn = document.getElementById("saveItems");
const isbnInput = document.getElementById("ISBN");
const containerParags = document.getElementById("containerParags");
const contentParag1 = document.getElementById("contentParag1");
const contentParag2 = document.getElementById("contentParag2");
const addParags = document.getElementById("addParag");
const delParags = document.querySelector(".del-parag");

openModal.addEventListener("click", (e) => {
	e.preventDefault();
	formModal.classList.remove("hide-modal");
	form.reset();
	preview.innerHTML = "";
	labelImage.textContent = "Escoge una portada";
	saveBtn.value = "Guardar";
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

isbnInput.addEventListener("input", formatIsbn);

isbnInput.addEventListener("input", formatIsbn);

function formatIsbn() {
	const rawIsbn = isbnInput.value.replace(/-/g, "");

	let formattedIsbn = "";

	if (rawIsbn.length >= 0) {
		formattedIsbn += `${rawIsbn.slice(0, 3)}-`;
	}

	if (rawIsbn.length >= 4) {
		formattedIsbn += `${rawIsbn.slice(3, 5)}-`;
	}

	if (rawIsbn.length >= 5) {
		formattedIsbn += `${rawIsbn.slice(5, 10)}-`;
	}

	if (rawIsbn.length >= 11) {
		formattedIsbn += `${rawIsbn.slice(10, 12)}-`;
	}

	if (rawIsbn.length <= 13) {
		formattedIsbn += rawIsbn.slice(12);
	}

	isbnInput.value = formattedIsbn;
}

let contadorParag = 0;

addParags.addEventListener("click", (e) => {
	e.preventDefault();

	if (contadorParag >= 1) addParags.style.display = "none";
	if (contadorParag === 0) addParags.style.display = "block";

	if (contadorParag === 0 && contentParag1) {
		contentParag1.innerHTML = `
		<textarea
		id="bookDescription1">
		</textarea>
		`;
		contadorParag++;
	} else if (contadorParag === 1 && contentParag2) {
		contentParag2.innerHTML = `
		<textarea
		id="bookDescription2">
		</textarea>
		`;
		contadorParag++;
	}
});

delParags.addEventListener("click", (e) => {
	e.preventDefault();
	const dataText1 = document.getElementById("bookDescription1");
	const dataText2 = document.getElementById("bookDescription2");

	if (dataText1) {
		contadorParag = 1;
	} else if (dataText2) {
		contadorParag++;
	} else {
		contadorParag = 0;
	}

	if (dataText1 && dataText1.value.length <= 2) {
		contentParag1.removeChild(dataText1);
	}

	if (dataText2 && dataText2.value.length <= 2) {
		contentParag2.removeChild(dataText2);
	}
});
