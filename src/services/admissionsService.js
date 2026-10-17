import { db, isFirebaseConfigured } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'npit_admissions_applications';

// Helper to get local backup applications
const getLocalApplications = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('[AdmissionsService] Failed to read from localStorage:', err);
    return [];
  }
};

// Helper to save local backup
const saveLocalApplication = (appRecord) => {
  try {
    const existing = getLocalApplications();
    const updated = [appRecord, ...existing.filter(a => a.referenceNumber !== appRecord.referenceNumber)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('[AdmissionsService] Failed to save to localStorage:', err);
  }
};

/**
 * Submit an online admission application
 * @param {Object} formData 
 * @returns {Promise<{success: boolean, referenceNumber: string, application: Object}>}
 */
export async function submitApplication(formData) {
  // Generate official tracking reference code: NPIT-2026-APP-XXXXXX
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const referenceNumber = `NPIT-2026-APP-${randomSuffix}`;
  const submittedAt = new Date().toISOString();

  const applicationRecord = {
    referenceNumber,
    status: 'pending_review',
    statusLabel: 'Under Academic Review',
    statusLabelKh: 'កំពុងស្ថិតក្នុងការពិនិត្យពិច័យ',
    submittedAt,
    applicant: {
      fullName: formData.fullName || '',
      fullNameKhmer: formData.fullNameKhmer || '',
      gender: formData.gender || 'male',
      dob: formData.dob || '',
      phone: formData.phone || '',
      email: formData.email || '',
      nationalId: formData.nationalId || '',
      province: formData.province || 'Battambang',
      address: formData.address || ''
    },
    academic: {
      highSchoolName: formData.highSchoolName || '',
      graduationYear: formData.graduationYear || '2024',
      bacIIGrade: formData.bacIIGrade || 'B',
      bacIITrack: formData.bacIITrack || 'Science',
      bacIITableNumber: formData.bacIITableNumber || ''
    },
    programSelection: {
      programId: formData.programId || 'mechanical',
      degreeType: formData.degreeType || 'Bachelor of Engineering (4 Years)',
      shift: formData.shift || 'Morning (8:00 AM - 11:30 AM)'
    },
    scholarship: {
      applied: Boolean(formData.scholarshipCategory && formData.scholarshipCategory !== 'none'),
      category: formData.scholarshipCategory || 'General Merit',
      quotaPercent: formData.scholarshipQuotaPercent || '100% State Quota'
    },
    documents: {
      bacIICertificateUploaded: Boolean(formData.bacIICertificate),
      nationalIdUploaded: Boolean(formData.nationalIdCard),
      idPhotoUploaded: Boolean(formData.photo4x6)
    }
  };

  // 1. Save to Cloud Firestore if connected
  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'applications'), {
        ...applicationRecord,
        createdAt: serverTimestamp()
      });
      applicationRecord.cloudId = docRef.id;
      console.log('[AdmissionsService] Saved to Cloud Firestore:', docRef.id);
    } catch (firebaseErr) {
      console.warn('[AdmissionsService] Firestore write failed, saving locally:', firebaseErr);
    }
  }

  // 2. Always persist locally as offline backup
  saveLocalApplication(applicationRecord);

  // Small delay for smooth UI feedback
  await new Promise(res => setTimeout(res, 600));

  return {
    success: true,
    referenceNumber,
    application: applicationRecord
  };
}

/**
 * Retrieve an application by its official reference code
 * @param {string} referenceNumber 
 */
export async function getApplicationByReference(referenceNumber) {
  if (!referenceNumber) return null;
  const cleanRef = referenceNumber.trim().toUpperCase();

  // 1. Try fetching from Cloud Firestore
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'applications'), where('referenceNumber', '==', cleanRef));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { cloudId: doc.id, ...doc.data() };
      }
    } catch (err) {
      console.warn('[AdmissionsService] Firestore lookup failed, falling back to local:', err);
    }
  }

  // 2. Fallback to localStorage
  const localList = getLocalApplications();
  return localList.find(a => a.referenceNumber === cleanRef) || null;
}

/**
 * Update application status (for admin)
 * @param {string} cloudIdOrRef 
 * @param {string} newStatus 
 * @param {string} newLabel 
 * @param {string} newLabelKh 
 * @param {string} adminNotes 
 */
export async function updateApplicationStatus(cloudIdOrRef, newStatus, newLabel, newLabelKh, adminNotes = '') {
  const updateData = {
    status: newStatus,
    statusLabel: newLabel,
    statusLabelKh: newLabelKh,
    adminNotes,
    updatedAt: new Date().toISOString()
  };

  // 1. Update in Cloud Firestore
  if (isFirebaseConfigured && db) {
    try {
      const { doc, updateDoc } = await import('firebase/firestore');
      if (cloudIdOrRef.length > 15 && !cloudIdOrRef.startsWith('NPIT-')) {
        await updateDoc(doc(db, 'applications', cloudIdOrRef), updateData);
      } else {
        // Query by reference number
        const q = query(collection(db, 'applications'), where('referenceNumber', '==', cloudIdOrRef));
        const snap = await getDocs(q);
        if (!snap.empty) {
          await updateDoc(snap.docs[0].ref, updateData);
        }
      }
    } catch (err) {
      console.warn('[AdmissionsService] Firestore update failed, updating local copy:', err);
    }
  }

  // 2. Update local copy
  try {
    const list = getLocalApplications();
    const updatedList = list.map(item => {
      if (item.cloudId === cloudIdOrRef || item.referenceNumber === cloudIdOrRef) {
        return { ...item, ...updateData };
      }
      return item;
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
  } catch (err) {
    console.warn('[AdmissionsService] Local update failed:', err);
  }

  return { success: true, ...updateData };
}

/**
 * List all applications (for administration)
 */
export async function getAllApplications() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ cloudId: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn('[AdmissionsService] Firestore listing failed:', err);
    }
  }

  return getLocalApplications();
}
