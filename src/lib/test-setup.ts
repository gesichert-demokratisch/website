import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock environment variables for testing
vi.mock('$env/static/private', () => ({
	SMTP_HOST: 'test-smtp.example.com',
	SMTP_PORT: '587',
	SMTP_TLS: 'true',
	SMTP_USER: 'test@example.com',
	SMTP_PASS: 'test-password',
	SMTP_FROM: 'test@example.com',
	CONTACT_EMAIL: 'contact@example.com',
	ALTCHA_HMAC_KEY: 'test-hmac-key-for-testing-purposes-only'
}));

// Mock nodemailer
vi.mock('nodemailer', () => ({
	default: {
		createTransport: vi.fn(() => ({
			sendMail: vi.fn().mockResolvedValue({ messageId: 'test-message-id' })
		}))
	}
}));

// Mock Altcha
vi.mock('altcha-lib', () => ({
	verifySolution: vi.fn().mockResolvedValue(true),
	createChallenge: vi.fn().mockResolvedValue({
		algorithm: 'SHA-512',
		challenge: 'test-challenge',
		maxnumber: 25000,
		salt: 'test-salt',
		signature: 'test-signature'
	})
}));

// Mock transformers
vi.mock('@xenova/transformers', () => ({
	pipeline: vi.fn().mockResolvedValue(vi.fn().mockResolvedValue([{
		label: 'NEGATIVE',
		score: 0.9
	}])),
	env: {
		allowLocalModels: false
	}
}));