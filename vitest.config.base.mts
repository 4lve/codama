import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { configDefaults, defineConfig } from 'vitest/config';

export type Platform = 'browser' | 'node' | 'react-native';

export function getPackageVersion(): string {
    const packageJsonPath = join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    if (!packageJson.version) {
        throw new Error('Failed to get package version');
    }
    return packageJson.version
}

export function getVitestConfig(platform: Platform) {
    return defineConfig({
        define: {
            __BROWSER__: `${platform === 'browser'}`,
            __ESM__: 'true',
            __NODEJS__: `${platform === 'node'}`,
            __REACTNATIVE__: `${platform === 'react-native'}`,
            __TEST__: 'true',
            __VERSION__: `"${getPackageVersion()}"`,
        },
        test: {
            environment: platform === 'browser' ? 'happy-dom' : 'node',
            exclude: [...configDefaults.exclude, '**/e2e/**'],
            name: platform,
        },
    });
}
