import {defineConfig} from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            reportsDirectory: './coverage',
            exclude: [
                '**/dist/**',
                '**/playground/**',
                '**/*.d.ts',
                '**/*.config.*',
                '**/.releaserc.js',
                '**/coverage/**',
                '**/node_modules/**',
                'src/useDetectScroll.types.ts',
                'src/index.ts',
                'src/**/*.test.{ts,tsx}',
                'src/**/*.spec.{ts,tsx}',
            ],
        },
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
        environment: 'jsdom',
    },
})
