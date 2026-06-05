export function maskEmail(value) {
  if (!value) {
    return value;
  }

  const trimmed = String(value).trim();
  const atIndex = trimmed.indexOf('@');
  if (atIndex <= 1) {
    return '***';
  }

  return `${trimmed[0]}***${trimmed.slice(atIndex)}`;
}

export function maskIdentifier(value) {
  if (!value) {
    return value;
  }

  const trimmed = String(value).trim();
  if (trimmed.length <= 4) {
    return `${'*'.repeat(Math.max(trimmed.length - 1, 0))}${trimmed.slice(-1)}`;
  }

  return `${'*'.repeat(trimmed.length - 4)}${trimmed.slice(-4)}`;
}
