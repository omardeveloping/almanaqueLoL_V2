import { edit, getAll, remove, save, selectOne } from "./firebase.js"

let id = 0

document.getElementById('Guardar').addEventListener('click', () => {
    
    if (document.getElementById('Guardar').value == 'Guardar') {
        
    } else {
        //enviamos el empleado a las funciones de firestore para editar
        const campeonForm = document.querySelector('.card-form')
        const campeon = {
            nombre: campeonForm.nombre.value,
            enemigo: campeonForm.nombreEnemigo.value,
            linea: campeonForm.linea.value,
            earlyCI: campeonForm.earlyChampionIdentity.value,
            enemigoCI: campeonForm.earlyEnemigoIdentity.value,
            dificultad: campeonForm.dificultadMatchup.value,
            winrate: campeonForm.winrate.value,
            color: campeonForm.color.value,
            fechaDeAdicion: campeonForm.fechaDeAdicion.value,
            estrategia: campeonForm.estrategia.value,
        }
        console.log(id)
        edit(id, campeon)
        id = 0
    }
    limpiar()
    document.getElementById('Guardar').value = 'Guardar'
}
)
//DOMContentLoaded evento que se activa cuando se recarga la web
window.addEventListener('DOMContentLoaded', () => {
    console.log("Contenido cargado")
    //función que permite traer la colección de empleados
    getAll(campeones => {
        let tabla = ''
        //recorremos cada documento de la colección 
        campeones.forEach(doc => {
            //doc.data permite acceder a los valores del documento
            const item = doc.data()
            console.log("Añadiendo a la tabla")
            tabla += `<tr>
                <td>${item.nombre}</td>
                <td>${item.enemigo}</td>
                <td>${item.linea}</td>
                <td>${item.earlyCI}</td>
                <td>${item.enemigoCI}</td>
                <td>${item.dificultad}</td>
                <td>${item.winrate}</td>
                <td>${item.color}</td>
                <td>${item.fechaDeAdicion}</td>
                <td>${item.estrategia}</td>
                <td nowrap>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                </td>
            </tr>`
        })
        document.querySelector('#contenido').innerHTML = tabla
        //llamar a todos los botones eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            //saber que botón se presiono
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No prodrá revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    //verifica si se presionó eliminar
                    if (result.isConfirmed) {
                        //eliminar
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado.",
                            icon: "success"
                        });
                    }
                });
            })
        })
        //recorrer todos los botones con la clase warning, para seleccionar un registro
        document.querySelectorAll('.btn-warning').forEach(btn => {
            //verificamos el botón al cual se le hizo click
            //async y await permiten que espere el preceso para seguir ejecutando
            btn.addEventListener('click', async () => {
                //invocamos la función para traer el documento seleccionado 
                const emp = await selectOne(btn.id)
                //asignamos los valores del documento a una variable para su utilización
                const item = emp.data()
                //asignar los valores a los inputs
                document.getElementById('nombre').value = item.nombre
                document.getElementById('nombreEnemigo').value = item.enemigo
                document.querySelector('input[name="linea"]').value = item.linea
                document.getElementById('earlyChampionIdentity').value = item.earlyCI
                document.getElementById('earlyEnemigoIdentity').value = item.enemigoCI
                document.getElementById('dificultadMatchup').value = item.dificultad
                document.getElementById('winrate').value = item.winrate
                document.getElementById('color').value = item.color
                document.getElementById('fechaDeAdicion').value = item.fechaDeAdicion
                document.getElementById('estrategia').value = item.estrategia
                //cambiar el valor del botón 
                document.getElementById('Guardar').value = 'Editar'
                //añadimos el id del documento 
                id = btn.id
                console.log(id)
            })
        })

    })
})
