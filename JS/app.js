import {
	saveItem,
	getItems,
	onGetItems,
	deleteItem,
	getItem,
	updateItem,
} from "./firesbase.js";

const containerItems = document.querySelector(".inventory-cards-container");
let edtiStatus = false;
let ID = "";

window.addEventListener("DOMContentLoaded", async () => {
	onGetItems((querySnapshot) => {
		let html = "";

		querySnapshot.forEach((doc) => {
			const items = doc.data();
			html += `
		<div class="wrapper-cards">
			<div class="botones">
			<div class="idBook">ID: ${doc.id}</div>
				<div class="btn-Action">
					<div>
						<button
							class="btn-newWrapReg color-edit btn-edit" data-id="${doc.id}">
							<svg xmlns="http://www.w3.org/2000/svg"
               height="30"
                viewBox="0 -960 960 960" width="30"
                data-id="${doc.id}"
                ><path 
              data-id="${doc.id}"
                 d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>
						</button>
					</div>
					<div class="btn-delete">
						<button
							class="btn-newWrapReg color-delete btn-del"
              data-id="${doc.id}"
						>
							<svg xmlns="http://www.w3.org/2000/svg"
               height="30"
                viewBox="0 -960 960 960"
                 width="30"
                data-id="${doc.id}"
                 ><path 
                data-id="${doc.id}"
                  d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
						</button>
					</div>
				</div>
			</div>
			<div class="content-card">
				<div class="wrapper-img">
					<img
						src="${items.image}"
						alt="${items.title}"
					/>
				</div>
				<div class="data-sheet">
					<div class="section-information-book">
						<div class="wrapper-information">
							<p class="referencia">Titulo:</p>
							<p class="information">
								${items.title}
							</p>
						</div>
						<div class="wrapper-information">
							<p class="referencia">Autor:</p>
							<p class="information">${items.author}</p>
						</div>
						<div class="wrapper-information">
							<p class="referencia">Género:</p>
							<p class="information">${items.gender}</p>
						</div>
						<div class="wrapper-information">
							<p class="referencia">Descripción:</p>
							<p class="description">
									${items.description}
							</p>
							<p class="description">
									${items.description2}
							</p>
							<p class="description">
									${items.description3}
							</p>
						</div>
						<div class="wrapper-information">
							<p class="referencia">Editorial:</p>
							<p class="information">${items.editorial}</p>
						</div>
					</div>
					<div class="section-details-book">
            <div class="section-details-book1">
              <div class="wrapper-information">
                  <p class="referencia">Colección:</p>
                  <p class="information">${items.collectionBook}</p>
              </div>
              <div class="wrapper-information">
                  <p class="referencia">ISBN:</p>
                  <p class="information">
				  ${items.isbn}
                  </p>
              </div>
              <div class="wrapper-information">
                  <p class="referencia">Pais de origen</p>
                  <p class="information">${items.countryOrigin}</p>
              </div>
              <div class="wrapper-information">
                  <p class="referencia">
                    Año de publicación:
                  </p>
                  <p class="information">${items.publication}</p>
              </div>
              <div class="wrapper-information">
                  <p class="referencia">
                    Número de páginas:
                  </p>
                  <p class="information">${items.pages}</p>
              </div>
              <div class="wrapper-information">
                  <p class="referencia">Volumen:</p>
                  <p class="information">${items.volume}</p>
              </div>
            </div>
            <div class="section-details-book2">
              <div class="wrapper-information">
                  <p class="referencia">Tamaño:</p>
                  <p class="information">${items.size}</p>
              </div>
              <div class="wrapper-information">
                  <p class="referencia">Formato:</p>
                  <p class="information">
                    ${items.format}
                  </p>
              </div>
              <div class="wrapper-information">
                  <p class="referencia">
                    Tipo de publicación:
                  </p>
                  <p class="information">${items.typePublication}</p>
              </div>
              <div class="wrapper-information">
                  <p class="referencia">Color</p>
                  <p class="information">
                    ${items.color}
                  </p>
              </div>
              <div class="wrapper-information">
                  <p class="referencia">Precio:</p>
                  <p class="information">$${items.price}</p>
              </div>
              <div class="wrapper-information">
                  <p class="referencia">Stock:</p>
                  <p class="information">${items.stockQuantity}</p>
              </div>
            </div>
					</div>
				</div>
			</div>
		</div>
				`;
		});

		containerItems.innerHTML = html;

		const btnsDelete = containerItems.querySelectorAll(".btn-del");

		btnsDelete.forEach((btn) => {
			btn.addEventListener("click", ({ target: { dataset } }) => {
				let confirmation = confirm(
					"Estás seguro de eliminar este registro?"
				);
				if (confirmation) {
					deleteItem(dataset.id);
				}
			});
		});

		const btnsEdit = containerItems.querySelectorAll(".btn-edit");

		btnsEdit.forEach((btn) => {
			btn.addEventListener("click", async (e) => {
				const doc = await getItem(e.target.dataset.id);
				const formModal = document.querySelector(".modalForm");
				formModal.classList.remove("hide-modal");

				const bookTitle = (form["bookTitle"].value = doc.title);
				const bookAuthor = (form["authorName"].value = doc.author);
				const bookGender = (form["bookGender"].value = doc.gender);
				const bookDescription = (form["bookDescription"].value =
					doc.description);
				const data2 = document.getElementById("contentParag1");
				const data3 = document.getElementById("contentParag2");

				if (doc.description2) {
					data2.innerHTML = `<textarea id="bookDescription1">${doc.description2}</textarea>`;
				}

				if (doc.description3) {
					data3.innerHTML = `<textarea id="bookDescription2">${doc.description3}</textarea>`;
				}

				const btnAddParag = document.getElementById("addParag");

				if (doc.description2 && doc.description3) {
					btnAddParag.style.display = "none";
				}
				const bookEditorial = (form["publisher"].value = doc.editorial);

				const bookCollection = (form["collection"].value =
					doc.collectionBook);
				const bookISBN = (form["ISBN"].value = doc.isbn);
				const bookCountryOrigin = (form["countryOrigin"].value =
					doc.countryOrigin);
				const bookPublication = (form["publicationYear"].value =
					doc.publication);
				const bookPages = (form["numPages"].value = doc.pages);

				const bookVolume = (form["volumeNumber"].value = doc.volume);
				const bookSize = (form["bookSize"].value = doc.size);
				const bookFormat = (form["bookFormat"].value = doc.format);
				const bookTypePublication = (form["publicationType"].value =
					doc.typePublication);
				const bookColor = (form["bookColor"].value = doc.color);

				const bookPrice = (form["priceAmount"].value = doc.price);
				const bookStockQuantity = (form["stockQuantity"].value =
					doc.stockQuantity);

				const saveUpdate = document.getElementById("saveItems");
				let labelImage = document.querySelector(".img-format");
				labelImage.textContent = "Cambiar portada";

				let preview = document.getElementById("preview");
				preview.innerHTML = `<img src="${doc.image}" alt="${doc.title}" id="fileProps">`;

				edtiStatus = true;
				ID = e.target.dataset.id;
				saveUpdate.value = "Guardar cambios";
			});
		});
	});
});

