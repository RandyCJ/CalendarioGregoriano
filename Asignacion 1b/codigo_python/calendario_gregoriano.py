'''
Asignación 1B
Estudiantes:
Randall Zumbado Huertas  - 2019082664
Jeremy Madrigal Portilla - 2019258245
Randy Conejo Juárez      - 2019066448
'''

#Diccionario que indica la cantidad de días de cada mes
meses = {
0  : 0,  #Para validar último mes
1  : [31, "Enero"], #Enero
2  : [28, "Febrero"], #Febrero no bisiesto
3  : [31, "Marzo"], #Marzo
4  : [30, "Abril"], #Abril
5  : [31, "Mayo"], #Mayo
6  : [30, "Junio"], #Junio
7  : [31, "Julio"], #Julio
8  : [31, "Agosto"], #Agosto
9  : [30, "Septiembre"], #Septiembre
10 : [31, "Octubre"], #Octubre
11 : [30, "Noviembre"], #Noviembre
12 : [31, "Diciembre"] #Diciembre
}


def fecha_es_tupla(fecha):
    '''
    Entradas: recibe una tupla que contiene una fecha
    Salidas: True si la fecha es una tupla con números enteros positivos
             False en caso contrario
    '''
    if not(isinstance(fecha, tuple)):
        print("Error: el la fecha no es de tipo tupla")
        return False

    if len(fecha) != 3:
        print("Error: la tupla no es de largo 3")
        return False
    
    for valor in fecha:
        if isinstance(valor, int):
            if (valor <= 0):
                print("Error: algún número es menor o igual a 0")
                return False
        else:
            print("Error: algún elemento de la tupla no es un número")
            return False
    return True

def bisiesto(anno):
    '''
    Entradas: Un número entero, 
              corresponde a un año en el rango permitido
    Salidas: True si el año es bisiesto
             False en caso contrario
    '''

    res = False

    #Se revisa que sea un número y un año válido
    if isinstance(anno, int):
        if anno < 1582:
            print("El año introducido debe ser mayor al 1581")
            return res
    else:
        print("El año introducido debe ser un número entero")
        return res

    #El código presentado sigue el algoritmo descrito en la investigación
    #Todos los años divisibles entre 4
    if anno % 4 == 0:
        #Que no sean divisibles entre 100
        #Se aplica lógica opuesta para revisar los divisibles entre 400
        if anno % 100 == 0:
            #Pero sí los divisibles entre 400
            if anno % 400 == 0:
                res = True
        else:
            res = True
    return res

def fecha_es_valida(fecha):
    '''
    Entradas: Una terna de números enteros, 
              corresponde a un año en primera posición,
              un mes en segunda posición 
    Salidas: True si la fecha es válida
             False en caso contrario
    '''
    #Si la fecha no es una tupla error
    if not(fecha_es_tupla(fecha)):
        return False

    # se revisa que el mes no se pase de 12
    if fecha[1] > 12:
        print("La fecha no es valida")
        return False

    # se revisa que el dia no se pase del maximo del diccionario
    if fecha[2] > meses[fecha[1]][0]:
        if bisiesto(fecha[0]) and fecha[1] == 2 and fecha[2] == 29:
            return True
        print("La fecha no es valida")
        return False
    return True

def dia_siguiente(fecha):
    '''
    Entradas: Recibe una fecha válida (una tupla con tres números positivos)
    Salidas: Retorna la fecha siguiente al día que recibió de parámetro
    '''

    if not(fecha_es_valida(fecha)):
        return -1
    
    anno = fecha[0]
    mes = fecha[1]
    dia = fecha[2] + 1

    # Si el dia se pasa del maximo del mes, se cambia de mes
    if dia > meses[mes][0]:
        tmp = dia
        dia = 1
        mes += 1

        # pero si el dia se cambia al 29 de febrero en bisiesto, no pasa nada
        if (bisiesto(anno) and fecha[1] == 2 and tmp == 29):
            dia = 29
            mes = 2
    # Si se cambia al mes 13, entonces se pasa al primero de enero del siguiente año
    if (mes == 13):
        mes = 1
        anno += 1

    return (anno, mes, dia)

