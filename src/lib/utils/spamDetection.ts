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

import { pipeline, env } from '@xenova/transformers';

// Disable local file checking to allow models to be downloaded
env.allowLocalModels = false;

// Initialize the classification pipeline with a spam detection model
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let classifier: any = null;
let isInitializing = false;

interface QueuedAnalysis {
	id: string;
	text: string;
	name?: string;
	email: string;
	timestamp: number;
	resolve: (result: SpamAnalysis) => void;
	reject: (error: Error) => void;
}

interface SpamAnalysis {
	isSpam: boolean;
	confidence: number;
	reason: string;
	toxicityScore: number;
}

// Queue for pending spam analysis
const analysisQueue: QueuedAnalysis[] = [];
let isProcessingQueue = false;

async function initializeSpamDetector() {
	if (classifier) return classifier;
	if (isInitializing) {
		// Wait for initialization to complete
		while (isInitializing) {
			await new Promise(resolve => setTimeout(resolve, 100));
		}
		return classifier;
	}

	isInitializing = true;
	try {
		console.log('Loading spam detection model...');
		classifier = await pipeline(
			'text-classification',
			'Xenova/bert-base-multilingual-uncased-sentiment'
		);
		console.log('Spam detection model loaded successfully');

		// Start processing the queue once model is ready
		processQueue();

	} catch (error) {
		console.error('Failed to load spam detection model:', error);
		throw error;
	} finally {
		isInitializing = false;
	}

	return classifier;
}

async function processQueue() {
	if (isProcessingQueue || analysisQueue.length === 0) return;

	isProcessingQueue = true;

	try {
		const detector = await initializeSpamDetector();
		if (!detector) throw new Error('Failed to initialize spam detector');

		while (analysisQueue.length > 0) {
			const item = analysisQueue.shift()!;

			try {
				const fullText = item.name ? `${item.name}: ${item.text}` : item.text;
				const results = await detector(fullText);

				const spamResult = Array.isArray(results) ? results[0] : results;
				const confidence = spamResult.score;

				// For star rating models: block 1-star reviews with high confidence
				// For sentiment models: block NEGATIVE with high confidence
				const isSpam = (spamResult.label === '1 star' || spamResult.label === 'NEGATIVE') && confidence > 0.8;

				const analysis: SpamAnalysis = {
					isSpam,
					confidence,
					reason: isSpam
						? `AI detected highly ${spamResult.label.toLowerCase()} content (${Math.round(confidence * 100)}% confidence)`
						: 'Content appears acceptable',
					toxicityScore: (spamResult.label === 'NEGATIVE' || spamResult.label === '1 star') ? confidence : 1 - confidence
				};

				// Log spam detection for monitoring
				if (isSpam) {
					console.warn(`[SPAM] 🚫 BLOCKED - ${item.name || 'Anonymous'} <${item.email}>`);
					console.warn(`[SPAM] Label: ${spamResult.label} | Confidence: ${Math.round(confidence * 100)}%`);
					console.warn(`[SPAM] Content: "${item.text}"`);
				} else {
					console.log(`[SPAM] ✅ APPROVED - ${item.name || 'Anonymous'} <${item.email}>`);
					console.log(`[SPAM] Label: ${spamResult.label} | Confidence: ${Math.round(confidence * 100)}%`);
					console.log(`[SPAM] Content: "${item.text}"`);
				}

				item.resolve(analysis);

			} catch (error) {
				console.error('Error analyzing item:', error);
				item.reject(error instanceof Error ? error : new Error('Analysis failed'));
			}
		}

	} finally {
		isProcessingQueue = false;
	}
}

export function queueSpamAnalysis(text: string, email: string, name?: string): Promise<SpamAnalysis> {
	return new Promise((resolve, reject) => {
		const queueItem: QueuedAnalysis = {
			id: crypto.randomUUID(),
			text,
			name,
			email,
			timestamp: Date.now(),
			resolve,
			reject
		};

		analysisQueue.push(queueItem);

		// Initialize model and start processing if not already running
		if (!classifier && !isInitializing) {
			initializeSpamDetector().catch(reject);
		} else if (classifier && !isProcessingQueue) {
			processQueue();
		}
	});
}

// Initialize the model on startup (optional - could also be lazy loaded)
export function preloadSpamDetector() {
	initializeSpamDetector().catch(error => {
		console.error('Failed to preload spam detector:', error);
	});
}