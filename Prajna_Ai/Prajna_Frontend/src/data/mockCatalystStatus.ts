import { CatalystServiceStatus } from '@/types';

export const mockCatalystStatus: CatalystServiceStatus[] = [
  {
    serviceName: 'Catalyst NoSQL',
    status: 'online',
    latency: 45,
    recordCount: 1000,
    lastChecked: new Date().toISOString()
  },
  {
    serviceName: 'Catalyst Data Store',
    status: 'online',
    latency: 30,
    recordCount: 2500,
    lastChecked: new Date().toISOString()
  },
  {
    serviceName: 'Catalyst QuickML (LLM/RAG)',
    status: 'online',
    latency: 1200,
    recordCount: 1000,
    lastChecked: new Date().toISOString()
  },
  {
    serviceName: 'Catalyst Zia Face Recognition',
    status: 'online',
    latency: 800,
    recordCount: 450,
    lastChecked: new Date().toISOString()
  },
  {
    serviceName: 'Catalyst Zia Speech-to-Text (via Browser Web Speech)',
    status: 'online',
    latency: 500,
    recordCount: undefined,
    lastChecked: new Date().toISOString()
  },
  {
    serviceName: 'Catalyst Zia Text-to-Speech (via Browser SpeechSynthesis)',
    status: 'online',
    latency: 350,
    recordCount: undefined,
    lastChecked: new Date().toISOString()
  },
  {
    serviceName: 'Catalyst Zia Translation (via Serverless Gateway)',
    status: 'online',
    latency: 400,
    recordCount: undefined,
    lastChecked: new Date().toISOString()
  },
  {
    serviceName: 'Catalyst Authentication',
    status: 'online',
    latency: 100,
    recordCount: 85,
    lastChecked: new Date().toISOString()
  },
  {
    serviceName: 'Catalyst SmartBrowz (PDF)',
    status: 'online',
    latency: 2000,
    recordCount: undefined,
    lastChecked: new Date().toISOString()
  },
  {
    serviceName: 'Catalyst Serverless Functions',
    status: 'online',
    latency: 150,
    recordCount: 12,
    lastChecked: new Date().toISOString()
  },
  {
    serviceName: 'Catalyst AppSail',
    status: 'online',
    latency: 50,
    recordCount: undefined,
    lastChecked: new Date().toISOString()
  },
  {
    serviceName: 'Catalyst Stratus (File Store)',
    status: 'online',
    latency: 200,
    recordCount: 1200, // 1.2 GB stored (represented as file count or size)
    lastChecked: new Date().toISOString()
  }
];
