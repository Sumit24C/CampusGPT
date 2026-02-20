import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

// Simple Download Icon Component
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function MermaidDiagram({ chart, title = "Diagram" }) {
  const ref = useRef(null);
  const [svgCode, setSvgCode] = useState("");

  useEffect(() => {
    if (!chart) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: "neutral",
      securityLevel: "loose",
      fontFamily: "Inter, system-ui, sans-serif",
    });

    const renderDiagram = async () => {
      try {
        const id = "mermaid-" + Math.random().toString(36).substring(2, 9);
        const formattedChart = chart.replace(/\\n/g, "\n");
        
        const { svg } = await mermaid.render(id, formattedChart);
        setSvgCode(svg);
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (error) {
        console.error("Mermaid render error:", error);
      }
    };

    renderDiagram();
  }, [chart]);

  const downloadSVG = () => {
    if (!ref.current) return;
    
    const svgData = ref.current.innerHTML;
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `${title.replace(/\s+/g, "-").toLowerCase()}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  return (
    <div className="group relative my-6 border border-slate-200 rounded-xl bg-slate-50/50 overflow-hidden transition-all hover:shadow-md">
      {/* Header / Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-white">
        <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</span>
        <button
          onClick={downloadSVG}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors bg-blue-50 rounded-md hover:bg-blue-100 active:scale-95"
          title="Download SVG"
        >
          <DownloadIcon />
          Download
        </button>
      </div>

      {/* Diagram Area */}
      <div className="p-6 overflow-auto flex justify-center bg-white">
        <div 
          ref={ref} 
          className="mermaid-wrapper transition-opacity duration-300"
          style={{ opacity: svgCode ? 1 : 0 }}
        />
      </div>
    </div>
  );
}