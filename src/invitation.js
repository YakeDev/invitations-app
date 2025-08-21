// src/invitation.js

import html2canvas from 'html2canvas'
import { createPdfFromCanvas } from './pdf-lib-utilis.js'
;(async () => {
	// Récupération du token depuis l'URL
	const params = new URLSearchParams(window.location.search)
	const token = params.get('token')

	// Sélecteurs DOM
	const container = document.getElementById('invitation-container')
	const nameEl = document.getElementById('name')

	// Chargement des données des invités
	const res = await fetch('./src/invites.json')
	const invites = await res.json()
	const invite = invites.find((i) => i.token === token)

	// Gestion du token invalide
	if (!invite) {
		container.innerHTML =
			'<p style="color:red; font-weight:bold;">Invitation invalide.</p>'
		return
	}

	// Injection du nom de l'invité·e
	nameEl.textContent = invite.name

	// Téléchargement PDF
	document
		.getElementById('download-pdf-btn')
		.addEventListener('click', async () => {
			const canvas = await html2canvas(container, { scale: 2 })
			const blob = await createPdfFromCanvas(canvas)
			const link = document.createElement('a')
			link.href = URL.createObjectURL(blob)
			link.download = 'invitation.pdf'
			link.click()
		})

	// Téléchargement PNG
	document
		.getElementById('download-image-btn')
		.addEventListener('click', async () => {
			const canvas = await html2canvas(container, { scale: 2 })
			const dataURL = canvas.toDataURL('image/png')
			const link = document.createElement('a')
			link.href = dataURL
			link.download = 'invitation.png'
			link.click()
		})
})()
