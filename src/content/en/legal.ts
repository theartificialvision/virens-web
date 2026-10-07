import type { LegalDoc } from '../legal';

/**
 * Legal texts.
 * - Legal notice, Privacy policy and Cookie policy: OUR translation (07/10/2026)
 *   of the client's Spanish documents dated 05/10/2026 — the client has not sent
 *   English versions. Pending client review. Same omissions as the Spanish
 *   file (see the note at the top of `../legal.ts`).
 * - Sales terms: literal from the client's English Word documents (29/09/2026).
 */
export const legalUi = {
  eyebrow: 'Documentation', // [TR]
  toc: 'Contents', // [TR]
  docsAria: 'Legal documents', // [TR]
  company: 'Laboratorios Virens S.L.',
} as const;

const PRIVACY = '/en/legal/privacy-policy';

export const legalDocs: readonly LegalDoc[] = [
  {
    key: 'legalNotice',
    title: "Legal notice",
    nav: "Legal notice",
    description: "Legal notice of Laboratorios Virens S.L.: identification details and website terms of use.",
    intro: [
      "In accordance with Spanish Law 34/2002, of 11 July, on Information Society Services and Electronic Commerce, the following information is provided:",
    ],
    sections: [
      {
        heading: "Identification details",
        body: [
        "You are visiting the website www.lvirens.com, owned by LABORATORIOS VIRENS, S.L, with registered office at C/ Industria 48, Polig. Ind. Nord-Est (08740 Sant Andreu De La Barca) Barcelona (Spain), with Tax ID (NIF) B64294473, registered in the Companies Register (Registro Mercantil) of Barcelona, Volume (Tomo) 38911, Folio 45, Sheet (Hoja) B 331705. Hereinafter, the OWNER.",
        "You may contact the Owner by any of the following means:",
        { ordered: false, list: [
            "Telephone: +34 936828972",
            "Contact email: cgestion@lvirens.com",
          ] },
        ],
      },
      {
        heading: "Users",
        body: [
        "This document sets out the terms and conditions governing the use of the Owner's website and/or app, as well as the associated services and content. Such use implies acquiring the status of “user” and, with that status, a series of rights and obligations.",
        "For the purposes described above, we inform you that it is your responsibility to access the legal conditions included on this website, as well as the privacy and cookie policies or, where applicable, the terms of sale, and to read them carefully. We recommend:",
        { ordered: false, list: [
            "That you visit them each time you intend to access or use the services and content of the site, and",
            "That you print or store a copy on your system.",
          ] },
        ],
      },
      {
        heading: "Use of the website",
        body: [
        "This website provides access to a wide range of information, services, programs or data (hereinafter, “the content”) on the Internet belonging to the Owner or its licensors, to which the User may have access.",
        "The User assumes responsibility for the use of the website under the terms set out herein. This responsibility extends to any registration that may be required to access certain services or content. In such registration, the User shall be responsible for providing truthful and lawful information. As a result of this registration, the User may be provided with a password, for which they shall also be responsible, undertaking to use it diligently and confidentially.",
        "The User undertakes to make appropriate use of the content and services (for example, chat services, discussion forums or newsgroups) offered by the Owner through its website and, by way of example but not limitation, not to use them to:",
        { ordered: false, list: [
            "Engage in unlawful or illegal activities or activities contrary to good faith and public order.",
            "Disseminate racist, xenophobic, illegal pornographic content or propaganda, content that advocates terrorism or that violates human rights.",
            "Cause damage to the physical and logical systems of the Owner, its suppliers or third parties, or introduce or spread computer viruses or any other physical or logical systems capable of causing the aforementioned damage.",
            "Attempt to access and, where applicable, use the email accounts of other users and modify or manipulate their messages.",
            "Use the website or the information it contains for commercial, political or advertising purposes or for any commercial use, especially the sending of unsolicited emails.",
          ] },
        "The Owner reserves the right to remove any comments and contributions that violate respect for the dignity of the person, that are discriminatory, xenophobic, racist or pornographic, that threaten young people or children, public order or safety, or that, in its opinion, are not suitable for publication. In any case, the Owner shall not be responsible for the opinions expressed by users through forums, chats or other participation tools.",
        ],
      },
      {
        heading: "Data protection",
        body: [
        `Everything relating to the processing of your personal data is set out in the [Privacy policy](${PRIVACY}).`,
        ],
      },
      {
        heading: "Content. Intellectual and industrial property",
        body: [
        "The Owner holds all intellectual and industrial property rights to its website, as well as to the elements contained therein (by way of example: images, photographs, sound, audio, video, software or texts, trademarks or logos, colour combinations, structure and design, selection of materials used, computer programs necessary for its operation, access and use, etc.), owned by the Owner or by its licensors.",
        "All rights reserved. Under the provisions of articles 8 and 32.1, second paragraph, of the Spanish Intellectual Property Law, the reproduction, distribution and public communication, including making available, of all or part of the content of this website for commercial purposes, in any medium and by any technical means, without the Owner's authorisation, are expressly prohibited.",
        ],
      },
      {
        heading: "Disclaimer of warranties and liability",
        body: [
        "The User acknowledges that the use of the website and its content and services is carried out under their sole responsibility. Specifically, and merely by way of example, the Owner accepts no liability in the following areas:",
        { ordered: false, list: [
            "The availability of the website, its services and content, and their quality or interoperability.",
            "Whether the website serves the User's purposes.",
            "Any breach of current legislation by the User or third parties and, in particular, of intellectual and industrial property rights held by other persons or entities.",
            "The existence of malicious code or any other harmful computer element that could affect the computer system of the User or third parties. The entity takes measures to protect the website against cyberattacks. However, it cannot guarantee that unauthorised access by third parties will not occur. It is therefore the User's responsibility to have suitable tools for detecting and removing such elements.",
            "Fraudulent access to the content or services by unauthorised third parties or, where applicable, the capture, deletion, alteration, modification or manipulation of messages and communications of any kind that such third parties may carry out.",
            "Damage caused to computer equipment while accessing the website and damage caused to Users when it originates from failures or disconnections in telecommunications networks that interrupt the service.",
            "Damage or loss arising from unforeseeable circumstances or force majeure.",
            "Where forums or other similar spaces exist, it should be borne in mind that messages reflect only the opinion of the User who sends them, who is solely responsible for them. Consequently, the Owner is not responsible for the content of messages sent by the User.",
          ] },
        ],
      },
      {
        heading: "Changes to this legal notice and duration",
        body: [
        "The Owner reserves the right to make, without prior notice, any changes it deems appropriate to its website, and may change, delete or add content and services provided through it, as well as the way in which they are presented or located on its website.",
        "These conditions shall remain in force for as long as they are displayed, until they are amended by others duly published.",
        ],
      },
      {
        heading: "Links",
        body: [
        "If www.lvirens.com includes links or hyperlinks to other Internet sites, the Owner shall not exercise any control over those sites and their content, nor shall it assume any responsibility for the content of any link belonging to a third-party website, nor guarantee the technical availability, quality, reliability, accuracy, completeness, truthfulness, validity or constitutionality of any material or information contained in any such hyperlinks or other Internet sites. Likewise, the inclusion of these external connections shall not imply any kind of association, merger or participation with the connected entities. Notwithstanding the above, if LABORATORIOS VIRENS, S.L becomes aware that the activity or information referred to or recommended is unlawful, or that it harms property or rights of a third party liable for compensation, such data will be removed or the corresponding link disabled.",
        ],
      },
      {
        heading: "Right of exclusion",
        body: [
        "The Owner reserves the right to deny or withdraw access to the website and/or the services offered, without prior notice, on its own initiative or at the request of a third party, to users who breach the content of this Legal Notice.",
        ],
      },
      {
        heading: "General provisions",
        body: [
        "The Owner will pursue any breach of these conditions, as well as any improper use of its website, exercising all civil and criminal actions to which it may be legally entitled.",
        ],
      },
      {
        heading: "Applicable law and jurisdiction",
        body: [
        "The relationship between the Owner and the User shall be governed by current Spanish law. All disputes and claims arising from this legal notice shall be settled by the competent Spanish consumer and user courts and tribunals.",
        ],
      },
      {
        heading: "Minors",
        body: [
        "This website addresses its services to users over 18 years of age. Minors are not authorised to use our services and must not, therefore, send us their personal data. We inform you that, should this occur, the Owner shall not be responsible for any consequences that may arise from failure to comply with the notice set out in this clause.",
        ],
      },
      {
        heading: "Security measures - SSL",
        body: [
        "The Owner has obtained an SSL («Secure Sockets Layer») certificate for its website. This SSL certificate protects all personal and confidential information that may be handled on a website, regardless of the information being transmitted, for example, from any of the website's contact forms to the server, or the data entered to subscribe to newsletters, access protected areas, etc.",
        "The website address will appear in green, activating the “https” protocol, which allows secure connections from a web server to the user's browser.",
        ],
      },
    ],
    revised: "Last revised 5 October 2026",
  },
  {
    key: 'privacy',
    title: "Privacy policy",
    nav: "Privacy policy",
    description: "Privacy policy of Laboratorios Virens S.L. in accordance with the GDPR and the Spanish LOPDGDD.",
    intro: [
      "The purpose of this policy is to inform data subjects about the different processing operations carried out by this organisation through the website that affect their personal data, in accordance with Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 and Spanish Organic Law 3/2018, of 5 December, on the Protection of Personal Data and the guarantee of digital rights.",
    ],
    sections: [
      {
        heading: "Identity and contact details of the controller",
        body: [
        "LABORATORIOS VIRENS, S.L, with registered address at C/ Industria 48, Polig. Ind. Nord-Est (08740 Sant Andreu De La Barca) Barcelona (Spain), Tax ID (NIF) B64294473, contact telephone +34 936828972 and email cgestion@lvirens.com",
        ],
      },
      {
        heading: "Purposes of processing your personal data",
        body: [
        { subheading: "Users/visitors of the controller's website" },
        "We will process the personal data provided in order to:",
        { ordered: false, list: [
            "Respond to requests, complaints and incidents submitted through the contact channels on the website.",
            "Understand visitor behaviour on the website in order to detect possible cyberattacks against our website.",
            "Comply with the legal obligations directly applicable to us and governing our activity.",
            "Protect and exercise our rights or respond to claims of any kind.",
            "Where applicable, send commercial communications relating to the goods or services that make up our activity and/or news or newsletters related to our sector. Refusal to give us your authorisation will mean that the entity cannot send you information.",
            "Where applicable, manage your participation in competitions and promotions run by the entity. Refusal to give us your authorisation will mean that you cannot take part.",
            "Where applicable, send satisfaction and/or quality surveys. Refusal to give us your authorisation will mean that the service provided cannot be evaluated.",
          ] },
        { subheading: "Job candidates or applicants" },
        "In addition to the purposes set out in the section «users/visitors of the website», we will process the personal data provided in order to:",
        { ordered: false, list: [
            "Manage your application in the selection process and keep you informed about it.",
          ] },
        ],
      },
      {
        heading: "Legal basis for processing",
        body: [
        { subheading: "Users/visitors of the controller's website" },
        { ordered: false, list: [
            "The consent you have given us to process your data for the stated purposes. Refusal to provide your personal data will mean that it cannot be processed for those purposes.",
            "Compliance with the legal obligations that apply to us. In this case, the data subject may not object to the processing of personal data.",
            "Our legitimate interest in protecting our image, business and track record by preventing attacks on our website. In this case, the data subject may not object to the processing of personal data, although they may exercise, where applicable, the rights set out in the «rights» section of this policy.",
          ] },
        { subheading: "Job candidates or applicants" },
        { ordered: false, list: [
            "The consent you have given us to process your data for the stated purposes. Refusal to provide your personal data will mean that it cannot be processed for those purposes.",
            "Compliance with the legal obligations that apply to us. In this case, the data subject may not object to the processing of personal data.",
            "Our legitimate interest in protecting our image, business and track record by preventing attacks on our website. In this case, the data subject may not object to the processing of personal data, although they may exercise, where applicable, the rights set out in the «rights» section of this policy.",
          ] },
        ],
      },
      {
        heading: "Data retention periods or criteria",
        body: [
        "The personal data provided will be kept for as long as necessary to fulfil the purposes for which they were originally collected.",
        "Once the data are no longer necessary for the processing in question, they will be kept duly blocked in order to make them available, where appropriate, to the competent Public Administrations and Bodies, Judges and Courts or the Public Prosecutor, during the limitation period for any actions that may arise from the relationship with the client and/or the legally established retention periods.",
        "If you have provided us with your CV, we will keep your data for a maximum period of two years from receipt, at which point we will delete them, unless you have updated your data or authorised us to keep them for a longer period. For the relevant purposes, we inform you that you may withdraw your consent at any time.",
        ],
      },
      {
        heading: "Automated decisions and profiling",
        body: [
        "The website does not make automated decisions or create profiles.",
        ],
      },
      {
        heading: "Recipients",
        body: [
        "During the period in which your personal data are processed, the organisation may disclose your data to the following recipients:",
        { ordered: false, list: [
            "Judges and Courts.",
            "State Security Forces and Bodies.",
            "Other competent public authorities or bodies, where the controller is legally obliged to provide the personal data.",
          ] },
        ],
      },
      {
        heading: "International data transfers",
        body: [
        "The organisation does not carry out any International Data Transfer. Should it later become necessary to carry out international data transfers, the level of protection of the destination country will be verified and the safeguards required by law will be adopted.",
        ],
      },
      {
        heading: "Social networks",
        body: [
        "In order to involve you in our activity and keep you up to date with our news, we inform you that LABORATORIOS VIRENS, S.L has a profile on Social Networks.",
        "All users have the opportunity to join our social networks or groups. However, please bear in mind that, unless we request your data directly (for example, through marketing actions, competitions, promotions or any other valid means), your data will belong to the corresponding Social Network, so we recommend that you read its terms of use and privacy policies carefully and make sure you configure your preferences regarding the processing of your data.",
        "Below is the link to the privacy policy of the Social Networks on which we are present, so that you can access their privacy policies at any time and configure your profile to guarantee your privacy:",
        { ordered: false, list: [
            "LinkedIn: [https://www.linkedin.com/legal/privacy-policy](https://www.linkedin.com/legal/privacy-policy)",
          ] },
        ],
      },
      {
        heading: "Rights",
        body: [
        "Data subjects may request further information about the processing of their personal data and may exercise, at any time and free of charge, the rights of access, rectification and erasure, as well as request the restriction of the processing of their personal data, object to it, request its portability (where technically possible) or withdraw the consent given and, where applicable, not be subject to a decision based solely on automated processing, including profiling.",
        "To do so, you may use the forms provided by the organisation, or write to the postal or email address given at the beginning of this policy. For the relevant purposes, we inform you that you may be asked for your ID card or any similar document in order to verify your identity, provided that this cannot be done by other less intrusive means.",
        "If you feel that your rights regarding the protection of your personal data have been infringed, especially when you have not obtained satisfaction in exercising your rights, you may lodge a complaint with the competent Data Protection Supervisory Authority (Spanish Data Protection Agency, AEPD) through its website [www.aepd.es](https://www.aepd.es)",
        "In accordance with article 21 of Spanish Law 34/2002 on Information Society Services and Electronic Commerce, if you no longer wish to receive information about our services, you may unsubscribe by sending an email to cgestion@lvirens.com with the subject “BAJAS” (unsubscribe).",
        ],
      },
      {
        heading: "Accuracy of data",
        body: [
        "The data subject guarantees that the data provided are true, accurate, complete and up to date, and undertakes to report any change to them through the channels provided for this purpose and indicated in point one of this policy. The data subject shall be liable for any direct or indirect damage or loss that may result from failure to comply with this obligation.",
        "Should the user provide data of third parties, they declare that they have the consent of those data subjects and undertake to pass on to them the information contained in this clause, releasing the organisation from any liability arising from failure to comply with this obligation.",
        ],
      },
      {
        heading: "Changes and updates",
        body: [
        "This privacy policy may be modified/updated in accordance with legal requirements or in order to adapt it to the instructions issued by the Spanish Data Protection Agency, or as a result of changes to our website. For this reason, we advise users to visit our Privacy Policy periodically.",
        "If you have any questions about this policy, you may contact LABORATORIOS VIRENS, S.L through the forms provided by the organisation, or write to the postal or email address given at the beginning of this policy.",
        ],
      },
    ],
    revised: "Last revised 5 October 2026",
  },
  {
    key: 'cookies',
    title: "Cookie policy",
    nav: "Cookie policy",
    description: "Cookie policy of Laboratorios Virens S.L.: what cookies are and which ones this website uses.",
    sections: [
      {
        heading: "Use of cookies. What are cookies?",
        body: [
        "Cookies are files that are downloaded to your computer, smartphone or tablet when you access certain web pages, and which store and retrieve information while you browse. The use of cookies offers numerous advantages in the provision of Information Society services since, among others, they:",
        { ordered: true, alpha: true, list: [
            "make it easier for the user to browse the Website;",
            "make it easier for the user to access the different services offered by the Website;",
            "save the user from having to reconfigure the general predefined settings each time they access the Website;",
            "help improve the operation and services provided through the Website, after analysing the information obtained through the cookies installed;",
            "allow a Website, among other things, to store and retrieve information about the browsing habits of a user or their device and, depending on the information they contain and the way the device is used, they can be used to recognise the user.",
          ] },
        "In accordance with Spanish Law 34/2002, of 11 July, on Information Society Services and Electronic Commerce, and Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016, we inform you that this website does not use cookies to collect information from users. Only technical and personalisation cookies are used, in order to allow you to browse and to enable you to set your preferences.",
        "In order to provide you with as much information as possible, we first classify cookies according to a series of categories:",
        { subheading: "Types of cookies according to the entity that manages them" },
        { ordered: true, alpha: true, list: [
            "First-party cookies: those for which the publisher itself is responsible and which are generally sent to the user's terminal from a device or domain managed by the publisher and from which the service requested by the user is provided.",
            "Third-party cookies: those for which an entity other than the publisher is responsible and which are generally sent to the user's terminal from a device or domain not managed by the publisher, but by another entity that processes the data obtained through the cookies.",
          ] },
        { subheading: "Types of cookies according to their purpose" },
        { ordered: true, alpha: true, list: [
            "Technical cookies: those that allow the user to browse a website, platform or application and use the different options or services it offers, including those the publisher uses to manage and operate the website and enable its functions and services, for example, controlling traffic and data communication, identifying the session, accessing restricted areas, carrying out the purchase process, storing content, broadcasting video or sound, enabling dynamic content, etc.",
            "Preference or personalisation cookies: those that allow information to be remembered so that the user accesses the service with certain characteristics that may differentiate their experience from that of other users, for example, the language, the number of results to display when the user carries out a search, etc.",
            "Analytics or measurement cookies: those that allow the party responsible for them to monitor and analyse the behaviour of users of the websites to which they are linked, including measuring the impact of advertisements.",
            "Behavioural advertising cookies: those that store information on user behaviour obtained through continuous observation of their browsing habits, which makes it possible to develop a specific profile to display advertising based on it.",
          ] },
        { subheading: "Types of cookies according to how long they remain active" },
        { ordered: true, alpha: true, list: [
            "Session cookies: those designed to collect and store data while the user accesses a web page. They are usually used to store information that is only of interest for providing the service requested by the user on a single occasion (for example, a list of products purchased) and disappear at the end of the session.",
            "Persistent cookies: those in which the data remain stored on the terminal and can be accessed and processed for a period defined by the party responsible for the cookie, which can range from a few minutes to several years.",
          ] },
        { subheading: "Cookies we use" },
        "This website does not currently install any cookies on your device.",
        "The website owned by LABORATORIOS VIRENS, S.L may contain links to third-party websites, whose privacy policies are independent of that of LABORATORIOS VIRENS, S.L. When accessing such websites, you can decide whether to accept their privacy and cookie policies. In general, when browsing the Internet you can accept or reject third-party cookies from your browser's settings. LABORATORIOS VIRENS, S.L is not responsible, under any circumstances, for the content or accuracy of the policies and/or terms of use and privacy of third parties.",
        ],
      },
      {
        heading: "Changes. Updates",
        body: [
        "This cookie policy may be modified/updated in accordance with legal requirements or in order to adapt it to the instructions issued by the Spanish Data Protection Agency, or due to updates to the website. For this reason, we advise users to visit our cookie policy periodically.",
        "If you have any questions about this cookie policy, you may contact LABORATORIOS VIRENS, S.L at the following email address: cgestion@lvirens.com",
        `For further information on the processing of your personal data, please see our [Privacy Policy](${PRIVACY})`,
        ],
      },
    ],
    revised: "Last revised 5 October 2026",
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
