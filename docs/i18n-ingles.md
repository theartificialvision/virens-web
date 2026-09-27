# Inglés: origen de los textos y pendientes de revisión

Fase i18n (27/09/2026). Decisión del cliente: **usar los textos en inglés que ya publica lvirens.com** y traducir solo lo que es nuevo del rediseño.

En el código, cada texto inglés lleva su origen en un comentario:

- `[EN]` literal de lvirens.com/en (extraído el 27/09/2026 con el navegador: `/en/`, `/en/company/`, `/en/virens-labs/`, `/en/virens-tech/`, `/en/news/`, `/en/contact/`).
- `[IMG]` literal de las imágenes inglesas de la web actual: `historia-eng-mobile.png` (historia) e `img-eng.png` (capacidades).
- `[TR]` traducción de Claude de un texto nuevo del rediseño que no existe en la web actual. **Pendiente de revisión del cliente antes de publicar.**

Correcciones sobre el literal: «Therapeutical areas» → «Therapeutic areas»; «Virens LabsFoundation» (imagen) → «Virens Labs foundation»; «Envelopes» → «Sachets» (la propia imagen de capacidades usa *Sachets*).

## Textos `[TR]` pendientes de revisión

### Home — `src/content/en/v2-home.ts`

- Comprehensive manufacturing and development solutions for food supplements, to the highest quality standards.
- Laboratorios Virens corporate video: production, quality control laboratory and warehouse
- We develop and manufacture food supplements for your brand, with tailor-made formulas, certified quality and complete confidentiality. We turn your ideas into market-ready products, taking care of every detail.
- Laboratory technician stirring a white mixture in a beaker
- We support you throughout the whole process: from development and formulation to manufacturing, quality control, packaging and logistics. A comprehensive, flexible solution to take your product from concept to the end consumer.
- Automatic capping machine sealing amber glass bottles on a packaging line
- White capsules moving along a stainless steel pharmaceutical line
- Automatic encapsulation
- Hover to see each format
- Tap a format to see its sizes
- In-house industrial scale
- In-house facilities
- Production formats
- Packaging levels
- Bottling
- Indicative capacities. Unit and period pending confirmation.
- Our certifications
- Let's talk about your project
- Our team is ready to help you.
- Contact us now
- Solid formulas
- Liquid formulas
- Product development
- R&D&I
- Innovation
- About us
- Facilities
- Documentation

### Compañía — `src/content/en/company.ts`

- At Laboratorios Virens we manufacture food supplements to the highest standards to improve physical, mental and social well-being.
- Technician supervising a food supplement manufacturing line
- R&D and quality control
- Dosage forms and raw materials prepared for development in the laboratory
- Laboratorios Virens production line
- Formulation work in the Laboratorios Virens laboratory

### Virens Tech — `src/content/en/tech.ts`

- Food supplement development and formulation
- From idea to final product
- We support every stage of your product's development with a comprehensive, flexible and results-driven approach.
- Tailor-made development
- Guaranteed high quality
- Regulatory compliance
- Constant innovation
- Laboratory technician pipetting a sample over glassware
- Capsules, tablets and powders on a laboratory tray
- See available galenic forms
- Extracts, droppers and botanical ingredients in a sensory test
- Inside a climate chamber with trays of labelled samples
- Microbiological analysis with culture plates and laboratory material
- Technical documentation and product dossier on a desk
- Virens Tech services

### Contacto — `src/content/en/contacto.ts`

- Where we are
- Address
- Coordinates
- Department
- Attach file
- Drag your file here or click to browse
- Max. 10MB
- The file exceeds 10MB.
- Send

### Interfaz (menú, pie, metadatos) — `src/content/ui.ts`

- Main menu
- Virens Tech — home
- All rights reserved.
- Laboratorios Virens · Food supplement manufacturing
- Contract manufacturing and development of food supplements in Barcelona. More than 2,000 m², nine formats, ISO 22000 and GMP.
- Contract manufacturing and development of food supplements. More than 2,000 m² of in-house facilities in Sant Andreu de la Barca, Barcelona.
- More than 20 years developing and manufacturing food supplements with in-house facilities, R&D and quality control.
- Virens Tech · Development and formulation
- Formulation, galenic R+D, taste centre, stability, quality assurance and regulatory consulting.
- Laboratorios Virens news: trade fairs, science and company.
- Sant Andreu de la Barca, Barcelona. (+34) 936 828 972. Tell us about your manufacturing or development project.
- Laboratorios Virens news and updates
