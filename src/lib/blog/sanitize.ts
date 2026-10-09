import 'server-only';
import sanitizeHtml from 'sanitize-html';

/**
 * Limpia el HTML de un artículo antes de pintarlo. Aunque solo los admins
 * pueden escribir, se filtra igual: si una cuenta se viera comprometida, el
 * texto no podría inyectar scripts, estilos ni formularios en la web.
 *
 * Solo pasa lo que el editor sabe hacer (párrafos, negrita, cursiva, enlaces,
 * subtítulos, listas, saltos de línea e imágenes), sin estilos ni clases.
 */
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'a', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote', 'img'],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height'],
  },
  allowedSchemes: ['https', 'http', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['https'] },
  allowProtocolRelative: false,
  // Los h1 del texto pegado bajan a h2: en la página solo hay un h1, el título.
  transformTags: {
    h1: 'h2',
    h5: 'h4',
    h6: 'h4',
    // Los enlaces a otras webs se abren aparte; los de lvirens.com, en la misma.
    a: (tagName, attribs) => {
      const href = attribs.href ?? '';
      const external = /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?lvirens\.com/i.test(href);
      const out: sanitizeHtml.Attributes = { href };
      if (external) Object.assign(out, { target: '_blank', rel: 'noopener noreferrer' });
      return { tagName, attribs: out };
    },
  },
};

export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, OPTIONS);
}
