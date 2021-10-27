/*
Asignación 1A
Estudiantes:
Randall Zumbado Huertas  - 2019082664
Jeremy Madrigal Portilla - 2019258245
Randy Conejo Juárez      - 2019066448
*/

//Diccionario que indica la cantidad de días de cada mes
let meses = new Map()
meses.set(0,0)
meses.set(1,31)
meses.set(2,28)
meses.set(3,31)
meses.set(4,30)
meses.set(5,31)
meses.set(6,30)
meses.set(7,31)
meses.set(8,31)
meses.set(9,30)
meses.set(10,31)
meses.set(11,30)
meses.set(12,31)

function fecha_es_tupla(fecha){
    /*
    Entradas: recibe una tupla que contiene una fecha
    Salidas: True si la fecha es una tupla con números enteros positivos
             False en caso contrario
    */

    if (!Array.isArray(fecha)){
        console.log("Error: el la fecha no es de tipo tupla")
        return false
    }

    if (fecha.length != 3){
        console.log("Error: la tupla no es de largo 3")
        return false
    }

    for (let valor of fecha){
        if (Number.isInteger(valor)){
            if (valor <= 0){
                console.log("Error: algún número es menor o igual a 0")
                return false
            }
        }
        else {
            console.log("Error: algún elemento de la tupla no es un número")
            return false
        }
    }

    return true
}

function bisiesto(anno) {
    /*
    Entradas: Un número entero, 
              corresponde a un año en el rango permitido
    Salidas: True si el año es bisiesto
             False en caso contrario
    */

    let res = false

    //Se revisa que sea un número y un año válido
    if (Number.isInteger(anno)){
        if (anno < 1582){
            console.log("El año introducido debe ser mayor al 1581")
            return res
        }
    }else{
        console.log("El año introducido debe ser un número entero")
        return res
    }

    //El código presentado sigue el algoritmo descrito en la investigación
    //Todos los años divisibles entre 4
    if (anno % 4 == 0) {
        //Que no sean divisibles entre 100
        //Se aplica lógica opuesta para revisar los divisibles entre 400
        if (anno % 100 == 0) {
            //Pero sí los divisibles entre 400
            if (anno % 400 == 0) {
                res = true
            }
        }else{
            res = true
        }
    }

    return res
}


function fecha_es_valida(fecha){
    /*
    Entradas: Una terna de números enteros, 
              corresponde a un año en primera posición,
              un mes en segunda posición 
    Salidas: True si la fecha es válida
             False en caso contrario
    */
    // si no es tupla error
    if (!(fecha_es_tupla(fecha))){
        return false
    }

    // se revisa que el mes no se pase de 12
    if (fecha[1] > 12){
        console.log("La fecha no es valida")
        return false
    }

    // se revisa que el dia no se pase del maximo del diccionario
    if (fecha[2] > meses.get(fecha[1])){
        if (bisiesto(fecha[0]) && fecha[1] == 2 && fecha[2] == 29){
            return true
        }
        console.log("La fecha no es valida")
        return false
    }
    return true
}


function dia_siguiente(fecha){
    /*
    Entradas: Recibe una fecha válida (una tupla con tres números positivos)
    Salidas: Retorna la fecha siguiente al día que recibió de parámetro
    */

    if (!(fecha_es_valida(fecha))){
        return [-1]
    }

    let anno = fecha[0]
    let mes = fecha[1]
    let dia = fecha[2] + 1

    // Si el dia se pasa del maximo del mes, se cambia de mes
    if (dia > meses.get(mes)){
        let tmp = dia
        dia = 1
        mes += 1

        // pero si el dia se cambia al 29 de febrero en bisiesto, no pasa nada
        if (bisiesto(anno) && fecha[1] == 2 && tmp == 29){
            dia = 29
            mes = 2
        }
    }

    if (mes == 13){
        mes = 1
        anno += 1
    }

    return [anno, mes, dia]
}

