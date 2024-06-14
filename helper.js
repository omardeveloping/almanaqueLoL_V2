function limpiar(){
    form = document.getElementById("bestiario-form");
    form.reset();
}

function verificar(){
    numeroWinrate = document.querySelector("#winrate");
    textoWinrate = document.querySelector("#info-input-winrate");
    if (numeroWinrate.value > 100 || numeroWinrate.value < 0){
        textoWinrate.classList.add('is-invalid')
        textoWinrate.innerHTML = '<span class="badge bg-danger">El winrate no puede ser menor a 0 o mayor a 100</span>'
        valor = false
        return valor
    }
    else{
        textoWinrate.classList.remove('is-invalid')
        textoWinrate.innerHTML = '<span class="badge bg-danger"></span>'
        valor = true
        return valor
    }
}