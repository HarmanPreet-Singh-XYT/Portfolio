import React, { useCallback, useEffect, useRef, useState } from 'react';
import { $createParagraphNode, $createTextNode, $getRoot, $getSelection, $isRangeSelection } from 'lexical';
import { 
  HeadingNode,
  QuoteNode 
} from '@lexical/rich-text';
import {
  ListItemNode,
  ListNode,
} from '@lexical/list';
import { 
  TableNode,
  TableRowNode,
  TableCellNode 
} from '@lexical/table';
import { LinkNode } from '@lexical/link';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { mergeRegister } from '@lexical/utils';
import { Activity, AlertCircle, Bold, CheckCircle, Clock, Code, Database, Download, FileText, FolderOpen, Info, Italic, Maximize2, Minimize2, Save, Shield, Terminal, Trash2, Upload, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ToolbarPlugin from './Lexical/Toolbar';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { $generateHtmlFromNodes } from '@lexical/html';

// Custom plugins and components
const CursorPositionPlugin = ({ onPositionChange }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const anchor = selection.anchor;
            const anchorNode = anchor.getNode();
            const element = anchorNode.getTopLevelElement();
            const elementKey = element?.getKey();
            
            // Calculate line number (simplified)
            const root = $getRoot();
            const children = root.getChildren();
            let line = 1;
            
            for (let i = 0; i < children.length; i++) {
              if (children[i].getKey() === elementKey) {
                line = i + 1;
                break;
              }
            }
            
            onPositionChange({ line, column: anchor.offset + 1 });
          }
        });
      })
    );
  }, [editor, onPositionChange]);

  return null;
};
// Mock Lexical imports - replace with actual imports
const mockLexicalHooks = {
  useLexicalComposerContext: () => [{ 
    registerUpdateListener: (callback) => {
      // Mock implementation
      return () => {};
    },
    update: (callback) => callback(),
    getEditorState: () => ({
      read: (callback) => callback()
    })
  }],
  useEditor: () => ({
    registerUpdateListener: () => () => {},
    update: () => {},
    getEditorState: () => ({ read: () => {} })
  })
};

// Save Manager Class
class SaveManager {
  storageKey: string;
  autoSaveKey: string;
  maxSaves: number;
  constructor() {
    this.storageKey = 'lexical_editor_saves';
    this.autoSaveKey = 'lexical_editor_autosave';
    this.maxSaves = 10;
  }

  // Get all saved documents
  getSavedDocuments() {
    try {
      const saved = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      return saved.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
    } catch (error) {
      console.error('Error loading saved documents:', error);
      return [];
    }
  }

