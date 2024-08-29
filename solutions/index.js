import net from 'node:net'
import fs from 'node:fs'
import fsPromise from 'node:fs/promises'

// # EJERCICIO 1
export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 8080, host: ip }, () => {
    client.end()
    callback(null, { time: process.hrtime(startTime), ip })
  })

  client.on('error', (err) => {
    client.end()
    callback(err, null)
  })
}

ping('midu.dev', (err, info) => {
  if (err) console.error(err)
  console.log(info)
})

// # EJERCICIO 2
export function obtenerDatosPromise (time) {
  return new Promise((resolve, reject) => {
    resolve({ data: 'datos importantes' })
  })
}

// # EJERCICIO 3
export function procesarArchivo (callback) {
  // esta función lee sincronamente el archivo input.txt, convierte su contenido a mayúsculas y luego lo guarda en output.txt
  // Se lee primero el archivo de forma sincrona ya que necesito el contenido para poder procesarlo

  const contenido = fs.readFileSync('input.txt', 'utf8', (error, _) => {
    if (error) {
      console.error('Error leyendo archivo:', error.message)
      callback(error)
    }
  })

  const textoProcesado = contenido.toUpperCase()

  fs.writeFile('output.txt', textoProcesado, error => {
    if (error) {
      console.error('Error guardando archivo:', error.message)
      callback(error)
    }

    console.log('Archivo procesado y guardado con éxito')
    callback(null)
  })
}

export async function procesarArchivoPromise () {
  // tu código aquí
  let contenido = ''

  try {
    contenido = await fsPromise.readFile('input.txt', 'utf8')
  } catch (error) {
    console.error('Error al leer el archivo:', error.message)
  }

  const textoProcesado = contenido.toUpperCase()

  try {
    await fsPromise.writeFile('output.txt', textoProcesado)
  } catch (error) {
    console.error('Error al guardar el archivo:', error.message)
  }
}

// # EJERCICIO 4
export async function leerArchivos () {
  // Para no tener que espera a que se resuelvan los archivos uno por uno
  // se pueden leer todos los archivos en paralelo y esperar a que todos
  // se hayan leído para devolver el resultado. Así es más rápido.

  const [archivo1, archivo2, archivo3] = await Promise.all([
    fsPromise.readFile('archivo1.txt', 'utf8'),
    fsPromise.readFile('archivo2.txt', 'utf8'),
    fsPromise.readFile('archivo3.txt', 'utf8')
  ])

  return `${archivo1} ${archivo2} ${archivo3}`
}

// # EJERCICIO 5
export async function delay (time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('respuesta')
    }, time)
  })
}
