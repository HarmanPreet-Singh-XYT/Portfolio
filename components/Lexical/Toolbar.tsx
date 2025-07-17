import React, { useCallback, useEffect, useRef, useState } from 'react';
import { $createParagraphNode, $getNodeByKey, $getSelection, $insertNodes, $isRangeSelection, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND } from 'lexical';
import { 
  $createHeadingNode, 
  $createQuoteNode,
  $isHeadingNode,
} from '@lexical/rich-text';
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  ListNode,
} from '@lexical/list';
import { 
  $createTableNode, 
  $createTableRowNode, 
  $createTableCellNode,
} from '@lexical/table';
import { LinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from 'lexical';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import {
  INSERT_HORIZONTAL_RULE_COMMAND
} from '@lexical/react/LexicalHorizontalRuleNode';
import { $isElementNode } from 'lexical';


import {
    $patchStyleText,
  $setBlocksType
} from '@lexical/selection';
import { $getNearestNodeOfType } from '@lexical/utils';
import { Bold, Italic, Underline, Strikethrough, Code, List, ListOrdered, ListChecks, Undo, Redo, Link, Quote, Highlighter, Superscript, Subscript, Indent, Outdent, Eraser, Minus, AlignLeft, AlignCenter, AlignRight, AlignJustify, CreditCard, Smile, SquarePen } from 'lucide-react';
const BoldIcon = () => (
  <Bold className="w-4 h-4" />
);

const ItalicIcon = () => (
  <Italic className="w-4 h-4" />
);

const UnderlineIcon = () => (
  <Underline className="w-4 h-4" />
);

const StrikethroughIcon = () => (
  <Strikethrough className="w-4 h-4" />
);

const CodeIcon = () => (
  <Code className="w-4 h-4" />
);

const ListIcon = () => (
  <List className="w-4 h-4" />
);

const OrderedListIcon = () => (
  <ListOrdered className="w-4 h-4" />
);

const CheckListIcon = () => (
  <ListChecks className="w-4 h-4" />
);

const UndoIcon = () => (
  <Undo className="w-4 h-4" />
);

const RedoIcon = () => (
  <Redo className="w-4 h-4" />
);

const LinkIcon = () => (
  <Link className="w-4 h-4" />
);

const QuoteIcon = () => (
  <Quote className="w-4 h-4" />
);

const HighlightIcon = () => (
  <Highlighter className="w-4 h-4" />
);

const SuperscriptIcon = () => (
  <Superscript className="w-4 h-4" />
);

const SubscriptIcon = () => (
  <Subscript className="w-4 h-4" />
);

const IndentIcon = () => (
  <Indent className="w-4 h-4" />
);

const OutdentIcon = () => (
  <Outdent className="w-4 h-4" />
);

const ClearFormatIcon = () => (
  <Eraser className="w-4 h-4" />
);

const HorizontalRuleIcon = () => (
  <Minus className="w-4 h-4" />
);

const AlignLeftIcon = () => (
  <AlignLeft className="w-4 h-4" />
);

const AlignCenterIcon = () => (
  <AlignCenter className="w-4 h-4" />
);

const AlignRightIcon = () => (
  <AlignRight className="w-4 h-4" />
);

const AlignJustifyIcon = () => (
  <AlignJustify className="w-4 h-4" />
);

const blockTypeToBlockName = {
  paragraph: 'Normal',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  quote: 'Quote',
  code: 'Code Block',
};

// Enhanced Toolbar Plugin Component
export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [fontSize, setFontSize] = useState('16px');
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const [elementFormat, setElementFormat] = useState('left');
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);
  const [selectedTextColor, setSelectedTextColor] = useState('#ffffff');
  const [selectedBgColor, setSelectedBgColor] = useState('#000000');
  const handleTextColorChange = (color) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { color });
      }
    });
    setSelectedTextColor(color);
  };

  const handleBgColorChange = (color) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { backgroundColor: color });
      }
    });
    setSelectedBgColor(color);
  };

  const handleTableInsert = (rows, cols) => {
    editor.update(() => {
      const tableNode = $createTableNode();
      for (let i = 0; i < rows; i++) {
        const rowNode = $createTableRowNode();
        for (let j = 0; j < cols; j++) {
          const cellNode = $createTableCellNode();
          rowNode.append(cellNode);
        }
        tableNode.append(rowNode);
      }
      $insertNodes([tableNode]);
    });
  };

  const handleEmojiInsert = (emoji) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertText(emoji);
      }
    });
  };

  const handleSpecialCharInsert = (char) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertText(char);
      }
    });
  };
    const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }

      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));
      setIsSubscript(selection.hasFormat('subscript'));
      setIsSuperscript(selection.hasFormat('superscript'));
      setIsHighlight(selection.hasFormat('highlight'));

      const ALIGNMENT_MAP: Record<number, 'left' | 'center' | 'right' | 'justify'> = {
        0: 'left',     // Default
        1: 'center',
        2: 'right',
        3: 'justify',
      };
      // Update alignment
      const node = $getNodeByKey(elementKey);
      if (node !== null && $isElementNode(node)) {
        const format = node.getFormat();
        setElementFormat(ALIGNMENT_MAP[format] ?? 'left');
      }
      // updateLink
      const linkNode = $getNearestNodeOfType(anchorNode, LinkNode);
      setIsLink(linkNode !== null);
    }
  }, [editor]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  useEffect(() => {
    return editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor]);

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const clearFormatting = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.format = 0;
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 border-b border-gray-700 bg-gray-900/40 backdrop-blur-sm">
      {/* Undo/Redo */}
      <div className="flex items-center gap-1">
        <button
          disabled={!canUndo}
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
          className={`p-2 rounded transition-all duration-200 ${
            canUndo 
              ? 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800' 
              : 'text-gray-600 cursor-not-allowed'
          }`}
          aria-label="Undo"
        >
          <UndoIcon />
        </button>
        <button
          disabled={!canRedo}
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
          className={`p-2 rounded transition-all duration-200 ${
            canRedo 
              ? 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800' 
              : 'text-gray-600 cursor-not-allowed'
          }`}
          aria-label="Redo"
        >
          <RedoIcon />
        </button>
      </div>
      
      <div className="w-px h-6 bg-gray-700" />
      
      {/* Block Type Selector */}
      <select
        value={blockType}
        onChange={(e) => {
          const value = e.target.value;
          if (value === 'paragraph') {
            formatParagraph();
          } else if (value.startsWith('h')) {
            formatHeading(value);
          } else if (value === 'quote') {
            formatQuote();
          }
        }}
        className="px-3 py-1.5 bg-gray-800 text-gray-300 border border-gray-700 rounded focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all duration-200"
      >
        <option value="paragraph">Normal</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
        <option value="h5">Heading 5</option>
        <option value="h6">Heading 6</option>
        <option value="quote">Quote</option>
      </select>

      {/* Font Family */}
      <select
        value={fontFamily}
        onChange={(e) => setFontFamily(e.target.value)}
        className="px-3 py-1.5 bg-gray-800 text-gray-300 border border-gray-700 rounded focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all duration-200"
      >
        <option value="sans-serif">Sans Serif</option>
        <option value="serif">Serif</option>
        <option value="monospace">Monospace</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times</option>
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier</option>
      </select>

      {/* Font Size */}
      <select
        value={fontSize}
        onChange={(e) => setFontSize(e.target.value)}
        className="px-3 py-1.5 bg-gray-800 text-gray-300 border border-gray-700 rounded focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all duration-200"
      >
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
        <option value="24px">24px</option>
        <option value="28px">28px</option>
        <option value="32px">32px</option>
      </select>
      
      <div className="w-px h-6 bg-gray-700" />
      
      {/* Text Format Buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
          className={`p-2 rounded transition-all duration-200 ${
            isBold 
              ? 'text-emerald-400 bg-gray-800 shadow-[0_0_10px_rgba(52,211,153,0.3)]' 
              : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800'
          }`}
          aria-label="Bold"
        >
          <BoldIcon />
        </button>
        
        <button
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
          className={`p-2 rounded transition-all duration-200 ${
            isItalic 
              ? 'text-emerald-400 bg-gray-800 shadow-[0_0_10px_rgba(52,211,153,0.3)]' 
              : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800'
          }`}
          aria-label="Italic"
        >
          <ItalicIcon />
        </button>
        
        <button
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
          className={`p-2 rounded transition-all duration-200 ${
            isUnderline 
              ? 'text-emerald-400 bg-gray-800 shadow-[0_0_10px_rgba(52,211,153,0.3)]' 
              : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800'
          }`}
          aria-label="Underline"
        >
          <UnderlineIcon />
        </button>
        
        <button
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
          className={`p-2 rounded transition-all duration-200 ${
            isStrikethrough 
              ? 'text-emerald-400 bg-gray-800 shadow-[0_0_10px_rgba(52,211,153,0.3)]' 
              : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800'
          }`}
          aria-label="Strikethrough"
        >
          <StrikethroughIcon />
        </button>
        
        <button
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
          className={`p-2 rounded transition-all duration-200 ${
            isCode 
              ? 'text-emerald-400 bg-gray-800 shadow-[0_0_10px_rgba(52,211,153,0.3)]' 
              : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800'
          }`}
          aria-label="Code"
        >
          <CodeIcon />
        </button>

        <button
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight')}
          className={`p-2 rounded transition-all duration-200 ${
            isHighlight 
              ? 'text-emerald-400 bg-gray-800 shadow-[0_0_10px_rgba(52,211,153,0.3)]' 
              : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800'
          }`}
          aria-label="Highlight"
        >
          <HighlightIcon />
        </button>

        <button
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript')}
          className={`p-2 rounded transition-all duration-200 ${
            isSuperscript 
              ? 'text-emerald-400 bg-gray-800 shadow-[0_0_10px_rgba(52,211,153,0.3)]' 
              : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800'
          }`}
          aria-label="Superscript"
        >
          <SuperscriptIcon />
        </button>

        <button
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript')}
          className={`p-2 rounded transition-all duration-200 ${
            isSubscript 
              ? 'text-emerald-400 bg-gray-800 shadow-[0_0_10px_rgba(52,211,153,0.3)]' 
              : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800'
          }`}
          aria-label="Subscript"
        >
          <SubscriptIcon />
        </button>

        <button
          onClick={clearFormatting}
          className="p-2 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition-all duration-200"
          aria-label="Clear Formatting"
        >
          <ClearFormatIcon />
        </button>
      </div>
      
      <div className="w-px h-6 bg-gray-700" />
      
      {/* Insert Options */}
      <div className="flex items-center gap-1">
        <button
          onClick={insertLink}
          className={`p-2 rounded transition-all duration-200 ${
            isLink 
              ? 'text-emerald-400 bg-gray-800 shadow-[0_0_10px_rgba(52,211,153,0.3)]' 
              : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800'
          }`}
          aria-label="Insert Link"
        >
          <LinkIcon />
        </button>

        <button
          onClick={() => editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)}
          className="p-2 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition-all duration-200"
          aria-label="Horizontal Rule"
        >
          <HorizontalRuleIcon />
        </button>
      </div>

      <div className="w-px h-6 bg-gray-700" />
      
      {/* List Options */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
          className="p-2 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition-all duration-200"
          aria-label="Bullet List"
        >
          <ListIcon />
        </button>
        
        <button
          onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
          className="p-2 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition-all duration-200"
          aria-label="Numbered List"
        >
          <OrderedListIcon />
        </button>

        <button
          onClick={() => editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)}
          className="p-2 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition-all duration-200"
          aria-label="Check List"
        >
          <CheckListIcon />
        </button>
      </div>
      
      <div className="w-px h-6 bg-gray-700" />
      
      {/* Alignment Options */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
          className={`p-2 rounded transition-all duration-200 ${
            elementFormat === 'left' 
              ? 'text-emerald-400 bg-gray-800 shadow-[0_0_10px_rgba(52,211,153,0.3)]' 
              : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800'
          }`}
          aria-label="Align Left"
        >
          <AlignLeftIcon />
        </button>

        <button
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
          className={`p-2 rounded transition-all duration-200 ${
            elementFormat === 'center' 
              ? 'text-emerald-400 bg-gray-800 shadow-[0_0_10px_rgba(52,211,153,0.3)]' 
              : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800'
          }`}
          aria-label="Align Center"
        >
          <AlignCenterIcon />
        </button>

        <button
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
          className={`p-2 rounded transition-all duration-200 ${
            elementFormat === 'right' 
              ? 'text-emerald-400 bg-gray-800 shadow-[0_0_10px_rgba(52,211,153,0.3)]' 
              : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800'
          }`}
          aria-label="Align Right"
        >
          <AlignRightIcon />
        </button>

        <button
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
          className={`p-2 rounded transition-all duration-200 ${
            elementFormat === 'justify' 
              ? 'text-emerald-400 bg-gray-800 shadow-[0_0_10px_rgba(52,211,153,0.3)]' 
              : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800'
          }`}
          aria-label="Justify"
        >
          <AlignJustifyIcon />
        </button>
        {/* <button className="p-2 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800">
        <Bold className="w-4 h-4" />
        </button>
        <button className="p-2 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800">
            <Italic className="w-4 h-4" />
        </button> */}
      </div>

      <div className="w-px h-6 bg-gray-700" />

      {/* Indent/Outdent */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}
                    className="p-2 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition-all duration-200"
          aria-label="Outdent"
        >
          <OutdentIcon />
        </button>

        <button
          onClick={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}
          className="p-2 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition-all duration-200"
          aria-label="Indent"
        >
          <IndentIcon />
        </button>
      </div>
      <div className="w-px h-6 bg-gray-700 mx-1" />
      
      {/* New components */}
      <ColorPicker 
        color={selectedTextColor} 
        onChange={handleTextColorChange} 
        label="Text" 
      />
      <ColorPicker 
        color={selectedBgColor} 
        onChange={handleBgColorChange} 
        label="BG" 
      />
      
      <div className="w-px h-6 bg-gray-700 mx-1" />
      
      <TableInsertButton onInsert={handleTableInsert} />
      <EmojiPicker onSelect={handleEmojiInsert} />
      <SpecialCharacters onSelect={handleSpecialCharInsert} />
    </div>
  );
}

