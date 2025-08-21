// src/pdf-lib-utilis.js

import { PDFDocument } from 'pdf-lib'

/**
 * Crée un Blob PDF à partir d'un élément canvas.
 * @param {HTMLCanvasElement} canvas Le canvas représentant l'invitation.
 * @returns {Promise<Blob>} Un Blob contenant les octets du PDF.
 */
export async function createPdfFromCanvas(canvas) {
	// 1. Créer un nouveau document PDF
	const pdfDoc = await PDFDocument.create()

	// 2. Ajouter une page aux dimensions du canvas
	const page = pdfDoc.addPage([canvas.width, canvas.height])

	// 3. Convertir le canvas en Data URL PNG
	const pngDataUrl = canvas.toDataURL()

	// 4. Intégrer l'image PNG dans le PDF
	const pngImage = await pdfDoc.embedPng(pngDataUrl)

	// 5. Dessiner l'image sur la page
	page.drawImage(pngImage, {
		x: 0,
		y: 0,
		width: canvas.width,
		height: canvas.height,
	})

	// 6. Générer les octets du PDF
	const pdfBytes = await pdfDoc.save()

	// 7. Retourner un Blob prêt à être téléchargé
	return new Blob([pdfBytes], { type: 'application/pdf' })
}
