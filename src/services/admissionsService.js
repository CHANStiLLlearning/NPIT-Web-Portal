import { db, storage, isFirebaseConfigured } from './firebase';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

/**
 * Upload a student document to Firebase Cloud Storage with resilient local fallback
 * @param {File} file 
 * @param {string} referenceNumber 
 * @param {'photo' | 'bac_certificate' | 'national_id'} docType 
 * @returns {Promise<{url: string, name: string, size: number, storagePath?: string, isLocal?: boolean}>}
 */
export async function uploadApplicationDocument(file, referenceNumber, docType) {
  if (!file) return { url: '', name: '' };

  // 1. Try Firebase Cloud Storage if online & configured
  if (isFirebaseConfigured && storage) {
    try {
      const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const storagePath = `applications/${referenceNumber}/${docType}_${Date.now()}_${cleanFileName}`;
      const storageRef = ref(storage, storagePath);

      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type || 'application/octet-stream',
        customMetadata: {
          referenceNumber,
          docType,
          originalName: file.name
        }
      });

      const downloadUrl = await getDownloadURL(snapshot.ref);
      console.log(`[AdmissionsService] Uploaded ${docType} to Firebase Storage:`, downloadUrl);
      return {
        url: downloadUrl,
        name: file.name,
        size: file.size,
        type: file.type,
        storagePath
      };
    } catch (storageErr) {
      console.warn(`[AdmissionsService] Cloud Storage upload error for ${docType}, falling back to data URL:`, storageErr);
    }
  }

  // 2. Resilient local fallback (base64 Data URL) so offline users never get blocked
  return new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          url: reader.result,
          name: file.name,
          size: file.size,
          type: file.type,
          isLocal: true
        });
      };
      reader.onerror = () => {
        resolve({
          url: '',
          name: file.name,
          error: true
        });
      };
      reader.readAsDataURL(file);
    } catch {
      resolve({ url: '', name: file.name });
    }
  });
}

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
      photoUrl: formData.documents?.photoUrl || formData.photoUrl || '',
      photoName: formData.documents?.photoName || formData.photoName || '',
      bacCertificateUrl: formData.documents?.bacCertificateUrl || formData.bacCertificateUrl || '',
      bacCertificateName: formData.documents?.bacCertificateName || formData.bacCertificateName || '',
      nationalIdUrl: formData.documents?.nationalIdUrl || formData.nationalIdUrl || '',
      nationalIdName: formData.documents?.nationalIdName || formData.nationalIdName || '',
      bacIICertificateUploaded: Boolean(formData.documents?.bacCertificateUrl || formData.bacCertificateUrl || formData.bacIICertificate),
      nationalIdUploaded: Boolean(formData.documents?.nationalIdUrl || formData.nationalIdUrl || formData.nationalIdCard),
      idPhotoUploaded: Boolean(formData.documents?.photoUrl || formData.photoUrl || formData.photo4x6)
    }
  };

  // 1. Save to Cloud Firestore if connected (using referenceNumber as document ID for secure direct lookups)
  if (isFirebaseConfigured && db) {
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, 'applications', referenceNumber), {
        ...applicationRecord,
        createdAt: serverTimestamp()
      });
      applicationRecord.cloudId = referenceNumber;
      console.log('[AdmissionsService] Saved to Cloud Firestore:', referenceNumber);
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
      const { doc, getDoc } = await import('firebase/firestore');
      // A. Direct secure document get (allowed by rules without exposing full collection listing)
      const directSnap = await getDoc(doc(db, 'applications', cleanRef));
      if (directSnap.exists()) {
        return { cloudId: directSnap.id, ...directSnap.data() };
      }

      // B. Fallback query for legacy auto-id records
      const q = query(collection(db, 'applications'), where('referenceNumber', '==', cleanRef));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const d = snapshot.docs[0];
        return { cloudId: d.id, ...d.data() };
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
