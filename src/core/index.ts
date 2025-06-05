import { extractPhrases } from './domPhraseExtractor';
import { registerPhrases } from './phraseRegistry';
import { getConfig } from '../config';

export async function scan(root: HTMLElement = document.body) {
  const allPhrases = extractPhrases(root);
  const newPhrases = registerPhrases(allPhrases);

  if (newPhrases.length > 0) {
    console.log(`Found ${newPhrases.length} new phrases to send:`, newPhrases);
  }
}

export async function send(phrases: string[]) {
  const { apiEndpoint, projectId, token, debug } = getConfig();

  if (!phrases.length || !apiEndpoint || !projectId) {
    if (debug) console.warn('Missing config or empty phrase list');
    return;
  }

  try {
    await fetch(`${apiEndpoint}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ projectId, phrases }),
    });
  } catch (err) {
    if (debug) console.warn('Failed to send phrases:', err);
  }
}

export const hello = () => console.log('Core!');