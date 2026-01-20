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

	let currentDate = '';

	onMount(() => {
		currentDate = new Date().toLocaleDateString('de-DE', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	});
</script>

<svelte:head>
	<title>Impressum & Datenschutz - Gesichert Demokratisch Münden</title>
</svelte:head>

<div
	class="min-h-screen bg-gradient-to-br from-dark-pink via-orange-red to-lime text-brand-black"
>
	<div class="container mx-auto max-w-4xl px-4 py-16">
		<!-- Back Navigation -->
		<div class="mb-8">
			<a
				href="/"
				class="inline-flex items-center space-x-2 text-brand-black/80 transition-colors duration-200 hover:text-brand-black"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				<span>Zurück zur Startseite</span>
			</a>
		</div>

		<!-- Content -->
		<div class="rounded-lg bg-white/60 p-4 shadow-xl backdrop-blur-sm sm:p-8 md:p-12">
			<div
				class="overflow-wrap-anywhere prose max-w-none text-center break-words md:text-left"
			>
				<p class="mb-8 text-sm text-brand-black/60">Stand: {currentDate}</p>

				<!-- Impressum -->
				<section class="mb-12">
					<h1 class="mb-6 text-2xl font-bold break-words text-brand-black sm:text-3xl">Impressum</h1>
					<p class="mb-6 text-sm text-brand-black/80">Angaben gemäß § 5 DDG</p>

					<div class="text-brand-black/90">
						<p>
							<strong>Gesichert Demokratisch Münden</strong><br />
							c/o Marcus Huber<br />
							Sudermannstraße 9<br />
							38226 Salzgitter
						</p>
					</div>

					<div class="mt-6 space-y-2 text-brand-black/90">
						<p><strong>Kontakt:</strong></p>
						<p>
							E-Mail: <a
								href="mailto:wirsind@gesichertdemokratisch-muenden.de"
								class="text-orange-red underline hover:text-orange-red/70"
								>wirsind@gesichertdemokratisch-muenden.de</a
							>
						</p>
					</div>

					<!-- <div class="mt-6 text-brand-black/80">
						<h3 class="text-base sm:text-lg font-semibold mb-2 break-words">Inhaltlich verantwortlich</h3>
						<p class="text-sm leading-relaxed mb-4">
							Marcus Huber<br>
							Xenorio Industries<br>
							<a href="https://xenorio.xyz" target="_blank" class="text-blue-300 hover:text-blue-200 underline">https://xenorio.xyz</a>
						</p>
					</div> -->

					<div class="mt-6 text-brand-black/80">
						<h3 class="mb-2 text-base font-semibold break-words sm:text-lg">Haftung für Inhalte</h3>
						<p class="text-sm leading-relaxed">
							Für alle eigenen Inhalte auf diesen Seiten ist die oben genannte Person nach den
							allgemeinen Gesetzen verantwortlich. Für fremde Inhalte gelten die Haftungsregeln der
							EU-Verordnung über digitale Dienste (Digital Services Act) in Verbindung mit § 7 DDG.
							Wir sind nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
							überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
							hinweisen.
						</p>
					</div>

					<div class="mt-6 text-brand-black/80">
						<h3 class="mb-2 text-base font-semibold break-words sm:text-lg">Haftung für Links</h3>
						<p class="text-sm leading-relaxed">
							Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
							Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
							übernehmen. Für die Inhalte der verlinkten Seiten sind stets die jeweiligen
							Webseitenbetreibenden verantwortlich.
						</p>
					</div>
				</section>

				<!-- Datenschutzerklärung -->
				<section class="mb-12">
					<h1 class="mb-6 text-2xl font-bold break-words text-brand-black sm:text-3xl">
						Datenschutzerklärung
					</h1>

					<div class="space-y-6 text-brand-black/80">
						<div>
							<h3 class="mb-2 text-base font-semibold break-words text-brand-black/90 sm:text-lg">
								1. Datenschutz auf einen Blick
							</h3>
							<p class="text-sm leading-relaxed">
								Diese Website sammelt keine personenbezogenen Daten. Es werden keine Cookies
								gesetzt, keine Tracking-Tools verwendet und keine Analyse-Software eingesetzt.
							</p>
						</div>

						<div>
							<h3 class="mb-2 text-base font-semibold break-words text-brand-black/90 sm:text-lg">
								2. Allgemeine Hinweise und Pflichtinformationen
							</h3>
							<h4 class="mb-2 text-sm font-medium break-words text-brand-black/90 sm:text-base">
								Datenschutz
							</h4>
							<p class="text-sm leading-relaxed">
								Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir behandeln
								Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
								Datenschutzvorschriften sowie dieser Datenschutzerklärung.
							</p>
						</div>

						<div>
							<h3 class="mb-2 text-base font-semibold break-words text-brand-black/90 sm:text-lg">
								3. Datenerfassung auf unserer Website
							</h3>
							<h4 class="mb-2 text-sm font-medium break-words text-brand-black/90 sm:text-base">
								Server-Log-Dateien
							</h4>
							<p class="text-sm leading-relaxed">
								Das Hosting dieser Website wird durch <a href="https://xenorio.xyz" target="_blank"
									>Xenorio Industries</a
								>
								bereitgestellt. DNS-Services werden durch
								<a href="https://www.cloudflare.com" target="_blank">Cloudflare</a> zur Verfügung gestellt.
								Es werden keine Server-Log-Dateien erstellt oder gespeichert. Zugriffsdaten wie IP-Adressen,
								Browserinformationen oder Referrer-URLs werden nicht protokolliert oder ausgewertet.
							</p>
						</div>

						<div>
							<h3 class="mb-2 text-base font-semibold break-words text-brand-black/90 sm:text-lg">
								4. Ihre Rechte
							</h3>
							<p class="text-sm leading-relaxed">
								Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfängerschaft
								und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Da wir jedoch
								keine personenbezogenen Daten sammeln oder speichern, gibt es in der Regel keine
								Daten, über die wir Auskunft erteilen könnten.
							</p>
						</div>

						<div>
							<h3 class="mb-2 text-base font-semibold break-words text-brand-black/90 sm:text-lg">
								5. Kontakt
							</h3>
							<p class="text-sm leading-relaxed">
								Bei Fragen zum Datenschutz wenden Sie sich bitte an:
								<a
									href="mailto:wirsind@gesichertdemokratisch-muenden.de"
									class="text-orange-red underline hover:text-orange-red/70"
								>
									wirsind@gesichertdemokratisch-muenden.de
								</a>
							</p>
						</div>
					</div>
				</section>

				<!-- Copyright -->
				<section>
					<h1 class="mb-6 text-2xl font-bold break-words text-brand-black sm:text-3xl">Copyright</h1>
					<div class="space-y-4 text-brand-black/80">
						<div>
							<h3 class="mb-2 text-base font-semibold break-words sm:text-lg">Website-Quellcode</h3>
							<p class="text-sm leading-relaxed">
								Diese Website ist freie Software und steht unter der
								<a
									href="https://www.gnu.org/licenses/agpl-3.0.html"
									target="_blank"
									class="text-orange-red underline hover:text-orange-red/70">AGPLv3-Lizenz</a
								>. Der Quellcode ist verfügbar auf
								<a
									href="https://github.com/gesichert-demokratisch/website"
									target="_blank"
									class="text-orange-red underline hover:text-orange-red/70">GitHub</a
								>.
							</p>
						</div>

						<div>
							<h3 class="mb-2 text-base font-semibold break-words sm:text-lg">Logo</h3>
							<p class="text-sm leading-relaxed">
								Das "Gesichert Demokratisch Münden"-Logo wurde erstellt von Barbara Brübach (<a
									href="https://www.fettetypen.de"
									target="_blank"
									class="text-orange-red underline hover:text-orange-red/70">www.fettetypen.de</a
								>). Alle Rechte vorbehalten.
							</p>
						</div>

						<div>
							<h3 class="mb-2 text-base font-semibold break-words sm:text-lg">
								Stadtwappen Hann Münden
							</h3>
							<p class="text-sm leading-relaxed">
								Das Stadtwappen Hann. Münden ist als amtliches Werk nach § 5 UrhG gemeinfrei. Die
								Nutzung auf dieser Webseite erfolgt ausschließlich zu illustrativen Zwecken. Es
								besteht keinerlei organisatorische oder rechtliche Verbindung zwischen „Gesichert
								Demokratisch Münden“ und der Stadt Hann. Münden.
							</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>
</div>
