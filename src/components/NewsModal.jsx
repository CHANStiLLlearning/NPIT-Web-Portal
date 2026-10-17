import React from 'react';
import { X, Calendar, Share2, Tag, Building } from 'lucide-react';

export default function NewsModal({ newsItem, isOpen, onClose }) {
  if (!isOpen || !newsItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-60 bg-slate-900">
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="absolute bottom-4 left-4 bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {newsItem.category || "Announcement"}
          </span>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-semibold text-blue-700">
              <Calendar className="w-4 h-4" />
              {newsItem.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Building className="w-4 h-4 text-slate-400" />
              NPIT Press Office
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 leading-snug">
            {newsItem.title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            {newsItem.description || "The National Polytechnic Institute Techo Sen is dedicated to fostering vocational and engineering excellence across the Kingdom of Cambodia through state-of-the-art laboratory workshops, distinguished faculty, and comprehensive industrial partnerships."}
          </p>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => alert("Link copied to clipboard!")}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900"
            >
              <Share2 className="w-4 h-4" />
              <span>Share News</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
