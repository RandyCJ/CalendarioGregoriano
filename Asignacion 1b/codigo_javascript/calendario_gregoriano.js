/*
Asignación 1B
Estudiantes:
Randall Zumbado Huertas  - 2019082664
Jeremy Madrigal Portilla - 2019258245
Randy Conejo Juárez      - 2019066448
*/

//Diccionario que indica la cantidad de días de cada mes
let meses = new Map()
meses.set(0,0)
meses.set(1,[31, "Enero"])
meses.set(2,[28, "Febrero"])
meses.set(3,[31, "Marzo"])
meses.set(4,[30, "Abril"])
meses.set(5,[31, "Mayo"])
meses.set(6,[30, "Junio"])
meses.set(7,[31, "Julio"])
meses.set(8,[31, "Agosto"])
meses.set(9,[30, "Septiembre"])
meses.set(10,[31, "Octubre"])
meses.set(11,[30, "Noviembre"])
meses.set(12,[31, "Diciembre"])

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
    if (fecha[2] > meses.get(fecha[1])[0]){
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
    if (dia > meses.get(mes)[0]){
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
        dias += meses.get(mes)[0]
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

function crear_mes(indice_dia, ultimo_dia){
    /*
    Entradas: dos enteros refiriendose a
              el indice del primer día del mes
              el último día dispinible para ese mes
              tomando:
              0 = Domingo, 1 = Lunes, 2 = Martes, 3 = Miércoles,
              4 = Jueves, 5 = Viernes, 6 = Sábado
    Salidas: una lista, donde cada elemento es una linea del calendario
             del mes, que sería de 7x7
    */
   
    let dia = 1
    var matriz_mes = []
    var dias = ['D', 'L', 'K', 'M', 'J', 'V', 'S']
    matriz_mes.push(dias)
    for (var i=0; i<6; i++){ // se llena la matriz con 6 lineas de espacios blancos
        matriz_mes.push(Array(7).fill(" "))    
    }

    let linea = 1

    while (linea < 7){
        if (dia > ultimo_dia){
            break
        }
        matriz_mes[linea][indice_dia % 7] = dia.toString()
        indice_dia += 1
        dia += 1
        if (indice_dia % 7 == 0){
            linea += 1
        }
    }

    linea = ""
    let lista_lineas = []
    for (i=0; i<7; i++){
        for (var j=0; j<7; j++){
            if (matriz_mes[i][j].length == 1){
                linea += " "
            }
            linea += matriz_mes[i][j].toString() + ' '
        }
        lista_lineas.push(linea)
        linea = ""
    }
    return lista_lineas
}

function imprimir_3meses(mes1, mes2, mes3){
    /*
    Imprime tres meses en una fila seguidos
    Entradas: tres listas que contienen cada una el nombre del mes
              y un string con el calendario de ese mes
    Salidas: N/A
    */

    //Imprime los nombres de los meses
    console.log("\t\t" + mes1[0].padEnd(25) + mes2[0].padEnd(25) + mes3[0])

    //Imprime los dias de los meses
    for (var i=0; i<7; i++){
        console.log(mes1[1][i] + "  |  " + mes2[1][i] + "  |  " + mes3[1][i])
    }
    console.log("\n")
}

function imprimir_4x3(anno){
    /*
    Función que imprime el calendario de un año, en una matriz de 4x3
    Entradas: el año que quiera imprimir la totalidad del calendario
    Salidas: N/A
    */

    if (!Number.isInteger(anno)){
        console.log("El parámetro que introdució no es un entero")
        return -1
    }

    //Si el año es menor a nuestro rango se despliega un mensaje al usuario 
    if (anno < 1582){
        console.log("Debe introducir un año mayor a 1581\n")
        return -1
    }

    let dia_inicial = dia_primero_enero(anno) //Tiene el dia inicial del mes
    let lista_meses = []
    for (var i = 1; i<13; i++){
        let dia_final = meses.get(i)[0]
        if (i == 2 && bisiesto(anno)){
            dia_final += 1
        }
        lista_meses.push([meses.get(i)[1], crear_mes(dia_inicial, dia_final)])
        dia_inicial = (dia_inicial + dia_final) % 7 //se calcula el dia inicial del siguiente mes
    }
    // se imprimen las 4 filas de tres meses cada una
    console.log("\nCalendario del año " + anno + " D.C.\n")
    for (i=0; i<4; i++){
        imprimir_3meses(lista_meses[0], lista_meses[1], lista_meses[2])
        //se eliminan los tres primeros elementos, pues ya se imprimieron
        lista_meses.splice(0, 3)
    }
}

function dia_semana(fecha){
    /*
    Entradas: Una terna de números enteros, 
              corresponde a un año en primera posición,
              un mes en segunda posición
              y un día en la última posición
    Salidas: Número entero,
             Indica el dia de la semana tomando:
             0 = Domingo, 1 = Lunes, 2 = Martes, 3 = Miércoles,
             4 = Jueves, 5 = Viernes, 6 = Sábado
    */
    //Revisar primer dia del año
    let primer_dia = dia_primero_enero(fecha[0])
    
    //Calcula los días que pasarón hasta el día indicado
    let dias_pasados = dias_desde_primero_enero(fecha)
    
    //Verifica que no haya errores
    if (dias_pasados == -1){
        return -1
    }

    //Se retorna el dia de la semana correspondiente
    return (primer_dia + dias_pasados) % 7
}

function fecha_futura(fecha, n){
    /*  
    Entradas: Un entero refiriendose
              a la cantidad de días que se debe ir al futuro
              Una terna de números enteros
    Salidas: Una terna de números enteros
             que está n días en el futuro
    */

    //Revisa si n es un número
    if (!Number.isInteger(n)){
        console.log("Número de días debe ser un entero");
        return(fecha);
    }

    //Revisa si n es positivo
    if(n < 0){
        console.log("Número de días debe ser positivo");
        return(fecha);
    }

    //Revisa si la fecha introducida es válida
    if(!(fecha_es_valida(fecha))){
        return(fecha);
    }

    while (n > 0){
        fecha = dia_siguiente(fecha)
        n -= 1
    }
    
    return fecha
}


function ordena_fechas(fecha_a, fecha_b){
    /*
    Entradas: Dos ternas de números enteros
    Salidas: Dos ternas de números enteros de menor a mayor
    */

    //Guardamos datos de primera fecha
    let anno_a = fecha_a[0];
    let mes_a = fecha_a[1];
    let dia_a = fecha_a[2];

    //Guardamos datos de segunda fecha
    let anno_b = fecha_b[0];
    let mes_b = fecha_b[1];
    let dia_b = fecha_b[2];

    let fechas = [];

    //Revisamos por año
    if (anno_a < anno_b){
        fechas = [fecha_a, fecha_b];
    }else if(anno_b < anno_a){
        fechas = [fecha_b, fecha_a];
    }else{
        //Revisamos por mes
        if (mes_a < mes_b){
            fechas = [fecha_a, fecha_b];
        }else if(mes_b < mes_a){
            fechas = [fecha_b, fecha_a];
        }else{
            //Revisamos por día
            if (dia_a < dia_b){
                fechas = [fecha_a, fecha_b];
            }else{
                fechas = [fecha_b, fecha_a];
            }
        }
    }

    return fechas;
}

function dias_entre(fecha_a, fecha_b){
    /*
    Entradas: Dos ternas de números enteros
    Salidas: Un entero que indica días entre
             ambas fechas
    */

    //Validación para revisar si la fecha es válida
    if (!(fecha_es_valida(fecha_a)) || !(fecha_es_valida(fecha_b))){
        return(-1);
    }

    //Nos aseguramos que a sea una fecha anterior a b
    let fechas = ordena_fechas(fecha_a, fecha_b);

    //Sacamos todos los datos necesarios
    fecha_a = fechas[0];
    fecha_b = fechas[1];
    let anno_a = fecha_a[0];
    let anno_b = fecha_b[0];

    let dias = 0;
    //Sacamos los días del último año por revisar
    if(anno_a < anno_b){
        if (bisiesto(anno_a)){
            dias += 366 - dias_desde_primero_enero(fecha_a);
        }else{
            dias += 365 - dias_desde_primero_enero(fecha_a);
        }
        anno_a += 1;
    }

    //Sacamos los años entre uno y otro
    while(anno_a < anno_b){
        if (bisiesto(anno_a)){
            dias += 366;
        }else{
            dias += 365;
        }
        anno_a += 1;
    }

    //Cuando a sea menor simplemente se suman los días que faltan de b
    if (fecha_a[0] < anno_b){
        dias += dias_desde_primero_enero(fecha_b);
    }else{
        //Cuando sean el mismo año se le resta el menor al mayor
        dias += dias_desde_primero_enero(fecha_b) - dias_desde_primero_enero(fecha_a);
    }

    return dias;
}

// //########### PRUEBAS DE CÓDIGO

// // fechas
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
let fecha14 = [2016, 10, 15]
let fecha15 = [2016, 10, 9]

//Calendario
imprimir_4x3(1582)
imprimir_4x3(2020)

//dia_semana
console.log("\npruebas de dia_semana\n")
console.log("Esperado: 5 ; Obtenido: " + dia_semana(fecha12))
console.log("Esperado: 4 ; Obtenido: " + dia_semana(fecha9))
console.log("Esperado: 0 ; Obtenido: "  + dia_semana(fecha10))
console.log("Esperado: 1 ; Obtenido: "  + dia_semana(fecha11))
console.log("Esperado: 0 ; Obtenido: "  + dia_semana(fecha13))

//fecha_futura
console.log("\npruebas de fecha_futura\n")
console.log("Parámetros: " + fecha1 + ", 5" + " ; Esperado: (2021, 3, 5) ; Obtenido: " + fecha_futura(fecha1,5))
console.log("Parámetros: " + (fecha12) + ", 7" + " ; Esperado: (2022, 1, 7) ; Obtenido: " + (fecha_futura(fecha12,7)))
console.log("Parámetros: " + (fecha7) + ", 5" + " ; Esperado: Fecha no válida ('2020', 1, 4) ; Obtenido: " + (fecha_futura(fecha7,5)))
console.log("Parámetros: " + (fecha1) + ", '7'" + " ; Esperado: Número de días no válidos (2021, 2, 28) ; Obtenido: " + (fecha_futura(fecha1,"7")))
console.log("Parámetros: " + (fecha1) + ", -9" + " ; Esperado: Número de días negativos (2021, 2, 28) ; Obtenido: " + (fecha_futura(fecha1,-9)))
console.log("Parámetros: (2021, 12, 14), 6  ; Esperado: (2021, 12, 20) ; Obtenido: " + fecha_futura([2021, 12, 14], 6))
console.log("Parámetros: (2015, 1, 1), 2556  ; Esperado: (2021, 12, 31) ; Obtenido: " + fecha_futura([2015, 1, 1], 2556))

//ordena_fechas
console.log("\npruebas de ordena_fechas\n")
console.log("Parámetros: " + (fecha12) + ", " + (fecha13) + " ; Esperado: [(2021, 1, 31), (2021, 12, 31)] ; Obtenido: " + (ordena_fechas(fecha12,fecha13)))
console.log("Parámetros: " + (fecha13) + ", " + (fecha12) + " ; Esperado: [(2021, 1, 31), (2021, 12, 31)] ; Obtenido: " + (ordena_fechas(fecha13,fecha12)))
console.log("Parámetros: " + (fecha1) + ", " + (fecha3) + " ; Esperado: [(2021, 2, 28), (2021, 2, 29)] ; Obtenido: " + (ordena_fechas(fecha1,fecha3)))
console.log("Parámetros: " + (fecha3) + ", " + (fecha1) + " ; Esperado: [(2021, 2, 28), (2021, 2, 29)] ; Obtenido: " + (ordena_fechas(fecha3,fecha1)))
console.log("Parámetros: " + (fecha2) + ", " + (fecha1) + " ; Esperado: [(2020, 2, 28), (2021, 2, 28)] ; Obtenido: " + (ordena_fechas(fecha2,fecha1)))
console.log("Parámetros: " + (fecha1) + ", " + (fecha2) + " ; Esperado: [(2020, 2, 28), (2021, 2, 28)] ; Obtenido: " + (ordena_fechas(fecha1,fecha2)))

//dias_entre
console.log("\npruebas de dias_entre\n")
console.log("Parámetros: " + (fecha12) + ", " + (fecha13) + " ; Esperado: 334 ; Obtenido: " + (dias_entre(fecha12,fecha13)))
console.log("Parámetros: " + (fecha1) + ", " + (fecha14) + " ; Esperado: 1597 ; Obtenido: " + (dias_entre(fecha1,fecha14)))
console.log("Parámetros: " + (fecha15) + ", " + (fecha14) + " ; Esperado: 6 ; Obtenido: " + (dias_entre(fecha15,fecha14)))
console.log("Parámetros: " + (fecha14) + ", " + (fecha15) + " ; Esperado: 6 ; Obtenido: " + (dias_entre(fecha14,fecha15)))
console.log("Parámetros: " + (fecha14) + ", " + (fecha14) + " ; Esperado: 0 ; Obtenido: " + (dias_entre(fecha14,fecha14)))
console.log("Parámetros: " + (fecha7) + ", " + (fecha14) + " ; Esperado: Fecha inválida -1 ; Obtenido: " + (dias_entre(fecha7,fecha14)))
console.log("Parámetros: " + (fecha14) + ", " + (fecha7) + " ; Esperado: Fecha inválida -1 ; Obtenido: " + (dias_entre(fecha14,fecha7)))
console.log("Parámetros: (2015, 1, 1), (2021, 12, 31) ; Esperado: 2556 ; Obtenido: " + dias_entre([2015, 1, 1], [2021, 12, 31]))
