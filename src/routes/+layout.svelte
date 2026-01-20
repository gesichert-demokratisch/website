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
	import '../app.css';
	import AOS from 'aos';

	let { children } = $props();

	onMount(() => {
		AOS.init({
			duration: 800,
			once: true,
			offset: 100
		});
	});
</script>

<svelte:head>
	<title>Gesichert Demokratisch Münden</title>
	<meta name="description" content="Netzwerk für Demokratie und Menschenwürde in Hann. Münden. Wir setzen uns ein für Toleranz, gegen rechte Gewalt und für eine gerechte Gesellschaft - unabhängig von Herkunft, Geschlecht oder Glaube." />
	<meta name="keywords" content="Demokratie, Hann. Münden, Menschenrechte, Zivilcourage, Grundgesetz Artikel 1, gegen rechts, Toleranz, Aktivismus, Geflüchtete, Antifaschismus" />
	<meta name="author" content="Gesichert Demokratisch Münden" />
	<meta name="language" content="de" />
	<link rel="icon" href="/img/logo-round-192.webp" />
	<link rel="canonical" href="https://gesichertdemokratisch-muenden.de" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://gesichertdemokratisch-muenden.de" />
	<meta property="og:site_name" content="Gesichert Demokratisch Münden" />
	<meta property="og:title" content="Gesichert Demokratisch Münden - Für Demokratie und Menschenwürde" />
	<meta property="og:description" content="Netzwerk für Demokratie und Menschenwürde in Hann. Münden. Wir setzen uns ein für Toleranz, gegen rechte Gewalt und für eine gerechte Gesellschaft." />
	<meta property="og:image" content="https://gesichertdemokratisch-muenden.de/img/logo-1024x1024.png" />
	<meta property="og:image:width" content="1024" />
	<meta property="og:image:height" content="1024" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:alt" content="Gesichert Demokratisch Münden Logo" />
	<meta property="og:locale" content="de_DE" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Gesichert Demokratisch Münden - Für Demokratie und Menschenwürde" />
	<meta name="twitter:description" content="Netzwerk für Demokratie und Menschenwürde in Hann. Münden. Wir setzen uns ein für Toleranz und gegen rechte Gewalt." />
	<meta name="twitter:image" content="https://gesichertdemokratisch-muenden.de/img/logo-1024x1024.png" />
	<meta name="twitter:image:alt" content="Gesichert Demokratisch Münden Logo" />
</svelte:head>

<div class="bg-lime text-token min-h-screen">
	{@render children?.()}
</div>
