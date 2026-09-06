import { useEffect, useState } from 'react';
import { CriminalNetworkGraph } from '@/components/network/CriminalNetworkGraph';
import { useLanguage } from '@/context/LanguageContext';
import { NetworkNode } from '@/types';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';
import * as Lucide from 'lucide-react';

export function NetworkAnalysisPage() {
  const { t } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [graph, setGraph] = useState<any>(null);

useEffect(() => {
  loadNetworkGraph();
}, []);

async function loadNetworkGraph() {
  try {
    const response = await fetch("https://prajna-ai-60073413366.development.catalystserverless.in/server/prajna_ai_function/?query=__network__");

    const data = await response.json();

    setGraph(data);
  } catch (err) {
    console.error(err);
  }
}
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-xs">
      {/* Page Header Banner */}
      <div className="bg-[#0B2E59] text-white p-6 rounded-lg shadow border-l-4 border-[#8B0000] flex flex-col md:flex-row md:items-center justify-between gap-4 text-left select-none">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight uppercase">{t('networkTitle')}</h1>
          <p className="text-xs text-gray-300 mt-1 leading-normal">
            {t('networkDesc')}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-[#133D6B] px-4 py-2 rounded border border-[#05182E] text-xs self-start md:self-auto">
          <Lucide.Network size={16} className="text-[#8B0000]" />
          <span className="font-mono text-gray-100 uppercase tracking-wider font-semibold">Criminal Graph</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Network Graph widget takes 3 cols */}
        <div className="lg:col-span-3">
          {graph ? (
    <CriminalNetworkGraph
        data={graph}
        onNodeSelect={(node)=>setSelectedNode(node)}
    />
) : (
    <div className="rounded-lg border p-8 text-center">
        Loading Network Graph...
    </div>
)}
        </div>

        {/* Selected node dossier takes 1 col */}
        <div className="space-y-6">
          <div className="rounded-lg border border-ksp-gray-200 bg-white p-5 shadow-sm dark:bg-ksp-navy-dark dark:border-ksp-navy-light space-y-4">
            <div className="flex items-center space-x-2 border-b pb-2 select-none">
              <Lucide.FolderHeart className="h-4.5 w-4.5 text-ksp-navy dark:text-sky-300" />
              <h4 className="font-mono font-bold text-ksp-navy dark:text-sky-300">
                {t('intelDossier')}
              </h4>
            </div>

            {selectedNode ? (
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-ksp-gray-600 dark:text-ksp-gray-300 uppercase block">{t('nodeLabel')}</span>
                  <span className="text-sm font-extrabold text-ksp-navy dark:text-white">{selectedNode.label}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-ksp-gray-600 dark:text-ksp-gray-300 uppercase block">{t('typeClassification')}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-slate-100 text-ksp-gray-800 dark:bg-ksp-navy-light dark:text-white">
                    {selectedNode.type}
                  </span>
                </div>

                {selectedNode.riskTier && (
                  <div>
                    <span className="text-[10px] font-bold text-ksp-gray-600 dark:text-ksp-gray-300 uppercase block">{t('riskAssessmentTier')}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                      selectedNode.riskTier === 'high' ? 'bg-red-100 text-red-800' :
                      selectedNode.riskTier === 'medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedNode.riskTier === 'high' ? t('highRisk') : selectedNode.riskTier === 'medium' ? t('mediumRisk') : t('lowRisk')}
                    </span>
                  </div>
                )}

                <div className="border-t pt-3 space-y-2">
                  <span className="text-[10px] font-bold text-ksp-navy dark:text-sky-300 uppercase block">{t('metadataProperties')}</span>
                  {selectedNode.metadata && Object.entries(selectedNode.metadata).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-[11px] leading-none">
                      <span className="capitalize text-ksp-gray-600 dark:text-ksp-gray-300 font-bold">{key}:</span>
                      <span className="font-semibold text-ksp-gray-800 dark:text-white">{val}</span>
                    </div>
                  ))}
                </div>

                {selectedNode.type === 'suspect' && (
                  <button
                    onClick={() => alert(`Opening criminal dossier folder for: ${selectedNode.label}`)}
                    className="w-full mt-4 bg-ksp-navy hover:bg-ksp-navy-light text-white font-bold py-2 rounded text-xs tracking-wide shadow"
                  >
                    {t('generateOffenderDossier')}
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-10 text-ksp-gray-600 dark:text-ksp-gray-300 font-medium">
                <Lucide.MousePointerClick className="h-8 w-8 mx-auto text-ksp-gray-600 mb-2" />
                <span>{t('clickNodePrompt')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Operating Instructions / SOP Guide */}
      <ModuleSopGuide
        moduleName="Organized Crime Syndicate Network Analysis"
        department="Central Crime Branch (CCB) & Anti-Extortion Cell"
        legalAuthority="Karnataka Control of Organised Crime Act (KCOCA) & Bharatiya Nagarik Suraksha Sanhita"
        purpose="Visual graph clustering engine to expose kingpins, syndicate intermediaries, money mules, and hidden criminal associations across multi-jurisdictional FIRs."
        steps={[
          {
            step: "01",
            action: "Select Network Node",
            detail: "Click on any suspect, bank account, vehicle, or phone IMEI node to display connectivity degree, risk assessment tier, and link attributes."
          },
          {
            step: "02",
            action: "Analyze Centrality & Bridges",
            detail: "Identify high-centrality bridge nodes that connect disparate criminal cells across different police station jurisdictions."
          },
          {
            step: "03",
            action: "Generate Offender Dossier",
            detail: "Click 'Generate Offender Dossier' from the inspector pane to compile a court-ready associative intelligence annexure."
          }
        ]}
        tacticalTips={[
          "Drag nodes to rearrange cluster density or zoom with the mouse wheel to inspect multi-hop associations.",
          "Crimson red nodes represent High-Risk syndicate leaders; amber nodes indicate operational couriers and mules."
        ]}
      />
    </div>
  );
}
