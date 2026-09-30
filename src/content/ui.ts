import type { Locale } from '@/lib/i18n';
import type { Division } from '@/lib/types';

/**
 * Textos de interfaz comunes a todas las páginas (menú, pie, metadatos),
 * por idioma. El inglés: [EN] literal de lvirens.com/en, [TR] traducción de
 * Claude pendiente de revisión.
 */
interface NavLink { href: string; label: string; division?: Division }

interface Ui {
  htmlLang: string;
  ogLocale: string;
  localeName: string;
  skipLink: string;
  mainNav: readonly NavLink[];
  menuAria: string;
  logoAria: { labs: string; tech: string };
  footer: { rights: string };
  /** Ayudas de navegación (30/09/2026): volver atrás, volver arriba e índice de página. */
  nav: {
    back: string;
    backTo: string;
    toTop: string;
    indexAria: string;
    /** Rótulo de cada página tal como se nombra en «Volver a …». */
    pages: Record<'home' | 'company' | 'tech' | 'contact' | 'legalNotice' | 'privacy' | 'sales', string>;
    /** Índice por página: `id` es el destino del enlace; `track` la sección que marca como activa. */
    index: Partial<Record<'home' | 'company', { title: string; items: readonly { id: string; label: string; track?: string }[] }>>;
  };
  meta: {
    defaultTitle: string;
    description: string;
    home: { title: string; description: string };
    company: { title: string; description: string };
    tech: { title: string; description: string };
    contact: { title: string; description: string };
  };
}

export const ui: Record<Locale, Ui> = {
  es: {
    htmlLang: 'es',
    ogLocale: 'es_ES',
    localeName: 'Español',
    skipLink: 'Saltar al contenido',
    mainNav: [
      { href: '/', label: 'Inicio' },
      { href: '/compania', label: 'Compañía' },
      { href: '/virens-tech', label: 'Virens Tech', division: 'tech' },
      { href: '/contacto', label: 'Contacto' },
    ],
    menuAria: 'Menú principal',
    logoAria: { labs: 'Virens Labs — inicio', tech: 'Virens Tech — inicio' },
    footer: {
      rights: 'Todos los derechos reservados.',
    },
    nav: {
      back: 'Volver',
      backTo: 'Volver a',
      toTop: 'Volver arriba',
      indexAria: 'En esta página',
      pages: { home: 'Inicio', company: 'Compañía', tech: 'Virens Tech', contact: 'Contacto', legalNotice: 'Aviso legal', privacy: 'Protección de datos', sales: 'Condiciones de venta' },
      index: {
        home: {
          title: 'Virens Labs',
          items: [
            { id: 'full-service', label: 'Full service', track: 'private-label' },
            { id: 'escala', label: 'Capacidad productiva' },
            { id: 'formas-galenicas', label: 'Formas galénicas' },
            { id: 'capacidad-productiva', label: 'Formatos' },
            { id: 'calidad', label: 'Calidad' },
          ],
        },
        company: {
          title: 'Compañía',
          items: [
            { id: 'quienes-somos', label: 'Quiénes somos' },
            { id: 'que-hacemos', label: 'Qué hacemos' },
            { id: 'investigacion', label: 'I+D y control de calidad' },
          ],
        },
      },
    },
    meta: {
      defaultTitle: 'Laboratorios Virens · Fabricación de complementos alimenticios',
      description:
        'Fabricación por contrato y desarrollo de complementos alimenticios en Barcelona. Más de 2.000 m², nueve formatos, ISO 22000 y GMP.',
      home: {
        title: 'Expertos en complementos alimenticios',
        description:
          'Fabricación por contrato y desarrollo de complementos alimenticios. Más de 2.000 m² de instalaciones propias en Sant Andreu de la Barca, Barcelona.',
      },
      company: {
        title: 'Compañía',
        description: 'Más de 20 años desarrollando y fabricando complementos alimenticios con instalaciones propias, I+D y control de calidad.',
      },
      tech: {
        title: 'Virens Tech · Desarrollo y formulación',
        description: 'Formulación, galénica, estabilidad, control de calidad y regulatorio.',
      },
      contact: {
        title: 'Contacto',
        description: 'Sant Andreu de la Barca, Barcelona. (+34) 936 828 972. Cuéntenos su proyecto de fabricación o desarrollo.',
      },
    },
  },
  en: {
    htmlLang: 'en',
    ogLocale: 'en_GB',
    localeName: 'English',
    skipLink: 'Skip to content', // [EN]
    mainNav: [
      { href: '/en', label: 'Home' }, // [EN]
      { href: '/en/company', label: 'Company' }, // [EN]
      { href: '/en/virens-tech', label: 'Virens Tech', division: 'tech' },
      { href: '/en/contact', label: 'Contact' }, // [EN]
    ],
    menuAria: 'Main menu', // [TR]
    logoAria: { labs: 'Virens Labs — home', tech: 'Virens Tech — home' }, // [TR]
    footer: {
      rights: 'All rights reserved.', // [TR]
    },
    nav: {
      back: 'Back', // [TR]
      backTo: 'Back to', // [TR]
      toTop: 'Back to top', // [TR]
      indexAria: 'On this page', // [TR]
      pages: { home: 'Home', company: 'Company', tech: 'Virens Tech', contact: 'Contact', legalNotice: 'Legal notice', privacy: 'Data protection', sales: 'Sales conditions' }, // [TR]
      index: {
        home: {
          title: 'Virens Labs',
          items: [
            { id: 'full-service', label: 'Full service', track: 'private-label' },
            { id: 'escala', label: 'Productive capacity' },
            { id: 'formas-galenicas', label: 'Galenic forms' },
            { id: 'capacidad-productiva', label: 'Formats' },
            { id: 'calidad', label: 'Quality' },
          ],
        },
        company: {
          title: 'Company',
          items: [
            { id: 'quienes-somos', label: 'Who are we?' },
            { id: 'que-hacemos', label: 'What do we do?' },
            { id: 'investigacion', label: 'R&D and quality control' },
          ],
        },
      },
    },
    meta: {
      defaultTitle: 'Laboratorios Virens · Food supplement manufacturing', // [TR]
      description:
        'Contract manufacturing and development of food supplements in Barcelona. More than 2,000 m², nine formats, ISO 22000 and GMP.', // [TR]
      home: {
        title: 'Experts in food supplements', // [EN]
        description:
          'Contract manufacturing and development of food supplements. More than 2,000 m² of in-house facilities in Sant Andreu de la Barca, Barcelona.', // [TR]
      },
      company: {
        title: 'Company', // [EN]
        description: 'More than 20 years developing and manufacturing food supplements with in-house facilities, R&D and quality control.', // [TR]
      },
      tech: {
        title: 'Virens Tech · Development and formulation', // [TR]
        description: 'Formulation, galenics, stability, quality assurance and regulatory.', // [TR]
      },
      contact: {
        title: 'Contact', // [EN]
        description: 'Sant Andreu de la Barca, Barcelona. (+34) 936 828 972. Tell us about your manufacturing or development project.', // [TR]
      },
    },
  },
};
