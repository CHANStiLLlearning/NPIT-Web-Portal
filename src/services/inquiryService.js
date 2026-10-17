import { db, isFirebaseConfigured } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const LOCAL_INQUIRIES_KEY = 'npit_inquiries';
const LOCAL_RESEARCH_INQUIRIES_KEY = 'npit_research_inquiries';

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
    submittedAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'inquiries'), {
        ...record,
        createdAt: serverTimestamp()
      });
      record.cloudId = docRef.id;
    } catch (err) {
      console.warn('[InquiryService] Firestore inquiry write failed, saving locally:', err);
    }
  }

  // Backup locally
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
      const { getDocs, query, where } = await import('firebase/firestore');
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
