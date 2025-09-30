<!--
 Copyright (C) 2025 xenorio <dev@xenorio.xyz>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<script lang="ts">
	import { onMount } from 'svelte';

	let isSubmitting = false;
	let responseMessage = '';
	let isError = false;

	// Form data
	let formData = {
		name: '',
		email: '',
		message: ''
	};

	// Altcha widget reference
	let altchaWidget: any;
	let altchaSolution: string | null = null;
	let isAltchaReady = false;

	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (isSubmitting) return;

		// Basic validation
		if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
			showMessage('Bitte fülle alle Felder aus! 📝', true);
			return;
		}

		// Check if altcha solution is available
		if (!altchaSolution || !isAltchaReady) {
			showMessage('Bitte löse zuerst das Captcha. 🤖', true);
			return;
		}

		isSubmitting = true;

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...formData,
					altcha: altchaSolution
				})
			});

			const result = await response.json();

			if (response.ok) {
				showMessage(result.message, false);
				// Reset form after successful submission
				formData = { name: '', email: '', message: '' };
				altchaWidget?.reset();
				altchaSolution = null;
				isAltchaReady = false;
			} else {
				showMessage(result.error || 'Ein Fehler ist aufgetreten. 😔', true);
			}

		} catch (error) {
			console.error('Form submission error:', error);
			showMessage('Ein Netzwerkfehler ist aufgetreten. Bitte versuche es nochmal! 🌐', true);
		} finally {
			isSubmitting = false;
		}
	}

	function showMessage(msg: string, error: boolean) {
		isError = error;
		responseMessage = msg;
	}

	// Load Altcha dynamically
	onMount(async () => {
		if (typeof window !== 'undefined') {
			// Import the Altcha module properly
			await import('altcha');
			// Also import German localization
			await import('altcha/i18n/de');

			// Add event listeners for debugging
			setTimeout(() => {
				if (altchaWidget) {
					console.log('Widget mounted:', altchaWidget);
					altchaWidget.addEventListener('statechange', (event: any) => {
						console.log('Altcha state changed:', event.detail);
					});
					altchaWidget.addEventListener('solved', (event: any) => {
						console.log('Altcha solved:', event.detail);
					});
					altchaWidget.addEventListener('verified', (event: any) => {
						console.log('Altcha verified:', event.detail);
						altchaSolution = event.detail.payload;
						isAltchaReady = true;
					});
					altchaWidget.addEventListener('reset', () => {
						altchaSolution = null;
						isAltchaReady = false;
					});
				}
			}, 1000);
		}
	});
</script>


<!-- Contact Section -->
<div class="rounded-3xl bg-gradient-to-br from-slate-800/80 via-slate-700/80 to-slate-800/80 backdrop-blur-sm border border-slate-600/50 p-8 md:p-12" data-aos="fade-up">
	<div class="text-center mb-8">
		<div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20 border border-blue-400/30 mb-4">
			<i class="fas fa-envelope text-2xl text-blue-300"></i>
		</div>
		<h3 class="text-3xl font-bold text-white mb-4">Schreib uns!</h3>
		<p class="text-white/80 max-w-2xl mx-auto">
			Hast du Fragen, Anregungen oder möchtest dich engagieren? Wir freuen uns auf deine Nachricht!
		</p>
	</div>

	<div class="max-w-2xl mx-auto">
		<form id="contact-form" on:submit={handleSubmit} class="space-y-6">
			<div class="grid md:grid-cols-2 gap-6">
				<!-- Name Input -->
				<div>
					<label for="name" class="block text-sm font-medium text-white mb-2">
						Name *
					</label>
					<input
						id="name"
						type="text"
						bind:value={formData.name}
						required
						class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
						placeholder="Dein Name"
						disabled={isSubmitting}
					/>
				</div>

				<!-- Email Input -->
				<div>
					<label for="email" class="block text-sm font-medium text-white mb-2">
						E-Mail *
					</label>
					<input
						id="email"
						type="email"
						bind:value={formData.email}
						required
						class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
						placeholder="deine@email.de"
						disabled={isSubmitting}
					/>
				</div>
			</div>

			<!-- Message Input -->
			<div>
				<label for="message" class="block text-sm font-medium text-white mb-2">
					Nachricht *
				</label>
				<textarea
					id="message"
					bind:value={formData.message}
					required
					rows="4"
					class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none backdrop-blur-sm"
					placeholder="Erzähl uns, was du auf dem Herzen hast..."
					disabled={isSubmitting}
				></textarea>
				<div class="text-xs text-slate-400 mt-1 text-right">
					{formData.message.length}/5000 Zeichen
				</div>
			</div>

			<!-- Response Message -->
			{#if responseMessage}
				<div
					class="p-4 rounded-lg {isError ? 'bg-red-900/50 border border-red-700/50 text-red-200' : 'bg-green-900/50 border border-green-700/50 text-green-200'}"
				>
					{responseMessage}
				</div>
			{/if}

			<!-- Captcha Section -->
			<div class="flex items-center justify-center">
				<altcha-widget
					bind:this={altchaWidget}
					challengeurl="/api/challenge"
					language="de"
				></altcha-widget>
			</div>

			<!-- Submit Button -->
			<div class="text-center">
				<button
					id="submit-button"
					type="submit"
					disabled={isSubmitting || !isAltchaReady}
					class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r transition-all duration-300 text-white font-medium rounded-lg {isAltchaReady && !isSubmitting ? 'from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:scale-105 hover:shadow-xl' : 'from-gray-600 to-gray-700 cursor-not-allowed opacity-60'}"
				>
					{#if isSubmitting}
						<i class="fas fa-spinner fa-spin mr-2"></i>
						Nachricht wird gesendet...
					{:else if !isAltchaReady}
						<i class="fas fa-lock mr-2"></i>
						Löse zuerst das captcha!
					{:else}
						<i class="fas fa-paper-plane mr-2"></i>
						Nachricht senden
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>

<style>
	:global(.altcha-widget) {
		--altcha-color-base: #1e293b;
		--altcha-color-text: #f8fafc;
		--altcha-color-border: #475569;
		--altcha-color-border-focus: #3b82f6;
		--altcha-color-accent: #3b82f6;
		--altcha-color-footer-bg: #0f172a;
		--altcha-color-footer-text: #cbd5e1;
		--altcha-border-radius: 8px;
		--altcha-max-width: 100%;
	}

	:global(.altcha-checkbox) {
		background-color: #1e293b !important;
		border-color: #475569 !important;
		color: #f8fafc !important;
	}

	:global(.altcha-label) {
		color: #f8fafc !important;
	}

	:global(.altcha-footer) {
		background-color: #0f172a !important;
		color: #cbd5e1 !important;
	}

	:global(.altcha-footer a) {
		color: #3b82f6 !important;
	}
</style>