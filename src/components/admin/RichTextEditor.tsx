'use client';

import { EditorContent, useEditor, useEditorState, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useRef } from 'react';
import { adminText } from '@/content/blog';
import { uploadBlogImage } from '@/lib/blog/upload';

const t = adminText.toolbar;

/**
 * Editor visual del cuerpo (Tiptap). Lo que se ve al escribir es lo que sale en
 * la web: el área usa la misma clase `.article-body` que la plantilla pública.
 * Al pegar desde Word o Google Docs se conservan negritas, cursivas, listas,
 * enlaces y subtítulos; los colores y tipos de letra se descartan.
 */
export function RichTextEditor({ value, onChange, placeholder, labelId }: {
  value: string;
  onChange: (html: string) => void;
  placeholder: string;
  labelId: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // H4 solo para no perder los de las noticias antiguas; la barra ofrece H2/H3.
        heading: { levels: [2, 3, 4] },
        code: false,
        codeBlock: false,
        horizontalRule: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
      }),
      Image.configure({ inline: false }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'article-body admin-editor-area',
        'aria-labelledby': labelId,
        'aria-multiline': 'true',
        role: 'textbox',
        'data-placeholder': placeholder,
      },
    },
    onUpdate: ({ editor: e }) => onChange(e.isEmpty ? '' : e.getHTML()),
  });

  return (
    <div className="admin-editor">
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const file = useRef<HTMLInputElement>(null);
  // Solo se vuelve a pintar la barra cuando cambia el formato activo.
  const active = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e.isActive('bold'),
      italic: e.isActive('italic'),
      h2: e.isActive('heading', { level: 2 }),
      h3: e.isActive('heading', { level: 3 }),
      bullet: e.isActive('bulletList'),
      ordered: e.isActive('orderedList'),
      link: e.isActive('link'),
    }),
  });

  function setLink() {
    const previous = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt(t.linkPrompt, previous ?? 'https://');
    if (url === null) return;
    const chain = editor.chain().focus().extendMarkRange('link');
    if (url.trim() === '' || url.trim() === 'https://') chain.unsetLink().run();
    else chain.setLink({ href: url.trim() }).run();
  }

  async function addImage(f: File | undefined) {
    if (!f) return;
    try {
      const src = await uploadBlogImage(f, 'cuerpo');
      editor.chain().focus().setImage({ src, alt: '' }).run();
    } catch {
      window.alert(adminText.editor.errors.cover);
    }
  }

  const buttons = [
    { key: 'bold', label: 'B', title: t.bold, on: active.bold, run: () => editor.chain().focus().toggleBold().run(), cls: 'font-bold' },
    { key: 'italic', label: 'I', title: t.italic, on: active.italic, run: () => editor.chain().focus().toggleItalic().run(), cls: 'italic' },
    { key: 'h2', label: 'H2', title: t.h2, on: active.h2, run: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { key: 'h3', label: 'H3', title: t.h3, on: active.h3, run: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { key: 'bullet', label: '• Lista', title: t.bullet, on: active.bullet, run: () => editor.chain().focus().toggleBulletList().run() },
    { key: 'ordered', label: '1. Lista', title: t.ordered, on: active.ordered, run: () => editor.chain().focus().toggleOrderedList().run() },
    { key: 'link', label: 'Enlace', title: t.link, on: active.link, run: setLink },
    { key: 'image', label: 'Imagen', title: t.image, on: false, run: () => file.current?.click() },
    { key: 'undo', label: '↶', title: t.undo, on: false, run: () => editor.chain().focus().undo().run() },
    { key: 'redo', label: '↷', title: t.redo, on: false, run: () => editor.chain().focus().redo().run() },
  ];

  return (
    <div role="toolbar" aria-label="Formato" className="admin-toolbar">
      {buttons.map((b) => (
        <button key={b.key} type="button" title={b.title} aria-label={b.title} aria-pressed={b.on} onClick={b.run} className={`admin-tool ${b.cls ?? ''}`}>
          <span aria-hidden>{b.label}</span>
        </button>
      ))}
      <input ref={file} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => { void addImage(e.target.files?.[0]); e.target.value = ''; }} />
    </div>
  );
}
