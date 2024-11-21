import * as _azureSearch from 'npm:@azure/search-documents@12.1.0';
import * as _parse from 'npm:pdf-parse@1.1.1';
import * as _htmlToText from 'npm:html-to-text@9.0.5';
import { EaCRuntime } from '@fathym/eac/runtime';
import { defineEaCApplicationsConfig } from '@fathym/eac-applications/runtime';
import RuntimePlugin from '../src/plugins/RuntimePlugin.ts';
import { RuntimeLoggingProvider } from '../src/logging/RuntimeLoggingProvider.ts';

export const config = defineEaCApplicationsConfig(
  {
    Plugins: [new RuntimePlugin()],
  },
  new RuntimeLoggingProvider(),
);

export function configure(_rt: EaCRuntime): Promise<void> {
  return Promise.resolve();
}
