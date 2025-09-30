/*
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
*/

import { json } from '@sveltejs/kit';
import { createChallenge } from 'altcha-lib';
import { ALTCHA_HMAC_KEY } from '$env/static/private';
import { rateLimit } from '$lib/utils/rateLimit.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, getClientAddress }) => {
	// Rate limit: 10 challenges per minute per IP
	if (!rateLimit('challenge', request, getClientAddress, 60000, 10)) {
		return json({ error: 'Wow, du bist ja fleißig! 🚀 Lass uns kurz verschnaufen und versuch es gleich nochmal.' }, { status: 429 });
	}

	try {
		// Create challenge with SHA-512 and moderate difficulty for spam prevention
		const challenge = await createChallenge({
			hmacKey: ALTCHA_HMAC_KEY,
			algorithm: 'SHA-512',
			maxnumber: 25000, // ~3-8 seconds on most devices, expensive enough to deter script kiddies
			expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes - plenty of time to fill out form
			saltLength: 16 // Good entropy for salt
		});

		return json(challenge);
	} catch (error) {
		console.error('Error creating challenge:', error);
		return json({ error: 'Hoppla! Da ist was schiefgelaufen. 🤖 Kannst du es nochmal versuchen?' }, { status: 500 });
	}
};