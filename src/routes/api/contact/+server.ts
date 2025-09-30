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
import { verifySolution } from 'altcha-lib';
import nodemailer from 'nodemailer';
import {
	SMTP_HOST,
	SMTP_PORT,
	SMTP_TLS,
	SMTP_USER,
	SMTP_PASS,
	SMTP_FROM,
	CONTACT_EMAIL,
	ALTCHA_HMAC_KEY
} from '$env/static/private';
import { rateLimit } from '$lib/utils/rateLimit.js';
import { queueSpamAnalysis } from '$lib/utils/spamDetection.js';
import type { RequestHandler } from './$types';

// Create transporter with connection pooling
const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: parseInt(SMTP_PORT),
	secure: SMTP_TLS === 'true',
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASS
	},
	pool: true,
	maxConnections: 5,
	maxMessages: 100
});

function sendContactEmail(name: string, email: string, message: string) {
	transporter.sendMail({
		from: SMTP_FROM,
		to: CONTACT_EMAIL,
		subject: `Kontaktformular: Nachricht von ${name}`,
		text: `
Name: ${name}
E-Mail: ${email}
Zeitstempel: ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}

Nachricht:
${message}
		`,
		html: `
			<h3>Neue Nachricht über das Kontaktformular</h3>
			<table style="border-collapse: collapse; margin: 20px 0;">
				<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td></tr>
				<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">E-Mail:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
				<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Zeitstempel:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}</td></tr>
			</table>

			<h4>Nachricht:</h4>
			<div style="white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 20px 0;">${message}</div>
		`
	}).then(() => {
		console.log(`Email sent for contact form submission from ${name} <${email}>`);
	}).catch(error => {
		console.error('Failed to send email:', error);
	});
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	// Stricter rate limiting for submissions: 3 per 5 minutes per IP
	if (!rateLimit('contact', request, getClientAddress, 300000, 3)) {
		return json({
			error: 'Whoa! Du warst heute schon ziemlich aktiv. 😅 Lass uns eine kleine Pause machen, bevor du wieder schreibst!'
		}, { status: 429 });
	}

	try {
		const formData = await request.json();
		const { name, email, message, altcha } = formData;

		// Basic validation
		if (!name || !email || !message || !altcha) {
			return json({ error: 'Ups! Alle Felder müssen ausgefüllt werden. 📝' }, { status: 400 });
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json({ error: 'Die E-Mail-Adresse sieht irgendwie komisch aus. 🤔 Kannst du das nochmal checken?' }, { status: 400 });
		}

		// Message length validation
		if (message.length < 10) {
			return json({ error: 'Deine Nachricht ist ein bisschen kurz. Magst du etwas mehr erzählen? 😊' }, { status: 400 });
		}

		if (message.length > 5000) {
			return json({ error: 'Wow, das ist eine lange Nachricht! 📜 Könntest du sie etwas kürzer machen? (Max. 5000 Zeichen)' }, { status: 400 });
		}

		// Verify Altcha challenge
		const altchaValid = await verifySolution(altcha, ALTCHA_HMAC_KEY, true);
		if (!altchaValid) {
			return json({
				error: 'Die Captcha-Verifikation ist fehlgeschlagen. 🤖 Bitte lade die Seite neu und versuch es nochmal.'
			}, { status: 400 });
		}

		// Rate limiting only after all validation passes
		if (!rateLimit('contact', request, getClientAddress, 300000, 3)) {
			return json({
				error: 'Whoa! Du warst heute schon ziemlich aktiv. 😅 Lass uns eine kleine Pause machen, bevor du wieder schreibst!'
			}, { status: 429 });
		}

		// Queue spam analysis and send email in background
		queueSpamAnalysis(message, email, name).then(analysis => {
			if (!analysis.isSpam) {
				// Send email only if not spam
				sendContactEmail(name, email, message);
			} else {
				console.log(`Spam message dropped from ${name} <${email}>: ${analysis.reason}`);
			}
		}).catch(error => {
			console.error('Failed to analyze spam, sending email anyway:', error);
			// If spam analysis fails, send email anyway
			sendContactEmail(name, email, message);
		});

		// Always return success to user
		return json({
			success: true,
			message: 'Deine Nachricht wurde erfolgreich gesendet! 🎉 Wir melden uns so schnell wie möglich bei dir.'
		});

	} catch (error) {
		console.error('Error processing contact form:', error);
		return json({
			error: 'Ups! Da ist leider etwas schiefgelaufen. 😔 Bitte versuch es in ein paar Minuten nochmal oder schreib uns direkt eine E-Mail.'
		}, { status: 500 });
	}
};