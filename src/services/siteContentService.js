import { newsArticles as defaultNews } from '../data/newsData';
import { programsList as defaultPrograms } from '../data/programsData';

const STORAGE_KEYS = {
  BANNER: 'npit_site_banner',
  NEWS: 'npit_news_articles',
  PROGRAMS: 'npit_programs_config',
  AUDIT_LOGS: 'npit_admin_audit_logs'
};

// Default initial announcement banner
const DEFAULT_BANNER = {
  enabled: true,
  type: 'announcement', // 'announcement' | 'urgent' | 'info' | 'success'
  textEn: 'Official Enrollment 2026–2027: Batch 1 Starts Nov 13, 2026 | Batch 2 Starts Jan 04, 2027',
  textKh: 'សេចក្តីជូនដំណឹងអំពីការចុះឈ្មោះចូលរៀន ២០២៦–២០២៧៖ វគ្គទី១ ចាប់ផ្តើម ថ្ងៃទី១៣ វិច្ឆិកា ២០២៦ | វគ្គទី២ ថ្ងៃទី០៤ មករា ២០២៧',
  ctaTextEn: 'Apply Now',
  ctaTextKh: 'ដាក់ពាក្យឥឡូវនេះ',
  ctaLink: '#apply'
};

// ============================================================================
// 1. Audit Logging
// ============================================================================
export function logAuditEvent(action, details, user = 'admin@npit.edu.kh') {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    const logs = raw ? JSON.parse(raw) : [];
    const newLog = {
      id: `LOG-${Date.now()}`,
      action,
      details,
      user,
      timestamp: new Date().toISOString()
    };
    const updated = [newLog, ...logs].slice(0, 50); // keep last 50
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(updated));
    return newLog;
  } catch (err) {
    console.warn('[SiteContentService] Failed to write audit log:', err);
    return null;
  }
}

export function getAuditLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    if (!raw) {
      // Seed default initial logs
      const initial = [
        {
          id: 'LOG-1',
          action: 'System Deployed',
          details: 'NPIT Web Portal v2.4 initialized with enterprise security headers.',
          user: 'system',
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
        },
        {
          id: 'LOG-2',
          action: 'Security Audit',
          details: 'Cloud Firestore security rules compiled & verified active.',
          user: 'security-bot',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// ============================================================================
// 2. Site-Wide Announcement Banner
// ============================================================================
export function getSiteBanner() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BANNER);
    return raw ? JSON.parse(raw) : DEFAULT_BANNER;
  } catch {
    return DEFAULT_BANNER;
  }
}

export function saveSiteBanner(bannerConfig) {
  try {
    const payload = { ...DEFAULT_BANNER, ...bannerConfig, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.BANNER, JSON.stringify(payload));
    logAuditEvent('Updated Site Banner', `Banner status: ${payload.enabled ? 'Enabled' : 'Disabled'}`);
    window.dispatchEvent(new CustomEvent('npit-site-banner-updated', { detail: payload }));
    return payload;
  } catch (err) {
    console.error('[SiteContentService] Failed to save banner:', err);
    return DEFAULT_BANNER;
  }
}

// ============================================================================
// 3. News Articles CMS
// ============================================================================
export function getSiteNews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NEWS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(defaultNews));
      return defaultNews;
    }
    return JSON.parse(raw);
  } catch {
    return defaultNews;
  }
}

export function saveNewsArticle(article) {
  try {
    const all = getSiteNews();
    let updated;
    const isNew = !article.id || article.id.startsWith('new_');
    const id = isNew ? `news-${Date.now()}` : article.id;
    
    const formatted = {
      ...article,
      id,
      slug: article.slug || id,
      date: article.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      dateKh: article.dateKh || `ថ្ងៃទី ${new Date().getDate()} ខែ ${new Date().getMonth() + 1} ឆ្នាំ ${new Date().getFullYear()}`,
      author: article.author || 'NPIT Media & Public Relations',
      readTime: article.readTime || '3 min read',
      published: article.published !== false
    };

    if (isNew) {
      updated = [formatted, ...all];
      logAuditEvent('Created News Article', `Title: ${formatted.title.slice(0, 40)}...`);
    } else {
      updated = all.map(a => a.id === id ? formatted : a);
      logAuditEvent('Updated News Article', `Title: ${formatted.title.slice(0, 40)}...`);
    }

    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('npit-news-updated', { detail: updated }));
    return formatted;
  } catch (err) {
    console.error('[SiteContentService] Failed to save news article:', err);
    throw err;
  }
}

export function deleteNewsArticle(id) {
  try {
    const all = getSiteNews();
    const target = all.find(a => a.id === id);
    const updated = all.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(updated));
    logAuditEvent('Deleted News Article', `Removed: ${target ? target.title.slice(0, 40) : id}`);
    window.dispatchEvent(new CustomEvent('npit-news-updated', { detail: updated }));
    return true;
  } catch (err) {
    console.error('[SiteContentService] Failed to delete news article:', err);
    return false;
  }
}

// ============================================================================
// 4. Academic Programs Management
// ============================================================================
export function getSitePrograms() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
    if (!raw) {
      // Map defaults with status and quota
      const initial = defaultPrograms.map(p => ({
        ...p,
        status: 'open', // 'open' | 'waitlist' | 'closed'
        quotaTotal: 120,
        quotaEnrolled: Math.floor(45 + Math.random() * 50)
      }));
      localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return defaultPrograms;
  }
}

export function updateProgramConfig(programId, updates) {
  try {
    const all = getSitePrograms();
    const updated = all.map(p => {
      if (p.id === programId) {
        return { ...p, ...updates, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(updated));
    logAuditEvent('Updated Program Status', `Program ID: ${programId} -> Status: ${updates.status || 'Updated'}`);
    window.dispatchEvent(new CustomEvent('npit-programs-updated', { detail: updated }));
    return updated.find(p => p.id === programId);
  } catch (err) {
    console.error('[SiteContentService] Failed to update program config:', err);
    throw err;
  }
}
