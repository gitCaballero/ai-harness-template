const stackProfiles = {
  nodejs: {
    stack: 'nodejs',
    name: 'Node.js',
    profile: 'ai-engineering/profiles/nodejs.md',
    signals: [
      'package.json',
      'package-lock.json',
      'npm-shrinkwrap.json',
      'pnpm-lock.yaml',
      'yarn.lock',
      'bun.lockb',
      'tsconfig.json',
      'vite.config.ts',
      'vite.config.js',
      'next.config.js',
      'next.config.mjs',
      'jest.config.js',
      'vitest.config.ts',
      'playwright.config.ts',
    ],
    requiredWhen: ['package.json'],
    gates: ['package_manager', 'lockfile', 'lint_when_present', 'typecheck_when_present', 'tests', 'build_when_present'],
  },
  dotnet: {
    stack: 'dotnet',
    name: '.NET',
    profile: 'ai-engineering/profiles/dotnet.md',
    signals: [
      '.sln',
      '.slnx',
      '.csproj',
      '.fsproj',
      '.vbproj',
      'global.json',
      'Directory.Build.props',
      'Directory.Packages.props',
      'NuGet.config',
      'appsettings.json',
    ],
    requiredWhen: ['.sln', '.slnx', '.csproj', '.fsproj', '.vbproj'],
    gates: ['restore', 'build', 'tests', 'format_when_present', 'code_review'],
  },
};

function normalizeSignal(signal) {
  return String(signal ?? '').trim().replaceAll('\\', '/').toLowerCase();
}

function matchesSignal(observedSignal, profileSignal) {
  const normalizedProfileSignal = normalizeSignal(profileSignal);

  if (normalizedProfileSignal.startsWith('.')) {
    return observedSignal.endsWith(normalizedProfileSignal);
  }

  return observedSignal === normalizedProfileSignal || observedSignal.endsWith(`/${normalizedProfileSignal}`);
}

export function detectStackProfiles({ files = [], commands = [] } = {}) {
  const observedSignals = [...files, ...commands].map(normalizeSignal).filter(Boolean);
  const detected = [];

  for (const profile of Object.values(stackProfiles)) {
    const matchedSignals = profile.signals.filter((signal) =>
      observedSignals.some((observedSignal) => matchesSignal(observedSignal, signal)),
    );

    if (matchedSignals.length === 0) {
      continue;
    }

    detected.push({
      stack: profile.stack,
      name: profile.name,
      profile: profile.profile,
      matchedSignals,
      required: profile.requiredWhen.some((signal) =>
        observedSignals.some((observedSignal) => matchesSignal(observedSignal, signal)),
      ),
      gates: profile.gates,
    });
  }

  return {
    detected,
    profilesToLoad: detected.map((profile) => profile.profile),
    requiresProfile: detected.some((profile) => profile.required),
  };
}

export function listStackProfiles() {
  return Object.values(stackProfiles).map(({ stack, name, profile, signals, requiredWhen, gates }) => ({
    stack,
    name,
    profile,
    signals,
    requiredWhen,
    gates,
  }));
}
