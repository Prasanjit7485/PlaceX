import React from 'react';
import { X, Award, Building2, DollarSign, CheckCircle2 } from 'lucide-react';
import type { Student } from '../../mockData';
import type { StudentWithPlacement } from '../../api/types';
import './RecordPlacementOfferModal.css';

interface RecordPlacementOfferModalProps {
  studentId: string;
  targetStudent: Student | StudentWithPlacement | null;
  placedCompanyInput: string;
  setPlacedCompanyInput: (v: string) => void;
  placedPackageInput: string;
  setPlacedPackageInput: (v: string) => void;
  onClose: () => void;
  onSave: (studentId: string) => void;
}

export const RecordPlacementOfferModal: React.FC<RecordPlacementOfferModalProps> = ({
  studentId,
  targetStudent,
  placedCompanyInput,
  setPlacedCompanyInput,
  placedPackageInput,
  setPlacedPackageInput,
  onClose,
  onSave
}) => {
  const dept = targetStudent
    ? ('department' in targetStudent
        ? targetStudent.department
        : ('branch' in targetStudent
        ? (targetStudent as any).branch
        : 'Department N/A'))
    : 'Department N/A';

  const cgpaVal = targetStudent
    ? (targetStudent.cgpa ?? ('CGPA' in targetStudent ? (targetStudent as any).CGPA : undefined))
    : undefined;

  return (
    <div className="rp-modal-overlay">
      <div className="rp-modal-card">
        {/* Header */}
        <div className="rp-modal-header">
          <div className="rp-header-left">
            <div className="rp-header-icon-badge">
              <Award size={24} />
            </div>
            <div className="rp-header-text">
              <h3 className="rp-modal-title">Record Placement Offer</h3>
              <p className="rp-modal-subtitle">Log verified corporate offer details for candidate</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rp-close-btn"
            title="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="rp-modal-body">
          {/* Candidate Card */}
          {targetStudent && (
            <div className="rp-candidate-card">
              <div className="rp-candidate-info">
                <div className="rp-candidate-avatar">
                  {targetStudent.name ? targetStudent.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div className="rp-candidate-details">
                  <h4 className="rp-candidate-name">{targetStudent.name}</h4>
                  <p className="rp-candidate-meta">
                    {dept || 'Department N/A'} • {cgpaVal !== undefined ? `${cgpaVal} CGPA` : 'CGPA N/A'}
                  </p>
                </div>
              </div>
              <span className="rp-candidate-badge">Candidate</span>
            </div>
          )}

          {/* Form Inputs */}
          <div className="rp-form-group">
            <label className="rp-field-label">
              Recruiting Company Name <span className="rp-asterisk">*</span>
            </label>
            <div className="rp-input-wrapper">
              <Building2 size={18} className="rp-input-icon" />
              <input
                type="text"
                placeholder="e.g. Google / Amazon / Microsoft"
                value={placedCompanyInput}
                onChange={(e) => setPlacedCompanyInput(e.target.value)}
                className="rp-input-field"
              />
            </div>
          </div>

          <div className="rp-form-group">
            <label className="rp-field-label">
              Offered Annual Package (CTC) <span className="rp-asterisk">*</span>
            </label>
            <div className="rp-input-wrapper">
              <DollarSign size={18} className="rp-input-icon" />
              <input
                type="text"
                placeholder="e.g. 24 LPA"
                value={placedPackageInput}
                onChange={(e) => setPlacedPackageInput(e.target.value)}
                className="rp-input-field"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="rp-modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="rp-btn-cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(studentId)}
            className="rp-btn-save"
          >
            <CheckCircle2 size={16} />
            Save Offer
          </button>
        </div>
      </div>
    </div>
  );
};
