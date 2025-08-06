"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { Upload, Copy, Download, Share2, ZoomIn, ZoomOut, Palette, Grid, Undo, Redo, X, Code, Brush, XCircle, Settings } from 'lucide-react'
import Editor from 'react-simple-code-editor'

// Custom highlighting function
const highlightCode = (code: string, language: 'xml' | 'jsx' | 'tsx') => {
  // Basic HTML entity escaping
  let highlightedCode = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  if (language === 'xml') {
    // XML/SVG highlighting
    highlightedCode = highlightedCode
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="token comment">$1</span>') // Comments
      .replace(/(&lt;)(\/?)([a-zA-Z0-9:]+)/g, '<span class="token tag">$1$2<span class="token tagName">$3</span>') // Tags start
      .replace(/([a-zA-Z0-9:]+)(&gt;)/g, '<span class="token tagName">$1</span>$2</span>') // Tags end
      .replace(/([a-zA-Z-]+)=(&quot;.*?&quot;|&#039;.*?&#039;)/g, '<span class="token attrName">$1</span>=<span class="token attrValue">$2</span>'); // Attributes
  } else if (language === 'jsx' || language === 'tsx') {
    // JSX/TSX highlighting (simplified)
    highlightedCode = highlightedCode
      .replace(/\b(import|export|default|function|const|let|var|class|extends|return|if|else|for|while|switch|case|break|continue|try|catch|finally|new|this|super|true|false|null|undefined|typeof|instanceof|void|as|interface|type|extends|implements|enum|declare|abstract|static|public|private|protected|readonly|async|await)\b/g, '<span class="token keyword">$1</span>') // Keywords
      .replace(/(\/\/.*|\/\*[\s\S]*?\*\/)/g, '<span class="token comment">$1</span>') // Comments
      .replace(/(&quot;.*?&quot;|&#039;.*?&#039;)/g, '<span class="token string">$1</span>') // Strings
      .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="token number">$1</span>') // Numbers
      .replace(/(\{|\}|\[|\]|$$|$$|;|,|\.|\:|=|\+|\-|\*|\/|%|&amp;|&amp;|\|\||!|&lt;|&gt;)/g, '<span class="token punctuation">$1</span>') // Punctuation
      .replace(/(&lt;)(\/?)([A-Z][a-zA-Z0-9]*)/g, '<span class="token tag">$1$2<span class="token tagName">$3</span>') // React component tags
      .replace(/([a-zA-Z0-9:]+)(&gt;)/g, '<span class="token tagName">$1</span>$2</span>') // React component tags end
      .replace(/([a-zA-Z-]+)=({.*?}|&quot;.*?&quot;|&#039;.*?&#039;)/g, '<span class="token attrName">$1</span>=<span class="token attrValue">$2</span>'); // JSX attributes
  }

  return highlightedCode;
};


export default function SVGViewer() {
  const [svgCode, setSvgCode] = useState(`<svg width="400" height="400" viewBox="0 0 124 124" xmlns="http://www.w3.org/2000/svg">
<rect width="124" height="124" rx="24" fill="#F97316"/>
<path d="M19.375 36.7818V100.625C19.375 102.834 21.1659 104.625 23.375 104.625H87.2181C90.7818 104.625 94.2564 100.316 96.3143 97.5664 100.316 90.0466 97.7966L26.2034 33.9534C23.6836 31.4336 19.375 33.2182 19.375 36.7818Z" fill="white"/>
<circle cx="63.2189" cy="37.5391" r="18.1641" fill="black"/>
<rect opacity="0.4" x="81.1328" y="80.7198" width="17.5687" height="17.3876" rx="4" transform="rotate(-45 81.1328 80.7198)" fill="#FDBA74"/>
</svg>`)
  const [displayedSvgCode, setDisplayedSvgCode] = useState(svgCode)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [showGrid, setShowGrid] = useState(false)
  const [originalSize, setOriginalSize] = useState(0)
  const [optimizedSize, setOptimizedSize] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)

  // State for dragging
  const [isDragging, setIsDragging] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)

  // Modal state for code/png display
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<{ type: 'code' | 'png', code?: string, language?: 'jsx' | 'tsx' | 'xml', title: string } | null>(null)

  // Modal state for SVG properties
  const [showEditModal, setShowEditModal] = useState(false)
  const [svgProperties, setSvgProperties] = useState({
    name: "untitled.svg",
    width: "N/A",
    height: "N/A",
    viewBox: "N/A",
  })

  useEffect(() => {
    setOriginalSize(new TextEncoder().encode(svgCode).length)
    setOptimizedSize(new TextEncoder().encode(displayedSvgCode).length)
  }, [svgCode, displayedSvgCode])

  const handleSvgChange = (code: string) => {
    setSvgCode(code)
    setDisplayedSvgCode(code)
  }

  const handleClear = () => {
    setSvgCode("")
    setDisplayedSvgCode("")
    setUploadedFileName(null)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setSvgCode(content)
        setDisplayedSvgCode(content)
        setUploadedFileName(file.name)
      }
      reader.readAsText(file)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Code copied to clipboard!")
  }

  const handleDownload = useCallback((filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  },[])

  const handleOptimize = () => {
    let optimized = displayedSvgCode
      .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
      .replace(/>\s+</g, "><") // Remove whitespace between tags
      .replace(/\s+/g, " ") // Collapse multiple spaces
      .trim() // Trim leading/trailing whitespace
    setDisplayedSvgCode(optimized)
    setOptimizedSize(new TextEncoder().encode(optimized).length)
  }

  const handlePrettifySvg = () => {
    let prettified = displayedSvgCode
    try {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(prettified, "image/svg+xml")
      const serializer = new XMLSerializer()
      prettified = serializer.serializeToString(xmlDoc.documentElement)
        .replace(/></g, ">\n<") // Add newlines between tags
        .replace(/<([a-z]+)([^>]*?)>/g, (match, tag, attrs) => {
          // Basic indentation for attributes
          if (attrs.includes('=')) {
            return `<${tag}${attrs.replace(/(\w+="[^"]*")/g, '\n  $1')}>`;
          }
          return match;
        })
    } catch (e) {
      console.error("Error prettifying SVG:", e)
      // Fallback to a simpler prettify if DOMParser fails
      prettified = prettified.replace(/></g, ">\n<")
    }
    setDisplayedSvgCode(prettified)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setLastX(e.clientX)
    setLastY(e.clientY)
    e.preventDefault() // Prevent text selection
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const deltaX = e.clientX - lastX
    const deltaY = e.clientY - lastY
    setOffsetX(prev => prev + deltaX)
    setOffsetY(prev => prev + deltaY)
    setLastX(e.clientX)
    setLastY(e.clientY)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const renderSvgPreview = () => {
    console.log("Displayed SVG Code:", displayedSvgCode); // Debugging log
    return (
      <div
        className="w-full h-full flex justify-center items-center overflow-hidden relative border-2 border-red-500" // Added red border for debugging
        style={{
          backgroundColor: backgroundColor,
          backgroundImage: showGrid
            ? `repeating-linear-gradient(0deg, #ccc, #ccc 1px, transparent 1px, transparent 20px),
               repeating-linear-gradient(90deg, #ccc, #ccc 1px, transparent 1px, transparent 20px)`
            : "none",
          backgroundSize: showGrid ? "20px 20px" : "auto",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {displayedSvgCode ? ( // Conditionally render SVG if code exists
          <div
            dangerouslySetInnerHTML={{ __html: displayedSvgCode }}
            style={{
              transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel / 100})`,
              transformOrigin: "center center",
              maxWidth: "100%",
              maxHeight: "100%",
              pointerEvents: "none", // Prevent SVG elements from interfering with drag
            }}
            className="[&>svg]:block [&>svg]:max-w-full [&>svg]:max-h-full"
          />
        ) : (
          <p className="text-gray-500">No SVG code to display. Upload or type some SVG.</p>
        )}
      </div>
    )
  }

  const convertAttributesToCamelCase = (svgString: string) => {
    return svgString
      .replace(/stroke-width/g, 'strokeWidth')
      .replace(/fill-rule/g, 'fillRule')
      .replace(/clip-rule/g, 'clipRule')
      .replace(/stop-color/g, 'stopColor')
      .replace(/stop-opacity/g, 'stopOpacity')
      .replace(/font-family/g, 'fontFamily')
      .replace(/font-size/g, 'fontSize')
      .replace(/text-anchor/g, 'textAnchor')
      .replace(/stroke-linecap/g, 'strokeLinecap')
      .replace(/stroke-linejoin/g, 'strokeLinejoin')
      .replace(/stroke-miterlimit/g, 'strokeMiterlimit')
      .replace(/stroke-dasharray/g, 'strokeDasharray')
      .replace(/stroke-dashoffset/g, 'strokeDashoffset')
      .replace(/clip-path/g, 'clipPath')
      .replace(/gradientTransform/g, 'gradientTransform')
      .replace(/patternUnits/g, 'patternUnits')
      .replace(/patternContentUnits/g, 'patternContentUnits')
      .replace(/markerUnits/g, 'markerUnits')
      .replace(/markerWidth/g, 'markerWidth')
      .replace(/markerHeight/g, 'markerHeight')
      .replace(/orient/g, 'orient')
      .replace(/refX/g, 'refX')
      .replace(/refY/g, 'refY')
      .replace(/viewBox/g, 'viewBox')
      .replace(/xmlns/g, 'xmlns')
      .replace(/xlink:href/g, 'xlinkHref')
      .replace(/xml:space/g, 'xmlSpace')
      .replace(/xml:base/g, 'xmlBase')
      .replace(/xml:lang/g, 'xmlLang')
      .replace(/class=/g, 'className=') // Replace class with className for React
      .replace(/style="([^"]*)"/g, (match, styleContent) => {
        // Convert inline styles to React style object
        const styleObject = styleContent.split(';').filter(Boolean).map((prop: string) => {
          const [key, value] = prop.split(':').map(s => s.trim());
          const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          return `${camelKey}: '${value}'`;
        }).join(', ');
        return `style={{ ${styleObject} }}`;
      });
  }

  const generateReactCode = useCallback(() => {
    let reactCode = convertAttributesToCamelCase(displayedSvgCode)
      .replace(/<svg([^>]*)>/, '<svg {...props}>');

    return `import React from 'react';\n\nconst MySvgComponent = (props) => (\n  ${reactCode}\n);\n\nexport default MySvgComponent;`;
  }, [displayedSvgCode]);

  const generateReactNativeCode = useCallback(() => {
    let rnCode = displayedSvgCode
      .replace(/<svg([^>]*)>/, '<Svg {...props}>')
      .replace(/<\/svg>/g, '</Svg>')
      .replace(/<rect/g, '<Rect')
      .replace(/<\/rect>/g, '</Rect>')
      .replace(/<circle/g, '<Circle')
      .replace(/<\/circle>/g, '</Circle>')
      .replace(/<path/g, '<Path')
      .replace(/<\/path>/g, '</Path>')
      .replace(/<line/g, '<Line')
      .replace(/<\/line>/g, '</Line>')
      .replace(/<polygon/g, '<Polygon')
      .replace(/<\/polygon>/g, '</Polygon>');

    rnCode = convertAttributesToCamelCase(rnCode); // Apply camelCase conversion

    const imports = new Set<string>();
    if (rnCode.includes('<Path')) imports.add('Path');
    if (rnCode.includes('<Circle')) imports.add('Circle');
    if (rnCode.includes('<Rect')) imports.add('Rect');
    if (rnCode.includes('<Polygon')) imports.add('Polygon');
    if (rnCode.includes('<Line')) imports.add('Line');

    const importString = imports.size > 0 ? `, { ${Array.from(imports).join(', ')} }` : '';

    return `import React from 'react';\nimport Svg${importString} from 'react-native-svg';\n\nconst MySvgComponent = (props) => (\n  ${rnCode}\n);\n\nexport default MySvgComponent;`;
  }, [displayedSvgCode]);

  const generateTypeScriptCode = useCallback(() => {
    let tsCode = convertAttributesToCamelCase(displayedSvgCode)
      .replace(/<svg([^>]*)>/, '<svg {...props}>');

    return `import React from 'react';\n\ninterface MySvgComponentProps extends React.SVGProps<SVGSVGElement> {}\n\nconst MySvgComponent: React.FC<MySvgComponentProps> = (props) => (\n  ${tsCode}\n);\n\nexport default MySvgComponent;`;
  }, [displayedSvgCode]);

  const handlePngExportInModal = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const svg = new Image()
    const svgData = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(displayedSvgCode)}`

    svg.onload = () => {
      // Clear canvas and set background
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid if enabled
      if (showGrid) {
        ctx.strokeStyle = "#ccc"
        ctx.lineWidth = 1
        const gridSize = 20
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
          ctx.stroke()
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }
      }

      // Calculate scaled dimensions to fit within canvas
      const parser = new DOMParser();
      const svgElement = parser.parseFromString(displayedSvgCode, "image/svg+xml").documentElement;
      const svgWidth = parseFloat(svgElement.getAttribute('width') || '400');
      const svgHeight = parseFloat(svgElement.getAttribute('height') || '400');

      const svgAspectRatio = svgWidth / svgHeight;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;

      if (svgAspectRatio > canvas.width / canvas.height) {
        drawHeight = canvas.width / svgAspectRatio;
      } else {
        drawWidth = canvas.height * svgAspectRatio;
      }

      // Apply zoom level
      drawWidth *= (zoomLevel / 100);
      drawHeight *= (zoomLevel / 100);

      // Center the SVG and apply drag offsets
      const xOffset = (canvas.width - drawWidth) / 2 + offsetX;
      const yOffset = (canvas.height - drawHeight) / 2 + offsetY;

      ctx.drawImage(svg, xOffset, yOffset, drawWidth, drawHeight)

      const pngDataUrl = canvas.toDataURL("image/png")
      handleDownload("download.png", pngDataUrl.split(",")[1], "image/png")
    }
    svg.crossOrigin = "anonymous" // Important for CORS
    svg.src = svgData
  }, [displayedSvgCode, backgroundColor, showGrid, zoomLevel, offsetX, offsetY, handleDownload]);


  const renderCodeDisplay = (code: string, language: 'jsx' | 'tsx' | 'xml', onPrettify?: () => void) => (
    <div className="relative h-full w-full">
      <pre
        className="w-full h-full bg-gray-900 text-gray-300 font-mono text-sm resize-none outline-none leading-relaxed p-4 overflow-auto scrollable-content"
        dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          lineHeight: '1.5em',
        }}
      />
      <button
        onClick={() => handleCopy(code)}
        className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
      >
        <Copy size={16} /> Copy
      </button>
      {onPrettify && (
        <button
          onClick={onPrettify}
          className="absolute top-2 right-20 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
        >
          <Brush size={16} /> Prettify
        </button>
      )}
    </div>
  )

  const openCodeModal = (type: 'code' | 'png', title: string, code?: string, language?: 'jsx' | 'tsx' | 'xml') => {
    setModalContent({ type, code, language, title });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const openEditModal = () => {
    try {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(displayedSvgCode, "image/svg+xml");
      const svgElement = svgDoc.documentElement;

      const width = svgElement.getAttribute('width') || 'N/A';
      const height = svgElement.getAttribute('height') || 'N/A';
      const viewBox = svgElement.getAttribute('viewBox') || 'N/A';

      setSvgProperties({
        name: uploadedFileName || "untitled.svg",
        width,
        height,
        viewBox,
      });
    } catch (e) {
      console.error("Error parsing SVG for properties:", e);
      setSvgProperties({
        name: uploadedFileName || "untitled.svg",
        width: "Error",
        height: "Error",
        viewBox: "Error",
      });
    }
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 text-gray-800">
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-full">
        {/* Top Bar for Editor/Preview */}
        <div className="bg-gray-900 text-white p-2 flex justify-between items-center border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-md hover:bg-gray-700 disabled:opacity-50" disabled>
              <Undo size={18} />
            </button>
            <button className="p-1 rounded-md hover:bg-gray-700 disabled:opacity-50" disabled>
              <Redo size={18} />
            </button>
            <span className="ml-4 text-sm text-gray-400">
              {uploadedFileName || "untitled.svg"}
            </span>
            <button
              onClick={openEditModal}
              className="p-1 rounded-md hover:bg-gray-700 ml-2"
              title="Edit SVG Properties"
            >
              <Settings size={18} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleOptimize}
              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
            >
              <Code size={16} /> Optimize{" "}
              <span className="text-xs text-gray-400">
                {originalSize} bytes → {optimizedSize} bytes (
                {originalSize > 0 ? Math.round(((originalSize - optimizedSize) / originalSize) * 100) : 0}%)
              </span>
            </button>
            <button
              onClick={handlePrettifySvg}
              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
            >
              <Brush size={16} /> Prettify
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
            >
              <X size={16} /> Clear
            </button>
          </div>
        </div>

        {/* Editor and Preview Panels */}
        <div className="flex flex-grow h-full">
          {/* Editor Panel (Left) */}
          <div className="flex-1 flex flex-col border-r border-gray-700 min-w-0 h-full">
            <div className="p-2 border-b border-gray-700 flex items-center bg-gray-900 flex-shrink-0">
              <span className="text-sm text-gray-400">Line 1:0</span>
            </div>
            <div className="relative flex-grow h-full overflow-auto scrollable-content">
              <Editor
                value={svgCode}
                onValueChange={handleSvgChange}
                highlight={(code) => highlightCode(code, 'xml')}
                padding={16}
                className="w-full h-full bg-gray-900 text-gray-300 font-mono text-sm resize-none outline-none leading-relaxed"
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  lineHeight: '1.5em',
                  paddingLeft: '48px', // Make space for line numbers
                }}
              />
              <div className="absolute top-0 left-0 h-full w-10 bg-gray-900 text-gray-500 text-right pr-2 pt-4 text-sm font-mono select-none pointer-events-none">
                {Array.from({ length: svgCode.split("\n").length }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Panel (Right - always SVG preview) */}
          <div className="flex-1 flex flex-col min-w-0 h-full">
            <div className="bg-gray-900 text-white border-b border-gray-700 flex flex-shrink-0">
              <span className="px-4 py-2 text-sm font-medium bg-gray-700 text-white">Preview</span>
            </div>
            <div className="flex-grow p-4 bg-white h-full overflow-auto scrollable-content">
              {renderSvgPreview()}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-gray-900 text-white p-2 flex justify-between items-center border-t border-gray-700 flex-shrink-0">
          <div className="flex gap-2">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".svg" className="hidden" />
            <button
              onClick={handleUploadClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
            >
              <Upload size={16} /> Upload
            </button>
            <button
              onClick={() => handleCopy(displayedSvgCode)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
            >
              <Copy size={16} /> Copy
            </button>
            <button
              onClick={() => handleDownload(uploadedFileName || "download.svg", displayedSvgCode, "image/svg+xml")}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
            >
              <Download size={16} /> Download
            </button>
            <button
              onClick={() => openCodeModal('code', 'React Component', generateReactCode(), 'jsx')}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
            >
              <Code size={16} /> React
            </button>
            <button
              onClick={() => openCodeModal('code', 'React Native Component', generateReactNativeCode(), 'jsx')}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
            >
              <Code size={16} /> React Native
            </button>
            <button
              onClick={() => openCodeModal('code', 'TypeScript Component', generateTypeScriptCode(), 'tsx')}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
            >
              <Code size={16} /> TS
            </button>
            <button
              onClick={() => openCodeModal('png', 'PNG Export')}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
            >
              <Download size={16} /> PNG
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm">
              <Share2 size={16} /> Share
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(10, prev - 10))}
              className="p-1 rounded-md hover:bg-gray-700"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-sm w-10 text-center">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(200, prev + 10))}
              className="p-1 rounded-md hover:bg-gray-700"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={() => setBackgroundColor((prev) => (prev === "#ffffff" ? "#f0f0f0" : "#ffffff"))}
              className="p-1 rounded-md hover:bg-gray-700"
            >
              <Palette size={18} />
            </button>
            <button
              onClick={() => setShowGrid((prev) => !prev)}
              className={`p-1 rounded-md hover:bg-gray-700 ${showGrid ? "text-blue-400" : ""}`}
            >
              <Grid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Code/PNG Display */}
      {showModal && modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="relative bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">{modalContent.title}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                <XCircle size={24} />
              </button>
            </div>
            <div className="flex-grow overflow-hidden">
              {modalContent.type === 'code' && modalContent.code && modalContent.language ? (
                renderCodeDisplay(modalContent.code, modalContent.language, () => {
                  // Re-highlight the code in the modal (basic prettify)
                  setModalContent(prev => prev ? { ...prev, code: prev.code } : null);
                })
              ) : modalContent.type === 'png' ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 p-4">
                  <h3 className="text-xl font-semibold text-white">PNG Export</h3>
                  <p className="text-gray-400 text-center">
                    Render your SVG to a PNG image. The preview settings (background, grid, zoom, position) will be applied.
                  </p>
                  <canvas ref={canvasRef} width={400} height={400} className="border border-gray-600 rounded-md shadow-md bg-white"></canvas>
                  <button
                    onClick={handlePngExportInModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                  >
                    <Download size={20} /> Download PNG
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Modal for SVG Properties */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="relative bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-gray-700 pb-3">
              <h2 className="text-xl font-semibold text-white">SVG Properties</h2>
              <button onClick={closeEditModal} className="text-gray-400 hover:text-white">
                <XCircle size={24} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-white">
              <div>
                <label htmlFor="svg-name" className="block text-sm font-medium text-gray-400">Name</label>
                <input
                  id="svg-name"
                  type="text"
                  value={svgProperties.name}
                  onChange={(e) => setSvgProperties(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Width</label>
                <p className="mt-1 text-lg font-bold">{svgProperties.width}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Height</label>
                <p className="mt-1 text-lg font-bold">{svgProperties.height}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-400">ViewBox</label>
                <p className="mt-1 text-lg font-bold break-all">{svgProperties.viewBox}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
              <button
                onClick={() => handleDownload(svgProperties.name, displayedSvgCode, "image/svg+xml")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
              >
                <Download size={16} /> Download SVG
              </button>
              <button
                onClick={closeEditModal}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
