import { EaCRuntimeHandler } from '@fathym/eac/runtime/pipelines';
import { buildCurrentEaCMiddleware } from '@fathym/eac-applications/steward/api';
import { CompanyAPIState } from '../../src/state/CompanyAPIState.ts';

export default [
  buildCurrentEaCMiddleware(),
] as EaCRuntimeHandler<CompanyAPIState>[];