def dias_desde_primero_enero(fecha):
    '''
    Entradas: Una terna de números enteros, 
              corresponde a un año en primera posición,
              un mes en segunda posición
              y un día en la última posición
    Salidas: Número entero,
             Indica los días pasados desde el primero de enero
    '''

    #Se revisa si es una fecha válida
    if not(fecha_es_valida(fecha)):
        return -1

    #Sacamos valores de la tupla
    anno = fecha[0]
    mes = fecha[1] - 1
    dia = fecha[2]

    #Contador que almacena resultado
    dias = dia
    while mes > 0:
        dias += meses[mes][0]
        mes -= 1
    
    #Un día más en caso de ser bisiesto
    if bisiesto(anno) and fecha[1] > 2:
        dias += 1

    return dias - 1

def dia_primero_enero(anno):
    '''
    Entradas: Un entero refiriendose
              al año que se quiere averiguar
              el día en que se comenzó
              tomando:
              0 = Domingo, 1 = Lunes, 2 = Martes, 3 = Miércoles,
              4 = Jueves, 5 = Viernes, 6 = Sábado
    Salidas: Número entero,
             Indica el primer día de cada año
             Si se da un año menor a 1580 retorna un -1 indicando error
    '''
    anno_inicial = 1582 #Rango inicial de nuestra función para calcular
    cantidad_bisiestos = 0 #Cantidad de años bisiestos
    dia = 5 #Día inicial en este caso Viernes de 1582

    if not(isinstance(anno, int)):
        print ("Debe introducir un número entero")
        return -1

    #Si el año es menor a nuestro rango se despliega un mensaje al usuario 
    if anno < 1582:
        print ("Debe introducir un año mayor o igual a 1582")
        return -1
    
    #Verifica cuantos bisiestos hay desde el año inicial hasta el del parámetro
    while anno_inicial < anno:
        
        #Verifica bisiesto
        if bisiesto(anno_inicial):
            
            cantidad_bisiestos += 1
        
        anno_inicial+=1

    #Calcula cuantos días semanales se corrieron por cada año
    corrimiento_dias = (anno-1582) % 7 + cantidad_bisiestos

    #Realiza el cálculo para saber el día exacto tomando en cuenta el corrimiento de días
    dia = (dia + corrimiento_dias) % 7

    return dia

def crear_mes(indice_dia, ultimo_dia):
    '''
    Entradas: dos enteros refiriendose a
              el indice del primer día del mes
              el último día dispinible para ese mes
              tomando:
              0 = Domingo, 1 = Lunes, 2 = Martes, 3 = Miércoles,
              4 = Jueves, 5 = Viernes, 6 = Sábado
    Salidas: una lista, donde cada elemento es una linea del calendario
             del mes, que sería de 7x7
    '''
    dia = 1
    matriz_mes = [['D', 'L', 'K', 'M', 'J', 'V', 'S']]
    dias_del_mes = [[" " for _ in range(0, 7)] for _ in range(0, 6)] # 6 Sublistas con 7 espacios en blancos
    matriz_mes += dias_del_mes
    linea = 1

    while linea < 7:        
        if dia > ultimo_dia:
            break
        matriz_mes[linea][indice_dia % 7] = str(dia)
        indice_dia += 1
        dia += 1
        if indice_dia % 7 == 0:
            linea += 1

    linea = ""
    lista_lineas = []
          
    for i in matriz_mes:
        for j in i:
            if len(j) == 1:
                linea += " "
            linea += str(j) + ' '
        lista_lineas.append(linea)
        linea = ""

    return lista_lineas

