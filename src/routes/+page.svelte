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

	let ParticlesComponent: any = null;
	let particlesLoaded = false;

	const particlesConfig = {
		background: {
			color: {
				value: 'transparent'
			}
		},
		fpsLimit: 60,
		particles: {
			color: {
				value: '#ffffff'
			},
			links: {
				enable: false
			},
			move: {
				direction: 'none' as const,
				enable: true,
				outModes: 'out' as const,
				random: true,
				speed: 0.1,
				straight: false
			},
			number: {
				density: {
					enable: true,
					area: 2000
				},
				value: 8
			},
			opacity: {
				value: 0.08,
				animation: {
					enable: true,
					speed: 0.2,
					sync: false
				}
			},
			shape: {
				type: 'circle'
			},
			size: {
				value: { min: 120, max: 300 },
				animation: {
					enable: true,
					speed: 0.1,
					sync: false
				}
			}
		},
		detectRetina: true
	};

	// Lazy load particles after initial page render
	onMount(async () => {
		// Use requestIdleCallback or fallback to ensure particles don't block rendering
		const loadParticles = async () => {
			try {
				const [{ default: Particles, particlesInit }, { loadSlim }] = await Promise.all([
					import('@tsparticles/svelte'),
					import('@tsparticles/slim')
				]);
				
				// Initialize particles engine
				await particlesInit(async (engine) => {
					await loadSlim(engine);
				});
				
				ParticlesComponent = Particles;
				particlesLoaded = true;
			} catch (error) {
				console.log('Failed to load particles:', error);
			}
		};

		// Use requestIdleCallback to load particles when browser is idle
		if ('requestIdleCallback' in window) {
			requestIdleCallback(loadParticles);
		} else {
			// Fallback for browsers without requestIdleCallback
			setTimeout(loadParticles, 300);
		}
	});
</script>

<div
	class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary-500 via-secondary-500 to-tertiary-600"
>
	<!-- TSParticles background -->
	<div class="absolute inset-0">
		{#if particlesLoaded && ParticlesComponent}
			<svelte:component this={ParticlesComponent} id="tsparticles" options={particlesConfig} class="h-full w-full" />
		{/if}
	</div>

	<!-- Main content -->
	<div class="relative z-10 flex flex-col items-center space-y-12">
		<!-- Logo -->
		<div class="group relative">
			<div
				class="absolute -inset-4 bg-gradient-to-r from-primary-400 via-secondary-400 to-tertiary-400 opacity-25 blur-lg transition-opacity duration-500 group-hover:opacity-40"
			></div>
			<div class="relative p-8">
				<img
					src="/img/logo-round-256.webp"
					alt="Gesichert Demokratisch Münden"
					aria-label="Gesichert Demokratisch Münden logo"
					class="h-48 w-48 drop-shadow-2xl md:h-64 md:w-64"
					loading="eager"
					fetchpriority="high"
					width="256"
					height="256"
					style="font-size: 0;"
				/>
			</div>
		</div>

		<!-- Fancy buttons -->
		<div class="flex flex-col gap-6 sm:flex-row">
			<!-- Email Button -->
			<a
				href="mailto:wirsind@gesichertdemokratisch-muenden.de"
				class="group relative inline-block overflow-hidden rounded-full border border-slate-700/50 bg-slate-900/80 px-8 py-4 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-slate-600 hover:bg-slate-800/90 hover:shadow-xl"
			>
				<div
					class="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				></div>
				<div class="relative flex items-center space-x-3">
					<div class="text-2xl text-blue-400">
						<i class="fas fa-envelope"></i>
					</div>
					<span class="text-lg">E-Mail</span>
				</div>
			</a>

			<!-- Instagram Button -->
			<a
				href="https://www.instagram.com/gesichert_demokratisch_muenden/"
				target="_blank"
				rel="noopener noreferrer"
				class="group relative inline-block overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-orange-400 hover:to-pink-400 hover:shadow-xl"
			>
				<div
					class="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				></div>
				<div class="relative flex items-center space-x-3">
					<div class="text-2xl">
						<i class="fab fa-instagram"></i>
					</div>
					<span class="text-lg">Instagram</span>
				</div>
			</a>
		</div>
	</div>
</div>
