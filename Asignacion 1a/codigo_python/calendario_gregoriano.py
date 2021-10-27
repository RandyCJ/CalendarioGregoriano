'''
Asignación 1A
Estudiantes:
Randall Zumbado Huertas  - 2019082664
Jeremy Madrigal Portilla - 2019258245
Randy Conejo Juárez      - 2019066448
'''

#Diccionario que indica la cantidad de días de cada mes
meses = {
0  : 0,  #Para validar último mes
1  : 31, #Enero
2  : 28, #Febrero no bisiesto
3  : 31, #Marzo
4  : 30, #Abril
5  : 31, #Mayo
6  : 30, #Junio
7  : 31, #Julio
8  : 31, #Agosto
9  : 30, #Septiembre
10 : 31, #Octubre
11 : 30, #Noviembre
12 : 31 #Diciembre
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
    if fecha[2] > meses[fecha[1]]:
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
    if dia > meses[mes]:
        tmp = dia
        dia = 1
        mes += 1

        # pero si el dia se cambia al 29 de febrero en bisiesto, no pasa nada
        if (bisiesto(anno) and fecha[1] == 2 and tmp == 29):
            dia = 29
            mes = 2

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
        dias += meses[mes]
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

############ PRUEBAS DE CÓDIGO


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
fecha12 =  (2021, 12, 31)
fecha13 = (2021, 1, 31)

#fecha_es_tupla
print("\npruebas de fecha_es_tupla\n")
print("Parámetro: " + str(fecha1)      + " ; Esperado: True ; Obtenido: "  + str(fecha_es_tupla(fecha1)))
print("Parámetro: " + str((123,45,13)) + " ; Esperado: True ; Obtenido: "  + str(fecha_es_tupla((123,45,13))))
print("Parámetro: " + str(fecha6)      + " ; Esperado: False ; Obtenido: " + str(fecha_es_tupla(fecha6)))
print("Parámetro: " + str(fecha7)      + " ; Esperado: False ; Obtenido: " + str(fecha_es_tupla(fecha7)))
print("Parámetro: " + str(fecha8)      + " ; Esperado: False ; Obtenido: " + str(fecha_es_tupla(fecha8)))

#fecha_es_valida
print("\npruebas de fecha es valida\n")
print("Parámetro: 1890 ; Esperado: False; Obtenido: " + str(fecha_es_valida(1890)))
print("Parámetro: [2341] ; Esperado: False; Obtenido: " + str(fecha_es_valida([2341])))
print("Parámetro: " + str(fecha1) + " ; Esperado: True ; Obtenido: " + str(fecha_es_valida(fecha1)))
print("Parámetro: " + str(fecha3) + " ; Esperado: False ; Obtenido: " + str(fecha_es_valida(fecha3)))
print("Parámetro: " + str(fecha8) + " ; Esperado: False ; Obtenido: " + str(fecha_es_valida((fecha8))))
print("Parámetro: " + str((223411,1324,14412)) + " ; Esperado: False ; Obtenido: " + str(fecha_es_valida((223411,1324,14412))))

#dia_siguiente
print("\npruebas de dia_siguiente\n")
print("Parámetro: " + str(fecha1) + " ; Esperado: (2021, 3, 1)    ; Obtenido: " + str(dia_siguiente(fecha1)))
print("Parámetro: " + str(fecha2) + " ; Esperado: (2020, 2, 29)   ; Obtenido: " + str(dia_siguiente(fecha2)))
print("Parámetro: " + str(fecha3) + " ; Esperado: fecha no valida ; Obtenido: " + str(dia_siguiente(fecha3)))
print("Parámetro: " + str(fecha4) + " ; Esperado: (2022, 1, 1)    ; Obtenido: " + str(dia_siguiente(fecha4)))
print("Parámetro: " + str(fecha5) + " ; Esperado: (2020, 10, 1) ; Obtenido: "   + str(dia_siguiente(fecha5)))
print("Parámetro: " + str(fecha6) + " ; Esperado: tupla no valida ; Obtenido: " + str(dia_siguiente(fecha6)))
print("Parámetro: " + str(fecha7) + " ; Esperado: tupla no valida ; Obtenido: " + str(dia_siguiente(fecha7)))
print("Parámetro: " + str(fecha8) + " ; Esperado: tupla no valida ; Obtenido: " + str(dia_siguiente(fecha8)))

#dias_desde_primero_enero
print("\npruebas de dias_desde_primero_enero\n")
print("Parámetro: " + str(fecha12) + " ; Esperado: 364 ; Obtenido: " + str(dias_desde_primero_enero(fecha12)))
print("Parámetro: " + str(fecha9) + " ; Esperado: 365 ; Obtenido: " + str(dias_desde_primero_enero(fecha9)))
print("Parámetro: " + str(fecha10) + " ; Esperado: 60 ; Obtenido: "  + str(dias_desde_primero_enero(fecha10)))
print("Parámetro: " + str(fecha11) + " ; Esperado: 59 ; Obtenido: "  + str(dias_desde_primero_enero(fecha11)))
print("Parámetro: " + str(fecha13) + " ; Esperado: 30 ; Obtenido: "  + str(dias_desde_primero_enero(fecha13)))


#bisiesto
print("\npruebas de bisiesto\n")
print("Parámetro: '1890' ; Esperado: no int y False; Obtenido: " + str(bisiesto("1890")))
print("Parámetro:  1581  ; Esperado: menor a 1582 y False; Obtenido: " + str(bisiesto(1581)))
print("Parámetro:  2012  ; Esperado: True ; Obtenido: " + str(bisiesto(2012)))
print("Parámetro:  2013  ; Esperado: False ; Obtenido: " + str(bisiesto(2013)))
print("Parámetro:  1600  ; Esperado: True ; Obtenido: " + str(bisiesto(1600)))
print("Parámetro:  1900  ; Esperado: False ; Obtenido: " + str(bisiesto(1900)))

#dia_primero_enero
print("\npruebas de dia_primero_enero\n")
print("Parámetro: '1982' ; Esperado: no int ; Obtenido: " + str(dia_primero_enero("1982")))
print("Parámetro:  1982  ; Esperado: 5      ; Obtenido: " + str(dia_primero_enero(1982)))
print("Parámetro:  1983  ; Esperado: 6      ; Obtenido: " + str(dia_primero_enero(1983)))
print("Parámetro:  1989  ; Esperado: 0      ; Obtenido: " + str(dia_primero_enero(1989)))
print("Parámetro:  2021  ; Esperado: 5      ; Obtenido: " + str(dia_primero_enero(2021)))
print("Parámetro:  2020  ; Esperado: 3      ; Obtenido: " + str(dia_primero_enero(2020)))