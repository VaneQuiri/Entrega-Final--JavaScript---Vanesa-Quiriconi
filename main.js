//Declaracion del Array_electro
let ArraySeleccion = Array();

//Declaracion de variables
const url = "./data.json";
const key_lista = "lista"
let bandera = "";
let horas;
let caja = "";
let j;
let seleccionElectro;
let total ="";
let error;


//TOma de nodo
let sel = document.getElementById("storage");

//Al incio de la pagina
cargarBotones(url)  
tomarItemsCargados ();
crearModal(); 

//Agregar al localStorage (anterior mas nuevo)
let electroStorage = JSON.parse(localStorage.getItem(key_lista))
if (electroStorage !== null){
    cargarLocalStorage() 
}  

//Evento carga de horas de uso y verificar dato ingresado
let horasUso = document.getElementById("horas_uso");
horasUso.addEventListener("input", ()=>{
   horas=parseInt(horasUso.value)
    verificarHoras(horas)
})

//Cerrar MODAL Formulario
let btnClose = document.getElementById("close_modal")
btnClose.addEventListener("click", (e) => {
    if(e.target.classList.contains("close_modal")){
        modalAdd.style.display ="none"
    }
})

//Evento Click en boton Cargar
let btnCarga = document.getElementById("boton_carga");
btnCarga.addEventListener("click", () =>{

    //Creacion de Array de Electrodomenticos Seleccionados
    if(verificarHoras(horas)){
            for(let i=0; i<ArrayElectro.length; i++){
                if(ArrayElectro[i].nombre === seleccionElectro.value){
                    j = ArraySeleccion.length;
                    j++;
                    ArraySeleccion.push (new objetoElectro (ArrayElectro[i].clase, ArrayElectro[i].nombre, ArrayElectro[i].kwh, horas, j));
                    console.log(ArraySeleccion)
                    
                    //Mostrar Electrodomesticos Seleccionados en el HTML
                    let electroCargado = document.createElement("li");
                    electroCargado.innerText = seleccionElectro.value;
                    sel.appendChild(electroCargado);
                        
                    //Setear Electrodomesticos Seleccionados a LocalSotrage
                    localStorage.setItem(key_lista,JSON.stringify(ArraySeleccion))
                    seleccionElectro.value = " ";
                    horasUso.value = " ";
                        
                    //Mensaje de carga de Electrodomentico
                    Swal.fire('Se Cargo el Electrodomestico')
                }
            }
    }else{
        Swal.fire('Intenta de nuevo');
    }
})   
  

//Evento Click en boton Calcular
let btnCalcular = document.getElementById("boton_calcular");
btnCalcular.addEventListener("click", () => {
    resumen(ArraySeleccion)
})


//Evento Limpiar la lista de seleccionador
let limpiar = document.getElementById("limpiar_lista");
limpiar.addEventListener("click", () =>{
    localStorage.removeItem(key_lista);
    location.reload();
})