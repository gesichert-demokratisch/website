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
<div class="rounded-3xl bg-white border border-lilac/30 p-8 md:p-12 relative overflow-hidden" data-aos="fade-up">
	<div class="absolute inset-0 bg-gradient-to-br from-lilac/40 to-lilac/15 pointer-events-none"></div>
	<div class="relative text-center mb-8">
		<div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-lime/20 border border-lime/30 mb-4">
			<i class="fas fa-envelope text-2xl text-lime"></i>
		</div>
		<h3 class="text-3xl font-bold text-brand-black mb-4">Schreib uns!</h3>
		<p class="text-brand-black/70 max-w-2xl mx-auto">
			Hast du Fragen, Anregungen oder möchtest dich engagieren? Wir freuen uns auf deine Nachricht!
		</p>
	</div>

	<div class="relative max-w-2xl mx-auto">
		<form id="contact-form" on:submit={handleSubmit} class="space-y-6">
			<div class="grid md:grid-cols-2 gap-6">
				<!-- Name Input -->
				<div>
					<label for="name" class="block text-sm font-medium text-brand-black mb-2">
						Name *
					</label>
					<input
						id="name"
						type="text"
						bind:value={formData.name}
						required
						class="w-full px-4 py-3 bg-lime/20 border border-brand-black/20 rounded-lg text-brand-black placeholder-brand-black/40 focus:outline-none focus:ring-2 focus:ring-dark-pink focus:border-transparent transition-all"
						placeholder="Dein Name"
						disabled={isSubmitting}
					/>
				</div>

				<!-- Email Input -->
				<div>
					<label for="email" class="block text-sm font-medium text-brand-black mb-2">
						E-Mail *
					</label>
					<input
						id="email"
						type="email"
						bind:value={formData.email}
						required
						class="w-full px-4 py-3 bg-lime/20 border border-brand-black/20 rounded-lg text-brand-black placeholder-brand-black/40 focus:outline-none focus:ring-2 focus:ring-dark-pink focus:border-transparent transition-all"
						placeholder="deine@email.de"
						disabled={isSubmitting}
					/>
				</div>
			</div>

			<!-- Message Input -->
			<div>
				<label for="message" class="block text-sm font-medium text-brand-black mb-2">
					Nachricht *
				</label>
				<textarea
					id="message"
					bind:value={formData.message}
					required
					rows="4"
					class="w-full px-4 py-3 bg-lime/20 border border-brand-black/20 rounded-lg text-brand-black placeholder-brand-black/40 focus:outline-none focus:ring-2 focus:ring-dark-pink focus:border-transparent transition-all resize-none"
					placeholder="Erzähl uns, was du auf dem Herzen hast..."
					disabled={isSubmitting}
				></textarea>
				<div class="text-xs text-brand-black/50 mt-1 text-right">
					{formData.message.length}/5000 Zeichen
				</div>
			</div>

			<!-- Response Message -->
			{#if responseMessage}
				<div
					class="p-4 rounded-lg {isError ? 'bg-orange-red/20 border border-orange-red/30 text-brand-black' : 'bg-lime/20 border border-lime/30 text-brand-black'}"
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
					class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r transition-all duration-300 text-brand-black font-medium rounded-lg {isAltchaReady && !isSubmitting ? 'from-lime to-lime hover:brightness-110 hover:scale-105 hover:shadow-xl' : 'from-brand-black/40 to-brand-black/50 cursor-not-allowed opacity-60'}"
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
		--altcha-color-base: #ffffff;
		--altcha-color-text: #060708;
		--altcha-color-border: #06070820;
		--altcha-color-border-focus: #FFA6E3;
		--altcha-color-accent: #FFA6E3;
		--altcha-color-footer-bg: #FFC7DE;
		--altcha-color-footer-text: #060708;
		--altcha-border-radius: 8px;
		--altcha-max-width: 100%;
	}

	:global(.altcha-checkbox) {
		background-color: #ffffff !important;
		border-color: #06070820 !important;
		color: #060708 !important;
	}

	:global(.altcha-label) {
		color: #060708 !important;
	}

	:global(.altcha-footer) {
		background-color: #FFC7DE !important;
		color: #060708 !important;
	}

	:global(.altcha-footer a) {
		color: #FF4A05 !important;
	}
</style>