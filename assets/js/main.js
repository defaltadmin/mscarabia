/**
 * MSC Arabia — Main JavaScript
 * i18n, interactions, animations, form handling
 */

(function () {
  'use strict';

  // ============================================
  // Constants
  // ============================================
  const LANG_KEY = 'msca_lang';
  const CONTACT_API = '/api/contact';

  // ============================================
  // i18n — Translations
  // ============================================
  const translations = {
    en: {
      // Navigation
      nav_services: 'Services',
      nav_engineering: 'Engineering',
      nav_manpower: 'Manpower',
      nav_clients: 'Clients',
      nav_about: 'About',
      nav_cta: 'Get in Touch',
      nav_projects: 'Projects',
      nav_contact: 'Contact',

      // Hero
      hero_pill: "Saudi Arabia's Local IT Partner",
      hero_h1_1: 'End-to-End',
      hero_h1_3: 'Solutions',
      hero_sub: "Saudi-based managed IT services, MDM licensing, hardware & software procurement, fire safety engineering, and workforce solutions — trusted by Saudi Arabia's leading enterprises.",
      hero_btn1: 'Explore Services',
      hero_btn2: 'Schedule a Call',
      hero_stat1: 'Years in KSA',
      hero_stat2: 'Enterprise Clients',
      hero_stat3: 'Workers Placed',
      hero_stat4: 'Managed Support',
      hero_card_tag: 'Saudi Vision 2030 Aligned',
      hero_card_title: 'Precision Engineering & IT',
      hero_card_desc: 'Certified for Aramco, STC & Petro Rabigh. PMP, PMI-ACP, Siemens Fire Systems, BACnet Integration.',
      hero_badge_tag: 'Aramco Permanent ID',
      hero_badge_val: 'STC & Petro Rabigh Access',

      // Clients
      clients_tag: "Trusted by Saudi Arabia's Leading Organisations",
      client_1: 'Amsa Hospitality',
      client_2: 'TSS Advertising',
      client_3: 'Arab Fire Safety & Security Academy',
      client_4: 'Kudu Company',
      client_5: 'EHIC',
      client_6: 'Ebtekar Al-Taknouchia',
      client_7: 'Aklaniat Technologies',
      client_8: 'Al Bayan Model School',
      client_9: '4 Dimensions Advertising',
      client_10: 'Yenepoya Intl School KSA',
      client_11: 'Hellmann Worldwide Logistics',

      // Services
      services_pill: 'Our Core Services',
      services_title: 'Comprehensive IT & Engineering Solutions',
      services_sub: 'End-to-end services designed to accelerate your digital transformation and ensure operational excellence.',
      svc_cta: 'Request Service',
      svc_cta_quote: 'Get a Quote',
      svc1_title: 'Managed IT Services',
      svc1_desc: '24/7 proactive monitoring, expert localized technical support, and comprehensive maintenance designed to ensure maximum uptime across your entire infrastructure.',
      svc1_item1: 'Server & Network Management',
      svc1_item2: 'Cloud Infrastructure (AWS, Azure, GCP)',
      svc1_item3: '24/7 Help Desk & On-Site Support',
      svc2_title: 'MDM Licensing',
      svc2_desc: 'Enterprise Mobile Device Management — secure, deploy, and manage all your fleet devices from a single console.',
      svc2_item1: 'Apple Business Manager & DEP',
      svc2_item2: 'Microsoft Intune & SCCM',
      svc2_item3: 'Android Enterprise & BYOD',
      svc3_title: 'Fire Safety Engineering',
      svc3_desc: 'Turnkey fire alarm, suppression, and evacuation systems — from design through commissioning. Certified for Aramco, SEC, and petrochemical facilities.',
      svc3_item1: 'Siemens & Notifier Fire Panels',
      svc3_item2: 'BACnet / Modbus Integration',
      svc3_item3: 'NFPA & Civil Defense Compliance',
      svc4_title: 'Manpower Solutions',
      svc4_desc: 'Vetted IT and engineering professionals deployed across Saudi Arabia. Full visa processing, Iqama sponsorship, and GOSI compliance handled end-to-end.',
      svc4_item1: 'IT Engineers & Technicians',
      svc4_item2: 'Visa Processing & Iqama',
      svc4_item3: 'Project-Based & Permanent Staffing',
      svc5_title: 'Hardware & Software',
      svc5_desc: 'End-to-end procurement of enterprise hardware and licensed software — from vendor selection through deployment, asset tracking, and lifecycle management.',
      svc5_item1: 'Dell, HP, Lenovo Enterprise Fleet',
      svc5_item2: 'Microsoft 365 & Licensing',
      svc5_item3: 'Asset Lifecycle Management',
      svc6_title: 'Support & Maintenance',
      svc6_desc: 'SLA-backed IT support with guaranteed response times. Preventive maintenance schedules, quarterly health checks, and dedicated account management.',
      svc6_item1: '24/7 Remote & On-Site SLA',
      svc6_item2: 'Preventive Maintenance Cycles',
      svc6_item3: 'Dedicated Account Manager',
      svc2_tag1: 'Apple Business Manager', svc2_tag2: 'Microsoft Intune', svc2_tag3: 'Device Security',
      svc3_tag1: 'Siemens', svc3_tag2: 'BACnet', svc3_tag3: 'NFPA', svc3_tag4: 'Civil Defense',
      svc4_tag1: 'Visa Processing', svc4_tag2: 'Iqama', svc4_tag3: 'Deployment', svc4_tag4: 'GOSI',
      svc5_tag1: 'Procurement', svc5_tag2: 'Licensing', svc5_tag3: 'Asset Management',
      svc6_tag1: '24/7 SLA', svc6_tag2: 'Preventive', svc6_tag3: 'Quarterly Reviews',
      svc1_tag1: 'Server Management', svc1_tag2: 'Cloud Infrastructure', svc1_tag3: 'Help Desk', svc1_tag4: 'Monitoring',

      // Cookie consent
      cookie_text: 'We use cookies for analytics to improve our website. By clicking "Accept", you consent to the use of cookies. See our <a href="#" onclick="openModal(\'cookie\');return false">Cookie Policy</a> for details.',
      cookie_link: 'Cookie Policy',
      cookie_decline: 'Decline',
      cookie_accept: 'Accept',

      // Hero stats

      // Engineering
      eng_tag: 'Engineering Services',
      eng_h2: 'Fire Safety Testing & Commissioning',
      eng_desc: 'Siemens-certified engineers. A decade of execution on Aramco, STC, and Petro Rabigh projects.',
      eng_s1_title: 'Testing & Commissioning',
      eng_s2_title: 'Fire Alarm System Design',
      eng_s2_desc: 'NFPA & Saudi Fire Code compliant design from site survey to final handover and AutoCAD documentation.',
      eng_item1: 'Gas system accuracy verification',
      eng_item2: 'Logical-function programming',
      eng_item3: 'Device addressing & loop termination',
      eng_item4: 'Full Pre-FAT and FAT testing',
      eng_item5: 'BACnet integration & commissioning',
      eng_item6: 'Site surveys & hazard assessment',
      eng_item7: 'Conventional, addressable & wireless systems',
      eng_item8: 'Equipment placement & zoning strategy',
      eng_item9: 'Integration with suppression, BMS & safety systems',
      eng_item10: 'Full documentation & AutoCAD drawings',

      // Manpower
      mp_tag: 'Manpower Solutions',
      mp_h2: 'Any Role. Any Scale.',
      mp_desc: 'Skilled and unskilled workforce from South and Southeast Asia, deployed with full visa processing.',
      mp_col1: 'Unskilled & General',
      mp_col2: 'Semi-Skilled',
      mp_col3: 'Skilled & Professional',
      mp_item1: 'Factory & production workers',
      mp_item2: 'Cleaners & housekeeping',
      mp_item3: 'General helpers & labourers',
      mp_item4: 'Catering & kitchen helpers',
      mp_item5: 'Landscape & garden workers',
      mp_item6: 'Agricultural workers',
      mp_item7: 'Drivers (light, heavy, buses)',
      mp_item8: 'Security guards & HSE officers',
      mp_item9: 'Healthcare assistants & nurses',
      mp_item10: 'Warehouse & forklift operators',
      mp_item11: 'Painters, masons & tilers',
      mp_item12: 'Welders & scaffolders',
      mp_item13: 'Engineers & technicians',
      mp_item14: 'IT professionals',
      mp_item15: 'Medical staff & specialists',
      mp_item16: 'Project managers (PMP)',
      mp_item17: 'Admin & document controllers',
      mp_item18: 'Procurement specialists',

      // Manpower Quote
      mq_tag: 'Free Manpower Quote',
      mq_title: 'Request a Free Manpower Quote',
      mq_sub: 'Send your requirements and we will get back within 1–2 business days.',
      mq_name: 'Your Name',
      mq_email: 'Your Email',
      mq_employees: 'Number of workers',
      mq_workers: 'workers',
      mq_duration: 'Contract duration',
      mq_months: 'months',
      mq_workers_x: 'workers \u00d7',
      mq_years: 'years',
      mq_permanent: 'Permanent',
      mq_permanent_label: 'Permanent',
      mq_profession: 'Profession(s)',
      mq_prof_cleaner: 'Cleaner',
      mq_prof_general_labor: 'General Labor',
      mq_prof_security_hse: 'Security & HSE',
      mq_prof_technician_engineer: 'Technician / Engineer',
      mq_prof_it_professional: 'IT Professional',
      mq_prof_healthcare_staff: 'Healthcare Staff',
      mq_prof_driver: 'Driver',
      mq_prof_other: 'Other',
      mq_prof_other_placeholder: 'Specify profession',
      mq_options: 'Options',
      mq_food: 'Food included',
      mq_accommodation: 'Accommodation included',
      mq_transport: 'Transportation included',
      mq_nationality: 'Preferred nationality',
      mq_budget: 'Ideal budget per person per month',
      mq_budget_per: '/ person / month',
      mq_start_date: 'Desired start date',
      mq_submit: 'Request Quote',
      mq_notice_sending: 'Sending your request...',
      mq_notice_success: 'Quote request sent successfully! We will reply within 1–2 business days.',
      mq_notice_error: 'Failed to send. Please try again or email us directly.',
      mq_subject: 'Manpower Free Quote Request',
      mq_yes: 'Yes',
      mq_no: 'No',
      mq_not_specified: 'Not specified',
      mq_specify_profession: 'Specify profession',
      mq_specify_nationality: 'Specify nationality',
      mq_nat_bd: 'Bangladesh',
      mq_nat_in: 'India',
      mq_nat_ph: 'Philippines',
      mq_nat_pk: 'Pakistan',
      mq_nat_np: 'Nepal',
      mq_nat_lk: 'Sri Lanka',
      mq_nat_id: 'Indonesia',
      mq_nat_custom: 'Other',
      mq_nat_other_placeholder: 'Specify nationality',

      // Projects
      projects_pill: 'Our Projects',
      projects_title: 'Built by MSC Arabia',
      projects_sub: 'Showcasing our in-house technology solutions and digital products.',
      project_live: 'View Live',

      // About
      about_tag: 'About Us',
      about_h2: 'Saudi-Based. Globally Certified.',
      about_p1: 'MSC Arabia is a Riyadh-based company delivering IT managed services, MDM licensing, hardware & software procurement, fire safety engineering, and manpower solutions across Saudi Arabia.',
      about_p2: 'Our engineers hold permanent access IDs for Aramco, STC, and Petro Rabigh — combining international certifications with deep Saudi market expertise built over a decade of execution.',
      about_stat1: 'Years of Operation in KSA',
      about_stat2: 'Active Enterprise Clients',
      about_stat3: 'Successfully Placed Workers',
      about_stat4: 'Managed IT Support Coverage',

      // Contact
      contact_pill: 'Get In Touch',
      contact_title: "Let's Transform Your Business Together",
      contact_sub: 'Ready to accelerate your digital transformation? Contact our team of experts today.',
      contact_addr_title: 'Office Address',
      contact_hours_title: 'Business Hours',
      contact_hours: 'Sun \u2013 Thu: 8:00 AM \u2013 5:00 PM (AST)',
      contact_addr_line1: '6787 Abdulrahman Al Nasser, Al Khaleej Dist.',
      contact_addr_line2: 'Riyadh 13223, Saudi Arabia',
      contact_email_title: 'Email',
      form_name: 'Full Name',
      form_email: 'Email Address',
      form_service: 'Service Interest',
      form_message: 'Message',
      form_submit: 'Send Message',
      form_name_placeholder: 'Mohammed',
      form_email_placeholder: 'mohammed@example.com',
      option_select_service: 'Select a service',
      option_managed_it: 'Managed IT Services',
      option_mdm: 'MDM Licensing',
      option_fire_safety: 'Fire Safety Engineering',
      option_manpower: 'Manpower Solutions',
      option_hardware: 'Hardware & Software',
      option_cybersecurity: 'Cybersecurity',
      form_message_placeholder: 'Tell us about your requirements...',
      form_success_title: 'Message Sent!',
      form_success_desc: 'Thank you for reaching out. We will get back to you within 1–2 business days.',
      form_sending: 'Sending...',
      form_error: 'Failed to send. Please try again or email us directly.',

      // Footer
      footer_desc: 'Your trusted partner for comprehensive IT solutions and engineering services in Saudi Arabia.',
      footer_services: 'Services',
      footer_svc1: 'Managed IT Services',
      footer_svc2: 'Fire Safety Engineering',
      footer_svc3: 'Manpower Solutions',
      footer_svc4: 'Hardware, Software & Cloud',
      footer_company: 'Company',
      footer_contact: 'Contact',
      footer_about: 'About Us',
      footer_clients: 'Our Clients',
      footer_privacy: 'Privacy Policy',
      footer_cookies: 'Cookie Policy',
      footer_addr: 'Riyadh 13223, Saudi Arabia',
      footer_email: 'info@mscarabia.com',
      footer_copyright: '© 2026 ESTABLISHMENT MARSAH ALHALLOUL FOR INFORMATION TECHNOLOGY. All rights reserved.',
      footer_compliance: 'ESTABLISHMENT MARSAH ALHALLOUL FOR INFORMATION TECHNOLOGY',
      compliance_ids: 'Unified No.: <strong>704-925-4704</strong> · VAT: <strong>312 900 114 900 003</strong>',

      // Accessibility
      a11y_increase: 'Increase text',
      a11y_decrease: 'Decrease text',
      a11y_contrast: 'High contrast',

      // Modals
      modal_privacy_tag: 'Privacy Policy',
      modal_privacy_title: 'Privacy Policy',
      modal_privacy_updated: 'Last Updated: March 26, 2026',
      modal_privacy_effective: 'Effective Date: March 26, 2026',
      modal_privacy_intro: 'This Privacy Policy describes how ESTABLISHMENT MARSAH ALHALLOUL FOR INFORMATION TECHNOLOGY collects, uses, and protects your information when you use our website.',
      modal_privacy_collect_title: 'Information We Collect',
      modal_privacy_collect_list: '• Name and contact information<br>• Company and job title<br>• Service requirements<br>• Device and browser information<br>• IP address and location data',
      modal_privacy_use_title: 'How We Use Your Information',
      modal_privacy_use_list: '• To provide our services and respond to inquiries<br>• To improve our website and services<br>• To communicate with you about our services<br>• To comply with legal obligations',
      modal_privacy_protection_title: 'Data Protection',
      modal_privacy_protection_desc: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
      modal_privacy_rights_title: 'Your Rights',
      modal_privacy_rights_list: '• Access to your personal information<br>• Correction of inaccurate information<br>• Deletion of your personal information<br>• Opt-out of marketing communications',
      modal_privacy_contact_title: 'Contact Us',
      modal_privacy_contact_desc: 'If you have any questions about this Privacy Policy, please contact us at info@mscarabia.com.',
      modal_cookie_tag: 'Cookie Policy',
      modal_cookie_title: 'Cookie Policy',
      modal_cookie_effective: 'Effective date: March 26, 2026',
      modal_cookie_updated: 'Last updated: March 26, 2026',
      modal_cookie_what_title: 'What are cookies?',
      modal_cookie_what_desc: 'Cookies are small text files used to store small pieces of information on your device when you visit our website.',
      modal_cookie_how_title: 'How do we use cookies?',
      modal_cookie_how_desc: 'We use cookies to ensure our website functions properly, enhance security, provide a better user experience, and analyze performance.',
      modal_cookie_types_title: 'Types of cookies we use',
      modal_cookie_types_list: '• Essential Cookies: Required for the website to function properly<br>• Analytics Cookies: Help us understand how visitors interact with our website<br>• Marketing Cookies: Used to track visitors across websites<br>• Functional Cookies: Enable enhanced functionality and personalization',
      modal_cookie_manage_title: 'Manage cookie preferences',
      modal_cookie_manage_desc: 'You can modify your cookie settings anytime through your browser settings.',
      modal_cookie_manage_list: '• Chrome: https://support.google.com/accounts/answer/32050<br>• Safari, Firefox, Edge: Please refer to respective browser documentation',
    },
    ar: {
      // Navigation
      nav_services: 'الخدمات',
      nav_engineering: 'الهندسة',
      nav_manpower: 'القوى العاملة',
      nav_clients: 'العملاء',
      nav_about: 'من نحن',
      nav_cta: 'تواصل معنا',
      nav_projects: 'المشاريع',
      nav_contact: 'اتصل',

      // Hero
      hero_pill: 'شريك التقنية المحلي في المملكة العربية السعودية',
      hero_h1_1: 'شامل',
      hero_h1_3: 'الحلول',
      hero_sub: 'خدمات تكنولوجيا المعلومات المدارة، ترخيص إدارة الأجهزة المحمولة، procurement للأجهزة والبرامج، هندسة السلامة من الحرائق، وحلول القوى العاملة — موثوق من قبل الشركات الرائدة في المملكة العربية السعودية.',
      hero_btn1: 'استكشف الخدمات',
      hero_btn2: 'احصل على عرض سعر',
      hero_stat1: 'سنوات في المملكة',
      hero_stat2: 'عملاء مؤسسيون',
      hero_stat3: 'عاملين تم توظيفهم',
      hero_stat4: 'دعم مُدار',
      hero_card_tag: 'متوافق مع رؤية المملكة 2030',
      hero_card_title: 'هندسة دقيقة وتكنولوجيا المعلومات',
      hero_card_desc: 'معتمد لأرامكو، stc وبترو رابغ. PMP، PMI-ACP، أنظمة سيمنز للسلامة من الحرائق، تكامل BACnet.',
      hero_badge_tag: 'معرف دائم لأرامكو',
      hero_badge_val: 'وصول stc وبترو رابغ',

      // Clients
      clients_tag: 'موثوق من قبل المنظمات الرائدة في المملكة العربية السعودية',
      client_1: 'أمسا للضيافة',
      client_2: 'تي إس إس للإعلان',
      client_3: 'أكاديمية العرب للسلامة والأمن من الحرائق',
      client_4: 'شركة كودو',
      client_5: 'إيه إتش آي سي',
      client_6: 'ابتكار التكنوشيا',
      client_7: 'أكلانيات للتقنيات',
      client_8: 'مدرسة البيان النموذجية',
      client_9: 'فور ديمنشنز للإعلان',
      client_10: 'مدرسة ينبع الدولية – السعودية',
      client_11: 'هيلمان للوجستيات العالمية',

      // Services
      services_pill: 'خدماتنا الأساسية',
      services_title: 'حلول تكنولوجيا المعلومات والهندسة الشاملة',
      services_sub: 'خدمات شاملة مصممة لتسريع التحول الرقمي وضمان التشغيل المتميز.',
      svc_cta: 'اطلب الخدمة',
      svc_cta_quote: 'احصل على عرض سعر',
      svc1_title: 'خدمات تكنولوجيا المعلومات المدارة',
      svc1_desc: 'مراقبة استباقية على مدار الساعة طوال أيام الأسبوع، ودعم، وصيانة لبنيتك التحتية لتكنولوجيا المعلومات لضمان أقصى وقت تشغيل وأداء.',
      svc1_item1: 'إدارة الخوادم والشبكات',
      svc1_item2: 'البنية التحتية السحابية',
      svc1_item3: 'دعم مكتب المساعدة',
      svc2_title: 'ترخيص إدارة الأجهزة المحمولة',
      svc2_desc: 'إدارة شاملة للأجهزة المحمولة مع توفير التراخيص لضمان الامتثال والأمان.',
      svc2_item1: 'مدير أعمال أبل',
      svc2_item2: 'Microsoft Intune',
      svc2_item3: 'أمان المؤسسات',
      svc3_title: 'هندسة السلامة من الحرائق',
      svc3_desc: 'أنظمة إنذار وإطفاء الحرائق المعتمدة من سيمنز مع التركيب والصيانة.',
      svc3_item1: 'أنظمة سيمنز للحرائق',
      svc3_item2: 'تكامل BACnet',
      svc3_item3: 'الامتثال للسلامة',
      svc4_title: 'حلول القوى العاملة',
      svc4_desc: 'توفير القوى العاملة الماهرة وغير الماهرة من جنوب وجنوب شرق آسيا.',
      svc4_item1: 'توظيف تكنولوجيا المعلومات',
      svc4_item2: 'موارد الهندسة',
      svc4_item3: 'فرق المشاريع',
      svc5_title: 'الأجهزة والبرامج',
      svc5_desc: 'توريد ونشر الأجهزة بمستوى المؤسسات والحلول البرمجية المرخّصة.',
      svc5_item1: 'أجهزة المؤسسات',
      svc5_item2: 'ترخيص البرامج',
      svc5_item3: 'إدارة الأصول',
      svc6_title: 'الدعم والصيانة',
      svc6_desc: 'دعم تقني مدعوم باتفاقيات مستوى الخدمة مع أوقات استجابة مضمونة. جداول صيانة وقائية، وفحوصات صحية ربع سنوية، وإدارة حسابات مخصصة.',
      svc6_item1: 'اتفاقية مستوى الخدمة على مدار الساعة',
      svc6_item2: 'دورات الصيانة الوقائية',
      svc6_item3: 'مدير حساب مخصص',
      svc2_tag1: 'مدير أعمال أبل', svc2_tag2: 'Microsoft Intune', svc2_tag3: 'أمان الأجهزة',
      svc3_tag1: 'سيمنز', svc3_tag2: 'BACnet', svc3_tag3: 'NFPA', svc3_tag4: 'الدفاع المدني',
      svc4_tag1: 'معالجة التأشيرات', svc4_tag2: 'الإقامة', svc4_tag3: 'النشر', svc4_tag4: 'التأمينات',
      svc5_tag1: 'المشتريات', svc5_tag2: 'الترخيص', svc5_tag3: 'إدارة الأصول',
      svc6_tag1: 'اتفاقية خدمة ٢٤/٧', svc6_tag2: 'صيانة وقائية', svc6_tag3: 'مراجعات ربع سنوية',
      svc1_tag1: 'إدارة الخوادم', svc1_tag2: 'البنية التحتية السحابية', svc1_tag3: 'مكتب المساعدة', svc1_tag4: 'المراقبة',

      // Cookie consent
      cookie_text: 'نستخدم ملفات تعريف الارتباط لتحسين موقعنا. بالنقر على "قبول"، فإنك توافق على استخدامها. راجع <a href="#" onclick="openModal(\'cookie\');return false">سياسة ملفات تعريف الارتباط</a> للتفاصيل.',
      cookie_link: 'سياسة ملفات تعريف الارتباط',
      cookie_decline: 'رفض',
      cookie_accept: 'قبول',

      // Hero stats

      // Engineering
      eng_tag: 'خدمات الهندسة',
      eng_h2: 'اختبار ووضع منظومات السلامة من الحرائق',
      eng_desc: 'مهندسون معتمدون من سيمنز مع عقد من الخبرة في مشاريع أرامكو، stc وبترو رابغ.',
      eng_s1_title: 'الاختبار والوضع',
      eng_s2_title: 'تصميم منظومات إنذار الحريق',
      eng_s2_desc: 'تصميم متوافق مع NFPA وكود الحريق السعودي من مسح الموقع إلى التسليم النهائي وتوثيق AutoCAD.',
      eng_item1: 'التحقق من دقة نظام الغاز',
      eng_item2: 'برمجة الوظائف المنطقية',
      eng_item3: 'عنونة الأجهزة وإنهاء الحلقة',
      eng_item4: 'اختبار Pre-FAT و FAT الكامل',
      eng_item5: 'التكامل مع BACnet والوضع',
      eng_item6: 'مسح المواقع وتقييم المخاطر',
      eng_item7: 'أنظمة تقليدية وقابلة للعنونة ولاسلكية',
      eng_item8: 'استراتيجية وضع المعدات والتقسيم',
      eng_item9: 'التكامل مع نظام الإطفاء وأنظمة إدارة المباني والسلامة',
      eng_item10: 'التوثيق الكامل ورسومات AutoCAD',

      // Manpower
      mp_tag: 'حلول القوى العاملة',
      mp_h2: 'أي دور. أي مقياس.',
      mp_desc: 'قوى عاملة ماهرة وغير ماهرة من جنوب وجنوب شرق آسيا، يتم نشرها مع إجراءات التأشيرة والتوثيق الكاملة.',
      mp_col1: 'غير ماهر وعام',
      mp_col2: 'شبه ماهر',
      mp_col3: 'ماهر واحترافي',
      mp_item1: 'عمال المصانع والإنتاج',
      mp_item2: 'النظافة والخدمات الفندقية',
      mp_item3: 'المساعدون والعمالة العامة',
      mp_item4: 'عمال المطابخ والضيافة',
      mp_item5: 'عمال الحدائق والتنسيق',
      mp_item6: 'العمالة الزراعية',
      mp_item7: 'السائقون (خفيف، ثقيل، حافلات)',
      mp_item8: 'حراس أمن وضباط سلامة',
      mp_item9: 'مساعدو الرعاية الصحية والممرضون',
      mp_item10: 'عمال المستودعات وراكبو الرافعات',
      mp_item11: 'دهانون وبناؤون وبلاطون',
      mp_item12: 'لحامون وعمال سقالات',
      mp_item13: 'مهندسون وفنيون',
      mp_item14: 'متخصصو تكنولوجيا المعلومات',
      mp_item15: 'طاقم طبي ومتخصصون',
      mp_item16: 'مدراء مشاريع (PMP)',
      mp_item17: 'إداريون وضابطو وثائق',
      mp_item18: 'متخصصو المشتريات',

      // Manpower Quote
      mq_tag: 'عرض القوى العاملة مجاناً',
      mq_title: 'اطلب عرضاً مجانياً للقوى العاملة',
      mq_sub: 'شارك احتياجاتك وسنرد خلال 1–2 يوم عمل.',
      mq_name: 'الاسم',
      mq_email: 'البريد الإلكتروني',
      mq_employees: 'عدد العمال',
      mq_workers: 'عامل',
      mq_duration: 'مدة العقد',
      mq_months: 'أشهر',
      mq_workers_x: 'عامل ×',
      mq_years: 'سنوات',
      mq_permanent: 'دائم',
      mq_permanent_label: 'دائم',
      mq_profession: 'المهن المطلوبة',
      mq_prof_cleaner: 'عامل تنظيف',
      mq_prof_general_labor: 'عمال عامون',
      mq_prof_security_hse: 'حراس أمن وسلامة',
      mq_prof_technician_engineer: 'فني/مهندس',
      mq_prof_it_professional: 'مختص تقنية المعلومات',
      mq_prof_healthcare_staff: 'طاقم طبي',
      mq_prof_driver: 'سائق',
      mq_options: 'الخيارات',
      mq_food: 'الوجبات مشمولة',
      mq_accommodation: 'الإقامة مشمولة',
      mq_transport: 'المواصلات مشمولة',
      mq_nationality: 'الجنسية المفضلة',
      mq_budget: 'الميزانية المثالية لكل شخص شهرياً',
      mq_budget_per: 'ر.س / شخص / شهر',
      mq_start_date: 'متى تريد بدء تزويد العمالة؟',
      mq_submit: 'اطلب عرض السعر',
      mq_notice_sending: 'جارٍ الإرسال...',
      mq_notice_success: 'تم إرسال طلبك بنجاح! سنرد خلال 1–2 يوم عمل.',
      mq_notice_error: 'فشل الإرسال. يرجى المحاولة مرة أخرى أو التواصل عبر البريد مباشرة.',
      mq_subject: 'طلب عرض سعر للقوى العاملة',
      mq_yes: 'نعم',
      mq_no: 'لا',
      mq_not_specified: 'غير محدد',
      mq_specify_profession: 'حدد المهنة',
      mq_specify_nationality: 'حدد الجنسية',
      mq_nat_bd: 'بنغلادش',
      mq_nat_in: 'الهند',
      mq_nat_ph: 'الفلبين',
      mq_nat_pk: 'باكستان',
      mq_nat_np: 'نيبال',
      mq_nat_lk: 'سريلانكا',
      mq_nat_id: 'إندونيسيا',
      mq_nat_custom: 'أخرى',
      mq_nat_other_placeholder: 'حدد الجنسية',
      mq_prof_other: 'أخرى',
      mq_prof_other_placeholder: 'حدد المهنة',

      // Projects
      projects_pill: 'مشاريعنا',
      projects_title: 'بُنيت بواسطة MSC Arabia',
      projects_sub: 'عرض حلولنا التكنولوجية ومنتجاتنا الرقمية المبنية داخلياً.',
      project_live: 'عرض المشروع',

      // About
      about_tag: 'من نحن',
      about_h2: 'مقرها المملكة. شهادات عالمية.',
      about_p1: 'مؤسسة مرساة الحلول لتقنية المعلومات هي شركة مقرها الرياض تقدم خدمات تكنولوجيا المعلومات المدارة، ترخيص إدارة الأجهزة المحمولة، توريد الأجهزة والبرامج، هندسة السلامة من الحرائق، وحلول القوى العاملة في جميع أنحاء المملكة العربية السعودية.',
      about_p2: 'يحمل مهندسونا معرفات وصول دائمة لأرامكو، stc، وبترو رابغ — يجمعون بين الشهادات الدولية وخبرة السوق السعودي العميقة المبنية على عقد من التنفيذ.',
      about_stat1: 'سنوات التشغيل في المملكة',
      about_stat2: 'عملاء مؤسسيون نشطون',
      about_stat3: 'عاملين تم توظيفهم بنجاح',
      about_stat4: 'تغطية دعم تكنولوجيا المعلومات المُدار',

      // Contact
      contact_pill: 'تواصل معنا',
      contact_title: 'دعنا نحول أعمالك معًا',
      contact_sub: 'هل أنت مستعد لتسريع التحول الرقمي؟ تواصل مع فريق الخبراء لدينا اليوم.',
      contact_addr_title: 'عنوان المكتب',
      contact_addr_line1: '6787 عبدالرحمن الناصر، حي الخليج',
      contact_addr_line2: 'الرياض 13223، المملكة العربية السعودية',
      contact_hours_title: 'ساعات العمل',
      contact_hours: 'الأحد – الخميس: 8:00 ص – 5:00 م',
      contact_email_title: 'البريد الإلكتروني',
      form_name: 'الاسم الكامل',
      form_email: 'عنوان البريد الإلكتروني',
      form_service: 'اهتمام بالخدمة',
      form_message: 'الرسالة',
      form_submit: 'إرسال الرسالة',
      form_name_placeholder: 'محمد',
      form_email_placeholder: 'mohammed@example.com',
      option_select_service: 'اختر خدمة',
      option_managed_it: 'خدمات تكنولوجيا المعلومات المدارة',
      option_mdm: 'ترخيص إدارة الأجهزة المحمولة',
      option_fire_safety: 'هندسة السلامة من الحرائق',
      option_manpower: 'حلول القوى العاملة',
      option_hardware: 'الأجهزة والبرامج',
      option_cybersecurity: 'الأمن السيبراني',
      form_message_placeholder: 'أخبرنا عن متطلباتك...',
      form_success_title: 'تم إرسال الرسالة!',
      form_success_desc: 'شكراً لتواصلك معنا. سنرد عليك خلال 1–2 يوم عمل.',
      form_sending: 'جارٍ الإرسال...',
      form_error: 'فشل الإرسال. يرجى المحاولة مرة أخرى أو التواصل عبر البريد مباشرة.',

      // Footer
      footer_desc: 'شريكك الموثوق للحلول التكنولوجية الشاملة وخدمات الهندسة في المملكة العربية السعودية.',
      footer_services: 'الخدمات',
      footer_svc1: 'خدمات تقنية المعلومات المدارة',
      footer_svc2: 'هندسة السلامة من الحرائق',
      footer_svc3: 'حلول القوى العاملة',
      footer_svc4: 'الأجهزة والبرامج والسحابة',
      footer_company: 'الشركة',
      footer_contact: 'اتصل',
      footer_about: 'من نحن',
      footer_clients: 'عملاؤنا',
      footer_privacy: 'سياسة الخصوصية',
      footer_cookies: 'سياسة ملفات تعريف الارتباط',
      footer_addr: 'الرياض 13223، المملكة العربية السعودية',
      footer_email: 'info@mscarabia.com',
      footer_copyright: '© 2026 مؤسسة مرساة الحلول لتقنية المعلومات. جميع الحقوق محفوظة.',
      footer_compliance: 'مؤسسة مرساة الحلول لتقنية المعلومات',
      compliance_ids: 'الرقم الموحّد: <strong>704-925-4704</strong> · الرقم الضريبي: <strong>312 900 114 900 003</strong>',

      // Accessibility
      a11y_increase: 'تكبير النص',
      a11y_decrease: 'تصغير النص',
      a11y_contrast: 'تباين عالٍ',

      // Modals
      modal_privacy_tag: 'سياسة الخصوصية',
      modal_privacy_title: 'سياسة الخصوصية',
      modal_privacy_updated: 'آخر تحديث: 26 مارس 2026',
      modal_privacy_effective: 'تاريخ السريان: 26 مارس 2026',
      modal_privacy_intro: 'تصف سياسة الخصوصية هذه كيفية جمع مؤسسة مرساة الحلول لتقنية المعلومات واستخدامها وحماية معلوماتك عند استخدامك لموقعنا الإلكتروني.',
      modal_privacy_collect_title: 'المعلومات التي نجمعها',
      modal_privacy_collect_list: '• الاسم ومعلومات الاتصال<br>• الشركة والمنصب<br>• متطلبات الخدمة<br>• معلومات الجهاز والمتصفح<br>• عنوان IP وموقع البيانات',
      modal_privacy_use_title: 'كيف نستخدم معلوماتك',
      modal_privacy_use_list: '• لتقديم خدماتنا والرد على الاستفسارات<br>• لتحسين موقعنا الإلكتروني وخدماتنا<br>• للتواصل معك بشأن خدماتنا<br>• للامتثال للالتزامات القانونية',
      modal_privacy_protection_title: 'حماية البيانات',
      modal_privacy_protection_desc: 'نحن نطبق تدابير أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف أو التدمير.',
      modal_privacy_rights_title: 'حقوقك',
      modal_privacy_rights_list: '• الوصول إلى معلوماتك الشخصية<br>• تصحيح المعلومات غير الدقيقة<br>• حذف معلوماتك الشخصية<br>• إلغاء الاشتراك في الاتصالات التسويقية',
      modal_privacy_contact_title: 'اتصل بنا',
      modal_privacy_contact_desc: 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على info@mscarabia.com.',
      modal_cookie_tag: 'سياسة ملفات تعريف الارتباط',
      modal_cookie_title: 'سياسة ملفات تعريف الارتباط',
      modal_cookie_effective: 'تاريخ السريان: 26 مارس 2026',
      modal_cookie_updated: 'آخر تحديث: 26 مارس 2026',
      modal_cookie_what_title: 'ما هي ملفات تعريف الارتباط؟',
      modal_cookie_what_desc: 'ملفات تعريف الارتباط هي ملفات نصية صغيرة تستخدم لتخزين أجزاء صغيرة من المعلومات على جهازك عند زيارة موقعنا الإلكتروني.',
      modal_cookie_how_title: 'كيف نستخدم ملفات تعريف الارتباط؟',
      modal_cookie_how_desc: 'نحن نستخدم ملفات تعريف الارتباط لضمان عمل موقعنا الإلكتروني بشكل صحيح، وتعزيز الأمان، وتوفير تجربة مستخدم أفضل، وتحليل الأداء.',
      modal_cookie_types_title: 'أنواع ملفات تعريف الارتباط التي نستخدمها',
      modal_cookie_types_list: '• ملفات تعريف الارتباط الأساسية: مطلوبة لعمل الموقع الإلكتروني بشكل صحيح<br>• ملفات تعريف الارتباط التحليلية: تساعدنا على فهم كيفية تفاعل الزوار مع موقعنا الإلكتروني<br>• ملفات تعريف الارتباط التسويقية: تستخدم لتتبع الزوار عبر مواقع الويب<br>• ملفات تعريف الارتباط الوظيفية: تمكن الوظائف المحسنة والتخصيص',
      modal_cookie_manage_title: 'إدارة تفضيلات ملفات تعريف الارتباط',
      modal_cookie_manage_desc: 'يمكنك تعديل إعدادات ملفات تعريف الارتباط في أي وقت من خلال إعدادات المتصفح.',
      modal_cookie_manage_list: '• Chrome: https://support.google.com/accounts/answer/32050<br>• Safari، Firefox، Edge: يرجى الرجوع إلى وثائق المتصفح المعنية',
    },
  };

  // ============================================
  // State
  // ============================================
  let currentLang = 'en';

  // ============================================
  // i18n — Language Management
  // ============================================
  function readStoredLang() {
    try {
      const q = new URLSearchParams(window.location.search).get('lang');
      if (q === 'ar' || q === 'en') return q;
      const s = localStorage.getItem(LANG_KEY);
      if (s === 'ar' || s === 'en') return s;
    } catch (e) {}
    return 'en';
  }

  function persistLang() {
    try { localStorage.setItem(LANG_KEY, currentLang); } catch (e) {}
  }

  function toArabicNumbers(str) {
    if (currentLang !== 'ar') return str;
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return str.replace(/[0-9]/g, d => arabicDigits[parseInt(d)]);
  }

  function applyI18nElement(el) {
    var key = el.getAttribute('data-i18n');
    if (!key || !translations[currentLang][key]) return;
    var val = translations[currentLang][key];
    if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  }

  function applyDocumentLocale() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(applyI18nElement);
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (key && translations[currentLang][key]) {
        el.placeholder = translations[currentLang][key];
      }
    });
    document.querySelectorAll('option[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (key && translations[currentLang][key]) {
        el.textContent = translations[currentLang][key];
      }
    });
    applyStatNums();
    updateLangSwitchUI();
  }

  function updateLangSwitchUI() {
    var on = currentLang === 'ar';
    ['lang-switch', 'lang-switch-mobile'].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) b.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    var t = currentLang === 'en' ? '\u0627\u0644\u0639\u0631\u0628\u064a\u0629' : 'English';
    var el = document.getElementById('lang-label');
    var em = document.getElementById('lang-label-m');
    if (el) el.textContent = t;
    if (em) em.textContent = t;
  }

  function toggleLang() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    persistLang();
    applyDocumentLocale();
    if (typeof window._remeasureMarquee === 'function') window._remeasureMarquee();
  }

  // ============================================
  // Stat Counter Animation
  // ============================================
  function applyStatNums() {
    document.querySelectorAll('[data-num]').forEach(function (el) {
      var raw = el.getAttribute('data-num') || '';
      var suf = el.getAttribute('data-suf') || '';
      el.textContent = toArabicNumbers(raw) + suf;
    });
  }

  // Count-up animation for stat numbers
  function initCountUp() {
    var els = document.querySelectorAll('[data-num]');
    if (!els.length) return;
    var animated = new Set();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (animated.has(el)) return;
        animated.add(el);
        var raw = el.getAttribute('data-num') || '';
        var suf = el.getAttribute('data-suf') || '';
        var num = parseInt(raw, 10);
        if (isNaN(num)) return; // skip "24/7" etc
        var duration = 1600;
        var start = performance.now();
        function tick(now) {
          var p = Math.min((now - start) / duration, 1);
          var ease = 1 - Math.pow(1 - p, 4); // ease-out quart
          var val = Math.round(num * ease);
          el.textContent = toArabicNumbers(String(val)) + suf;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.3 });
    els.forEach(function (el) { observer.observe(el); });
  }

  // ============================================
  // Typewriter Effect
  // ============================================
  function typeWriter() {
    var el = document.getElementById('tw-word');
    if (!el) return;
    var wordMap = {
      en: ['IT', 'Engineering', 'Security', 'Cloud', 'MDM'],
      ar: ['تقنية', 'هندسة', 'أمان', 'سحابة', 'إدارة']
    };
    var words = wordMap[currentLang] || wordMap.en;
    var wordIdx = 0;
    var charIdx = 0;
    var deleting = false;
    var speed = 120;

    function tick() {
      words = wordMap[currentLang] || wordMap.en;
      var word = words[wordIdx];
      if (!deleting) {
        el.textContent = word.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === word.length) {
          deleting = true;
          speed = 2000; // pause at full word
        } else {
          speed = 80 + Math.random() * 60;
        }
      } else {
        el.textContent = word.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
          speed = 400;
        } else {
          speed = 40;
        }
      }
      setTimeout(tick, speed);
    }
    tick();
  }

  // ============================================
  // Clients Marquee
  // ============================================
  function initClientsMarquee() {
    var sets = document.querySelectorAll('[data-clients-set]');
    if (sets.length < 2) return;

    var keys = [];
    for (var i = 1; i <= 11; i++) keys.push('client_' + i);

    function renderSet(set) {
      set.innerHTML = '';
      keys.forEach(function (key) {
        var chip = document.createElement('div');
        chip.className = 'm-chip';
        var span = document.createElement('span');
        span.setAttribute('data-i18n', key);
        span.textContent = translations[currentLang][key] || key;
        chip.appendChild(span);
        set.appendChild(chip);
      });
    }

    sets.forEach(renderSet);

    window._remeasureMarquee = function () {
      sets.forEach(renderSet);
    };
  }

  // ============================================
  // Manpower Quote Calculator
  // ============================================
  function initManpowerQuote() {
    var mqForm = document.getElementById('mq-form');
    if (!mqForm) return;

    var employeesSlider = document.getElementById('mq_employees');
    var durationSlider = document.getElementById('mq_duration');
    var budgetSlider = document.getElementById('mq_budget');
    var permanentCheck = document.getElementById('mq_permanent');
    var employeesVal = document.getElementById('mq_employees_val');
    var durationVal = document.getElementById('mq_duration_val');
    var budgetVal = document.getElementById('mq_budget_val');
    var totalVal = document.getElementById('mq_total_val');
    var totalBreakdown = document.getElementById('mq_total_breakdown');

    function update() {
      var workers = parseInt(employeesSlider.value);
      if (employeesVal) employeesVal.textContent = toArabicNumbers(String(workers));

      if (permanentCheck && permanentCheck.checked) {
        if (durationSlider) durationSlider.disabled = true;
        if (durationVal) durationVal.textContent = translations[currentLang].mq_permanent_label || 'Permanent';
      } else {
        if (durationSlider) durationSlider.disabled = false;
        var months = parseInt(durationSlider.value);
        if (durationVal) {
          durationVal.textContent = toArabicNumbers(String(months)) + ' ' + (months === 1 ? translations[currentLang].mq_months : translations[currentLang].mq_months);
        }
      }

      var budget = parseInt(budgetSlider.value);
      if (budgetVal) budgetVal.innerHTML = 'SAR ' + toArabicNumbers(String(budget));

      if (totalVal) totalVal.innerHTML = 'SAR ' + toArabicNumbers(String(budget * workers));
      var wxLabel = (translations[currentLang] && translations[currentLang].mq_workers_x) || 'workers \u00d7';
      if (totalBreakdown) totalBreakdown.innerHTML = toArabicNumbers(String(workers)) + ' ' + wxLabel + ' SAR ' + toArabicNumbers(String(budget));
    }

    if (employeesSlider) employeesSlider.addEventListener('input', update);
    if (durationSlider) durationSlider.addEventListener('input', update);
    if (budgetSlider) budgetSlider.addEventListener('input', update);
    if (permanentCheck) permanentCheck.addEventListener('change', update);

    update();
    window._updateManpowerQuoteUI = update;

    // "Other" nationality toggle
    var natSelect = document.getElementById('mq_nationality');
    var natOtherWrap = document.getElementById('mq_nat_other_wrap');
    if (natSelect && natOtherWrap) {
      natSelect.addEventListener('change', function () {
        natOtherWrap.style.display = this.value === 'other' ? 'block' : 'none';
      });
    }

    // "Other" profession toggle
    var profOtherCheck = document.getElementById('mq_prof_other_check');
    var profOtherWrap = document.getElementById('mq_prof_other_wrap');
    if (profOtherCheck && profOtherWrap) {
      profOtherCheck.addEventListener('change', function () {
        profOtherWrap.style.display = this.checked ? 'block' : 'none';
      });
    }
  }

  // ============================================
  // Navigation
  // ============================================
  function initNav() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    // Scroll effect
    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Active link tracking
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');
    var sideDots = document.querySelectorAll('.sd');
    function updateActiveLink() {
      var scrollPos = window.scrollY + 100;
      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
          sideDots.forEach(function (dot) {
            dot.classList.toggle('active', dot.getAttribute('data-section') === id);
          });
        }
      });
    }
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          closeMobileMenu();
        }
      });
    });
  }

  // Mobile menu
  function toggleMobileMenu() {
    var btn = document.querySelector('.nav-mobile');
    var menu = document.getElementById('mobile-menu');
    var overlay = document.getElementById('mobile-overlay');
    if (!btn || !menu) return;
    var isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (overlay) overlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    var main = document.querySelector('main');
    var footer = document.querySelector('footer');
    if (main) main.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    if (footer) footer.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    if (isOpen) {
      var close = menu.querySelector('.nav-mobile-close');
      if (close) setTimeout(function(){ close.focus(); }, 50);
      menu.addEventListener('keydown', _trapMobileFocus);
    } else {
      menu.removeEventListener('keydown', _trapMobileFocus);
    }
  }

  function _trapMobileFocus(e) {
    if (e.key !== 'Tab') return;
    var menu = document.getElementById('mobile-menu');
    if (!menu) return;
    var focusable = menu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function closeMobileMenu() {
    var btn = document.querySelector('.nav-mobile');
    var menu = document.getElementById('mobile-menu');
    var overlay = document.getElementById('mobile-overlay');
    if (!btn || !menu) return;
    menu.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    var main = document.querySelector('main');
    var footer = document.querySelector('footer');
    if (main) main.setAttribute('aria-hidden', 'false');
    if (footer) footer.setAttribute('aria-hidden', 'false');
    menu.removeEventListener('keydown', _trapMobileFocus);
    btn.focus();
  }

  // Close mobile menu on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // ============================================
  // Back to Top
  // ============================================
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    function onScroll() {
      btn.classList.toggle('vis', window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // Scroll Reveal (IntersectionObserver)
  // ============================================
  function initReveal() {
    var elements = document.querySelectorAll('.r');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('v'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('v');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }

  // ============================================
  // Modals
  // ============================================
  var _modalTrigger = null;
  function openModal(type) {
    var modal = document.getElementById(type + '-modal');
    if (!modal) return;
    _modalTrigger = document.activeElement;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    var close = modal.querySelector('.modal-close');
    if (close) setTimeout(function(){ close.focus(); }, 50);
    modal.addEventListener('keydown', _trapFocus);
  }

  function closeModal(type) {
    var modal = document.getElementById(type + '-modal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    modal.removeEventListener('keydown', _trapFocus);
    if (_modalTrigger) { _modalTrigger.focus(); _modalTrigger = null; }
  }

  function _trapFocus(e) {
    if (e.key !== 'Tab') return;
    var modal = e.currentTarget.querySelector('.modal-box');
    if (!modal) return;
    var focusable = modal.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function initModals() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(function (m) {
          closeModal(m.id.replace('-modal', ''));
        });
      }
    });
    document.querySelectorAll('.modal-overlay').forEach(function (m) {
      m.addEventListener('click', function (e) {
        if (e.target === m) closeModal(m.id.replace('-modal', ''));
      });
    });
  }

  // ============================================
  // Contact Form
  // ============================================
  function handleContactSubmit(event) {
    event.preventDefault();
    var form = event.target;
    // Honeypot check
    if (form.querySelector('[name="website"]').value) return;

    var submitBtn = form.querySelector('.btn-submit');
    var notice = document.getElementById('contact-notice');
    var originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = translations[currentLang].form_sending || 'Sending...';
    if (notice) notice.textContent = '';

    var data = new FormData(form);
    data.append('type', 'contact');

    fetch(CONTACT_API, {
      method: 'POST',
      body: data,
    })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (result.success) {
          // Show success state
          var formEl = form.closest('.contact-card');
          if (formEl) {
            formEl.innerHTML =
              '<div class="form-success" role="alert">' +
              '<div class="form-success-icon">\u2705</div>' +
              '<h3 data-i18n="form_success_title">' + translations[currentLang].form_success_title + '</h3>' +
              '<p data-i18n="form_success_desc">' + translations[currentLang].form_success_desc + '</p>' +
              '</div>';
          }
          try { gtag('event', 'contact_form_submit', { event_category: 'engagement', event_label: data.get('service') || 'general' }); } catch (e) {}
        } else {
          throw new Error(result.error || 'Failed');
        }
      })
      .catch(function () {
        if (notice) notice.textContent = translations[currentLang].form_error || 'Failed to send.';
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        // Reset Turnstile widget
        try { if (window.turnstile) turnstile.reset(); } catch (e) {}
      });
  }

  // ============================================
  // Manpower Quote Form
  // ============================================
  function handleManpowerSubmit(event) {
    event.preventDefault();
    var form = event.target;
    var submitBtn = form.querySelector('.btn-submit');
    var notice = document.getElementById('mq_notice');
    var originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = translations[currentLang].mq_notice_sending || 'Sending...';
    if (notice) notice.textContent = '';

    var data = new FormData(form);
    data.append('type', 'manpower');

    fetch(CONTACT_API, {
      method: 'POST',
      body: data,
    })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (result.success) {
          if (notice) {
            notice.style.color = '#4ade80';
            notice.textContent = translations[currentLang].mq_notice_success;
          }
          form.reset();
        setTimeout(function(){ if(window._updateManpowerQuoteUI) window._updateManpowerQuoteUI(); }, 50);
          try { gtag('event', 'manpower_quote_submit', { event_category: 'engagement', value: data.get('mq_budget') || 0 }); } catch (e) {}
        } else {
          throw new Error(result.error || 'Failed');
        }
      })
      .catch(function () {
        if (notice) {
          notice.style.color = '#ef4444';
          notice.textContent = translations[currentLang].mq_notice_error;
        }
        // Reset Turnstile widget
        try { if (window.turnstile) turnstile.reset(); } catch (e) {}
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
  }

  // ============================================
  // Accessibility
  // ============================================
  function adjustTextSize(delta) {
    var current = parseFloat(getComputedStyle(document.documentElement).fontSize);
    var next = Math.min(24, Math.max(12, current + delta));
    document.documentElement.style.fontSize = next + 'px';
    try { localStorage.setItem('msca_fontsize', next); } catch (e) {}
  }

  function toggleContrast() {
    var isActive = document.documentElement.classList.toggle('contrast');
    try { localStorage.setItem('msca_contrast', isActive ? '1' : '0'); } catch (e) {}
  }

  function underlines() {
    var isActive = document.documentElement.classList.toggle('underline-links');
    try { localStorage.setItem('msca_underlines', isActive ? '1' : '0'); } catch (e) {}
  }

  function letterSpacing(delta) {
    var current = parseFloat(document.documentElement.style.letterSpacing) || 0;
    var next = Math.min(3, Math.max(0, current + delta));
    document.documentElement.style.letterSpacing = next > 0 ? next + 'px' : '';
    try { localStorage.setItem('msca_letterspacing', next); } catch (e) {}
  }

  function toggleA11y() {
    var options = document.getElementById('a11y-options');
    var toggle = document.getElementById('a11y-toggle');
    if (!options || !toggle) return;
    var isOpen = options.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (!isOpen) toggle.focus();
  }

  function closeA11y() {
    var options = document.getElementById('a11y-options');
    var toggle = document.getElementById('a11y-toggle');
    if (!options || !toggle) return;
    options.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }

  // ============================================
  // Expose globals for inline onclick handlers
  // ============================================
  window.toggleLang = toggleLang;
  window.toggleMobileMenu = toggleMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.handleContactSubmit = handleContactSubmit;
  window.handleManpowerSubmit = handleManpowerSubmit;
  window.adjustTextSize = adjustTextSize;
  window.toggleContrast = toggleContrast;
  window.toggleA11y = toggleA11y;
  window.closeA11y = closeA11y;
  window.underlines = underlines;
  window.letterSpacing = letterSpacing;
  window.loadGA = loadGA;
  window.denyGA = denyGA;

  // ============================================
  // Hero Particles (removed — container doesn't exist)
  // ============================================

  // ============================================
  // Initialize
  // ============================================
  document.addEventListener('DOMContentLoaded', function () {
    currentLang = readStoredLang();
    applyDocumentLocale();
    initNav();
    initClientsMarquee();
    initManpowerQuote();
    initBackToTop();
    initReveal();
    initModals();
    initCountUp();
    typeWriter();
    applyStatNums();

    // Restore a11y settings
    try {
      var fs = localStorage.getItem('msca_fontsize');
      if (fs) document.documentElement.style.fontSize = fs + 'px';
      if (localStorage.getItem('msca_contrast') === '1') document.documentElement.classList.add('contrast');
      if (localStorage.getItem('msca_underlines') === '1') document.documentElement.classList.add('underline-links');
      var ls = localStorage.getItem('msca_letterspacing');
      if (ls && parseFloat(ls) > 0) document.documentElement.style.letterSpacing = ls + 'px';
      // Show cookie banner if no consent stored
      if (!localStorage.getItem('cookie_consent')) {
        var banner = document.getElementById('cookie-banner');
        if (banner) banner.classList.add('show');
      }
    } catch (e) {}
  });
})();
