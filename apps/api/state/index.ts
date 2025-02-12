import { EaCRuntimeHandlers } from '@fathym/eac/runtime/pipelines';
import { CompanyAPIState } from '../../../src/state/CompanyAPIState.ts';

export default {
  GET(_req, ctx) {
    return Response.json(ctx.State);
  },
} as EaCRuntimeHandlers<CompanyAPIState>;
