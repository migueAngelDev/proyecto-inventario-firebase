// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	onSnapshot,
	deleteDoc,
	doc,
	getDoc,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBKIf6zdSGIaIgRE6rf_qQqd_b0gsOphmU",
	authDomain: "inventario-prg-web.firebaseapp.com",
	projectId: "inventario-prg-web",
	storageBucket: "inventario-prg-web.appspot.com",
	messagingSenderId: "461898835368",
	appId: "1:461898835368:web:ce5892c8248ae8b45c299d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const saveItem = (
	title,
	author,
	gender,
	description,
	editorial,
	collectionBook,
	isbn,
	countryOrigin,
	publication,
	pages,
	volume,
	size,
	format,
	typePublication,
	color,
	price,
	stockQuantity,
	image
) =>
	addDoc(collection(db, "mangas"), {
		title,
		author,
		gender,
		description,
		editorial,
		collectionBook,
		isbn,
		countryOrigin,
		publication,
		pages,
		volume,
		size,
		format,
		typePublication,
		color,
		price,
		stockQuantity,
		image,
	});

export const getItems = () => getDocs(collection(db, "mangas"));

export const onGetItems = (callback) =>
	onSnapshot(collection(db, "mangas"), callback);
