import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { BoldIcon, ItalicIcon, UnderlineIcon, CodeIcon } from "lucide-react";
import { useState, useEffect } from "react";

// Additional utility component for a floating format toolbar
export const FloatingToolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updateFloatingToolbar = () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) && !selection.isCollapsed()) {
        const domSelection = window.getSelection();
        if (domSelection && domSelection.rangeCount > 0) {
          const range = domSelection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          setPosition({
            top: rect.top - 50,
            left: rect.left + rect.width / 2,
          });
          setIsVisible(true);
        }
      } else {
        setIsVisible(false);
      }
    };

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateFloatingToolbar();
      });
    });
  }, [editor]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed z-50 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-2xl p-1 flex items-center gap-1 transition-all duration-200 transform -translate-x-1/2"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        className="p-1.5 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition-all duration-200"
      >
        <BoldIcon />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        className="p-1.5 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition-all duration-200"
      >
        <ItalicIcon />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        className="p-1.5 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition-all duration-200"
      >
        <UnderlineIcon />
      </button>
      <div className="w-px h-4 bg-gray-700" />
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
        className="p-1.5 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition-all duration-200"
      >
        <CodeIcon />
      </button>
    </div>
  );
};