def imprimir_3meses(mes1, mes2, mes3):
    '''
    Imprime tres meses en una fila seguidos
    Entradas: tres listas que contienen cada una el nombre del mes
              y un string con el calendario de ese mes
    Salidas: N/A
    '''

    print("\t", end="")
    print(f'{mes1[0]:<25}', end="")
    print(f'{mes2[0]:<24}', end="")
    print(mes3[0], end="\n")

    for i in range(0, 7):
        print(mes1[1][i] + "  |  " + mes2[1][i] + "  |  " + mes3[1][i])
    print()

def imprimir_4x3(anno):
    '''
    Función que imprime el calendario de un año, en una matriz de 4x3
    Entradas: el año que quiera imprimir todo el calendario
    Salidas: N/A
    '''

    if not(isinstance(anno, int)):
        print("El parámetro que introdució no es un entero")
        return -1
    if anno < 1582:
        print("El año que introdució debe ser mayor a 1581")
        return -1

    dia_inicial = dia_primero_enero(anno) #Tiene el dia inicial del mes
    lista_meses = []
    for i in range(1, 13):
        dia_final = meses[i][0]
        if i == 2 and bisiesto(anno):
            dia_final += 1
        lista_meses.append([meses[i][1], crear_mes(dia_inicial, dia_final)])
        dia_inicial = (dia_inicial + dia_final) % 7 #se calcula el dia inicial del siguiente mes

    # se imprimen las 4 filas de tres meses cada una
    print("\nCalendario del año " + str(anno) + " D.C.\n")
    for i in range(0, 4):
        imprimir_3meses(lista_meses[0], lista_meses[1], lista_meses[2])
        #se eliminan los tres primeros elementos, pues ya se imprimieron
        lista_meses = lista_meses[3:]
    
    return 0

def dia_semana(fecha):
    '''
    Entradas: Una terna de números enteros, 
              corresponde a un año en primera posición,
              un mes en segunda posición
              y un día en la última posición
    Salidas: Número entero,
             Indica el dia de la semana tomando:
             0 = Domingo, 1 = Lunes, 2 = Martes, 3 = Miércoles,
             4 = Jueves, 5 = Viernes, 6 = Sábado
    '''
    if not(fecha_es_valida(fecha)):
        return -1

    #Revisar primer dia del año
    primer_dia = dia_primero_enero(fecha[0])
    
    #Calcula los días que pasarón hasta el día indicado
    dias_pasados = dias_desde_primero_enero(fecha)
    
    #Verifica que no haya errores
    if dias_pasados == -1 or primer_dia == -1:
        return -1

    #Obtiene el día de la semana
    nombre_dia = (primer_dia + dias_pasados) % 7
    
    return nombre_dia

def fecha_futura(fecha, n):
    '''
    Entradas: Un entero refiriendose
              a la cantidad de días que se debe ir al futuro
              Una terna de números enteros
    Salidas: Una terna de números enteros
             que está n días en el futuro
    '''
    
    #Revisa si n es un número
    if not(isinstance(n, int)):
        print("Número de días debe ser un entero")
        return(fecha)

    #Revisa si n es positivo
    if n < 0:
        print("Número de días debe ser positivo")
        return(fecha)
    
    #Revisa si la fecha introducida es válida
    if not(fecha_es_valida(fecha)):
        return(fecha)
    
    while n > 0:
        fecha = dia_siguiente(fecha)
        n -= 1

    return fecha

def ordena_fechas(fecha_a, fecha_b):
    '''
    Entradas: Dos ternas de números enteros
    Salidas: Dos ternas de números enteros de menor a mayor
    '''

    #Guardamos datos de primera fecha
    anno_a = fecha_a[0]
    mes_a = fecha_a[1]
    dia_a = fecha_a[2]

    #Guardamos datos de segunda fecha
    anno_b = fecha_b[0]
    mes_b = fecha_b[1]
    dia_b = fecha_b[2]

    fechas = []

    #Revisamos por año
    if anno_a < anno_b:
        fechas = [fecha_a, fecha_b]
    elif anno_b < anno_a:
        fechas = [fecha_b, fecha_a]
    else:
        #Revisamos por mes
        if mes_a < mes_b:
            fechas = [fecha_a, fecha_b]
        elif mes_b < mes_a:
            fechas = [fecha_b, fecha_a]
        else:
            #Revisamos por día
            if dia_a < dia_b:
                fechas = [fecha_a, fecha_b]
            else:
                fechas = [fecha_b, fecha_a]

    return fechas


