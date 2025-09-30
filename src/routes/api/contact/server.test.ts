import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './+server.js';
import { verifySolution } from 'altcha-lib';

// Mock the request and response objects
const mockRequest = (body: any) => ({
	json: vi.fn().mockResolvedValue(body)
});

const mockGetClientAddress = () => '127.0.0.1';

describe('Contact API', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should reject requests without required fields', async () => {
		const request = mockRequest({
			name: '',
			email: 'test@example.com',
			message: 'Test message',
			altcha: 'valid-altcha-solution'
		});

		const response = await POST({
			request: request as any,
			getClientAddress: mockGetClientAddress
		});

		const responseData = await response.json();
		expect(response.status).toBe(400);
		expect(responseData.error).toContain('Alle Felder müssen ausgefüllt werden');
	});

	it('should reject invalid email addresses', async () => {
		const request = mockRequest({
			name: 'Test User',
			email: 'invalid-email',
			message: 'Test message',
			altcha: 'valid-altcha-solution'
		});

		const response = await POST({
			request: request as any,
			getClientAddress: mockGetClientAddress
		});

		const responseData = await response.json();
		expect(response.status).toBe(400);
		expect(responseData.error).toContain('E-Mail-Adresse');
	});

	it('should reject messages that are too short', async () => {
		const request = mockRequest({
			name: 'Test User',
			email: 'test@example.com',
			message: 'short',
			altcha: 'valid-altcha-solution'
		});

		const response = await POST({
			request: request as any,
			getClientAddress: mockGetClientAddress
		});

		const responseData = await response.json();
		expect(response.status).toBe(400);
		expect(responseData.error).toContain('bisschen kurz');
	});

	it('should reject messages that are too long', async () => {
		const request = mockRequest({
			name: 'Test User',
			email: 'test@example.com',
			message: 'a'.repeat(5001),
			altcha: 'valid-altcha-solution'
		});

		const response = await POST({
			request: request as any,
			getClientAddress: mockGetClientAddress
		});

		const responseData = await response.json();
		expect(response.status).toBe(400);
		expect(responseData.error).toContain('lange Nachricht');
	});

	it('should reject requests without altcha solution', async () => {
		const request = mockRequest({
			name: 'Test User',
			email: 'test@example.com',
			message: 'This is a valid test message',
			altcha: null
		});

		const response = await POST({
			request: request as any,
			getClientAddress: mockGetClientAddress
		});

		const responseData = await response.json();
		expect(response.status).toBe(400);
		expect(responseData.error).toContain('Alle Felder müssen ausgefüllt werden');
	});

	it('should reject requests with invalid altcha solution', async () => {
		// Mock verifySolution to return false for invalid solution
		vi.mocked(verifySolution).mockResolvedValueOnce(false);

		const request = mockRequest({
			name: 'Test User',
			email: 'test@example.com',
			message: 'This is a valid test message',
			altcha: 'invalid-altcha-solution'
		});

		const response = await POST({
			request: request as any,
			getClientAddress: mockGetClientAddress
		});

		const responseData = await response.json();
		expect(response.status).toBe(400);
		expect(responseData.error).toContain('Captcha-Verifikation ist fehlgeschlagen');
	});

	it('should accept valid requests with proper altcha verification', async () => {
		// Mock verifySolution to return true for valid solution
		vi.mocked(verifySolution).mockResolvedValueOnce(true);

		const request = mockRequest({
			name: 'Test User',
			email: 'test@example.com',
			message: 'This is a valid test message',
			altcha: 'valid-altcha-solution'
		});

		const response = await POST({
			request: request as any,
			getClientAddress: mockGetClientAddress
		});

		const responseData = await response.json();
		expect(response.status).toBe(200);
		expect(responseData.success).toBe(true);
		expect(responseData.message).toContain('erfolgreich gesendet');
	});

	it('should verify altcha solution with correct parameters', async () => {
		const altchaSolution = 'test-altcha-solution';
		const request = mockRequest({
			name: 'Test User',
			email: 'test@example.com',
			message: 'This is a valid test message',
			altcha: altchaSolution
		});

		await POST({
			request: request as any,
			getClientAddress: mockGetClientAddress
		});

		// Verify that verifySolution was called with the correct parameters
		expect(verifySolution).toHaveBeenCalledWith(
			altchaSolution,
			'test-hmac-key-for-testing-purposes-only',
			true
		);
	});
});