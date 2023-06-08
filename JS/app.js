import { saveItem, getItems, onGetItems } from "./firesbase.js";

const containerItems = document.querySelector(".inventory-cards-container");

window.addEventListener("DOMContentLoaded", async () => {
  onGetItems((querySnapshot) => {
    let html = "";

    querySnapshot.forEach((doc) => {
      const items = doc.data();
      html += `
		<div class="wrapper-cards">
			<div class="botones">
				<div class="btn-Action">
					<div class="btn-edit">
						<a
							href=""
							class="btn-newWrapReg color-edit"
						>
							<svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="#f2f2f2"><path d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>
						</a>
					</div>
					<div class="btn-delate">
						<a
							href=""
							class="btn-newWrapReg color-delate"
						>
							<svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="#f2f2f2"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
						</a>
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
						</div>
						<div class="wrapper-information">
							<p class="referencia">Editorial:</p>
							<p class="information">${items.editorial}</p>
						</div>
					</div>
					<div class="section-details-book">
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
				`;
    });

    containerItems.innerHTML = html;
  });
});

const form = document.getElementById("item-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookTitle = form["bookTitle"];
  const bookAuthor = form["authorName"];
  const bookGender = form["bookGender"];
  const bookDescription = form["bookDescription"];
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

  // console.log(bookImage.src);

  saveItem(
    bookTitle.value,
    bookAuthor.value,
    bookGender.value,
    bookDescription.value,
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
  form.reset();
});
