
import { createWorker } from 'tesseract.js'

async function recognizeImage(gambar) {
  let worker

  try {
    worker = await createWorker('ind')

    const hasil = await worker.recognize(gambar)

    return hasil.data.text

  } catch (error) {
    console.error('OCR Error:', error)

    throw new Error('Gagal membaca teks dari gambar.')

  } finally {
    if (worker) {
      await worker.terminate()
    }
  }
}

export default recognizeImage
