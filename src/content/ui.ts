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
