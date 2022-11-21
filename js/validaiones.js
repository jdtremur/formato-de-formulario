export function validar(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML='';
    }
    else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML=mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores=[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesError={
    nombre:{
        valueMissing:"El campo Nombre no puede estar vacío"
    },
    email:{
        valueMissing:"El campo email no puede estar vacío",
        typeMismatch:"El correo no es válido"
    },
    contraseña:{
        valueMissing:"El campo Contraseña no puede estar vacío",
        patternMismatch:"A menos 6 caracteres, maximo 12, debe contener una letra mayuscula, una minuscula y no debe contener caracteres especiales"
    },
    nacimiento:{
        valueMissing:"El campo Fecha de nacimiento no puede estar vacío",
        customError:"Debes tener al menos 18 años"
    },
    numero:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números"
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La direccion debe contener de 10 a 40 caracteres"
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe contener como minimo 4 caracteres"
    },
    departamento:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El departamento debe contener como minimo 4 caracteres"
    }
}
const validadores ={
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje=""
    tipoDeErrores.forEach(error =>{
        if(input.validity[error]){
            console.log(mensajesError.direccion.value)
            mensaje = mensajesError[tipoDeInput][error];
        }
    })
    return mensaje;
}

 function validarNacimiento(input){
    const fechaCliente =new Date(input.value);
    let mensaje='';
    if(!mayorDeEdad(fechaCliente)){
        mensaje='Debes tener al menos 18 años';
    }

    input.setCustomValidity(mensaje);
 }

 function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciFechas = new Date(
        fecha.getUTCFullYear()+18,
        fecha.getUTCMonth(),
        fecha.getUTCDate())
    return diferenciFechas <= fechaActual;
 }