function dias_desde_primero_enero(fecha){
    /*
    Entradas: Una terna de números enteros, 
              corresponde a un año en primera posición,
              un mes en segunda posición
              y un día en la última posición
    Salidas: Número entero,
             Indica los días pasados desde el primero de enero
    */

    //Se revisa si es una fecha válida
    if (!(fecha_es_valida(fecha))){
        return -1
    }

    //Sacamos valores de la tupla
    let anno = fecha[0]
    let mes = fecha[1] - 1
    let dia = fecha[2]

    let dias = dia
    while (mes > 0){
        dias += meses.get(mes)
        mes -= 1
    }

    //Un día más en caso de ser bisiesto
    if (bisiesto(anno) && fecha[1] > 2){
        dias += 1
    }
    
    //Se retorna un día menos porque no cuenta el propio día
    return dias - 1
}

function dia_primero_enero(anno){
    /*
    Entradas: Un entero refiriendose
              al año que se quiere averiguar
              el día en que se comenzó
              tomando:
              0 = Domingo, 1 = Lunes, 2 = Martes, 3 = Miércoles,
              4 = Jueves, 5 = Viernes, 6 = Sábado
    Salidas: Número entero,
             Indica el primer día de cada año
             Si se da un año menor a 1580 retorna un -1 indicando error
    */
    let anno_inicial = 1582 //Rango inicial de nuestra función para calcular
    let cantidad_bisiestos = 0 //Cantidad de años bisiestos
    let dia = 5 //Día inicial en este caso Martes de 1580
    
    if (!Number.isInteger(anno)){
        console.log("Debe introducir un número entero\n")
        return -1
    }

    //Si el año es menor a nuestro rango se despliega un mensaje al usuario 
    if (anno < 1582){
        console.log("Debe introducir un año mayor o igual a 1582\n")
        return -1
    }
    //Verifica cuantos bisiestos hay desde el año inicial hasta el del parámetro
    while (anno > anno_inicial){
        
        //Verifica bisiesto
        if (bisiesto(anno_inicial)){
            
            cantidad_bisiestos += 1
        }
        anno_inicial+=1
    }
   //Calcula cuantos días semanales se corrieron por cada año
   let corrimiento_dias = (anno-1582) % 7 + cantidad_bisiestos

    //Realiza el cálculo para saber el día exacto tomando en cuenta el corrimiento de días
    dia = (dia + corrimiento_dias) % 7

    return dia
}

//########### PRUEBAS DE CÓDIGO

// fechas
let fecha1 = [2021, 2, 28]
let fecha2 = [2020, 2, 28]
let fecha3 = [2021, 2, 29]
let fecha4 = [2021, 12, 31]
let fecha5 = [2020, 9, 30]
let fecha6 = [-2020, 1, 4]
let fecha7 = ["2020", 1, 4]
let fecha8 = [2020, 1, 4, 4]
let fecha9 = [2020, 12, 31]
let fecha10 = [2020, 3, 1]
let fecha11 = [2021, 3, 1]
let fecha12 = [2021, 12, 31]
let fecha13 = [2021, 1, 31]

// fecha_es_tupla
console.log("\npruebas de fecha_es_tupla\n")
console.log("Parámetro: " + fecha1      + " ; Esperado: True ; Obtenido: "  + fecha_es_tupla(fecha1))
console.log("Parámetro: " + [123,45,13] + " ; Esperado: True ; Obtenido: "  + fecha_es_tupla([123,45,13]))
console.log("Parámetro: " + fecha6      + " ; Esperado: False ; Obtenido: " + fecha_es_tupla(fecha6))
console.log("Parámetro: " + fecha7      + " ; Esperado: False ; Obtenido: " + fecha_es_tupla(fecha7))
console.log("Parámetro: " + fecha8      + " ; Esperado: False ; Obtenido: " + fecha_es_tupla(fecha8))

