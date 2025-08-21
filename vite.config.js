import { defineConfig } from 'vite'

export default defineConfig(({ command, mode }) => {
	return {
		root: '.', // Racine du projet
		server: { open: true },
		base:
			command === 'build' && process.env.GITHUB_ACTIONS
				? '/invitations-app/' // <-- adapte avec le nom de ton repo GitHub
				: '/',
		build: {
			outDir: 'dist',
		},
	}
})
