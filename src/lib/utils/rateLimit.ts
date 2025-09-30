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

// Simple in-memory rate limiting store
const requestStore = new Map<string, Map<string, number[]>>();

function getClientIP(request: Request, getClientAddress: () => string): string {
	// Check for reverse proxy headers (X-Forwarded-For, X-Real-IP)
	const forwarded = request.headers.get('x-forwarded-for');
	if (forwarded) {
		return forwarded.split(',')[0].trim();
	}

	const realIP = request.headers.get('x-real-ip');
	if (realIP) {
		return realIP.trim();
	}

	// Fallback to SvelteKit's method
	return getClientAddress();
}

export function rateLimit(
	namespace: string,
	request: Request,
	getClientAddress: () => string,
	windowMs: number = 60000,
	maxRequests: number = 10
): boolean {
	const now = Date.now();
	const ip = getClientIP(request, getClientAddress);

	// Get or create namespace
	if (!requestStore.has(namespace)) {
		requestStore.set(namespace, new Map());
	}

	const namespaceStore = requestStore.get(namespace)!;
	const requests = namespaceStore.get(ip) || [];

	// Remove old requests outside the window
	const validRequests = requests.filter(time => now - time < windowMs);

	if (validRequests.length >= maxRequests) {
		return false;
	}

	validRequests.push(now);
	namespaceStore.set(ip, validRequests);
	return true;
}

// Cleanup old entries periodically to prevent memory leaks
setInterval(() => {
	const now = Date.now();
	const maxAge = 24 * 60 * 60 * 1000; // 24 hours

	for (const [namespace, namespaceStore] of requestStore) {
		for (const [ip, requests] of namespaceStore) {
			const validRequests = requests.filter(time => now - time < maxAge);
			if (validRequests.length === 0) {
				namespaceStore.delete(ip);
			} else {
				namespaceStore.set(ip, validRequests);
			}
		}

		// Remove empty namespaces
		if (namespaceStore.size === 0) {
			requestStore.delete(namespace);
		}
	}
}, 60 * 60 * 1000); // Run cleanup every hour