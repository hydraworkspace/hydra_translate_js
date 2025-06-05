// Gửi cụm từ về server

import { getConfig } from '../config';

export async function sendPhrasesToServer(phrases: string[]) {
  const { apiEndpoint, projectId, token } = getConfig();
  const payload = {
    projectId,
    phrases,
  };

  try {
    await fetch(`${apiEndpoint}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    if (getConfig().debug) console.warn('Failed to send phrases', e);
  }
}