def dias_entre(fecha_a, fecha_b):
    '''
    Entradas: Dos ternas de números enteros
    Salidas: Un entero que indica días entre
             ambas fechas
    '''

    #Validación para revisar si la fecha es válida
    if not(fecha_es_valida(fecha_a)) or not(fecha_es_valida(fecha_b)):
        return -1
    
    #Nos aseguramos que a sea una fecha anterior a b
    fechas = ordena_fechas(fecha_a, fecha_b)

    #Sacamos todos los datos necesarios
    fecha_a = fechas[0]
    fecha_b = fechas[1]
    anno_a = fecha_a[0]
    anno_b = fecha_b[0]

    dias = 0
    #Sacamos los días del último año por revisar
    if anno_a < anno_b:
        if bisiesto(anno_a):
            dias += 366 - dias_desde_primero_enero(fecha_a)
        else:
            dias += 365 - dias_desde_primero_enero(fecha_a)
        anno_a += 1

    #Sacamos los años entre uno y otro
    while anno_a < anno_b:
        if bisiesto(anno_a):
            dias += 366
        else:
            dias += 365
        anno_a += 1

    #Cuando a sea menor simplemente se suman los días que faltan de b
    if fecha_a[0] < anno_b:
        dias += dias_desde_primero_enero(fecha_b)
    else:
        #Cuando sean el mismo año se le resta el menor al mayor
        dias += dias_desde_primero_enero(fecha_b) - dias_desde_primero_enero(fecha_a)

    return dias


# fechas
fecha1 = (2021, 2, 28)
fecha2 = (2020, 2, 28)
fecha3 = (2021, 2, 29)
fecha4 = (2021, 12, 31)
fecha5 = (2020, 9, 30)
fecha6 = (-2020, 1, 4)
fecha7 = ("2020", 1, 4)
fecha8 = (2020, 1, 4, 4)
fecha9 = (2020, 12, 31)
fecha10 = (2020, 3, 1)
fecha11 = (2021, 3, 1)
fecha12 = (2021, 12, 31)
fecha13 = (2021, 1, 31)
fecha14 = (2016, 10, 15)
fecha15 = (2016, 10, 9)

#Calendarios
imprimir_4x3(1582)#El primer dia del año debe ser Viernes
imprimir_4x3(2020)#El primer dia del año debe ser Miercoles, y Febrero bisiesto

#dia_semana
print("\npruebas de dia_semana\n")
print("Parámetros: + " + str(fecha12) + "; Esperado: 5 ; Obtenido: " + str(dia_semana(fecha12)))
print("Parámetros: + " + str(fecha9) + "; Esperado: 4 ; Obtenido: " + str(dia_semana(fecha9)))
print("Parámetros: + " + str(fecha10) + "; Esperado: 0 ; Obtenido: "  + str(dia_semana(fecha10)))
print("Parámetros: + " + str(fecha11) + "; Esperado: 1 ; Obtenido: "  + str(dia_semana(fecha11)))
print("Parámetros: + " + str(fecha13) + "; Esperado: 0 ; Obtenido: "  + str(dia_semana(fecha13)))