const form = document.getElementById("item-form");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const formModal = document.querySelector(".modalForm");

	const bookTitle = form["bookTitle"];
	const bookAuthor = form["authorName"];
	const bookGender = form["bookGender"];
	const bookDescription = form["bookDescription"];
	/*  */
	const bookDescription2 = document.getElementById("bookDescription1");
	const bookDescription3 = document.getElementById("bookDescription2");
	let data2 = "",
		data3 = "";
	if (bookDescription2) {
		data2 = bookDescription2.value;
	}
	if (bookDescription3) {
		data3 = bookDescription3.value;
	}
	/*  */
	const bookEditorial = form["publisher"];

	const bookCollection = form["collection"];
	const bookISBN = form["ISBN"];
	const bookCountryOrigin = form["countryOrigin"];
	const bookPublication = form["publicationYear"];
	const bookPages = form["numPages"];

	const bookVolume = form["volumeNumber"];
	const bookSize = form["bookSize"];
	const bookFormat = form["bookFormat"];
	const bookTypePublication = form["publicationType"];
	const bookColor = form["bookColor"];

	const bookPrice = form["priceAmount"];
	const bookStockQuantity = form["stockQuantity"];
	const bookImage = form["fileProps"];
	const bookImagePreview = document.getElementById("preview");

	if (!edtiStatus) {
		saveItem(
			bookTitle.value,
			bookAuthor.value,
			bookGender.value,
			bookDescription.value,
			data2,
			data3,
			bookEditorial.value,
			bookCollection.value,
			bookISBN.value,
			bookCountryOrigin.value,
			bookPublication.value,
			bookPages.value,
			bookVolume.value,
			bookSize.value,
			bookFormat.value,
			bookTypePublication.value,
			bookColor.value,
			bookPrice.value,
			bookStockQuantity.value,
			bookImage.src
		);
	} else {
		updateItem(ID, {
			title: bookTitle.value,
			author: bookAuthor.value,
			gender: bookGender.value,
			description: bookDescription.value,
			description2: data2,
			description3: data3,
			editorial: bookEditorial.value,
			collectionBook: bookCollection.value,
			isbn: bookISBN.value,
			countryOrigin: bookCountryOrigin.value,
			publication: bookPublication.value,
			pages: bookPages.value,
			volume: bookVolume.value,
			size: bookSize.value,
			format: bookFormat.value,
			typePublication: bookTypePublication.value,
			color: bookColor.value,
			price: bookPrice.value,
			stockQuantity: bookStockQuantity.value,
			image: bookImage.src,
		});

		edtiStatus = false;
	}
	setTimeout(() => {
		form.reset();
		bookImagePreview.innerHTML = "";
		formModal.classList.add("hide-modal");
	}, 350);
});
