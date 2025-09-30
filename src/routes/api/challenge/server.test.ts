import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './+server.js';
import { createChallenge } from 'altcha-lib';

const mockGetClientAddress = () => '127.0.0.1';

describe('Challenge API', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should create and return a valid challenge', async () => {
		const mockChallenge = {
			algorithm: 'SHA-512',
			challenge: 'test-challenge-hash',
			maxnumber: 25000,
			salt: 'test-salt',
			signature: 'test-signature'
		};

		vi.mocked(createChallenge).mockResolvedValueOnce(mockChallenge);

		const response = await GET({
			getClientAddress: mockGetClientAddress
		} as any);

		const responseData = await response.json();

		expect(response.status).toBe(200);
		expect(responseData).toEqual(mockChallenge);
	});

	it('should call createChallenge with correct parameters', async () => {
		await GET({
			getClientAddress: mockGetClientAddress
		} as any);

		expect(createChallenge).toHaveBeenCalledWith({
			hmacKey: 'test-hmac-key-for-testing-purposes-only',
			algorithm: 'SHA-512',
			maxnumber: 25000,
			expires: expect.any(Date),
			saltLength: 16
		});

		// Verify the expiration time is approximately 10 minutes from now
		const call = vi.mocked(createChallenge).mock.calls[0][0];
		const now = new Date();
		const expectedExpiry = new Date(now.getTime() + 10 * 60 * 1000);
		const actualExpiry = call.expires;

		// Allow 1 second tolerance for test execution time
		expect(Math.abs(actualExpiry.getTime() - expectedExpiry.getTime())).toBeLessThan(1000);
	});

	it('should handle createChallenge errors gracefully', async () => {
		vi.mocked(createChallenge).mockRejectedValueOnce(new Error('Challenge creation failed'));

		const response = await GET({
			getClientAddress: mockGetClientAddress
		} as any);

		expect(response.status).toBe(500);
		const responseData = await response.json();
		expect(responseData.error).toContain('Challenge konnte nicht erstellt werden');
	});
});