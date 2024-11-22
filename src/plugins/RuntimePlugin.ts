import { EverythingAsCode } from '@fathym/eac';
import { EaCRuntimeConfig } from '@fathym/eac/runtime/config';
import { EaCRuntimePlugin, EaCRuntimePluginConfig } from '@fathym/eac/runtime/plugins';
import { EverythingAsCodeApplications } from '@fathym/eac-applications';
import { EaCStewardPlugin } from '@fathym/eac-applications/steward/plugins';
import { EaCAPIProcessor } from '@fathym/eac-applications/processors';
import { EaCLocalDistributedFileSystemDetails } from '@fathym/eac-dfs';
import { IoCContainer } from '@fathym/ioc';

export default class RuntimePlugin implements EaCRuntimePlugin {
  constructor() {}

  public Setup(config: EaCRuntimeConfig) {
    const pluginConfig: EaCRuntimePluginConfig<
      EverythingAsCode & EverythingAsCodeApplications
    > = {
      Name: RuntimePlugin.name,
      Plugins: [
        new EaCStewardPlugin({
          Application: {
            Path: '/api/eac*',
          },
        }),
        // new EaCAzureStewardPlugin({
        //   Application: {
        //     Path: '/api/eac*',
        //   },
        // }),
        // new EaCGitHubStewardPlugin({
        //   Application: {
        //     Path: '/api/eac*',
        //   },
        // }),
      ],
      IoC: new IoCContainer(),
      EaC: {
        Projects: {
          core: {
            Details: {
              Name: 'Sink Micro Applications',
              Description: 'The Kitchen Sink Micro Applications to use.',
              Priority: 100,
            },
            ResolverConfigs: {
              localhost: {
                Hostname: 'localhost',
                Port: config.Server.port || 8000,
              },
              '127.0.0.1': {
                Hostname: '127.0.0.1',
                Port: config.Server.port || 8000,
              },
            },
            ModifierResolvers: {},
            ApplicationResolvers: {
              api: {
                PathPattern: '/api*',
                Priority: 100,
              },
            },
          },
        },
        Applications: {
          api: {
            Details: {
              Name: 'Local API',
              Description: 'Default local APIs.',
            },
            Processor: {
              Type: 'API',
              DFSLookup: 'local:apps/api',
            } as EaCAPIProcessor,
          },
        },
        DFSs: {
          'local:apps/api': {
            Details: {
              Type: 'Local',
              FileRoot: './apps/api/',
              DefaultFile: 'index.ts',
              Extensions: ['ts'],
            } as EaCLocalDistributedFileSystemDetails,
          },
        },
      },
    };

    return Promise.resolve(pluginConfig);
  }
}
