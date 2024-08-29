import { ping, obtenerDatosPromise, procesarArchivoPromise, procesarArchivo, leerArchivos, delay } from '../solutions/index.js'

import { describe, it, afterEach } from 'node:test'
import { equal, ifError } from 'node:assert/strict'
import { unlinkSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

describe('1. ping', () => {
  it('1.1. ping midu.dev', (_, done) => {
    ping('midu.dev', (err, info) => {
      ifError(err)
      equal(info.ip, 'midu.dev')
      done()
    })
  })
})

describe('2. obtenerDatosPromise', () => {
  it('2.1. obtenerDatosPromise', async () => {
    const { data } = await obtenerDatosPromise({ time: 1 })
    equal(data, 'datos importantes')
  })
})

describe('3. procesarArchivoPromise', () => {
  afterEach(() => {
    try {
      unlinkSync('output.txt')
    } catch {}
  })

  it('3.1. procesarArchivo', (t, done) => {
    writeFileSync('input.txt', 'gogogo')
    procesarArchivo((err) => {
      ifError(err)
      readFile('output.txt', 'utf8')
        .then((contenido) => {
          equal(contenido, 'GOGOGO')
          done()
        })
    })
  })

  it('3.1. procesarArchivoPromise', async () => {
    writeFileSync('input.txt', 'hola')
    await procesarArchivoPromise()
    const contenido = await readFile('output.txt', 'utf8')
    equal(contenido, 'HOLA')
  })
})

describe('4. leerArchivos', () => {
  it('4.1. leerArchivos', async () => {
    const mensaje = await leerArchivos()
    equal(mensaje, 'hola qué tal')
  })
})

// Vi que no había un test para la función delay entonce me tomé el atrevimiento de agregarlo
describe('5. demorar respuesta', () => {
  it('5.1. demorar respuesta', async () => {
    const respuesta = await delay(100)
    equal(respuesta, 'respuesta')
  })
})
