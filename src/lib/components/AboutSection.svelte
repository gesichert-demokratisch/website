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

<script>
	import ContactForm from './ContactForm.svelte';
</script>

<section id="about" class="min-h-screen bg-bright-pink relative overflow-hidden">
	<div class="relative z-10 px-6 py-24 lg:px-8">
		<div class="mx-auto max-w-6xl">
			<!-- Header -->
			<div class="text-center mb-20" data-aos="fade-up">
				<h2 class="text-4xl font-bold text-brand-black sm:text-5xl mb-6">
					Warum wir hier sind
				</h2>
				<p class="text-xl text-brand-black/70 max-w-3xl mx-auto">
					Weil die Würde des Menschen unantastbar ist. Weil Demokratie nicht selbstverständlich ist.
					Weil wir nicht tatenlos zusehen können.
				</p>
			</div>

			<!-- Core Mission -->
			<div class="mb-20">
				<div class="rounded-3xl bg-orange-red/20 backdrop-blur-sm border border-orange-red/30 p-8 md:p-12" data-aos="fade-up" data-aos-delay="100">
					<div class="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
						<div class="flex-shrink-0">
							<div class="flex h-20 w-20 items-center justify-center rounded-full bg-orange-red/30 border border-orange-red/50">
								<i class="fas fa-heart text-3xl text-orange-red"></i>
							</div>
						</div>
						<div class="flex-grow">
							<h3 class="text-2xl font-bold text-brand-black mb-4">Unser Leitgedanke</h3>
							<blockquote class="text-xl text-brand-black italic border-l-4 border-orange-red pl-6 mb-4">
								„Die Würde des Menschen ist unantastbar."
							</blockquote>
							<p class="text-brand-black/80 text-lg">
								Artikel 1 des Grundgesetzes ist nicht nur ein Satz. Er ist unser Auftrag.
								In Hann. Münden und Umgebung setzen wir uns dafür ein, dass dieser Artikel
								nicht nur auf dem Papier steht, sondern gelebt wird.
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- What We Stand For -->
			<div class="mb-20">
				<h3 class="text-3xl font-bold text-brand-black text-center mb-12" data-aos="fade-up">Wofür wir stehen</h3>
				<div class="grid md:grid-cols-2 gap-8">
					<div class="group rounded-2xl bg-white/60 backdrop-blur-sm border border-brand-black/10 p-6 hover:bg-white/80 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
						<div class="flex items-center mb-4">
							<div class="flex h-14 w-14 items-center justify-center rounded-full bg-lime/20 border border-lime/30 mr-4 group-hover:scale-110 transition-transform duration-300">
								<i class="fas fa-users text-xl text-lime"></i>
							</div>
							<h4 class="text-xl font-semibold text-brand-black">Für alle Menschen</h4>
						</div>
						<p class="text-brand-black/70">
							Unabhängig von Aussehen, Geschlecht, sexuellem Begehren, Herkunft,
							sozialem Status und Glaube. Alle Menschen sollen gleichberechtigt
							und ohne Angst leben können.
						</p>
					</div>

					<div class="group rounded-2xl bg-white/60 backdrop-blur-sm border border-brand-black/10 p-6 hover:bg-white/80 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
						<div class="flex items-center mb-4">
							<div class="flex h-14 w-14 items-center justify-center rounded-full bg-lime/20 border border-lime/30 mr-4 group-hover:scale-110 transition-transform duration-300">
								<i class="fas fa-hand-holding-heart text-xl text-lime"></i>
							</div>
							<h4 class="text-xl font-semibold text-brand-black">Für Geflüchtete</h4>
						</div>
						<p class="text-brand-black/70">
							Wir setzen uns für die Aufnahme und gesellschaftliche Teilhabe
							von Menschen ein, die vor Verfolgung, Krieg, Hunger und Not flüchten.
						</p>
					</div>

					<div class="group rounded-2xl bg-white/60 backdrop-blur-sm border border-brand-black/10 p-6 hover:bg-white/80 transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
						<div class="flex items-center mb-4">
							<div class="flex h-14 w-14 items-center justify-center rounded-full bg-orange-red/20 border border-orange-red/30 mr-4 group-hover:scale-110 transition-transform duration-300">
								<i class="fas fa-memory text-xl text-orange-red"></i>
							</div>
							<h4 class="text-xl font-semibold text-brand-black">Gegen das Vergessen</h4>
						</div>
						<p class="text-brand-black/70">
							Wir erinnern an die Verbrechen des Nationalsozialismus,
							gedenken dessen Opfern und arbeiten dafür, dass seine
							ideologischen Bestandteile endlich überwunden werden.
						</p>
					</div>

					<div class="group rounded-2xl bg-white/60 backdrop-blur-sm border border-brand-black/10 p-6 hover:bg-white/80 transition-all duration-300" data-aos="fade-up" data-aos-delay="400">
						<div class="flex items-center mb-4">
							<div class="flex h-14 w-14 items-center justify-center rounded-full bg-orange-red/20 border border-orange-red/30 mr-4 group-hover:scale-110 transition-transform duration-300">
								<i class="fas fa-shield-alt text-xl text-orange-red"></i>
							</div>
							<h4 class="text-xl font-semibold text-brand-black">Gegen rechte Gewalt</h4>
						</div>
						<p class="text-brand-black/70">
							Wir sind solidarisch mit allen Menschen, die von Armut,
							Ausgrenzung und Verfolgung bedroht sind und mit allen
							Betroffenen rechter Hetze und Gewalt.
						</p>
					</div>
				</div>
			</div>

			<!-- What We Do -->
			<div class="mb-20">
				<div class="rounded-3xl bg-white/60 backdrop-blur-sm border border-brand-black/10 p-8 md:p-12" data-aos="fade-up">
					<h3 class="text-3xl font-bold text-brand-black mb-12 text-center">Was wir tun</h3>

					<div class="grid md:grid-cols-3 gap-8">
						<div class="text-center group" data-aos="zoom-in" data-aos-delay="100">
							<div class="flex h-20 w-20 items-center justify-center rounded-full bg-orange-red/20 border border-orange-red/30 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								<i class="fas fa-bullhorn text-2xl text-orange-red"></i>
							</div>
							<h4 class="text-xl font-semibold text-brand-black mb-3">Demonstrationen</h4>
							<p class="text-brand-black/70">
								Kundgebungen und Demonstrationen gegen Aufmärsche
								mit menschenverachtenden Inhalten
							</p>
						</div>

						<div class="text-center group" data-aos="zoom-in" data-aos-delay="200">
							<div class="flex h-20 w-20 items-center justify-center rounded-full bg-lime/20 border border-lime/30 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								<i class="fas fa-lightbulb text-2xl text-lime"></i>
							</div>
							<h4 class="text-xl font-semibold text-brand-black mb-3">Aufklärung</h4>
							<p class="text-brand-black/70">
								Veranstaltungen zur Information und Diskussion,
								um Bewusstsein zu schaffen
							</p>
						</div>

						<div class="text-center group" data-aos="zoom-in" data-aos-delay="300">
							<div class="flex h-20 w-20 items-center justify-center rounded-full bg-orange-red/20 border border-orange-red/30 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								<i class="fas fa-share-alt text-2xl text-orange-red"></i>
							</div>
							<h4 class="text-xl font-semibold text-brand-black mb-3">Öffentlichkeit</h4>
							<p class="text-brand-black/70">
								Pressearbeit und Informationen in den sozialen
								Netzwerken für mehr Reichweite
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Call to Action -->
			<div class="text-center mb-20">
				<div class="rounded-3xl bg-lilac/30 backdrop-blur-sm border border-lilac/40 p-8 md:p-12 relative overflow-hidden" data-aos="fade-up">
					<!-- Coat of Arms -->
					<div class="absolute right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
						<img
							src="/img/stadtwappen-muenden.png"
							alt="Stadtwappen Hann. Münden"
							class="w-[166px] h-[192px] opacity-80 hover:opacity-100 transition-opacity duration-300"
							width="166"
							height="192"
						/>
					</div>

					<h3 class="text-3xl font-bold text-brand-black mb-6">
						Der Mündener Stadtgesellschaft Mut machen
					</h3>
					<p class="text-xl text-brand-black/80 max-w-2xl mx-auto">
						Wir wollen den Menschen in Münden Mut machen, sich aktiv gegen
						rechte Gesinnung und rechtes Gedankengut zu stellen.
					</p>
				</div>
			</div>

			<!-- Contact Section -->
			<ContactForm />
		</div>
	</div>
</section>