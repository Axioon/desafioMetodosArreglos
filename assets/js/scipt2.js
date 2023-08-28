const ingresar = document.querySelector("#ingreso");
const agregar = document.querySelector("#agregar");
const identificacion = document.querySelector("#identificacion");
const tarea = document.querySelector("#tarea");

const tareaAnotadas = [{ id: 1, tarea: "Pagar luz" },{ id: 2, tarea: "Pagar Agua" },{ id:3, tarea: "pagar gas" }];

document.addEventListener("DOMContentLoaded", () => {
  actualizarLista();

  agregar.addEventListener("click", ingresarTarea);
});

function ingresarTarea() {
  const nuevaTarea = ingresar.value;

  if (nuevaTarea === "" || !isNaN(nuevaTarea)) {
    console.log("Ingresa algo válido");
  } else {
    tareaAnotadas.push({ id: Date.now(), tarea: nuevaTarea });
    console.log(tareaAnotadas);

    ingresar.value = "";

    actualizarLista();
  }
}

function borrar(id) {
  const index = tareaAnotadas.findIndex((ele) => ele.id === id);
  tareaAnotadas.splice(index, 1);

  actualizarLista();
}
function actualizarLista() {
  actualizarIdentificador();
  actualizarTarea();

  tareaAnotadas.forEach((tareaAnotada) => {
    const nuevoP = document.createElement("p");
    nuevoP.classList.add('nuvid')
    nuevoP.innerHTML = `
      ${tareaAnotada.tarea} <input type="checkbox" name="opcion" value="valor" class="check"> <button onclick="borrar(${tareaAnotada.id})" class="but">Eliminar</button> <hr>
    `;
    tarea.appendChild(nuevoP);

    const nuevaId = document.createElement("p");
    nuevaId.classList.add('nuvidd')
    nuevaId.textContent = ` ${tareaAnotada.id}`;
    identificacion.appendChild(nuevaId);

    const miCasilla = nuevoP.querySelector(".check");
    miCasilla.addEventListener("change", () => marcado(miCasilla, tareaAnotada.id));
    miCasilla.checked = tareaAnotada.marcada || false;
  });

  actualizarRealizadas();
  document.querySelector("#total").textContent = tareaAnotadas.length;
}

function marcado(casilla, id) {
  const tareaMarcada = tareaAnotadas.find((tareaAnotada) => tareaAnotada.id === id);
  if (tareaMarcada) {
    tareaMarcada.marcada = casilla.checked;
  }
  
  actualizarRealizadas();
}

function actualizarRealizadas() {
  const marcados = tareaAnotadas.filter(tarea => tarea.marcada);
  document.querySelector("#realizadas").textContent = marcados.length;
}

function actualizarTarea() {
  while (tarea.firstChild) {
    tarea.removeChild(tarea.firstChild);
  }
}

function actualizarIdentificador() {
  while (identificacion.firstChild) {
    identificacion.removeChild(identificacion.firstChild);
  }
}