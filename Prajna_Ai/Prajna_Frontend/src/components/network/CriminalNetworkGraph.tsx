import { useState, useRef, useEffect } from 'react';
import { NetworkGraphData, NetworkNode } from '@/types';
import * as Lucide from 'lucide-react';

interface CriminalNetworkGraphProps {
  data: NetworkGraphData;
  onNodeSelect?: (node: NetworkNode) => void;
}

export function CriminalNetworkGraph({ data, onNodeSelect }: CriminalNetworkGraphProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  
  // Pan and Zoom State
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Position generation for nodes (force-directed-like circular clusters for demo)
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    // Generate positions once on mount or when data changes
    const positions: Record<string, { x: number; y: number }> = {};
    const center = { x: 350, y: 250 };
    
    // Position suspects in an inner circle, cases/locations outer, accounts/phones even outer
    data.nodes.forEach((node, index) => {
      let radius = 120;
      let angle = (index / data.nodes.length) * 2 * Math.PI;

      if (node.type === 'suspect') {
        radius = 80;
        // Group suspects slightly closer to each other
        if (node.riskTier === 'high') radius = 50;
      } else if (node.type === 'case') {
        radius = 140;
      } else if (node.type === 'location' || node.type === 'vehicle') {
        radius = 180;
      } else {
        radius = 220;
      }

      // Add slight variety to angle
      positions[node.id] = {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
      };
    });

    setNodePositions(positions);
  }, [data]);

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof SVGElement && e.target.tagName !== 'svg') return; // Only drag background
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    let newZoom = zoom + (e.deltaY < 0 ? zoomFactor : -zoomFactor);
    newZoom = Math.max(0.4, Math.min(2.5, newZoom));
    setZoom(newZoom);
  };

  const resetGraph = () => {
    setPan({ x: 0, y: 0 });
    setZoom(1);
    setSelectedNodeId(null);
  };

  // Node Color Resolver
  const getNodeColor = (type: string, riskTier?: string) => {
    if (type === 'suspect') {
      return riskTier === 'high' ? '#8B0000' : riskTier === 'medium' ? '#E65100' : '#B0BEC5';
    }
    switch (type) {
      case 'victim': return '#0277BD';
      case 'location': return '#0E7A0D';
      case 'vehicle': return '#FF8F00';
      case 'phone': return '#7B1FA2';
      case 'account': return '#F9A825';
      case 'case': return '#546E7A';
      default: return '#78909C';
    }
  };

  // Filtering
  const filteredNodes = data.nodes.filter(node => {
    if (filterType !== 'all' && node.type !== filterType) return false;
    if (filterRisk !== 'all' && node.type === 'suspect' && node.riskTier !== filterRisk) return false;
    return true;
  });

  const filteredNodeIds = new Set(filteredNodes.map(n => n.id));

  const filteredEdges = data.edges.filter(edge => {
    return filteredNodeIds.has(edge.source) && filteredNodeIds.has(edge.target);
  });

  // Highlights based on selection
  const connectedNodeIds = new Set<string>();
  if (selectedNodeId) {
    connectedNodeIds.add(selectedNodeId);
    data.edges.forEach(edge => {
      if (edge.source === selectedNodeId) connectedNodeIds.add(edge.target);
      if (edge.target === selectedNodeId) connectedNodeIds.add(edge.source);
    });
  }

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNodeId(node.id);
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  };

  return (
    <div className="relative w-full h-[550px] bg-slate-50 rounded-lg border border-ksp-gray-200 dark:bg-ksp-navy-dark/30 dark:border-ksp-navy-light overflow-hidden flex flex-col">
      {/* Top Toolbar controls */}
      <div className="z-10 bg-white/95 border-b border-ksp-gray-200 p-3 flex flex-wrap items-center justify-between gap-3 dark:bg-ksp-navy-dark dark:border-ksp-navy-light">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {/* Node Type filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-ksp-gray-600 dark:text-ksp-gray-300">Node:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded border border-ksp-gray-300 bg-white px-2 py-1 outline-none dark:bg-ksp-navy dark:border-ksp-navy-light dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="suspect">Suspect</option>
              <option value="case">Case</option>
              <option value="location">Location</option>
              <option value="vehicle">Vehicle</option>
              <option value="phone">Phone</option>
              <option value="account">Account</option>
            </select>
          </div>

          {/* Risk Tier filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-ksp-gray-600 dark:text-ksp-gray-300">Risk:</span>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="rounded border border-ksp-gray-300 bg-white px-2 py-1 outline-none dark:bg-ksp-navy dark:border-ksp-navy-light dark:text-white"
            >
              <option value="all">All Tiers</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={resetGraph}
            className="flex items-center gap-1 rounded bg-ksp-navy text-white px-2.5 py-1 text-xs font-bold hover:bg-ksp-navy-light"
          >
            <Lucide.RefreshCw className="h-3 w-3" /> Reset View
          </button>
        </div>
      </div>

      {/* SVG Canvas wrapper */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className="flex-1 cursor-grab active:cursor-grabbing relative outline-none select-none"
      >
        <svg 
          width="100%" 
          height="100%"
          viewBox="0 0 700 500"
          className="absolute inset-0"
        >
          {/* Transforming Group for Zoom & Pan */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            
            {/* Draw Links/Edges */}
            {filteredEdges.map((edge) => {
              const from = nodePositions[edge.source];
              const to = nodePositions[edge.target];
              if (!from || !to) return null;

              const isHighlighted = selectedNodeId === null || 
                (edge.source === selectedNodeId || edge.target === selectedNodeId);

              return (
                <g key={edge.id} className="transition-opacity duration-300">
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isHighlighted ? '#0B2E59' : '#D1D9E6'}
                    strokeWidth={isHighlighted ? 2.5 : 1}
                    strokeOpacity={isHighlighted ? 0.8 : 0.2}
                  />
                  {isHighlighted && (
                    <text
                      x={(from.x + to.x) / 2}
                      y={(from.y + to.y) / 2 - 4}
                      fill="#0B2E59"
                      fontSize="8"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="bg-white px-0.5"
                    >
                      {edge.relationship}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Draw Nodes */}
            {filteredNodes.map((node) => {
              const pos = nodePositions[node.id];
              if (!pos) return null;

              const isSelected = selectedNodeId === node.id;
              const isDimmed = selectedNodeId !== null && !connectedNodeIds.has(node.id);
              const color = getNodeColor(node.type, node.riskTier);

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => handleNodeClick(node)}
                  className="cursor-pointer transition-all duration-300"
                  style={{ opacity: isDimmed ? 0.35 : 1 }}
                >
                  {/* Outer circle for select highlight */}
                  <circle
                    r={isSelected ? 20 : node.type === 'suspect' ? 15 : 12}
                    fill={color}
                    stroke={isSelected ? '#8B0000' : '#fff'}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="shadow-sm hover:scale-110 transition-transform"
                  />
                  
                  {/* Label under node */}
                  <text
                    y={node.type === 'suspect' ? 24 : 20}
                    fill="#263238"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="pointer-events-none select-none font-mono dark:fill-white"
                  >
                    {node.label.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Floating Zoom overlay indicator */}
        <div className="absolute bottom-3 left-3 bg-white/85 border border-ksp-gray-200 px-2 py-1 rounded text-[10px] font-mono font-bold dark:bg-ksp-navy-dark dark:border-ksp-navy-light dark:text-white">
          Zoom: {Math.round(zoom * 100)}% | Pan: X={Math.round(pan.x)} Y={Math.round(pan.y)}
        </div>
      </div>
      
      {/* Legend Footer */}
      <div className="border-t border-ksp-gray-200 bg-white p-3 flex flex-wrap justify-center gap-3 text-[10px] font-bold dark:bg-ksp-navy-dark dark:border-ksp-navy-light">
        <div className="flex items-center space-x-1"><span className="h-3.5 w-3.5 rounded-full bg-[#8B0000]" /> <span>Suspect (High)</span></div>
        <div className="flex items-center space-x-1"><span className="h-3.5 w-3.5 rounded-full bg-[#E65100]" /> <span>Suspect (Med)</span></div>
        <div className="flex items-center space-x-1"><span className="h-3.5 w-3.5 rounded-full bg-[#0277BD]" /> <span>Victim</span></div>
        <div className="flex items-center space-x-1"><span className="h-3.5 w-3.5 rounded-full bg-[#0E7A0D]" /> <span>Location</span></div>
        <div className="flex items-center space-x-1"><span className="h-3.5 w-3.5 rounded-full bg-[#FF8F00]" /> <span>Vehicle</span></div>
        <div className="flex items-center space-x-1"><span className="h-3.5 w-3.5 rounded-full bg-[#7B1FA2]" /> <span>Phone</span></div>
        <div className="flex items-center space-x-1"><span className="h-3.5 w-3.5 rounded-full bg-[#F9A825]" /> <span>Account</span></div>
        <div className="flex items-center space-x-1"><span className="h-3.5 w-3.5 rounded-full bg-[#546E7A]" /> <span>Case</span></div>
      </div>
    </div>
  );
}
