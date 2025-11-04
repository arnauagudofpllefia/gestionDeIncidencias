const texto = " hola caracola gsdf dfdgd ge fe wffe fdef efe fewgegf efew gef ef e "
console.log(texto.length)
console.log(texto[2])
console.log(texto.slice(0,5))
const textoTamaño = texto.slice(0,6) + "..."
console.log(textoTamaño)
console.log(texto.trim())

console.log(texto.split(" ").length)
let contador = texto.split(" ")
console.log(contador.length)

const fechaHora = "2025-8-13 T 18:30:16:00"
let fecha = fechaHora.split("T")
console.log(fecha)

let dia = fecha[0].split("-")
let hora = fecha[1].split(":")

console.log(fecha[1])
console.log(dia[2] + "del " + dia[1] + " de " + dia[0] + " a las" + hora[0] + " horas, " +  hora[1] + " minutos.")

