// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore, collection, getDocs, addDoc, onSnapshot, deleteDoc, doc, getDoc, updateDoc
}  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsaMi6gI-32vgQwoEPPUChzChgYKNrvsA",
  authDomain: "registro-de-campeones.firebaseapp.com",
  projectId: "registro-de-campeones",
  storageBucket: "registro-de-campeones.appspot.com",
  messagingSenderId: "149207990843",
  appId: "1:149207990843:web:e10f4500914394e041d21e"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const db = getFirestore(app)

// Referenciar la colección
const referenciaColeccion = collection(db, 'campeones')

// Recolectar los datos de la colección, getDocs devuelve una promesa
getDocs(referenciaColeccion)
    .then((snapshot) => {
        let campeones = []
        snapshot.docs.forEach((doc) =>{
            campeones.push({ ...doc.data(), id: doc.id })
        })
        console.log(campeones)
    })
    .catch(err =>{
        console.log(err.message)
    })

export const getAll = (data) => {
    //onSnapshot toma la colección y la guarda en una variable
    onSnapshot(collection(db, 'campeones'), data)
}

export const edit = (id, campeon) => {
    //Función de firestore que permite actualizar el documento seleccionado 
    updateDoc(doc(db, 'campeones', id), campeon)
    Swal.fire({
        text: "Editado con éxito!",
        icon: "success"
      });
    
}

export const save = (campeon) => {
    //addDoc añade un nuevo documento a la colección
    addDoc(collection(db, 'campeones'), campeon)
}

export const remove = (id) => {
    //deleteDoc elimina un documento
    //doc es una función firestore que permite buscar un documento por su id
    deleteDoc(doc(db, 'campeones', id))
}

export const selectOne = (id) => getDoc(doc(db, 'campeones', id))

// Añadir documento
const campeonForm = document.querySelector('.card-form')
const botonGuardar = document.querySelector('#Guardar')
botonGuardar.addEventListener('click', (e) => {
    if (botonGuardar.value == "Guardar"){
        valor = verificar()
        if (valor == false) {
            console.log("El winrate no puede ser menor a 0 o mayor a 100")
            return
        }
        else{
            console.log("Verificado sin problemas")
        }
        
        e.preventDefault()
        addDoc(referenciaColeccion, {
            // Key:value, el value viene de los inputs
            nombre: campeonForm.nombre.value,
            enemigo: campeonForm.nombreEnemigo.value,
            linea: document.querySelector('input[name="linea"]:checked').value,
            earlyCI: campeonForm.earlyChampionIdentity.value,
            enemigoCI: campeonForm.earlyEnemigoIdentity.value,
            dificultad: campeonForm.dificultadMatchup.value,
            winrate: campeonForm.winrate.value,
            color: campeonForm.color.value,
            fechaDeAdicion: campeonForm.fechaDeAdicion.value,
            estrategia: campeonForm.estrategia.value,
            
        }) 
        .then(() =>{
            campeonForm.reset()
            Swal.fire({
                text: "Guardado con éxito!",
                icon: "success"
              });
        })
    
    } 
    else{
    
}})

    //    const campeon = {
    //        nombre: document.getElementById('nombre').value,
    //        enemigo: document.getElementById('nombreEnemigo').value,
    //        linea: document.querySelector('input[name="linea"]').value,
    //        earlyCI: document.getElementById('earlyChampionIdentity').value,
    //        enemigoCI: document.getElementById('earlyEnemigoIdentity').value,
    //        dificultad: document.getElementById('dificultadMatchup').value,
    //        winrate: document.getElementById('winrate').value,
    //        color: document.getElementById('color').value,
    //        estrategia: document.getElementById('estrategia').value
    //    }
    //    //Función de firestore que permite actualizar el documento seleccionado 
    //    updateDoc(doc(db, 'campeones', id), campeon)
    //    
    //}})
    
    

