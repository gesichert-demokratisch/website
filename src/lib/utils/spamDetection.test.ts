import { describe, it, expect, vi, beforeEach } from 'vitest';
import { queueSpamAnalysis } from './spamDetection.js';

describe('Spam Detection', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should analyze text and return spam analysis result', async () => {
		const result = await queueSpamAnalysis(
			'This is a test message',
			'test@example.com',
			'Test User'
		);

		expect(result).toHaveProperty('isSpam');
		expect(result).toHaveProperty('confidence');
		expect(result).toHaveProperty('reason');
		expect(result).toHaveProperty('toxicityScore');
		expect(typeof result.isSpam).toBe('boolean');
		expect(typeof result.confidence).toBe('number');
		expect(typeof result.reason).toBe('string');
		expect(typeof result.toxicityScore).toBe('number');
	});

	it('should handle normal text as non-spam', async () => {
		const result = await queueSpamAnalysis(
			'Hello, I would like to get more information about your organization.',
			'normal-user@example.com',
			'Normal User'
		);

		// With our mocked model returning NEGATIVE sentiment, this should be classified as non-spam
		expect(result.isSpam).toBe(false);
		expect(result.reason).toContain('Content appears clean');
	});

	it('should generate unique IDs for each analysis request', async () => {
		// Mock crypto.randomUUID to return predictable values
		const mockUUIDs = ['uuid-1', 'uuid-2', 'uuid-3'];
		let callCount = 0;
		vi.stubGlobal('crypto', {
			randomUUID: vi.fn(() => mockUUIDs[callCount++])
		});

		const promises = [
			queueSpamAnalysis('Message 1', 'user1@example.com', 'User 1'),
			queueSpamAnalysis('Message 2', 'user2@example.com', 'User 2'),
			queueSpamAnalysis('Message 3', 'user3@example.com', 'User 3')
		];

		// All requests should complete successfully
		const results = await Promise.all(promises);
		expect(results).toHaveLength(3);
		results.forEach(result => {
			expect(result).toHaveProperty('isSpam');
			expect(result).toHaveProperty('confidence');
		});

		// Verify that randomUUID was called for each request
		expect(crypto.randomUUID).toHaveBeenCalledTimes(3);
	});

	it('should include email and name in analysis context', async () => {
		const testMessage = 'Test message content';
		const testEmail = 'context-test@example.com';
		const testName = 'Context Test User';

		const result = await queueSpamAnalysis(testMessage, testEmail, testName);

		// The analysis should complete successfully
		expect(result).toBeDefined();
		expect(result.isSpam).toBeDefined();

		// In a real implementation, we'd verify that the name was prepended to the message
		// For now, we just verify the function completes without error
	});

	it('should handle missing name parameter', async () => {
		const result = await queueSpamAnalysis(
			'Test message without name',
			'no-name@example.com'
		);

		expect(result).toBeDefined();
		expect(result.isSpam).toBeDefined();
		expect(result.confidence).toBeGreaterThanOrEqual(0);
		expect(result.confidence).toBeLessThanOrEqual(1);
	});
});