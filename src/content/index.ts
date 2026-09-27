import type { Locale } from '@/lib/i18n';
import * as homeEs from './v2-home';
import * as homeEn from './en/v2-home';
import * as companyEs from './company';
import * as companyEn from './en/company';
import * as techEs from './tech';
import * as techEn from './en/tech';
import * as contactEs from './contacto';
import * as contactEn from './en/contacto';

/**
 * Punto único de acceso al contenido por idioma (27/09/2026). Un componente
 * recibe `locale` y pide aquí su diccionario; nunca importa un idioma suelto.
 * Los diccionarios ingleses están obligados por tipo a tener las mismas claves
 * que los españoles (`satisfies Loosen<…>`), así que si falta un texto no compila.
 */
export const homeContent = (locale: Locale) => (locale === 'en' ? homeEn : homeEs);
export const companyContent = (locale: Locale) => (locale === 'en' ? companyEn : companyEs);
export const techContent = (locale: Locale) => (locale === 'en' ? techEn : techEs);
export const contactContent = (locale: Locale) => (locale === 'en' ? contactEn : contactEs);
export { ui } from './ui';
