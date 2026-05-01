import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "hi" | "gu";

const dict = {
  // App
  appName: { en: "Jan Kaam", hi: "जन काम", gu: "જન કામ" },
  appTagline: { en: "Citizen · Action · Service", hi: "नागरिक · कार्य · सेवा", gu: "નાગરિક · કાર્ય · સેવા" },
  pilotBanner: {
    en: "Pilot mode — phone OTP and Aadhaar verification are simulated for demo purposes.",
    hi: "पायलट मोड — डेमो के लिए फ़ोन OTP और आधार सत्यापन सिमुलेटेड हैं।",
    gu: "પાઇલટ મોડ — ડેમો માટે ફોન OTP અને આધાર ચકાસણી સિમ્યુલેટેડ છે.",
  },

  // Tabs
  tabHome: { en: "Home", hi: "होम", gu: "હોમ" },
  tabTickets: { en: "My Tickets", hi: "मेरी शिकायतें", gu: "મારી ફરિયાદો" },
  tabSchedules: { en: "Schedules", hi: "समय सारणी", gu: "સમય સારણી" },
  tabNotifications: { en: "Updates", hi: "सूचनाएँ", gu: "સૂચનાઓ" },

  // Onboarding
  onbLangTitle: { en: "Choose your language", hi: "अपनी भाषा चुनें", gu: "તમારી ભાષા પસંદ કરો" },
  onbLangSub: { en: "You can change this later in settings.", hi: "इसे बाद में बदला जा सकता है।", gu: "આ પછીથી બદલી શકાય છે." },
  onbContinue: { en: "Continue", hi: "जारी रखें", gu: "આગળ વધો" },

  // Landing / hero
  landingEyebrow: { en: "Pilot · Surat District · Gujarat", hi: "पायलट · सूरत जिला · गुजरात", gu: "પાઇલટ · સુરત જિલ્લો · ગુજરાત" },
  landingHeadline: {
    en: "Your Village. Your Voice. Your Rights.",
    hi: "आपका गाँव। आपकी आवाज़। आपके अधिकार।",
    gu: "તમારું ગામ. તમારો અવાજ. તમારા અધિકાર.",
  },
  landingSub: {
    en: "Jan Kaam connects every citizen of Surat's villages directly to their Gram Panchayat — report issues, track resolutions, and hold local services accountable. In Gujarati, Hindi or English.",
    hi: "जन काम सूरत के हर गाँव के नागरिक को सीधे उसकी ग्राम पंचायत से जोड़ता है — समस्या दर्ज करें, समाधान ट्रैक करें, और स्थानीय सेवाओं को जवाबदेह बनाएँ। गुजराती, हिंदी या अंग्रेज़ी में।",
    gu: "જન કામ સુરતના દરેક ગામના નાગરિકને સીધો તેમની ગ્રામ પંચાયત સાથે જોડે છે — સમસ્યા નોંધાવો, ઉકેલ ટ્રૅક કરો, અને સ્થાનિક સેવાઓને જવાબદાર બનાવો. ગુજરાતી, હિંદી કે અંગ્રેજીમાં.",
  },
  landingCtaPrimary: { en: "Join Your Community", hi: "अपने समुदाय से जुड़ें", gu: "તમારા સમુદાયમાં જોડાઓ" },
  landingCtaSecondary: { en: "How it works", hi: "यह कैसे काम करता है", gu: "આ કેવી રીતે કામ કરે છે" },
  landingProofLine: { en: "Trusted by villages across 9 talukas · 60+ lakh residents", hi: "9 तालुकाओं के गाँवों द्वारा भरोसा · 60+ लाख निवासी", gu: "૯ તાલુકાઓના ગામો દ્વારા વિશ્વાસ · ૬૦+ લાખ રહેવાસી" },
  landingStatVillages: { en: "Villages", hi: "गाँव", gu: "ગામ" },
  landingStatCategories: { en: "Issue types", hi: "श्रेणियाँ", gu: "શ્રેણીઓ" },
  landingStatLanguages: { en: "Languages", hi: "भाषाएँ", gu: "ભાષાઓ" },
  landingStatSla: { en: "SLA tracked", hi: "SLA ट्रैक", gu: "SLA ટ્રૅક" },

  // What is Jan Kaam
  landingWhatTitle: { en: "What is Jan Kaam?", hi: "जन काम क्या है?", gu: "જન કામ શું છે?" },
  landingWhatBody: {
    en: "Jan Kaam is a free civic platform built for the people of Surat's villages. Whether it's a broken road, a water supply problem or a safety emergency — your report goes directly to the right authority, tracked in real time until it is resolved.",
    hi: "जन काम सूरत के गाँवों के लोगों के लिए बना एक मुफ़्त नागरिक मंच है। टूटी सड़क हो, पानी की समस्या हो या सुरक्षा की आपात स्थिति — आपकी शिकायत सीधे सही अधिकारी तक जाती है और हल होने तक रियल-टाइम में ट्रैक की जाती है।",
    gu: "જન કામ સુરતના ગામોના લોકો માટે બનાવેલ મફત નાગરિક પ્લેટફોર્મ છે. તૂટેલો રસ્તો હોય, પાણીની તકલીફ હોય કે સલામતીની કટોકટી — તમારી ફરિયાદ સીધી સાચા અધિકારીને જાય છે અને ઉકેલ સુધી રિયલ-ટાઇમમાં ટ્રૅક થાય છે.",
  },

  // Why join — 4 benefits
  landingFeaturesTitle: { en: "Why Join?", hi: "क्यों जुड़ें?", gu: "કેમ જોડાવું?" },
  landingFeat1Title: { en: "Speak up in your language", hi: "अपनी भाषा में बोलें", gu: "તમારી ભાષામાં બોલો" },
  landingFeat1Body: { en: "Gujarati, Hindi or English — switch anytime, no English required.", hi: "गुजराती, हिंदी या अंग्रेज़ी — कभी भी बदलें, अंग्रेज़ी ज़रूरी नहीं।", gu: "ગુજરાતી, હિંદી કે અંગ્રેજી — ગમે ત્યારે બદલો, અંગ્રેજી જરૂરી નથી." },
  landingFeat2Title: { en: "Report anything", hi: "कुछ भी रिपोर्ट करें", gu: "કંઈપણ રિપોર્ટ કરો" },
  landingFeat2Body: { en: "Roads, water, electricity, health, safety and 11 more — 15 categories in all.", hi: "सड़क, पानी, बिजली, स्वास्थ्य, सुरक्षा और 11 और — कुल 15 श्रेणियाँ।", gu: "રસ્તા, પાણી, વીજળી, આરોગ્ય, સલામતી અને બીજી ૧૧ — કુલ ૧૫ શ્રેણીઓ." },
  landingFeat3Title: { en: "Track every step", hi: "हर कदम ट्रैक करें", gu: "દરેક પગલું ટ્રૅક કરો" },
  landingFeat3Body: { en: "Submitted → Acknowledged → In progress → Resolved. You always know where your issue stands.", hi: "दर्ज → स्वीकार → चल रहा → हल। आपको हमेशा पता रहता है आपकी शिकायत कहाँ है।", gu: "નોંધાવી → સ્વીકારી → ચાલુ → ઉકેલાઈ. તમને હંમેશા ખબર પડે કે તમારી ફરિયાદ ક્યાં છે." },
  landingFeat4Title: { en: "Get results faster", hi: "जल्दी नतीजे", gu: "ઝડપી પરિણામ" },
  landingFeat4Body: { en: "AI-powered routing — no more wrong departments, no more chakkar of offices.", hi: "AI-संचालित रूटिंग — गलत विभाग नहीं, दफ़्तरों के चक्कर नहीं।", gu: "AI-સંચાલિત રૂટિંગ — ખોટા વિભાગ નહીં, ઑફિસોના ચક્કર નહીં." },

  // Trust block
  landingTrustTitle: { en: "Safe, Verified & Trusted", hi: "सुरक्षित, सत्यापित और भरोसेमंद", gu: "સુરક્ષિત, ચકાસાયેલ અને વિશ્વસનીય" },
  landingTrustBody: {
    en: "Every member is verified through Aadhaar and phone OTP — so every voice is real, and every report is taken seriously.",
    hi: "हर सदस्य आधार और फ़ोन OTP से सत्यापित होता है — ताकि हर आवाज़ असली हो, और हर शिकायत गंभीरता से ली जाए।",
    gu: "દરેક સભ્ય આધાર અને ફોન OTP થી ચકાસાય છે — જેથી દરેક અવાજ સાચો હોય, અને દરેક ફરિયાદ ગંભીરતાથી લેવાય.",
  },
  landingTrustChip1: { en: "Aadhaar verified", hi: "आधार सत्यापित", gu: "આધાર ચકાસાયેલ" },
  landingTrustChip2: { en: "Phone OTP", hi: "फ़ोन OTP", gu: "ફોન OTP" },
  landingTrustChip3: { en: "DPDP Act 2023", hi: "DPDP अधिनियम 2023", gu: "DPDP કાયદો 2023" },
  landingTrustChip4: { en: "Data stays in India", hi: "डेटा भारत में रहता है", gu: "ડેટા ભારતમાં રહે છે" },

  // Final CTA banner
  landingFinalTitle: {
    en: "Be part of a smarter, cleaner, safer village.",
    hi: "एक स्मार्ट, स्वच्छ और सुरक्षित गाँव का हिस्सा बनें।",
    gu: "એક સ્માર્ટ, સ્વચ્છ અને સુરક્ષિત ગામનો ભાગ બનો.",
  },
  landingFinalSub: {
    en: "Download Jan Kaam — free on iOS & Android. Available on the web today.",
    hi: "जन काम डाउनलोड करें — iOS और Android पर मुफ़्त। आज वेब पर भी उपलब्ध।",
    gu: "જન કામ ડાઉનલોડ કરો — iOS અને Android પર મફત. આજે વેબ પર પણ ઉપલબ્ધ.",
  },
  landingComingSoon: { en: "Coming soon", hi: "जल्द आ रहा है", gu: "ટૂંક સમયમાં" },
  landingOpenWeb: { en: "Open web app", hi: "वेब ऐप खोलें", gu: "વેબ ઍપ ખોલો" },

  landingHowTitle: { en: "Three steps. That's it.", hi: "तीन कदम। बस इतना।", gu: "ત્રણ પગલાં. એટલું જ." },
  landingFooterTagline: {
    en: "A BJP Surat District citizen-services initiative. Built in India 🇮🇳\nImplemented by Mehul Patel (President : BJYM Surat Mahanagar Ward 29)",
    hi: "BJP सूरत जिला नागरिक-सेवा पहल। भारत में निर्मित 🇮🇳\nकार्यान्वयन: मेहुल पटेल (अध्यक्ष : BJYM सूरत महानगर वार्ड 29)",
    gu: "BJP સુરત જિલ્લા નાગરિક-સેવા પહેલ. ભારતમાં બનાવેલ 🇮🇳\nઅમલીકરણ: મેહુલ પટેલ (પ્રમુખ : BJYM સુરત મહાનગર વોર્ડ 29)",
  },
  landingSignedIn: { en: "Open my dashboard", hi: "मेरा डैशबोर्ड खोलें", gu: "મારું ડૅશબોર્ડ ખોલો" },


  onbPhoneTitle: { en: "Enter your mobile number", hi: "अपना मोबाइल नंबर डालें", gu: "તમારો મોબાઈલ નંબર દાખલ કરો" },
  onbPhoneSub: { en: "We'll use this to sign you in securely.", hi: "हम इसका उपयोग आपको सुरक्षित रूप से साइन इन करने के लिए करेंगे।", gu: "અમે તમને સુરક્ષિત રીતે સાઇન ઇન કરવા આનો ઉપયોગ કરીશું." },
  onbSendOtp: { en: "Continue", hi: "जारी रखें", gu: "આગળ વધો" },
  onbPasswordTitle: { en: "Set your password", hi: "अपना पासवर्ड बनाएँ", gu: "તમારો પાસવર્ડ બનાવો" },
  onbPasswordSub: { en: "Use 8+ characters. You'll use this to sign in next time.", hi: "8+ अक्षर का प्रयोग करें। अगली बार साइन इन के लिए यही चलेगा।", gu: "૮+ અક્ષરો વાપરો. આગલી વખતે સાઇન ઇન માટે આ જ વપરાશે." },
  onbPasswordPlaceholder: { en: "Password (min 8 chars)", hi: "पासवर्ड (कम से कम 8 अक्षर)", gu: "પાસવર્ડ (ઓછામાં ઓછા ૮ અક્ષર)" },
  onbSignIn: { en: "Sign in", hi: "साइन इन", gu: "સાઇન ઇન" },
  onbCreateAccount: { en: "Create account", hi: "खाता बनाएँ", gu: "ખાતું બનાવો" },
  errPassword: { en: "Password must be at least 8 characters.", hi: "पासवर्ड कम से कम 8 अक्षर का होना चाहिए।", gu: "પાસવર્ડ ઓછામાં ઓછા ૮ અક્ષરનો હોવો જોઈએ." },
  errAuth: { en: "Could not sign you in. Please try again.", hi: "साइन इन नहीं हो सका। कृपया पुनः प्रयास करें।", gu: "સાઇન ઇન થઈ શક્યું નહીં. કૃપા કરી ફરી પ્રયાસ કરો." },

  onbOtpTitle: { en: "Enter the 6-digit code", hi: "6-अंकीय कोड डालें", gu: "૬ અંકનો કોડ દાખલ કરો" },
  onbOtpSub: {
    en: "Demo mode: any 6-digit code will work.",
    hi: "डेमो: कोई भी 6-अंकीय कोड चलेगा।",
    gu: "ડેમો: કોઈપણ ૬ અંકનો કોડ ચાલશે.",
  },
  onbVerifyOtp: { en: "Verify", hi: "सत्यापन करें", gu: "ચકાસો" },
  onbResend: { en: "Resend code", hi: "कोड फिर भेजें", gu: "કોડ ફરી મોકલો" },

  onbAadhaarTitle: { en: "Verify with Aadhaar", hi: "आधार से सत्यापन", gu: "આધારથી ચકાસણી" },
  onbAadhaarSub: {
    en: "Unlocks all categories and 30 reports per month. Your full Aadhaar number is never stored.",
    hi: "सभी श्रेणियाँ और प्रति माह 30 रिपोर्ट अनलॉक होती हैं। पूरा आधार नंबर कभी संग्रहित नहीं किया जाता।",
    gu: "બધી શ્રેણીઓ અને દર મહિને ૩૦ ફરિયાદો ખૂલે છે. પૂરો આધાર નંબર ક્યારેય સંગ્રહિત થતો નથી.",
  },
  onbAadhaarNumber: { en: "Aadhaar number (12 digits)", hi: "आधार संख्या (12 अंक)", gu: "આધાર નંબર (૧૨ અંક)" },
  onbAadhaarDob: { en: "Date of birth", hi: "जन्म तिथि", gu: "જન્મ તારીખ" },
  onbName: { en: "Full name (as on Aadhaar)", hi: "पूरा नाम (आधार पर)", gu: "પૂરું નામ (આધાર પ્રમાણે)" },
  onbVillage: { en: "Village / area", hi: "गाँव / क्षेत्र", gu: "ગામ / વિસ્તાર" },
  onbVerifyAadhaar: { en: "Verify Aadhaar", hi: "आधार सत्यापित करें", gu: "આધાર ચકાસો" },
  onbSkipAadhaar: { en: "Skip for now (Bronze tier)", hi: "अभी छोड़ें (कांस्य स्तर)", gu: "હમણાં છોડો (બ્રોન્ઝ સ્તર)" },

  onbPassportTitle: { en: "Optional — passport for Gold tier", hi: "वैकल्पिक — गोल्ड के लिए पासपोर्ट", gu: "વૈકલ્પિક — ગોલ્ડ માટે પાસપોર્ટ" },
  onbPassportSub: {
    en: "Required to file official complaints, RTI requests, and corruption reports.",
    hi: "अधिकारिक शिकायत, RTI और भ्रष्टाचार रिपोर्ट के लिए आवश्यक।",
    gu: "અધિકૃત ફરિયાદ, RTI અને ભ્રષ્ટાચાર રિપોર્ટ માટે જરૂરી.",
  },
  onbPassportNumber: { en: "Passport number", hi: "पासपोर्ट संख्या", gu: "પાસપોર્ટ નંબર" },
  onbVerifyPassport: { en: "Verify passport", hi: "पासपोर्ट सत्यापित करें", gu: "પાસપોર્ટ ચકાસો" },
  onbSkipPassport: { en: "Skip — finish setup", hi: "छोड़ें — सेटअप पूरा करें", gu: "છોડો — સેટઅપ પૂરો કરો" },

  // Tiers
  tierBronze: { en: "Bronze", hi: "कांस्य", gu: "બ્રોન્ઝ" },
  tierSilver: { en: "Silver", hi: "रजत", gu: "સિલ્વર" },
  tierGold:   { en: "Gold",   hi: "स्वर्ण", gu: "ગોલ્ડ" },

  // Home
  greetingMorning: { en: "Good morning", hi: "सुप्रभात", gu: "સુપ્રભાત" },
  greetingAfternoon: { en: "Good afternoon", hi: "नमस्ते", gu: "નમસ્તે" },
  greetingEvening: { en: "Good evening", hi: "शुभ संध्या", gu: "શુભ સંધ્યા" },
  statOpen: { en: "Open", hi: "खुले", gu: "ખુલ્લા" },
  statInProgress: { en: "In progress", hi: "चल रहा", gu: "ચાલુ" },
  statResolved: { en: "Resolved", hi: "हल हो गया", gu: "ઉકેલાયું" },
  recentTickets: { en: "Recent tickets", hi: "हाल की शिकायतें", gu: "તાજેતરની ફરિયાદો" },
  noTickets: { en: "No tickets yet. Tap the button below to report an issue.", hi: "अभी कोई शिकायत नहीं। नीचे बटन दबाकर शिकायत दर्ज करें।", gu: "હજી કોઈ ફરિયાદ નથી. નીચેનું બટન દબાવીને ફરિયાદ કરો." },
  reportFab: { en: "Report an issue", hi: "शिकायत दर्ज करें", gu: "ફરિયાદ નોંધાવો" },
  emergency: { en: "Emergency 112", hi: "आपातकाल 112", gu: "કટોકટી 112" },
  homePickProblem: { en: "What is the problem?", hi: "Aapko kya problem hai?", gu: "શું તકલીફ છે?" },
  homePickSub: { en: "Tap one of the big buttons below.", hi: "Neeche apni samasya chuniye.", gu: "નીચેના મોટા બટનમાંથી એક દબાવો." },
  heroCardTitle: { en: "Surat speaks. We act.", hi: "Surat bolega. Hum sunenge.", gu: "સુરત બોલે છે. અમે સાંભળીએ છીએ." },
  heroCardSub: { en: "From the diamond bourse to the last village lane — every voice counts.", hi: "Heere ke karkhane se gaon ki gali tak — har awaaz mayne rakhti hai.", gu: "હીરા બજારથી છેલ્લા ગામ સુધી — દરેક અવાજ મહત્વનો છે." },
  homeShowAll: { en: "Show all 15 categories", hi: "सभी 15 श्रेणियाँ दिखाएँ", gu: "બધી ૧૫ શ્રેણીઓ બતાવો" },
  homeShowLess: { en: "Show fewer", hi: "कम दिखाएँ", gu: "ઓછું બતાવો" },
  callHelpline: { en: "Helpline", hi: "हेल्पलाइन", gu: "હેલ્પલાઇન" },
  navHelp: { en: "Help", hi: "मदद", gu: "મદદ" },
  navAbout: { en: "About", hi: "परिचय", gu: "પરિચય" },

  // Help page
  helpTitle: { en: "How Jan Kaam works", hi: "जन काम कैसे काम करता है", gu: "જન કામ કેવી રીતે કામ કરે છે" },
  helpSub: { en: "Three steps to make your voice heard.", hi: "अपनी बात पहुँचाने के तीन कदम।", gu: "તમારી વાત પહોંચાડવાના ત્રણ પગલાં." },
  helpStep1Title: { en: "1. Pick the problem", hi: "1. समस्या चुनें", gu: "૧. તકલીફ પસંદ કરો" },
  helpStep1Body: { en: "Choose from 15 everyday categories — water, electricity, roads, garbage, safety and more. Each is colour-coded and shown in your language.", hi: "रोज़मर्रा की 15 श्रेणियों में से चुनें — पानी, बिजली, सड़क, कचरा, सुरक्षा आदि।", gu: "રોજિંદી ૧૫ શ્રેણીઓમાંથી પસંદ કરો — પાણી, વીજળી, રસ્તા, કચરો, સલામતી." },
  helpStep2Title: { en: "2. Add details & photo", hi: "2. विवरण और फ़ोटो जोड़ें", gu: "૨. વિગત અને ફોટો ઉમેરો" },
  helpStep2Body: { en: "Type a short description in your language, attach up to 3 photos, and tap to use your current location. AI auto-detects priority (P1–P4) and the right department.", hi: "अपनी भाषा में संक्षिप्त विवरण लिखें, 3 फ़ोटो जोड़ें, और स्थान दर्ज करें। AI स्वतः प्राथमिकता तय करता है।", gu: "તમારી ભાષામાં ટૂંકો વર્ણન લખો, ૩ ફોટો ઉમેરો, અને સ્થાન દાખલ કરો. AI આપોઆપ પ્રાથમિકતા નક્કી કરે છે." },
  helpStep3Title: { en: "3. Track until resolved", hi: "3. हल होने तक ट्रैक करें", gu: "૩. ઉકેલ સુધી ટ્રૅક કરો" },
  helpStep3Body: { en: "You get a ticket ID. Watch live status — Submitted → Acknowledged → In progress → Resolved — with SLA timers and the assigned officer's contact.", hi: "आपको टिकट ID मिलती है। SLA टाइमर के साथ स्थिति देखें।", gu: "તમને ટિકિટ ID મળે છે. SLA ટાઇમર સાથે સ્થિતિ જુઓ." },
  helpFaqTitle: { en: "Common questions", hi: "सामान्य प्रश्न", gu: "સામાન્ય પ્રશ્નો" },
  helpQ1: { en: "Is this a government app?", hi: "क्या यह सरकारी ऐप है?", gu: "શું આ સરકારી ઍપ છે?" },
  helpA1: { en: "Jan Kaam is a citizen platform that routes your complaints to the correct department (SMC, DGVCL, Police, Panchayat etc.). It is currently in pilot mode.", hi: "जन काम एक नागरिक मंच है जो आपकी शिकायत सही विभाग तक पहुँचाता है। यह वर्तमान में पायलट मोड में है।", gu: "જન કામ એક નાગરિક પ્લેટફોર્મ છે જે તમારી ફરિયાદ યોગ્ય વિભાગ સુધી પહોંચાડે છે. હાલ પાઇલટ મોડમાં છે." },
  helpQ2: { en: "Will my Aadhaar be safe?", hi: "क्या मेरा आधार सुरक्षित रहेगा?", gu: "શું મારું આધાર સુરક્ષિત રહેશે?" },
  helpA2: { en: "We never store your full Aadhaar number. Only a one-way hash is kept for de-duplication, as per UIDAI guidelines.", hi: "हम पूरा आधार नंबर कभी संग्रहित नहीं करते। UIDAI दिशानिर्देशों के अनुसार केवल एकतरफा हैश रखा जाता है।", gu: "અમે પૂરો આધાર નંબર ક્યારેય સંગ્રહતા નથી. UIDAI માર્ગદર્શિકા મુજબ ફક્ત હેશ રાખીએ છીએ." },
  helpQ3: { en: "What if my complaint is ignored?", hi: "अगर शिकायत पर ध्यान नहीं दिया गया?", gu: "જો ફરિયાદ પર ધ્યાન ન અપાય તો?" },
  helpA3: { en: "Each ticket has an SLA timer. If a department misses it, the ticket is auto-escalated to the next senior officer and shown in red on your dashboard.", hi: "हर टिकट का SLA समय होता है। समय बीतने पर टिकट अपने आप वरिष्ठ अधिकारी को भेजी जाती है।", gu: "દરેક ટિકિટનો SLA સમય હોય છે. સમય વીત્યે ટિકિટ આપોઆપ વરિષ્ઠ અધિકારીને જાય છે." },
  helpQ4: { en: "How many complaints can I file?", hi: "मैं कितनी शिकायतें कर सकता हूँ?", gu: "હું કેટલી ફરિયાદો કરી શકું?" },
  helpA4: { en: "Bronze tier: 3 per day. Silver (Aadhaar): 30 per month. Gold (Aadhaar + Passport): unlimited, plus RTI access.", hi: "कांस्य: 3/दिन। रजत (आधार): 30/माह। स्वर्ण (आधार + पासपोर्ट): असीमित।", gu: "બ્રોન્ઝ: ૩/દિવસ. સિલ્વર (આધાર): ૩૦/મહિને. ગોલ્ડ (આધાર + પાસપોર્ટ): અમર્યાદિત." },

  // About page
  aboutTitle: { en: "About Jan Kaam", hi: "जन काम के बारे में", gu: "જન કામ વિશે" },
  aboutLead: {
    en: "Jan Kaam (\"the work of the people\") is a digital bridge between citizens and their local government — built for India's villages and cities, in the languages they speak.",
    hi: "जन काम (\"लोगों का काम\") नागरिकों और स्थानीय सरकार के बीच एक डिजिटल पुल है — भारत के गाँव और शहरों के लिए, उनकी अपनी भाषा में।",
    gu: "જન કામ (\"લોકોનું કામ\") નાગરિકો અને સ્થાનિક સરકાર વચ્ચેનો ડિજિટલ સેતુ છે — ભારતના ગામ અને શહેરો માટે, તેમની ભાષામાં.",
  },
  aboutMissionTitle: { en: "Our mission", hi: "हमारा मिशन", gu: "અમારું ધ્યેય" },
  aboutMissionBody: {
    en: "Make civic complaints as easy as a WhatsApp message — and as accountable as an RTI filing.",
    hi: "नागरिक शिकायतों को WhatsApp जितना आसान और RTI जितना जवाबदेह बनाना।",
    gu: "નાગરિક ફરિયાદો WhatsApp જેટલી સરળ અને RTI જેટલી જવાબદેહ બનાવવી.",
  },
  aboutWhoTitle: { en: "Who we serve", hi: "हम किसकी सेवा करते हैं", gu: "અમે કોની સેવા કરીએ છીએ" },
  aboutWhoBody: {
    en: "Surat district pilot — 1 city corporation, 9 talukas, 700+ villages, 60+ lakh residents. Designed mobile-first for elders, farmers, and students alike.",
    hi: "सूरत जिला पायलट — 1 नगर निगम, 9 तालुका, 700+ गाँव, 60+ लाख निवासी।",
    gu: "સુરત જિલ્લા પાઇલટ — ૧ મહાનગરપાલિકા, ૯ તાલુકા, ૭૦૦+ ગામ, ૬૦+ લાખ રહેવાસી.",
  },
  aboutDeptsTitle: { en: "Departments we route to", hi: "हम जिन विभागों को भेजते हैं", gu: "અમે જે વિભાગોને મોકલીએ છીએ" },
  aboutPrivacyTitle: { en: "Privacy first", hi: "गोपनीयता पहले", gu: "ગોપનીયતા પ્રથમ" },
  aboutPrivacyBody: {
    en: "Built per UIDAI Aadhaar guidelines and India's DPDP Act 2023. No selling of data. Photos are encrypted at rest. You can delete your account and tickets anytime.",
    hi: "UIDAI आधार दिशानिर्देश और भारत के DPDP अधिनियम 2023 के अनुसार बनाया गया। डेटा बेचा नहीं जाता।",
    gu: "UIDAI આધાર માર્ગદર્શિકા અને ભારતના DPDP કાયદા 2023 મુજબ બનાવેલ. ડેટા વેચાતો નથી.",
  },
  aboutLangTitle: { en: "Languages", hi: "भाषाएँ", gu: "ભાષાઓ" },
  aboutLangBody: {
    en: "Available in English, हिन्दी and ગુજરાતી today. Marathi, Tamil, Bengali coming next.",
    hi: "अभी English, हिन्दी और ગુજરાતી में उपलब्ध।",
    gu: "હાલ English, હિન્દી અને ગુજરાતીમાં ઉપલબ્ધ.",
  },

  // Report flow
  reportStep1: { en: "What is the problem?", hi: "क्या समस्या है?", gu: "શું તકલીફ છે?" },
  reportStep1Sub: { en: "Pick a category. Then a sub-type if shown.", hi: "श्रेणी चुनें, फिर उप-प्रकार।", gu: "શ્રેણી પસંદ કરો, પછી પેટા-પ્રકાર." },
  reportSubcat: { en: "Sub-type (optional)", hi: "उप-प्रकार (वैकल्पिक)", gu: "પેટા-પ્રકાર (વૈકલ્પિક)" },
  reportDesc: { en: "Describe what happened", hi: "क्या हुआ बताइए", gu: "શું થયું તે જણાવો" },
  reportDescPh: {
    en: "e.g. Water has been off in our street since this morning…",
    hi: "उदा. हमारी गली में सुबह से पानी नहीं आ रहा…",
    gu: "દા.ત. અમારી શેરીમાં સવારથી પાણી નથી આવતું…",
  },
  reportPhotos: { en: "Add photos (up to 3)", hi: "फ़ोटो जोड़ें (अधिकतम 3)", gu: "ફોટો ઉમેરો (વધુમાં વધુ ૩)" },
  reportVoice: { en: "Voice (coming soon)", hi: "आवाज़ (जल्द आ रहा)", gu: "અવાજ (ટૂંક સમયમાં)" },
  reportNext: { en: "Next: confirm location", hi: "अगला: स्थान पुष्टि", gu: "આગળ: સ્થાન ખાતરી" },
  reportBack: { en: "Back", hi: "वापस", gu: "પાછા" },

  reportStep2: { en: "Confirm the location", hi: "स्थान की पुष्टि करें", gu: "સ્થાનની ખાતરી કરો" },
  reportStep2Sub: { en: "Drag the pin to the exact spot.", hi: "पिन को सही जगह पर खींचें।", gu: "પિનને ચોક્કસ જગ્યાએ ખેંચો." },
  reportLocating: { en: "Finding your location…", hi: "स्थान खोजा जा रहा है…", gu: "સ્થાન શોધાઈ રહ્યું છે…" },
  reportUseGps: { en: "Use my current location", hi: "मेरा स्थान उपयोग करें", gu: "મારું સ્થાન વાપરો" },
  reportTriagePreview: { en: "AI classification (preview)", hi: "AI वर्गीकरण (पूर्वावलोकन)", gu: "AI વર્ગીકરણ (પૂર્વાવલોકન)" },
  reportSubmit: { en: "Submit complaint", hi: "शिकायत भेजें", gu: "ફરિયાદ મોકલો" },
  reportSubmitted: { en: "Complaint submitted", hi: "शिकायत भेज दी गई", gu: "ફરિયાદ મોકલાઈ ગઈ" },

  // Triage labels
  priority: { en: "Priority", hi: "प्राथमिकता", gu: "પ્રાથમિકતા" },
  department: { en: "Department", hi: "विभाग", gu: "વિભાગ" },
  alsoNotified: { en: "Also notified", hi: "भी सूचित", gu: "પણ સૂચિત" },
  slaResponse: { en: "Response within", hi: "जवाब इतने में", gu: "જવાબ આટલામાં" },

  // Ticket detail
  status: { en: "Status", hi: "स्थिति", gu: "સ્થિતિ" },
  assignedOfficer: { en: "Assigned officer", hi: "नियुक्त अधिकारी", gu: "નિયુક્ત અધિકારી" },
  timeline: { en: "Timeline", hi: "समय रेखा", gu: "સમય રેખા" },
  stSubmitted: { en: "Submitted", hi: "दर्ज की गई", gu: "નોંધાવી" },
  stAcknowledged: { en: "Acknowledged", hi: "स्वीकार की गई", gu: "સ્વીકારી" },
  stInProgress: { en: "In progress", hi: "चल रही है", gu: "ચાલુ છે" },
  stResolved: { en: "Resolved", hi: "हल हो गई", gu: "ઉકેલાઈ" },
  rateExperience: { en: "Rate the resolution", hi: "समाधान को रेट करें", gu: "ઉકેલને રેટ કરો" },
  thanksFeedback: { en: "Thanks for your feedback", hi: "आपकी प्रतिक्रिया के लिए धन्यवाद", gu: "તમારા પ્રતિસાદ માટે આભાર" },
  demoResolve: { en: "Demo: mark as resolved", hi: "डेमो: हल चिह्नित करें", gu: "ડેમો: ઉકેલાઈ ગયેલી નોંધો" },
  callDept: { en: "Call department", hi: "विभाग को कॉल करें", gu: "વિભાગને કૉલ કરો" },

  // Notifications / schedules
  notifTitle: { en: "Updates", hi: "सूचनाएँ", gu: "સૂચનાઓ" },
  notifPersonal: { en: "Your tickets", hi: "आपकी शिकायतें", gu: "તમારી ફરિયાદો" },
  notifBroadcast: { en: "Panchayat broadcasts", hi: "पंचायत प्रसारण", gu: "પંચાયત પ્રસારણ" },
  notifNone: { en: "Nothing here yet.", hi: "अभी कुछ नहीं।", gu: "હજી કંઈ નથી." },
  notifClear: { en: "Mark all read", hi: "सभी पढ़ी हुई", gu: "બધી વાંચેલી" },

  schedTitle: { en: "Schedules", hi: "समय सारणी", gu: "સમય સારણી" },
  schedSub: { en: "Local bus, school, clinic timings.", hi: "स्थानीय बस, स्कूल, क्लिनिक समय।", gu: "સ્થાનિક બસ, શાળા, ક્લિનિક સમય." },

  // Errors / common
  errPhone: { en: "Enter a valid 10-digit Indian mobile.", hi: "वैध 10-अंकीय मोबाइल नंबर डालें।", gu: "માન્ય ૧૦ અંકનો મોબાઈલ નંબર દાખલ કરો." },
  errOtp: { en: "Enter the 6-digit code.", hi: "6-अंकीय कोड डालें।", gu: "૬ અંકનો કોડ દાખલ કરો." },
  errAadhaar: { en: "Enter a valid 12-digit Aadhaar number.", hi: "वैध 12-अंकीय आधार डालें।", gu: "માન્ય ૧૨ અંકનો આધાર દાખલ કરો." },
  errName: { en: "Please enter your name.", hi: "कृपया नाम दर्ज करें।", gu: "કૃપા કરી નામ દાખલ કરો." },
  errVillage: { en: "Please enter your village or area.", hi: "कृपया गाँव/क्षेत्र दर्ज करें।", gu: "કૃપા કરી ગામ/વિસ્તાર દાખલ કરો." },
  errDesc: { en: "Please describe the issue (min 10 characters).", hi: "कृपया समस्या लिखें (कम से कम 10 अक्षर)।", gu: "કૃપા કરી તકલીફ લખો (ઓછામાં ઓછા ૧૦ અક્ષર)." },
  errCategory: { en: "Please pick a category.", hi: "कृपया श्रेणी चुनें।", gu: "કૃપા કરી શ્રેણી પસંદ કરો." },
  errPassport: { en: "Enter a valid passport number.", hi: "वैध पासपोर्ट डालें।", gu: "માન્ય પાસપોર્ટ દાખલ કરો." },

  errTierLow: {
    en: "This category needs Silver verification (Aadhaar). Upgrade in settings.",
    hi: "इस श्रेणी के लिए सिल्वर सत्यापन (आधार) चाहिए।",
    gu: "આ શ્રેણી માટે સિલ્વર ચકાસણી (આધાર) જરૂરી છે.",
  },
  errTierGold: {
    en: "Governance & RTI need Gold verification (Aadhaar + Passport).",
    hi: "शासन और RTI के लिए गोल्ड सत्यापन चाहिए।",
    gu: "શાસન અને RTI માટે ગોલ્ડ ચકાસણી જરૂરી છે.",
  },
  errRateLimit: {
    en: "Rate limit reached: 3 reports per 24 hours per account.",
    hi: "सीमा पूरी: 24 घंटे में अधिकतम 3 शिकायतें।",
    gu: "મર્યાદા પૂરી: ૨૪ કલાકમાં વધુમાં વધુ ૩ ફરિયાદો.",
  },

  signOut: { en: "Sign out", hi: "साइन आउट", gu: "સાઇન આઉટ" },
  hours: { en: "h", hi: "घं", gu: "ક" },
  minutes: { en: "m", hi: "मि", gu: "મિ" },
  overdue: { en: "Overdue", hi: "देरी", gu: "વિલંબ" },
  immediate: { en: "Immediate", hi: "तुरंत", gu: "તાત્કાલિક" },
  langName: { en: "English", hi: "हिन्दी", gu: "ગુજરાતી" },
};

type Key = keyof typeof dict;

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  cycle: () => void;
  t: (k: Key) => string;
  fontClass: string;
}

const LanguageContext = createContext<Ctx | null>(null);
const order: Lang[] = ["gu", "hi", "en"];
const STORAGE_KEY = "gramsewa.lang";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "gu";
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    return saved && order.includes(saved) ? saved : "gu";
  });
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const cycle = () => setLangState((l) => order[(order.indexOf(l) + 1) % order.length]);
  const t = (k: Key) => dict[k][lang];
  const fontClass = lang === "gu" ? "font-gujarati" : lang === "hi" ? "font-hindi" : "";

  return (
    <LanguageContext.Provider value={{ lang, setLang, cycle, t, fontClass }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
