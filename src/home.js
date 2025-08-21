// src/home.js
document.addEventListener('DOMContentLoaded', () => {
	console.log('✅ home.js chargé')

	const btn = document.getElementById('view-invite-btn')
	console.log('Bouton trouvé :', btn)

	if (!btn) return // si l'ID ne correspond pas, on arrête ici

	btn.addEventListener('click', () => {
		console.log('🖱️ Clic détecté')
		const tokenInput = document.getElementById('token-input')
		const token = tokenInput.value.trim()
		console.log('Valeur du token :', token)

		if (token) {
			const url = `invitation.html?token=${encodeURIComponent(token)}`
			console.log('Redirection vers :', url)
			window.location.href = url
		} else {
			console.warn('Aucun token saisi')
		}
	})
})
