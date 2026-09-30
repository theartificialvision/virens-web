import type { LegalDoc } from '../legal';

/** Legal texts — literal from the client's English Word documents (29/09/2026). */
export const legalUi = {
  eyebrow: 'Documentation', // [TR]
  toc: 'Contents', // [TR]
  docsAria: 'Legal documents', // [TR]
  company: 'Laboratorios Virens S.L.',
} as const;

export const legalDocs: readonly LegalDoc[] = [
  {
    key: 'legalNotice',
    title: "Legal notice",
    nav: "Legal notice",
    description: "Legal notice of Laboratorios Virens S.L.: corporate information and website terms of use.",
    sections: [
      {
        heading: "Corporate information",
        body: [
        "In accordance with the obligations established by Spanish Law 34/2002 on Information Society Services and Electronic Commerce, we inform you that this website is owned by LABORATORIOS VIRENS S.L., hereinafter VIRENS, with registered office at C/Industria 48-B Polígono Industrial Nord-Est 08740 Sant Andreu de la Barca - Barcelona (Spain); holder of Tax ID (C.I.F.) B64294473; and email address csp@lvirens.com",
        "The company is registered in the Companies Register (Registro Mercantil) of Barcelona under registration number 146322.",
        ],
      },
      {
        heading: "Protection of content",
        body: [
        "The user acknowledges and accepts that all industrial and intellectual property rights over the content and/or any other element placed by VIRENS on this website (including, by way of example only and without limitation, all elements that make up the visual appearance, graphic image and other sensory stimuli of the website, or \"look and feel\": trademarks, logos, trade names, texts, images, graphics, designs, sounds, databases, software, flowcharts, presentation, navigation architecture, as well as the source code of the web pages) belong to VIRENS and/or to third parties who have assigned their rights to it.",
        "Under no circumstances does access to the Website imply any kind of permission, waiver, transfer, licence or total or partial assignment of such rights by their holders, unless expressly stated otherwise. These terms and conditions of use of the Website do not grant users any right to use, alter, exploit, reproduce, distribute or publicly communicate the Website and/or its content other than those expressly provided for herein.",
        "The use of these elements, their total or partial reproduction, communication and/or distribution for commercial or profit-making purposes, as well as their modification, alteration, decompilation and/or any other act of exploitation of the Website, is strictly prohibited.",
        "Without prejudice to the foregoing, if the user or a third party considers that any content on the Website may infringe intellectual or industrial property rights, please let us know as soon as possible.",
        ],
      },
      {
        heading: "Access to and use of the website",
        body: [
        "Both access to the Website and any unauthorised use that may be made of the information contained on it are the sole responsibility of the person who carries them out.",
        "The user undertakes to use the content, information and data of the Website in accordance with the conditions, terms and policies in force, with the applicable legislation, with generally accepted good practice and with public order.",
        "The user shall refrain from using the content of the Website for unlawful purposes or with unlawful effects, for purposes that are prohibited by or contrary to those set out herein, that are harmful to the rights and interests of VIRENS, of other users or of third parties, or that may in any way damage, disable, overload or impair this Website or prevent its normal use or enjoyment by users. VIRENS shall not be liable for any consequence, damage or loss that may arise from such access or use or from failure to comply with these conditions, terms and policies, nor shall it be liable for any security failures that may occur or for any damage that may be caused to the user's computer system (hardware and software) or to the files or documents stored on it as a result of:",
        { ordered: true, list: [
            "The presence of a virus on the user's computer used to connect to the services and/or products offered by VIRENS through its Website;",
            "A malfunction of the browser;",
            "The use of outdated versions of the system.",
          ] },
        ],
      },
      {
        heading: "Links to third parties",
        body: [
        "This Website may contain links to other websites. VIRENS accepts no responsibility for the content or the security measures of any other website that can be accessed from this Website; the user accesses such pages at their own sole risk.",
        "Likewise, no guarantee is given that the content linked from the VIRENS Website is free of viruses or other elements that may cause alterations to the computer system (hardware and software) and/or to the user's documents or files, and VIRENS is likewise exempt from all liability for damage of any kind caused by any of the above.",
        ],
      },
      {
        heading: "Social media",
        body: [
        "Please note that VIRENS may have a presence on social media. The processing of the data of persons who become followers of the official VIRENS pages on social media (and/or who make any link or connection through social media) shall be governed by this section, as well as by the terms of use, privacy policies and access rules of the relevant social network in each case, previously accepted by the user. VIRENS will process your data for the purpose of properly managing its presence on the social network, informing you of VIRENS activities, products or services, and for any other purpose permitted by the rules of the social networks.",
        "The publication of the following content is prohibited:",
        { ordered: false, list: [
            "Content that is allegedly unlawful under national, EU or international law, or that involves allegedly unlawful activities or breaches the principles of good faith.",
            "Content that violates the fundamental rights of individuals, breaches online etiquette, is offensive or may generate negative opinions among our users or third parties and, in general, any content considered inappropriate.",
            "And, in general, content that breaches the principles of legality, honour, responsibility, protection of human dignity, protection of minors, protection of public order, protection of privacy, consumer protection and intellectual and industrial property rights.",
          ] },
        "Furthermore, VIRENS reserves the right to remove from the website or the corporate social network, without prior notice, any content deemed inappropriate.",
        ],
      },
      {
        heading: "Amendment of the legal notice",
        body: [
        "VIRENS reserves the right to amend this legal notice at any time and without prior notice in order to adapt it to new legislation or case law, as well as to changes or practices in the industry. The user is obliged to consult these conditions, terms and policies periodically in order to check for any changes, taking the date of the last update as a reference.",
        ],
      },
    ],
  },
  {
    key: 'privacy',
    title: "Data protection policy",
    nav: "Data protection",
    description: "Data protection policy of Laboratorios Virens S.L. under the GDPR.",
    sections: [
      {
        heading: "Data controller",
        body: [
        "The personal data you provide to us as a user through the website www.lvirens.com (hereinafter, the \"Website\") will be included in a file owned by LABORATORIOS VIRENS S.L., hereinafter VIRENS, with registered office at C/Industria 48-B Polígono Industrial Nord-Est 08740 Sant Andreu de la Barca - Barcelona (Spain); holder of Tax ID (N.I.F.) no. B64294473; and email address csp@lvirens.com",
        "The processing of your data and this Privacy Policy shall be governed by the General Data Protection Regulation (Regulation (EU) 2016/679) (the \"GDPR\").",
        ],
      },
      {
        heading: "Purpose",
        body: [
        "In order to use certain services, the user must provide personal data. By ticking the box provided in the contact forms on the website, users expressly, freely and unequivocally accept that their personal data be processed by VIRENS, which will inform the user, in order to analyse the information arising from this management so as to improve our services and adapt them to users' preferences, for the following purposes:",
        { ordered: false, list: [
            "To provide you with access to the Website and improve the user experience.",
            "To manage the services requested on the Website.",
            "To provide data subjects with offers of products and services of interest to them.",
            "To draw up a \"commercial profile\" based on the information provided. No automated decisions will be taken on the basis of this profile.",
          ] },
        ],
      },
      {
        heading: "Legal basis",
        body: [
        "By sending their personal data to VIRENS, the user expressly consents to VIRENS carrying out the following activities and/or actions, unless otherwise indicated when contracting or subscribing to any VIRENS product and/or service, or as a result of a subsequent withdrawal of the consent initially given:",
        { ordered: false, list: [
            "Sending commercial and/or promotional communications on paper, informing users of activities, promotions, advertising, news, offers and other information about services and products related to the commercial activity.",
            "Sending commercial communications by electronic means, informing users of activities, promotions, advertising, news, offers and other information about VIRENS services and products that are the same as or similar to those initially contracted or of interest to the user.",
            "Processing orders or responding to requests made by the user through any of the contact methods made available on the VIRENS website.",
            "Carrying out statistical studies.",
            "Or, where provided for on our website, processing your user registration request and/or your order for products offered by VIRENS. Once your request has been confirmed and accepted, the user will receive a confirmation email at the address provided when completing the registration form.",
          ] },
        "Notwithstanding the foregoing, any information sent by VIRENS —including by electronic means— to VIRENS users for the purpose of carrying out, performing and/or developing any service subscribed to or contracted by the user —even if not subscribed to by electronic means—, as well as all other tasks, actions and/or activities arising from that contractual and/or commercial relationship, shall not be considered commercial and/or advertising communications.",
        "By sending your data, you consent to VIRENS processing your personal data for the purposes described. You warrant that the data provided are true, accurate and complete, and you are responsible for notifying any changes to them.",
        ],
      },
      {
        heading: "Recipients",
        body: [
        "The data will be disclosed to other companies of the VIRENS business group for internal administrative purposes, including the processing of personal data of customers or employees.",
        { ordered: false, list: [
            "CDMon (10DENCEHISPAHARD, S.L.) as hosting provider.",
          ] },
        "The files are stored with our technology providers for web storage, email and online marketing, in accordance with the EU-US Privacy security framework.",
        "By accepting this privacy policy, you expressly authorise us to process and disclose your personal data to the aforementioned companies and/or to transfer the personal data to the aforementioned service providers, as data processors, for the purposes described and in order to provide you with a complete service.",
        "VIRENS expressly informs and guarantees users that their personal data will under no circumstances be transferred to third-party companies, and that, whenever any transfer of personal data is to take place, the express, informed and unequivocal consent of the data subjects will be requested in advance.",
        ],
      },
      {
        heading: "Rights",
        body: [
        "In accordance with data protection legislation, you have the rights of information, access, rectification, erasure, objection and portability. You have the right to obtain confirmation as to whether or not VIRENS is processing personal data concerning you. Data subjects have the right to access their personal data, as well as to request the rectification of inaccurate data or, where appropriate, to request its erasure when, among other reasons, the data are no longer necessary for the purposes for which they were collected.",
        "In certain circumstances, data subjects may request the restriction of the processing of their data, in which case we will only retain them for the exercise or defence of claims.",
        "In certain circumstances and for reasons related to their particular situation, data subjects may object to the processing of their data. VIRENS will stop processing the data, except for compelling legitimate grounds or for the exercise or defence of possible claims.",
        "You may exercise your rights of access, rectification, erasure, objection and portability by sending an email to email@laempresa.com or by post to VIRENS, C/Industria 48-B Polígono Industrial Nord-Est 08740 Sant Andreu de la Barca - Barcelona (Spain), stating your full name, the specific request you are making and an address for notification purposes, and enclosing a copy of your national ID card (DNI) or another valid identity document.",
        "Furthermore, VIRENS undertakes to guarantee the confidentiality of your personal data and to use them in accordance with the purposes indicated above.",
        "Likewise, it will adopt all necessary measures to prevent their alteration, loss, processing or unauthorised access, in accordance with the provisions of personal data protection legislation.",
        ],
      },
      {
        heading: "Data retention period",
        body: [
        "We will keep your personal data for as long as the contractual relationship with us remains in force and, once it has ended, for the limitation periods of any obligations that may have arisen from the processing of the data and/or for the periods established by law.",
        ],
      },
    ],
  },
  {
    key: 'sales',
    title: "General Sales Conditions",
    nav: "Commercial policy",
    description: "General sales conditions for products manufactured and marketed by Laboratorios Virens.",
    sections: [
      {
        heading: "Scope of application",
        body: [
        "These General Sales Conditions (GSC) shall apply to all products manufactured and/or marketed by the COMPANY. They shall also apply to all matters not expressly regulated in the conditions previously agreed in writing between the COMPANY and the CUSTOMER leading to the placing of the order.",
        "The issuing of a supply order by a CUSTOMER implies acceptance of each and every one of these GSC, unless conditions different from those set out herein have previously been agreed with the COMPANY, in which case all other conditions not expressly affected by the accepted removal or amendment shall remain in force.",
        ],
      },
      {
        heading: "Prices",
        body: [
        "The COMPANY may modify the prices of the products, as well as stop applying discounts previously agreed with the CUSTOMER, for any reason the COMPANY deems appropriate. The COMPANY may also discontinue any product that is the subject of the transaction for internal, regulatory and/or administrative reasons.",
        "Unit sales prices of the products are stated exclusive of VAT and/or any other tax that may apply. Taxes will be added to the final invoice amount.",
        "Transport costs shall be borne by the COMPANY or the CUSTOMER as agreed prior to dispatch of the orders.",
        "Any other additional charge that may apply to the transaction must also be stated in the conditions previously agreed with the COMPANY, specifying which party shall bear such costs.",
        ],
      },
      {
        heading: "Placing of orders and scope of the sale",
        body: [
        "The scope of the sale shall be specified in the conditions previously agreed with the COMPANY leading to the placing of the order by the CUSTOMER.",
        "The sale includes only the products covered by the order.",
        "In the event of a partial delivery of the products initially agreed, due to supply shortages on the part of the COMPANY, the outstanding products will be sent to the CUSTOMER immediately once the COMPANY again has all of the products available.",
        "Any modifications and/or variations to the scope, deadlines or other terms of an order proposed by one of the parties must always be notified to the other party in writing and, in order to be valid, must be accepted by that party. Modifications and/or variations caused by changes in the applicable legislation, regulations and standards occurring after the date on which the previously agreed conditions were set shall also be considered modifications and/or variations; if such modifications and/or variations impose additional or more onerous obligations on the COMPANY, the COMPANY shall be entitled to an equitable adjustment of the contractual terms fully reflecting the consequences of the new or amended law or regulation.",
        ],
      },
      {
        heading: "Payment terms",
        body: [
        "Payment terms are set out in the previously agreed conditions and, in the absence of an agreement between the parties, payment for the order shall be made as follows:",
        "50% upon placing the order and 50% 3 days before delivery of the order.",
        "These payment terms shall comply with the provisions of Spanish Law 15/2010 of 5 July establishing measures to combat late payment in commercial transactions, and shall under no circumstances exceed the maximum periods established therein.",
        "If delivery of the products is delayed for reasons beyond the COMPANY's control, the contractual payment terms and deadlines shall remain unchanged.",
        ],
      },
      {
        heading: "Non-payment",
        body: [
        "If the CUSTOMER fails to make any of the scheduled payments in full or in part, the COMPANY shall be entitled, from the day following the payment due date, to receive the interest provided for in Spanish Law 3/2004 of 29 December establishing measures to combat late payment in commercial transactions, as well as compensation for collection costs, set at five per cent (5%) of the amount on which late-payment interest accrues.",
        "Likewise, the COMPANY may suspend performance of this Contract until it receives the corresponding payment, subject to prior written notice to the CUSTOMER. If, after two months, the CUSTOMER has not paid the amount owed, the COMPANY may automatically terminate the contract by notifying the CUSTOMER. Termination of this Contract on these grounds shall entitle the COMPANY to claim, as damages, payment of the relevant costs, as well as payment of the expenses arising from the non-payment.",
        "In the case of successive orders, if the CUSTOMER fails to pay for any of the orders in full or in part, the COMPANY shall be entitled to suspend successive/subsequent orders until the CUSTOMER has paid the amount owed. If such payment is not made within 14 calendar days from the payment due date, the COMPANY may terminate all successive/subsequent contracts, thereby terminating the entire commercial relationship, with all the resulting consequences, including the loss of territorial exclusivity. This termination shall also entitle the COMPANY to claim, as damages, payment of the relevant costs, as well as payment of the expenses arising from the non-payment and compensation for orders that have not been delivered.",
        ],
      },
      {
        heading: "Delivery of the product",
        body: [
        "Delivery times for the products are for information purposes only and are not binding on the COMPANY.",
        "Unless expressly agreed in writing with the COMPANY, the CUSTOMER shall not be entitled to request the cancellation of an order or any compensation in the event of a delay in the delivery of the product due to circumstances beyond the COMPANY's control.",
        "The CUSTOMER may not refuse to pay the price of products already delivered when the COMPANY makes a partial delivery of an order.",
        ],
      },
      {
        heading: "Product returns and claims",
        body: [
        "Claims for quality defects shall be sent to the COMPANY together with a sample of the product. Deliveries of products under this Contract shall be deemed to have been supplied in accordance with the agreed quality unless a claim is received within 14 days of receipt of the products, by means of a written notice addressed to the COMPANY.",
        "Under no circumstances will the COMPANY accept returns without prior agreement with the CUSTOMER and without prior signature and delivery of the COMPANY's return authorisation document.",
        ],
      },
      {
        heading: "Warranties and product quality",
        body: [
        "The CUSTOMER shall inspect the products received from the COMPANY to verify compliance with the agreed quality, shortages and/or any other deficiency, applying visual inspection and all reasonable, state-of-the-art quality control standards for incoming products.",
        "The COMPANY is obliged to guarantee the quality of the product until its expiry date, provided that the product has not been handled, processed, altered or subjected to any modification that alters its condition, whether inside the product or in its packaging, in whole or in part. The CUSTOMER acknowledges and releases the COMPANY from liability for the degradation in the concentration of vitamins, minerals and other ingredients known to degrade over time, even if they have not reached their expiry or best-before date.",
        "The CUSTOMER is obliged to store the products in accordance with the legal regulations in force applicable to food safety.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
        "The COMPANY's liability for claims arising from the performance or non-performance of its contractual obligations shall not exceed, in aggregate, the basic contract price and shall under no circumstances include damages arising from loss of profit, loss of revenue, production or use, cost of capital, energy costs, loss of anticipated savings, increases in operating costs or any special or indirect damages, or losses of any kind. The limitation of liability contained in this clause shall prevail over any other provision contained in any other contractual document that contradicts it, unless such provision further restricts the COMPANY's liability.",
        ],
      },
      {
        heading: "Retention of title and transfer of risk",
        body: [
        "Until the CUSTOMER has paid in full the amounts owed as a result of the sale, the product shall be deemed to be the property of the COMPANY, with all inherent rights.",
        "In addition to the special charge established on the products sold to secure the fulfilment of its obligations, the CUSTOMER shall be liable for them with all its other assets.",
        "However, once the products have been delivered to the CUSTOMER, they become the CUSTOMER's responsibility for the purposes of protection, storage, custody and security, theft or any other risk situation, and the CUSTOMER undertakes to cooperate with the COMPANY in adopting any measures necessary to protect its property rights.",
        "Once the full amount owed has been paid, full ownership of the products shall pass to the CUSTOMER.",
        ],
      },
      {
        heading: "Marketing restrictions",
        body: [
        "The CUSTOMER acknowledges and accepts that the purchased product may be subject to sales limitations, restrictions and/or prohibitions in its territory.",
        "The CUSTOMER must hold the relevant administrative permits and health authorisations in force in order to sell the purchased products.",
        "The CUSTOMER acknowledges that the products sold to it by the COMPANY are duly notified or registered in the country/countries where it will market them, and that the name and registration of the COMPANY will not appear on the packaging of the products unless expressly authorised in writing for this purpose.",
        "The CUSTOMER acknowledges that all advertising and promotion of the product, including its packaging, is the responsibility of the CUSTOMER, and releases the COMPANY from any liability for possible actions by the health or consumer authorities.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
        "The industrial property of this contract, in all its terms, and of the information attached to it belongs to the COMPANY, as does that of the internal developments of the products being sold; the CUSTOMER is therefore expressly prohibited from using them for any purpose other than fulfilling the objectives of the sale.",
        "The intellectual property of the products being sold and of the designs, trademarks, logos, drawings, etc. incorporated in or relating to them belongs to the CUSTOMER; the COMPANY is therefore expressly prohibited from using them for any purpose other than fulfilling the objectives of the sale.",
        ],
      },
      {
        heading: "Confidentiality",
        body: [
        "With regard to the confidential information provided by the disclosing party or otherwise obtained, the parties agree to:",
        "Treat the confidential information as strictly private and confidential and therefore limit its disclosure exclusively to those directors, managers, employees and advisers whose duties require access to it, and ensure that such persons are informed of the obligations contained in this agreement.",
        "Keep the confidential information in safe custody and in a secure place.",
        "Not disclose the confidential information or allow any third party to obtain it without the prior written consent of the disclosing party.",
        "Not use the confidential information for purposes other than the objective.",
        "Not copy in any way all or part of the confidential information for purposes other than the objective or where it is intended for persons whose identity has not been previously approved in writing by the disclosing party.",
        "Return to the disclosing party, when so requested in writing, or destroy all or part of the confidential information —written or in any other format— and all copies held by them or by third parties, and confirm its return or destruction in writing.",
        "The parties undertake to return any documentation or background information provided on any medium and, where applicable, any copies made of it, that constitutes information protected by the duty of confidentiality covered by this Agreement, should the relationship between the parties end for any reason.",
        ],
      },
      {
        heading: "Applicable law and jurisdiction",
        body: [
        "These General Sales Conditions, throughout their scope of application, and all relationships arising from them shall be governed by and construed in accordance with Spanish law.",
        "In the event of any dispute concerning or interpretation of the previously agreed conditions (price lists, etc.), the performance of the contract or these General Sales Conditions, the parties, expressly waiving any other jurisdiction that may correspond to them, agree to submit to the courts and tribunals of the city of Barcelona.",
        ],
      },
    ],
  },
];
