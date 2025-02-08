import { EverythingAsCode } from '@fathym/eac';
import { EaCRuntimeConfig } from '@fathym/eac/runtime/config';
import { EaCRuntimePlugin, EaCRuntimePluginConfig } from '@fathym/eac/runtime/plugins';
import { EverythingAsCodeApplications } from '@fathym/eac-applications';
import { EaCStewardPlugin } from '@fathym/eac-applications/steward/plugins';
import { EaCAPIProcessor } from '@fathym/eac-applications/processors';
import {
  EaCAzureAPIPlugin,
  EaCAzureCloudsStewardPlugin,
  EaCAzureSecretsStewardPlugin,
} from '@fathym/eac-azure/steward/plugins';
import { EaCLocalDistributedFileSystemDetails } from '@fathym/eac/dfs';
import { EaCIoTStewardPlugin } from '@fathym/eac-iot/steward/plugins';
import {
  EaCLicensingAPIPlugin,
  EaCLicensingStewardPlugin,
} from '@fathym/eac-licensing/steward/plugins';
import {
  EaCDevOpsActionsStewardPlugin,
  EaCSourceConnectionsStewardPlugin,
  EaCSourcesStewardPlugin,
} from '@fathym/eac-sources/steward/plugins';
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
            Priority: 300,
          },
        }),
        new EaCAzureAPIPlugin({
          Application: {
            Path: '/api/eac/azure*',
            Priority: 500,
          },
        }),
        new EaCAzureCloudsStewardPlugin({
          Application: {
            Path: '/api/steward/clouds*',
            Priority: 500,
          },
        }),
        new EaCAzureSecretsStewardPlugin({
          Application: {
            Path: '/api/steward/secrets*',
            Priority: 500,
          },
        }),
        new EaCIoTStewardPlugin({
          Application: {
            Path: '/api/steward/iot*',
            Priority: 500,
          },
        }),
        new EaCSourceConnectionsStewardPlugin({
          Application: {
            Path: '/api/steward/source-connections*',
            Priority: 500,
          },
        }),
        new EaCSourcesStewardPlugin({
          Application: {
            Path: '/api/steward/sources*',
            Priority: 500,
          },
        }),
        new EaCDevOpsActionsStewardPlugin({
          Application: {
            Path: '/api/steward/devops-actions*',
            Priority: 500,
          },
        }),
        new EaCLicensingAPIPlugin({
          Application: {
            Path: '/api/steward/devops-actions*',
            Priority: 500,
          },
        }),
        new EaCLicensingStewardPlugin({
          Application: {
            Path: '/api/steward/devops-actions*',
            Priority: 500,
          },
        }),
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
