import { db, isFirebaseConfigured } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const LOCAL_INQUIRIES_KEY = 'npit_inquiries';
const LOCAL_RESEARCH_INQUIRIES_KEY = 'npit_research_inquiries';
export const ADMIN_NOTIFICATION_EMAIL = 'reactjs35@gmail.com';

/**
 * Dispatch automated email notification directly to administrator
 * @param {Object} record
 */
export async function sendEmailNotification(record) {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${ADMIN_NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'Inquirer Name': record.fullName || 'Anonymous',
        'Inquirer Email': record.email || 'Not provided',
        'Inquirer Phone': record.phone || 'Not provided',
        'Tracking Code': record.referenceNumber,
        'Subject': record.subject || 'NPIT Campus Message',
        'Message': record.message || '',
        'Submitted At': new Date().toLocaleString('en-US', { timeZone: 'Asia/Phnom_Penh' }),
        _subject: `[NPIT Message] ${record.fullName || 'Visitor'} - ${record.subject || record.referenceNumber}`,
        _replyto: record.email || ADMIN_NOTIFICATION_EMAIL,
        _captcha: 'false',
        _template: 'table'
      })
    });
    const result = await res.json().catch(() => ({}));
    return { success: true, result };
  } catch (err) {
    console.warn('[InquiryService] Automated email dispatch failed:', err);
    return { success: false, error: err?.message };
  }
}

/**
 * Submit general campus contact inquiry
 * @param {Object} data 
 */
export async function submitGeneralInquiry(data) {
  const refNum = `NPIT-INQ-${Math.floor(1000 + Math.random() * 9000)}`;
  const record = {
    referenceNumber: refNum,
    fullName: data.name || data.fullName || '',
    email: data.email || '',
    phone: data.phone || '',
    subject: data.subject || 'General Inquiry',
    message: data.message || '',
    forwardedTo: ADMIN_NOTIFICATION_EMAIL,
    submittedAt: new Date().toISOString()
  };

  // 1. Automatically dispatch email to reactjs35@gmail.com in background
  sendEmailNotification(record).catch(err => {
    console.warn('[InquiryService] Background email dispatch error:', err);
  });

  // 2. Persist to Cloud Firestore
  if (isFirebaseConfigured && db) {
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, 'inquiries', refNum), {
        ...record,
        createdAt: serverTimestamp()
      });
      record.cloudId = refNum;
    } catch (err) {
      console.warn('[InquiryService] Firestore inquiry write failed, saving locally:', err);
    }
  }

  // 3. Backup locally
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_INQUIRIES_KEY) || '[]');
    localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify([record, ...existing]));
  } catch (e) {
    // ignore
  }

  await new Promise(r => setTimeout(r, 400));
  return { success: true, referenceNumber: refNum, record };
}

/**
 * Submit industrial research collaboration inquiry
 * @param {Object} data 
 */
export async function submitResearchInquiry(data) {
  const refNum = `NPIT-RD-${Math.floor(1000 + Math.random() * 9000)}`;
  const record = {
    referenceNumber: refNum,
    researchDomain: data.researchDomain || 'General Research',
    name: data.name || '',
    organization: data.organization || data.org || '',
    email: data.email || '',
    message: data.message || '',
    submittedAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'research_inquiries'), {
        ...record,
        createdAt: serverTimestamp()
      });
      record.cloudId = docRef.id;
    } catch (err) {
      console.warn('[InquiryService] Firestore research inquiry write failed, saving locally:', err);
    }
  }

  // Backup locally
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_RESEARCH_INQUIRIES_KEY) || '[]');
    localStorage.setItem(LOCAL_RESEARCH_INQUIRIES_KEY, JSON.stringify([record, ...existing]));
  } catch (e) {
    // ignore
  }

  await new Promise(r => setTimeout(r, 400));
  return { success: true, referenceNumber: refNum, record };
}

/**
 * List all general campus inquiries (for admin)
 */
export async function getAllInquiries() {
  if (isFirebaseConfigured && db) {
    try {
      const { getDocs, query, orderBy } = await import('firebase/firestore');
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ cloudId: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn('[InquiryService] Firestore listing failed:', err);
    }
  }

  try {
    return JSON.parse(localStorage.getItem(LOCAL_INQUIRIES_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

/**
 * List all research collaboration inquiries (for admin)
 */
export async function getAllResearchInquiries() {
  if (isFirebaseConfigured && db) {
    try {
      const { getDocs, query, orderBy } = await import('firebase/firestore');
      const q = query(collection(db, 'research_inquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ cloudId: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn('[InquiryService] Firestore research listing failed:', err);
    }
  }

  try {
    return JSON.parse(localStorage.getItem(LOCAL_RESEARCH_INQUIRIES_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

/**
 * Find inquiry by reference number
 */
export async function getInquiryByReference(refNumber) {
  if (!refNumber) return null;
  const clean = refNumber.trim().toUpperCase();

  if (isFirebaseConfigured && db) {
    try {
      const { doc, getDoc, getDocs, query, where } = await import('firebase/firestore');
      const directSnap = await getDoc(doc(db, 'inquiries', clean));
      if (directSnap.exists()) {
        return { cloudId: directSnap.id, ...directSnap.data() };
      }

      const q = query(collection(db, 'inquiries'), where('referenceNumber', '==', clean));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return { cloudId: snap.docs[0].id, ...snap.docs[0].data() };
      }
    } catch (err) {
      // fallback
    }
  }

  try {
    const list = JSON.parse(localStorage.getItem(LOCAL_INQUIRIES_KEY) || '[]');
    return list.find(i => i.referenceNumber === clean) || null;
  } catch (e) {
    return null;
  }
}
