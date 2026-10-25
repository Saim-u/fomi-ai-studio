/**
 * @file utils.js
 * Core frontend utility functions: class joining, hashing, formatting,
 * and clipboard/download helpers.
 */

/**
 * Combines class names cleanly, filtering out falsy values.
 * @param {...(string|boolean|undefined|null)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Computes a deterministic 32-bit positive integer hash from a string.
 * Used for deterministic seed generation from prompts.
 * @param {string} str
 * @returns {number}
 */
export function hashString(str = '') {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Truncates text to a specified character limit, appending ellipsis if needed.
 * @param {string} text
 * @param {number} maxLen
 * @returns {string}
 */
export function truncate(text = '', maxLen = 80) {
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen).trim()}...`;
}

/**
 * Formats a number with friendly K/M suffixes.
 * @param {number} num
 * @returns {string}
 */
export function formatCount(num = 0) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
}

/**
 * Copies text to the user's system clipboard with fallback.
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  if (typeof window === 'undefined') return false;
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}

/**
 * Triggers a direct browser download for an image URL.
 * @param {string} url
 * @param {string} [filename='fomi-generation.jpg']
 */
export async function downloadImage(url, filename = 'fomi-generation.jpg') {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch {
    // Fallback if CORS prevents blob download
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = filename;
    link.click();
  }
}