  // Save document
  saveDocument(content, title = null, isAutoSave = false) {
    try {
      const saves = this.getSavedDocuments();
      const now = new Date();
      
      const saveData = {
        id: isAutoSave ? 'autosave' : Date.now().toString(),
        title: title || `Document ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
        content: content,
        lastModified: now.toISOString(),
        wordCount: content.trim().split(/\s+/).filter(word => word.length > 0).length,
        charCount: content.length,
        isAutoSave: isAutoSave
      };

      if (isAutoSave) {
        // Handle auto-save separately
        localStorage.setItem(this.autoSaveKey, JSON.stringify(saveData));
      } else {
        // Remove existing save with same ID
        const filteredSaves = saves.filter(save => save.id !== saveData.id);
        
        // Add new save
        filteredSaves.unshift(saveData);
        
        // Keep only max saves
        const limitedSaves = filteredSaves.slice(0, this.maxSaves);
        
        localStorage.setItem(this.storageKey, JSON.stringify(limitedSaves));
      }

      return saveData;
    } catch (error) {
      console.error('Error saving document:', error);
      throw new Error('Failed to save document');
    }
  }

  // Load document
  loadDocument(id) {
    try {
      if (id === 'autosave') {
        const autoSave = localStorage.getItem(this.autoSaveKey);
        return autoSave ? JSON.parse(autoSave) : null;
      }
      
      const saves = this.getSavedDocuments();
      return saves.find(save => save.id === id) || null;
    } catch (error) {
      console.error('Error loading document:', error);
      return null;
    }
  }

  // Delete document
  deleteDocument(id) {
    try {
      if (id === 'autosave') {
        localStorage.removeItem(this.autoSaveKey);
        return;
      }
      
      const saves = this.getSavedDocuments();
      const filteredSaves = saves.filter(save => save.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(filteredSaves));
    } catch (error) {
      console.error('Error deleting document:', error);
      throw new Error('Failed to delete document');
    }
  }

  // Get auto-save
  getAutoSave() {
    try {
      const autoSave = localStorage.getItem(this.autoSaveKey);
      return autoSave ? JSON.parse(autoSave) : null;
    } catch (error) {
      console.error('Error loading auto-save:', error);
      return null;
    }
  }

  // Export document as file
  exportDocument(content, format = 'txt', filename = null) {
    const timestamp = new Date().toISOString().split('T')[0];
    const defaultFilename = filename || `document_${timestamp}`;
    
    let fileContent = content;
    let mimeType = 'text/plain';
    let extension = 'txt';
    
    switch (format) {
      case 'markdown':
        mimeType = 'text/markdown';
        extension = 'md';
        break;
      case 'html':
        mimeType = 'text/html';
        extension = 'html';
        fileContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${filename || 'Document'}</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 2px; }
    </style>
</head>
<body>
    <pre>${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
</body>
</html>`;
        break;
      case 'json':
        mimeType = 'application/json';
        extension = 'json';
        fileContent = JSON.stringify({
          title: filename || 'Document',
          content: content,
          exportDate: new Date().toISOString(),
          wordCount: content.trim().split(/\s+/).filter(word => word.length > 0).length,
          charCount: content.length
        }, null, 2);
        break;
    }
    
    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${defaultFilename}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Save Dialog Component
const SaveDialog = ({ isOpen, onClose, onSave, currentTitle = '' }) => {
  const [title, setTitle] = useState(currentTitle);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(title.trim() || undefined);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-md"
      >
        <h3 className="text-xl font-bold text-white mb-4">Save Document</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Document Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter document title..."
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Load Dialog Component
const LoadDialog = ({ isOpen, onClose, onLoad }) => {
  const [saves, setSaves] = useState([]);
  const [autoSave, setAutoSave] = useState(null);
  const saveManager = new SaveManager();

  useEffect(() => {
    if (isOpen) {
      setSaves(saveManager.getSavedDocuments());
      setAutoSave(saveManager.getAutoSave());
    }
  }, [isOpen]);

  const handleLoad = (save) => {
    onLoad(save);
    onClose();
  };

  const handleDelete = (id) => {
    try {
      saveManager.deleteDocument(id);
      setSaves(saveManager.getSavedDocuments());
      setAutoSave(saveManager.getAutoSave());
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden"
      >
        <h3 className="text-xl font-bold text-white mb-4">Load Document</h3>
        
        <div className="overflow-y-auto max-h-[60vh] space-y-2">
          {/* Auto-save */}
          {autoSave && (
            <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <div>
                    <h4 className="font-medium text-yellow-400">Auto-save Recovery</h4>
                    <p className="text-sm text-gray-400">
                      {new Date(autoSave.lastModified).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {autoSave.wordCount} words
                  </span>
                  <button
                    onClick={() => handleLoad(autoSave)}
                    className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded hover:bg-yellow-500/30 transition-colors"
                  >
                    Restore
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Saved documents */}
          {saves.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No saved documents found</p>
            </div>
          ) : (
            saves.map((save) => (
              <div key={save.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h4 className="font-medium text-white">{save.title}</h4>
                      <p className="text-sm text-gray-400">
                        {new Date(save.lastModified).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {save.wordCount} words
                    </span>
                    <button
                      onClick={() => handleDelete(save.id)}
                      className="p-1 text-red-400 hover:bg-red-900/20 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleLoad(save)}
                      className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded hover:bg-emerald-500/30 transition-colors"
                    >
                      Load
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
const AutoSavePlugin = ({ onSave, delay = 3000 }) => {
  const [editor] = useLexicalComposerContext();
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState, dirtyElements, dirtyLeaves }) => {
      if (dirtyElements.size > 0 || dirtyLeaves.size > 0) {
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }
        
        saveTimeoutRef.current = setTimeout(() => {
          editorState.read(() => {
            const root = $getRoot();
            const content = root.getTextContent();
            onSave(content);
          });
        }, delay);
      }
    });
  }, [editor, onSave, delay]);

  return null;
};
function ContentChangePlugin({ onChange, value }) {
  const [editor] = useLexicalComposerContext();
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      if (isUpdatingRef.current) return; // Prevent feedback loop
      
      editorState.read(() => {
        const root = $getRoot();
        const content = root.getTextContent();
        if (onChange && content !== value) {
          onChange(content);
        }
      });
    });
  }, [editor, onChange, value]);

  useEffect(() => {
    if (value !== undefined) {
      isUpdatingRef.current = true;
      editor.update(() => {
        const root = $getRoot();
        const currentContent = root.getTextContent();
        if (currentContent !== value) {
          root.clear();
          if (value) {
            const paragraph = $createParagraphNode();
            paragraph.append($createTextNode(value));
            root.append(paragraph);
          }
        }
      });
      isUpdatingRef.current = false;
    }
  }, [editor, value]);

  return null;
}
// Optional: Enhanced version with additional features
export const EnhancedCyberpunkEditor = ({ value, onChange, placeholder, className, outputFormat = 'markdown', ...props }) => {
  const [content, setContent] = useState(value || '');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const [lineInfo, setLineInfo] = useState({ line: 1, column: 1 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorTheme, setEditorTheme] = useState('cyberpunk');
  const saveManager = new SaveManager();
  const autoSaveTimeoutRef = useRef(null);

  const initialConfig = {
    namespace: 'EnhancedCyberpunkEditor',
    theme: {
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        code: 'font-mono bg-gray-800 px-1 py-0.5 rounded text-emerald-400 border border-emerald-500/20',
      },
      list: {
        nested: {
          listitem: 'list-none ml-6',
        },
        ol: 'list-decimal list-inside',
        ul: 'list-disc list-inside',
      },
      link: 'text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/50',
      heading: {
        h1: 'text-4xl font-bold text-white mb-4 mt-6',
        h2: 'text-3xl font-bold text-white mb-3 mt-5',
        h3: 'text-2xl font-bold text-white mb-2 mt-4',
        h4: 'text-xl font-bold text-white mb-2 mt-3',
        h5: 'text-lg font-bold text-white mb-1 mt-2',
        h6: 'text-base font-bold text-white mb-1 mt-2',
      },
      table: 'border-collapse border border-gray-700 bg-gray-800/50',
      tableCell: 'border border-gray-700 p-2 text-gray-300',
      tableRow: 'border-b border-gray-700',
      tableHeader: 'bg-gray-800 font-bold text-white',
      quote: 'border-l-4 border-emerald-500 pl-4 italic text-gray-400 bg-gray-800/30 py-2',
      code: 'bg-gray-800 border border-gray-700 rounded p-4 text-emerald-400 font-mono overflow-x-auto',
      codeHighlight: {
        atrule: 'text-purple-400',
        attr: 'text-blue-400',
        boolean: 'text-red-400',
        builtin: 'text-yellow-400',
        cdata: 'text-gray-400',
        char: 'text-green-400',
        class: 'text-yellow-400',
        'class-name': 'text-yellow-400',
        comment: 'text-gray-500',
        constant: 'text-red-400',
        deleted: 'text-red-400',
        doctype: 'text-gray-400',
        entity: 'text-red-400',
        function: 'text-blue-400',
        important: 'text-red-400',
        inserted: 'text-green-400',
        keyword: 'text-purple-400',
        namespace: 'text-red-400',
        number: 'text-red-400',
        operator: 'text-gray-400',
        prolog: 'text-gray-400',
        property: 'text-blue-400',
        punctuation: 'text-gray-400',
        regex: 'text-green-400',
        selector: 'text-yellow-400',
        string: 'text-green-400',
        symbol: 'text-red-400',
        tag: 'text-red-400',
        url: 'text-blue-400',
        variable: 'text-blue-400',
      },
    },
    nodes: [
      HeadingNode, 
      QuoteNode, 
      ListNode, 
      ListItemNode, 
      LinkNode, 
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableRowNode,
      TableCellNode,
      HorizontalRuleNode,
    ],
    onError: (error) => {
      console.error('Editor error:', error);
      showNotificationMessage('Editor error occurred', 'error');
    },
  };

  // Enhanced Word/Character count plugin
  function MetricsPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const root = $getRoot();
          const text = root.getTextContent();
          const words = text.trim().split(/\s+/).filter(word => word.length > 0);
          setWordCount(words.length);
          setCharCount(text.length);
        });
      });
    }, [editor]);

    return null;
  }

  // Enhanced content export plugin
  function ContentExportPlugin({ onChange, outputFormat }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          let exportedContent = '';
          
          if (outputFormat === 'markdown') {
            exportedContent = $convertToMarkdownString(TRANSFORMERS);
          } else if (outputFormat === 'html') {
            exportedContent = $generateHtmlFromNodes(editor, null);
          } else {
            // Default to plain text
            exportedContent = $getRoot().getTextContent();
          }
          
          setContent(exportedContent);
          onChange?.(exportedContent);
        });
      });
    }, [editor, onChange, outputFormat]);

    return null;
  }

  // Auto-save functionality
  useEffect(() => {
    if (!autoSaveEnabled || !content) return;

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      handleAutoSave();
    }, 3000);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [content, autoSaveEnabled]);

  const showNotificationMessage = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleAutoSave = async () => {
    if (!content.trim()) return;

    try {
      await saveManager.saveDocument(content, 'Auto-save', true);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  const handleManualSave = async (title) => {
    setIsSaving(true);
    try {
      const saveData = await saveManager.saveDocument(content, title);
      setLastSaved(new Date());
      setCurrentTitle(saveData.title);
      showNotificationMessage('Document saved successfully');
    } catch (error) {
      showNotificationMessage('Failed to save document', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoad = (saveData) => {
    setContent(saveData.content);
    setCurrentTitle(saveData.title);
    onChange?.(saveData.content);
    showNotificationMessage(`Loaded: ${saveData.title}`);
  };

  const handleExport = () => {
    if (!content.trim()) {
      showNotificationMessage('No content to export', 'error');
      return;
    }

    const format = outputFormat || 'txt';
    const filename = currentTitle || 'document';
    
    try {
      saveManager.exportDocument(content, format, filename);
      showNotificationMessage(`Exported as ${format.toUpperCase()}`);
    } catch (error) {
      showNotificationMessage('Export failed', 'error');
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.md,.html,.json';
    
    input.onchange = (e:any) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result;
          if (typeof result !== 'string') {
            showNotificationMessage('Unsupported file content type', 'error');
            return;
          }

          let importedContent = result;

          // Handle JSON files
          if (file.name.endsWith('.json')) {
            const jsonData = JSON.parse(importedContent);
            importedContent = jsonData.content || importedContent;
          }

          setContent(importedContent);
          onChange?.(importedContent);
          setCurrentTitle(file.name.replace(/\.[^/.]+$/, ''));
          showNotificationMessage(`Imported: ${file.name}`);
        } catch (error) {
          showNotificationMessage('Failed to import file', 'error');
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  };

  const handleContentChange = (newContent) => {
    // This is now handled by ContentExportPlugin
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const clearContent = () => {
    if (confirm('Are you sure you want to clear all content?')) {
      setContent('');
      onChange?.('');
      showNotificationMessage('Content cleared');
    }
  };

  const getThemeClasses = () => {
    switch (editorTheme) {
      case 'cyberpunk':
        return 'bg-gray-900 border-gray-700';
      case 'matrix':
        return 'bg-black border-green-500/50';
      case 'neon':
        return 'bg-purple-900 border-pink-500/50';
      default:
        return 'bg-gray-900 border-gray-700';
    }
  };
  const [OutputType, setOutputType] = useState(outputFormat)
  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : ''} ${className || ''}`} {...props}>
      {/* Notification System */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
              fixed top-4 right-4 z-50 px-4 py-3 rounded-lg border backdrop-blur-sm shadow-lg
              ${notificationType === 'success' 
                ? 'bg-emerald-900/90 border-emerald-500 text-emerald-400' 
                : notificationType === 'error'
                ? 'bg-red-900/90 border-red-500 text-red-400'
                : 'bg-blue-900/90 border-blue-500 text-blue-400'
              }
            `}>
            <div className="flex items-center gap-2">
              {notificationType === 'success' && <CheckCircle className="w-4 h-4" />}
              {notificationType === 'error' && <AlertCircle className="w-4 h-4" />}
              {notificationType === 'info' && <Info className="w-4 h-4" />}
              <span className="text-sm font-medium">{notificationMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`relative ${getThemeClasses()} rounded-lg shadow-2xl border group ${isFullscreen ? 'h-full' : ''}`}>
        {/* Enhanced animated border gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 animate-gradient-shift" />
        </div>
        
        {/* Enhanced glitch effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -inset-10 opacity-[0.03]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff00c1] to-transparent transform skew-y-12 animate-glitch-1" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#00fff9] to-transparent transform -skew-y-12 animate-glitch-2" />
          </div>
        </div>

        {/* Enhanced Action Bar */}
        <div className="relative bg-gray-900/90 backdrop-blur-sm border-b border-gray-700 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSaveDialog(true)}
                disabled={isSaving}
                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded hover:bg-emerald-500/30 transition-all disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span className="text-sm">Save</span>
              </motion.button>

              <button
                onClick={() => setShowLoadDialog(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 text-gray-400 border border-gray-700 rounded hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
              >
                <FolderOpen className="w-4 h-4" />
                <span className="text-sm">Load</span>
              </button>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 text-gray-400 border border-gray-700 rounded hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Export</span>
              </button>

              <button
                onClick={handleImport}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 text-gray-400 border border-gray-700 rounded hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
              >
                <Upload className="w-4 h-4" />
                <span className="text-sm">Import</span>
              </button>

              <div className="h-4 border-l border-gray-700 mx-2"></div>

              {/* <button
                onClick={clearContent}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 text-red-400 border border-red-500/50 rounded hover:bg-red-500/30 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Clear</span>
              </button> */}

              <button
                onClick={toggleFullscreen}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 text-gray-400 border border-gray-700 rounded hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                <span className="text-sm">{isFullscreen ? 'Exit' : 'Full'}</span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={outputFormat}
                onChange={(e) => setOutputType(e.target.value)}
                className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-gray-400 focus:border-emerald-500 focus:outline-none"
              >
                <option value="markdown">Markdown</option>
                <option value="html">HTML</option>
                <option value="text">Plain Text</option>
              </select>

              <select
                value={editorTheme}
                onChange={(e) => setEditorTheme(e.target.value)}
                className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-gray-400 focus:border-emerald-500 focus:outline-none"
              >
                <option value="cyberpunk">Cyberpunk</option>
                <option value="matrix">Matrix</option>
                <option value="neon">Neon</option>
              </select>
              <div className='flex flex-col'>
                <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSaveEnabled}
                    onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                    className="w-4 h-4 bg-gray-800 border-gray-600 rounded text-emerald-500 focus:ring-emerald-500/50"
                  />
                  <span>Auto-save</span>
                </label>
                
                {lastSaved && (
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lastSaved.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <LexicalComposer initialConfig={initialConfig}>
          <div className="relative">
            <ToolbarPlugin />
            <div className={`relative ${isFullscreen ? 'h-[calc(100vh-120px)]' : 'min-h-[500px]'} bg-black/60 overflow-hidden`}>
              <RichTextPlugin
                contentEditable={
                  <ContentEditable 
                    className={`${isFullscreen ? 'h-full' : 'min-h-[500px]'} px-8 py-6 text-gray-300 focus:outline-none 
                      prose prose-invert prose-lg max-w-none
                      prose-headings:text-white prose-headings:font-bold
                      prose-p:text-gray-300 prose-p:leading-relaxed
                      prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-emerald-300 hover:prose-a:underline
                      prose-strong:text-white prose-strong:font-bold
                      prose-code:text-emerald-400 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-emerald-500/20
                      prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 prose-pre:shadow-lg
                      prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400
                      prose-ul:list-disc prose-ol:list-decimal
                      prose-li:text-gray-300
                      prose-table:border-collapse prose-table:overflow-hidden
                      prose-td:border prose-td:border-gray-700 prose-td:p-2
                      prose-th:border prose-th:border-gray-700 prose-th:p-2 prose-th:bg-gray-800
                      [&_*::selection]:bg-emerald-500/30 [&_*::selection]:text-white
                      bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500
                      relative resize-none overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600`}
                  />
                }
                placeholder={
                  <div className="absolute top-6 left-8 text-gray-400 pointer-events-none select-none">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-500 animate-pulse">▶</span>
                        <span>{placeholder || "Start typing your cyberpunk masterpiece..."}</span>
                      </div>
                      <div className="text-xs text-gray-500 ml-6">
                        Export format: {outputFormat.toUpperCase()}
                      </div>
                    </div>
                  </div>
                }
                ErrorBoundary={({ children, onError }) => (
                  <div className="relative">
                    {children}
                    {onError && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-red-900/20 border border-red-500 rounded flex items-center justify-center backdrop-blur-sm"
                      >
                        <div className="text-center">
                          <Terminal className="w-12 h-12 text-red-400 mx-auto mb-4" />
                          <p className="text-red-400 font-mono mb-2">// ERROR: Render failure detected</p>
                          <button 
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-red-500/20 border border-red-500 rounded text-red-400 hover:bg-red-500/30 transition-colors"
                          >
                            Restart Editor
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              />
              <HistoryPlugin />
              <ListPlugin />
              <LinkPlugin />
              {/* <TabIndentationPlugin />
              <CheckListPlugin />
              <CodeHighlightPlugin /> */}
              <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
              <MetricsPlugin />
              <CursorPositionPlugin onPositionChange={setLineInfo} />
              <AutoFocusPlugin />
              <ContentExportPlugin onChange={onChange} outputFormat={outputFormat} />
              
              {/* Enhanced status bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 px-4 py-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Code className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-500">Ln {lineInfo.line}, Col {lineInfo.column}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-500">{wordCount} words</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-500">{charCount} chars</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-500">{outputFormat.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-500">Enhanced Editor</span>
                    </div>
                    {currentTitle && (
                      <div className="flex items-center gap-2">
                        {/* <File className="w-3 h-3 text-gray-500" /> */}
                        <span className="text-gray-500">{currentTitle}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LexicalComposer>
      </div>
      
      <SaveDialog
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onSave={handleManualSave}
        currentTitle={currentTitle}
      />
      
      <LoadDialog
        isOpen={showLoadDialog}
        onClose={() => setShowLoadDialog(false)}
        onLoad={handleLoad}
      />
    </div>
  );
};