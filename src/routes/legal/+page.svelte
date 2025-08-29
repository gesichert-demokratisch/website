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

<div class="min-h-screen bg-gradient-to-br from-primary-500 via-secondary-500 to-tertiary-600 text-white">
	<div class="container mx-auto max-w-4xl px-4 py-16">
		<!-- Back Navigation -->
		<div class="mb-8">
			<a 
				href="/" 
				class="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
				</svg>
				<span>Zurück zur Startseite</span>
			</a>
		</div>

		<!-- Content -->
		<div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-8 md:p-12 shadow-xl">
			<div class="prose prose-invert max-w-none text-center md:text-left break-words overflow-wrap-anywhere">
				<p class="text-sm text-white/60 mb-8">Stand: {currentDate}</p>

				<!-- Impressum -->
				<section class="mb-12">
					<h1 class="text-2xl sm:text-3xl font-bold mb-6 text-white break-words">Impressum</h1>
					<p class="text-sm text-white/80 mb-6">Angaben gemäß § 5 DDG</p>
					
					<div class="text-white/90">
						<p>
							<strong>Gesichert Demokratisch Münden</strong><br>
							c/o Konstantin Maenner<br>
							Thingplatz 7<br>
							34346 Hann. Münden
						</p>
					</div>

					<div class="mt-6 space-y-2 text-white/90">
						<p><strong>Kontakt:</strong></p>
						<p>E-Mail: <a href="mailto:wirsind@gesichertdemokratisch-muenden.de" class="text-blue-300 hover:text-blue-200 underline">wirsind@gesichertdemokratisch-muenden.de</a></p>
					</div>

					<div class="mt-6 text-white/80">
						<h3 class="text-base sm:text-lg font-semibold mb-2 break-words">Inhaltlich verantwortlich</h3>
						<p class="text-sm leading-relaxed mb-4">
							Marcus Huber<br>
							Xenorio Industries<br>
							<a href="https://xenorio.xyz" target="_blank" class="text-blue-300 hover:text-blue-200 underline">https://xenorio.xyz</a>
						</p>
					</div>

					<div class="mt-6 text-white/80">
						<h3 class="text-base sm:text-lg font-semibold mb-2 break-words">Haftung für Inhalte</h3>
						<p class="text-sm leading-relaxed">
							Für alle eigenen Inhalte auf diesen Seiten ist die oben genannte Person nach den allgemeinen 
							Gesetzen verantwortlich. Für fremde Inhalte gelten die Haftungsregeln der EU-Verordnung über digitale 
							Dienste (Digital Services Act) in Verbindung mit § 7 DDG. Wir sind nicht verpflichtet, übermittelte oder 
							gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine 
							rechtswidrige Tätigkeit hinweisen.
						</p>
					</div>

					<div class="mt-6 text-white/80">
						<h3 class="text-base sm:text-lg font-semibold mb-2 break-words">Haftung für Links</h3>
						<p class="text-sm leading-relaxed">
							Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
							Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten 
							Seiten sind stets die jeweiligen Webseitenbetreibenden verantwortlich.
						</p>
					</div>
				</section>

				<!-- Datenschutzerklärung -->
				<section class="mb-12">
					<h1 class="text-2xl sm:text-3xl font-bold mb-6 text-white break-words">Datenschutzerklärung</h1>

					<div class="space-y-6 text-white/80">
						<div>
							<h3 class="text-base sm:text-lg font-semibold mb-2 text-white/90 break-words">1. Datenschutz auf einen Blick</h3>
							<p class="text-sm leading-relaxed">
								Diese Website sammelt keine personenbezogenen Daten. Es werden keine Cookies gesetzt, 
								keine Tracking-Tools verwendet und keine Analyse-Software eingesetzt.
							</p>
						</div>

						<div>
							<h3 class="text-base sm:text-lg font-semibold mb-2 text-white/90 break-words">2. Allgemeine Hinweise und Pflichtinformationen</h3>
							<h4 class="text-sm sm:text-base font-medium mb-2 text-white/90 break-words">Datenschutz</h4>
							<p class="text-sm leading-relaxed">
								Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir behandeln Ihre 
								personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften 
								sowie dieser Datenschutzerklärung.
							</p>
						</div>

						<div>
							<h3 class="text-base sm:text-lg font-semibold mb-2 text-white/90 break-words">3. Datenerfassung auf unserer Website</h3>
							<h4 class="text-sm sm:text-base font-medium mb-2 text-white/90 break-words">Server-Log-Dateien</h4>
							<p class="text-sm leading-relaxed">
								Das Hosting dieser Website wird durch <a href="https://xenorio.xyz" target="_blank">Xenorio Industries</a> bereitgestellt. 
								Es werden keine Server-Log-Dateien erstellt oder gespeichert. Zugriffsdaten wie IP-Adressen, 
								Browserinformationen oder Referrer-URLs werden nicht protokolliert oder ausgewertet.
							</p>
						</div>

						<div>
							<h3 class="text-base sm:text-lg font-semibold mb-2 text-white/90 break-words">4. Ihre Rechte</h3>
							<p class="text-sm leading-relaxed">
								Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfängerschaft und Zweck 
								Ihrer gespeicherten personenbezogenen Daten zu erhalten. Da wir jedoch keine personenbezogenen 
								Daten sammeln oder speichern, gibt es in der Regel keine Daten, über die wir Auskunft 
								erteilen könnten.
							</p>
						</div>

						<div>
							<h3 class="text-base sm:text-lg font-semibold mb-2 text-white/90 break-words">5. Kontakt</h3>
							<p class="text-sm leading-relaxed">
								Bei Fragen zum Datenschutz wenden Sie sich bitte an: 
								<a href="mailto:wirsind@gesichertdemokratisch-muenden.de" class="text-blue-300 hover:text-blue-200 underline">
									wirsind@gesichertdemokratisch-muenden.de
								</a>
							</p>
						</div>

					</div>
				</section>

				<!-- Copyright -->
				<section>
					<h1 class="text-2xl sm:text-3xl font-bold mb-6 text-white break-words">Copyright</h1>
					<div class="text-white/80">
						<p class="text-sm leading-relaxed">
							Diese Website ist freie Software und steht unter der 
							<a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" class="text-blue-300 hover:text-blue-200 underline">AGPLv3-Lizenz</a>. 
							Der Quellcode ist verfügbar auf 
							<a href="https://github.com/gesichert-demokratisch/website" target="_blank" class="text-blue-300 hover:text-blue-200 underline">GitHub</a>.
						</p>
					</div>
				</section>
			</div>
		</div>
	</div>
</div>