//fecha_es_valida
console.log("\npruebas de fecha es valida\n")
console.log("Parámetro: 1890 ; Esperado: tupla no valida y False; Obtenido: " + fecha_es_valida(1890))
console.log("Parámetro: [2341] ; Esperado: tupla no valida y False; Obtenido: " + fecha_es_valida([2341]))
console.log("Parámetro: " + fecha1 + " ; Esperado: True ; Obtenido: " + fecha_es_valida(fecha1))
console.log("Parámetro: " + fecha3 + " ; Esperado: False ; Obtenido: " + fecha_es_valida(fecha3))
console.log("Parámetro: " + fecha8 + " ; Esperado: False ; Obtenido: " + fecha_es_valida((fecha8)))
console.log("Parámetro: " + [223411,1324,14412] + " ; Esperado: False ; Obtenido: " + fecha_es_valida([223411,1324,14412]))

// dia_siguiente
console.log("\npruebas de dia_siguiente\n")
console.log("Parámetro: " + fecha1 + " ; Esperado: (2021, 3, 1)    ; Obtenido: " + dia_siguiente(fecha1))
console.log("Parámetro: " + fecha2 + " ; Esperado: (2020, 2, 29)   ; Obtenido: " + dia_siguiente(fecha2))
console.log("Parámetro: " + fecha3 + " ; Esperado: fecha no valida ; Obtenido: " + dia_siguiente(fecha3))
console.log("Parámetro: " + fecha4 + " ; Esperado: (2022, 1, 1)    ; Obtenido: " + dia_siguiente(fecha4))
console.log("Parámetro: " + fecha5 + " ; Esperado: (2020, 10, 1) ; Obtenido: "   + dia_siguiente(fecha5))
console.log("Parámetro: " + fecha6 + " ; Esperado: tupla no valida ; Obtenido: " + dia_siguiente(fecha6))
console.log("Parámetro: " + fecha7 + " ; Esperado: tupla no valida ; Obtenido: " + dia_siguiente(fecha7))
console.log("Parámetro: " + fecha8 + " ; Esperado: tupla no valida ; Obtenido: " + dia_siguiente(fecha8))

// dias_desde_primero_enero
console.log("\npruebas de dias_desde_primero_enero\n")
console.log("Parámetro: " + fecha12 + " ; Esperado: 364 ; Obtenido: " + dias_desde_primero_enero(fecha12))
console.log("Parámetro: " + fecha9 + " ; Esperado: 365 ; Obtenido: "  + dias_desde_primero_enero(fecha9))
console.log("Parámetro: " + fecha10 + " ; Esperado: 60 ; Obtenido: "  + dias_desde_primero_enero(fecha10))
console.log("Parámetro: " + fecha11 + " ; Esperado: 59 ; Obtenido: "  + dias_desde_primero_enero(fecha11))
console.log("Parámetro: " + fecha13 + " ; Esperado: 30 ; Obtenido: "  + dias_desde_primero_enero(fecha13))

// bisiesto
console.log("\npruebas de bisiesto\n")
console.log("Parámetro: '1890' ; Esperado: no int y False; Obtenido: " + bisiesto("1890"))
console.log("Parámetro:  1581  ; Esperado: menor a 1582 y False; Obtenido: " + bisiesto(1581))
console.log("Parámetro:  2012  ; Esperado: True ; Obtenido: " + bisiesto(2012))
console.log("Parámetro:  2013  ; Esperado: False ; Obtenido: " + bisiesto(2013))
console.log("Parámetro:  1600  ; Esperado: True ; Obtenido: " + bisiesto(1600))
console.log("Parámetro:  1900  ; Esperado: False ; Obtenido: " + bisiesto(1900))

// dia_primero_enero
console.log("\npruebas de dia_primero_enero\n")
console.log("Parámetro: '1982' ; Esperado: no int ; Obtenido: " + dia_primero_enero("1982"))
console.log("Parámetro:  1982  ; Esperado: 5      ; Obtenido: " + dia_primero_enero(1982))
console.log("Parámetro:  1983  ; Esperado: 6      ; Obtenido: " + dia_primero_enero(1983))
console.log("Parámetro:  1989  ; Esperado: 0      ; Obtenido: " + dia_primero_enero(1989))
console.log("Parámetro:  2021  ; Esperado: 5      ; Obtenido: " + dia_primero_enero(2021))
console.log("Parámetro:  2020  ; Esperado: 3      ; Obtenido: " + dia_primero_enero(2020))