// Custom hook for click outside detection
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

// Enhanced Color Picker Component
const ColorPicker = ({ color, onChange, label }) => {
  const [open, setOpen] = useState(false);
  const [customColor, setCustomColor] = useState(color);
  const dropdownRef = useRef(null);
  
  useClickOutside(dropdownRef, () => setOpen(false));

  const colors = [
    // Grayscale
    ['#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff'],
    // Primary colors
    ['#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff'],
    // Light tints
    ['#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc'],
    // Medium tints
    ['#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd'],
    // Dark shades
    ['#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0'],
    ['#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79'],
    ['#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#1155cc', '#0b5394', '#351c75', '#741b47'],
    ['#5b0f00', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#1c4587', '#073763', '#20124d', '#4c1130']
  ];

  const handleColorChange = (newColor) => {
    onChange(newColor);
    setCustomColor(newColor);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded hover:border-emerald-500 transition-all duration-200"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="text-gray-400 text-sm">{label}</span>
        <div 
          className="w-5 h-5 rounded border border-gray-600 shadow-sm" 
          style={{ backgroundColor: color }}
        />
      </button>
      
      {open && (
        <div className="absolute bottom-full left-0 mt-2 p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-top-1">
          <div className="space-y-2">
            {/* Custom color input */}
            <div className="flex gap-2 mb-3">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-gray-300 font-mono"
                placeholder="#000000"
              />
              <button
                onClick={() => handleColorChange(customColor)}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded text-sm transition-colors"
              >
                Apply
              </button>
            </div>
            
            {/* Predefined colors */}
            <div className="space-y-1">
              {colors.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                  {row.map((c) => (
                    <button
                      key={c}
                      className="w-6 h-6 rounded hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-emerald-500"
                      style={{ backgroundColor: c }}
                      onClick={() => handleColorChange(c)}
                      aria-label={`Select color ${c}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Table Insert Component
const TableInsertButton = ({ onInsert }) => {
  const [showGrid, setShowGrid] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(0);
  const [hoveredCol, setHoveredCol] = useState(0);
  const dropdownRef = useRef(null);
  
  useClickOutside(dropdownRef, () => setShowGrid(false));

  const handleInsert = () => {
    onInsert(hoveredRow + 1, hoveredCol + 1);
    setShowGrid(false);
    setHoveredRow(0);
    setHoveredCol(0);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowGrid(!showGrid)}
        className="p-2 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition-all duration-200"
        aria-label="Insert Table"
        aria-expanded={showGrid}
      >
        <CreditCard className="w-4 h-4" />
      </button>
      
      {showGrid && (
        <div className="absolute bottom-full left-0 w-[275px] mt-2 p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-top-1">
          <div className="text-sm text-gray-400 mb-2 text-center font-medium">
                        {hoveredRow + 1} × {hoveredCol + 1} Table
          </div>
          <div className="grid grid-cols-10 gap-0.5 p-1 bg-gray-900 rounded">
            {[...Array(10)].map((_, rowIndex) => (
              [...Array(10)].map((_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-5 h-5 border cursor-pointer transition-all duration-150 ${
                    rowIndex <= hoveredRow && colIndex <= hoveredCol 
                      ? 'bg-emerald-500 border-emerald-600' 
                      : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                  }`}
                  onMouseEnter={() => {
                    setHoveredRow(rowIndex);
                    setHoveredCol(colIndex);
                  }}
                  onClick={handleInsert}
                />
              ))
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Emoji Picker Component
const EmojiPicker = ({ onSelect }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('smileys');
  const dropdownRef = useRef(null);
  
  useClickOutside(dropdownRef, () => {
    setShowPicker(false);
    setSearchTerm('');
  });

  const emojiCategories = {
    smileys: {
      label: 'Smileys & Emotion',
      emojis: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕']
    },
    gestures: {
      label: 'Gestures',
      emojis: ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏']
    },
    objects: {
      label: 'Objects',
      emojis: ['💻', '🖥', '🖨', '⌨️', '🖱', '📱', '☎️', '📞', '📟', '📠', '📷', '📸', '📹', '🎥', '📽', '🎬', '📺', '📻', '🎙', '🎚', '🎛', '⏱', '⏲', '⏰', '🕰', '⌛️', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯', '🪔', '🧯', '🛢', '💸', '💵', '💴', '💶', '💷', '💰', '💳', '💎', '⚖️', '🧰', '🔧', '🔨', '⚒', '🛠', '⛏', '🔩', '⚙️', '🧱', '⛓', '🧲', '🔫', '💣', '🧨', '🪓', '🔪', '🗡', '⚔️', '🛡', '🚬', '⚰️', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳']
    },
    symbols: {
      label: 'Symbols',
      emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '⭐️', '🌟', '✨', '⚡️', '🔥', '💥', '☄️', '🌈', '☀️', '🌤', '⛅️', '☁️', '🌧', '⛈', '❄️', '🌊', '💨', '✅', '❌', '❓', '❗️', '‼️', '⁉️', '💯', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫️', '⚪️', '🟤']
    }
  };

  const allEmojis = Object.values(emojiCategories).flatMap(cat => cat.emojis);
  const filteredEmojis = searchTerm 
    ? allEmojis.filter(emoji => emoji.includes(searchTerm))
    : emojiCategories[selectedCategory].emojis;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="p-2 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition-all duration-200"
        aria-label="Insert Emoji"
        aria-expanded={showPicker}
      >
        <Smile className="w-4 h-4" />
      </button>
      
      {showPicker && (
        <div className="absolute bottom-full right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 w-80 animate-in fade-in slide-in-from-top-1">
          {/* Search bar */}
          <div className="p-2 border-b border-gray-700">
            <input
              type="text"
              placeholder="Search emojis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1.5 bg-gray-700 border border-gray-600 rounded text-sm text-gray-300 placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
              autoFocus
            />
          </div>
          
          {/* Category tabs */}
          {!searchTerm && (
                        <div className="flex border-b border-gray-700">
              {Object.entries(emojiCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                    selectedCategory === key
                      ? 'text-emerald-400 border-b-2 border-emerald-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          )}
          
          {/* Emoji grid */}
          <div className="p-2 max-h-64 overflow-y-auto">
            {filteredEmojis.length > 0 ? (
              <div className="grid grid-cols-8 gap-1">
                {filteredEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    className="p-2 hover:bg-gray-700 rounded transition-all text-xl leading-none"
                    onClick={() => {
                      onSelect(emoji);
                      setShowPicker(false);
                      setSearchTerm('');
                    }}
                    title={emoji}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No emojis found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Special Characters Component
const SpecialCharacters = ({ onSelect }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('common');
  const dropdownRef = useRef(null);
  
  useClickOutside(dropdownRef, () => setShowPicker(false));

  const categories = {
    common: {
      label: 'Common',
      chars: ['©', '®', '™', '°', '±', '×', '÷', '≠', '≤', '≥', '∞', '√', '∑', '∏', '∫', '€', '£', '¥', '¢', '§', '¶', '†', '‡', '•', '…', '‰', '′', '″', '‴', '¿', '¡']
    },
    greek: {
      label: 'Greek',
      chars: ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω']
    },
    math: {
      label: 'Math',
      chars: ['∀', '∂', '∃', '∅', '∇', '∈', '∉', '∋', '∌', '∏', '∑', '−', '∗', '√', '∝', '∞', '∠', '∧', '∨', '∩', '∪', '∫', '∬', '∭', '∮', '∯', '∰', '∴', '∵', '∶', '∷', '∼', '∽', '≈', '≠', '≡', '≢', '≤', '≥', '≪', '≫', '⊂', '⊃', '⊆', '⊇', '⊕', '⊗', '⊥']
    },
    arrows: {
      label: 'Arrows',
      chars: ['←', '↑', '→', '↓', '↔', '↕', '↖', '↗', '↘', '↙', '↚', '↛', '↜', '↝', '↞', '↟', '↠', '↡', '↢', '↣', '↤', '↥', '↦', '↧', '↨', '↩', '↪', '↫', '↬', '↭', '↮', '↯', '↰', '↱', '↲', '↳', '↴', '↵', '↶', '↷', '↸', '↹', '↺', '↻', '⇄', '⇅', '⇆', '⇇', '⇈', '⇉', '⇊']
    },
    currency: {
      label: 'Currency',
            chars: ['$', '¢', '£', '¤', '¥', '₠', '₡', '₢', '₣', '₤', '₥', '₦', '₧', '₨', '₩', '₪', '₫', '€', '₭', '₮', '₯', '₰', '₱', '₲', '₳', '₴', '₵', '₸', '₹', '₺', '₻', '₼', '₽', '₾', '₿']
    }
  };

  const currentChars = categories[selectedCategory].chars;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="p-2 rounded text-gray-400 hover:text-emerald-400 hover:bg-gray-800 transition-all duration-200"
        aria-label="Insert Special Character"
        aria-expanded={showPicker}
      >
        <SquarePen className="w-4 h-4" />
      </button>
      
      {showPicker && (
        <div className="absolute bottom-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 w-96 animate-in fade-in slide-in-from-top-1">
          {/* Category tabs */}
          <div className="flex border-b border-gray-700">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                  selectedCategory === key
                    ? 'text-emerald-400 border-b-2 border-emerald-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Character grid */}
          <div className="p-3 max-h-64 overflow-y-auto">
            <div className="grid grid-cols-10 gap-1">
              {currentChars.map((char, index) => (
                <button
                  key={index}
                  className="p-2 hover:bg-gray-700 rounded transition-all text-sm font-mono text-gray-300 hover:text-emerald-400 hover:scale-110"
                  onClick={() => {
                    onSelect(char);
                    setShowPicker(false);
                  }}
                  title={`Insert ${char}`}
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