#fecha_futura
print("\npruebas de fecha_futura\n")
print("Parámetros: " + str(fecha1) + ", 5" + " ; Esperado: (2021, 3, 5) ; Obtenido: " + str(fecha_futura(fecha1,5)))
print("Parámetros: " + str(fecha12) + ", 7" + " ; Esperado: (2022, 1, 7) ; Obtenido: " + str(fecha_futura(fecha12,7)))
print("Parámetros: " + str(fecha7) + ", 5" + " ; Esperado: Fecha no válida ('2020', 1, 4) ; Obtenido: " + str(fecha_futura(fecha7,5)))
print("Parámetros: " + str(fecha1) + ", '7'" + " ; Esperado: Número de días no válidos (2021, 2, 28) ; Obtenido: " + str(fecha_futura(fecha1,"7")))
print("Parámetros: " + str(fecha1) + ", -9" + " ; Esperado: Número de días negativos (2021, 2, 28) ; Obtenido: " + str(fecha_futura(fecha1,-9)))
print("Parámetros: (2021, 12, 14), 6  ; Esperado: (2021, 12, 20) ; Obtenido: " + str(fecha_futura((2021, 12, 14), 6)))
print("Parámetros: (2015, 1, 1), 2556  ; Esperado: (2021, 12, 31) ; Obtenido: " + str(fecha_futura((2015, 1, 1), 2556)))

#ordena_fechas
print("\npruebas de ordena_fechas\n")
print("Parámetros: " + str(fecha12) + ", " + str(fecha13) + " ; Esperado: [(2021, 1, 31), (2021, 12, 31)] ; Obtenido: " + str(ordena_fechas(fecha12,fecha13)))
print("Parámetros: " + str(fecha13) + ", " + str(fecha12) + " ; Esperado: [(2021, 1, 31), (2021, 12, 31)] ; Obtenido: " + str(ordena_fechas(fecha13,fecha12)))
print("Parámetros: " + str(fecha1) + ", " + str(fecha3) + " ; Esperado: [(2021, 2, 28), (2021, 2, 29)] ; Obtenido: " + str(ordena_fechas(fecha1,fecha3)))
print("Parámetros: " + str(fecha3) + ", " + str(fecha1) + " ; Esperado: [(2021, 2, 28), (2021, 2, 29)] ; Obtenido: " + str(ordena_fechas(fecha3,fecha1)))
print("Parámetros: " + str(fecha2) + ", " + str(fecha1) + " ; Esperado: [(2020, 2, 28), (2021, 2, 28)] ; Obtenido: " + str(ordena_fechas(fecha2,fecha1)))
print("Parámetros: " + str(fecha1) + ", " + str(fecha2) + " ; Esperado: [(2020, 2, 28), (2021, 2, 28)] ; Obtenido: " + str(ordena_fechas(fecha1,fecha2)))

#dias_entre
print("\npruebas de dias_entre\n")
print("Parámetros: " + str(fecha12) + ", " + str(fecha13) + " ; Esperado: 334 ; Obtenido: " + str(dias_entre(fecha12,fecha13)))
print("Parámetros: " + str(fecha1) + ", " + str(fecha14) + " ; Esperado: 1597 ; Obtenido: " + str(dias_entre(fecha1,fecha14)))
print("Parámetros: " + str(fecha15) + ", " + str(fecha14) + " ; Esperado: 6 ; Obtenido: " + str(dias_entre(fecha15,fecha14)))
print("Parámetros: " + str(fecha14) + ", " + str(fecha15) + " ; Esperado: 6 ; Obtenido: " + str(dias_entre(fecha14,fecha15)))
print("Parámetros: " + str(fecha14) + ", " + str(fecha14) + " ; Esperado: 0 ; Obtenido: " + str(dias_entre(fecha14,fecha14)))
print("Parámetros: " + str(fecha7) + ", " + str(fecha14) + " ; Esperado: Fecha inválida -1 ; Obtenido: " + str(dias_entre(fecha7,fecha14)))
print("Parámetros: " + str(fecha14) + ", " + str(fecha7) + " ; Esperado: Fecha inválida -1 ; Obtenido: " + str(dias_entre(fecha14,fecha7)))
print("Parámetros: (2015, 1, 1), (2021, 12, 31) ; Esperado: 2556 ; Obtenido: " + str(dias_entre((2015, 1, 1), (2021, 12, 31))))