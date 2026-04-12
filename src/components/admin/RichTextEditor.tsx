"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { useEffect, useCallback, useRef } from "react";
import {
  Bold, Italic, UnderlineIcon, List, ListOrdered,
  Heading2, Heading3, Link as LinkIcon, Minus, Undo, Redo,
  RemoveFormatting, ImageIcon, Loader2,
} from "lucide-react";
import { useState } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  uploadType?: "articles" | "services" | "team";
}

const btnCls = (active?: boolean) =>
  `p-1.5 rounded transition-colors ${
    active
      ? "bg-secondary/15 text-secondary"
      : "text-muted hover:text-foreground hover:bg-background"
  }`;

export default function RichTextEditor({ value, onChange, placeholder, uploadType = "articles" }: RichTextEditorProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      TextStyle,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", class: "underline text-secondary" },
      }),
      Image.configure({
        HTMLAttributes: { class: "rounded-lg max-w-full" },
      }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap min-h-[160px] focus:outline-none text-sm text-foreground leading-relaxed px-3 py-2.5",
      },
      transformPastedHTML(html) {
        // Keep all HTML including inline styles, colors, fonts
        return html;
      },
    },
  });

  // Sync external value changes (e.g. load from API)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      try {
        const parsed = new URL(url);
        const allowed = ["http:", "https:", "mailto:", "tel:"];
        if (!allowed.includes(parsed.protocol)) return;
      } catch {
        return;
      }
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  const insertImage = useCallback(async (file: File) => {
    if (!editor) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", uploadType);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json() as { url: string };
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploading(false);
    }
  }, [editor, uploadType]);

  if (!editor) return null;

  const isEmpty =
    !editor.getText().trim() &&
    !editor.getHTML().includes("<img");

  return (
    <div className="border border-border rounded-lg bg-background overflow-hidden focus-within:ring-2 focus-within:ring-secondary/40 focus-within:border-secondary">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-border bg-card">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnCls(editor.isActive("bold"))} title="Bold">
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnCls(editor.isActive("italic"))} title="Italic">
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnCls(editor.isActive("underline"))} title="Underline">
          <UnderlineIcon className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-border mx-1" />

        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnCls(editor.isActive("heading", { level: 2 }))} title="Heading 2">
          <Heading2 className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnCls(editor.isActive("heading", { level: 3 }))} title="Heading 3">
          <Heading3 className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-border mx-1" />

        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnCls(editor.isActive("bulletList"))} title="Bullet List">
          <List className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnCls(editor.isActive("orderedList"))} title="Numbered List">
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-border mx-1" />

        <button type="button" onClick={setLink} className={btnCls(editor.isActive("link"))} title="Link">
          <LinkIcon className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btnCls()} title="Divider">
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`${btnCls()} disabled:opacity-30`}
          title="Insert image"
        >
          {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImageIcon className="w-3.5 h-3.5" />}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) insertImage(file);
            e.target.value = "";
          }}
        />

        <div className="w-px h-4 bg-border mx-1" />

        <button type="button" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} className={btnCls()} title="Clear formatting">
          <RemoveFormatting className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1" />

        <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={`${btnCls()} disabled:opacity-30`} title="Undo">
          <Undo className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={`${btnCls()} disabled:opacity-30`} title="Redo">
          <Redo className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Editor area with placeholder */}
      <div className="relative">
        {isEmpty && placeholder && (
          <p className="absolute top-2.5 left-3 text-sm text-muted-light pointer-events-none select-none">
            {placeholder}
          </p>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
