import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "carenest-health-records";

function HealthRecords({ onMedicinesDetected }) {
  const fileInputRef = useRef(null);

  const [records, setRecords] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const [title, setTitle] = useState("");
  const [recordType, setRecordType] = useState("Medical Report");
  const [notes, setNotes] = useState("");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    try {
      const savedRecords = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      setRecords(Array.isArray(savedRecords) ? savedRecords : []);
    } catch {
      setRecords([]);
    }
  }, []);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const saveRecords = (nextRecords) => {
    setRecords(nextRecords);

    /*
      Only report metadata and analysis are stored here.

      Actual uploaded files should be stored in:
      - IndexedDB for a frontend-only prototype, or
      - secure cloud storage/backend for a real application.

      Do not put large PDF/image base64 strings in localStorage.
    */

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRecords));
  };

  const handleFileSelection = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isPdf = file.type === "application/pdf";

      return isImage || isPdf;
    });

    if (!validFiles.length) {
      setAnalysisError("Please upload a PDF, JPG, JPEG, PNG or WEBP file.");
      return;
    }

    const maximumSize = 10 * 1024 * 1024;

    const oversizedFile = validFiles.find(
      (file) => file.size > maximumSize
    );

    if (oversizedFile) {
      setAnalysisError(
        `${oversizedFile.name} is larger than the 10 MB limit.`
      );
      return;
    }

    setAnalysisError("");
    setSelectedFiles(validFiles);
    setPreviewUrls(validFiles.map((file) => URL.createObjectURL(file)));

    if (!title.trim() && validFiles[0]) {
      const filenameWithoutExtension = validFiles[0].name.replace(
        /\.[^/.]+$/,
        ""
      );

      setTitle(filenameWithoutExtension);
    }

    setAnalysisResult(null);
  };

  const analyzeReport = async () => {
    if (!selectedFiles.length) {
      setAnalysisError("Select at least one report before analysing.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError("");
    setAnalysisResult(null);

    try {
      const formData = new FormData();

      selectedFiles.forEach((file) => {
        formData.append("reports", file);
      });

      /*
        This endpoint must be created in your backend.

        Expected response:

        {
          "summary": "The report contains a prescription...",
          "reportDate": "2026-07-23",
          "doctor": "Dr. Example",
          "hospital": "Example Hospital",
          "conditions": [
            {
              "name": "Condition written in report",
              "confidence": 0.91,
              "sourceText": "Text found inside report"
            }
          ],
          "medicines": [
            {
              "name": "Medicine name",
              "dosage": "500 mg",
              "frequency": "Twice daily",
              "duration": "5 days",
              "instructions": "After food",
              "confidence": 0.94
            }
          ],
          "warnings": []
        }
      */

      const response = await fetch("/api/analyze-report", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          "The report analysis service is unavailable."
        );
      }

      const result = await response.json();

      setAnalysisResult({
        summary: result.summary || "No summary was generated.",
        reportDate: result.reportDate || "",
        doctor: result.doctor || "",
        hospital: result.hospital || "",
        conditions: Array.isArray(result.conditions)
          ? result.conditions
          : [],
        medicines: Array.isArray(result.medicines)
          ? result.medicines
          : [],
        warnings: Array.isArray(result.warnings)
          ? result.warnings
          : [],
      });
    } catch (error) {
      console.error(error);

      setAnalysisError(
        "The files were selected successfully, but AI analysis requires the /api/analyze-report backend. The report can still be saved."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addDetectedMedicines = () => {
    if (!analysisResult?.medicines?.length) {
      return;
    }

    const confirmedMedicines = analysisResult.medicines.map(
      (medicine, index) => ({
        id: `${Date.now()}-${index}`,
        name: medicine.name || "Unnamed medicine",
        dosage: medicine.dosage || "",
        frequency: medicine.frequency || "",
        duration: medicine.duration || "",
        instructions: medicine.instructions || "",
        completed: false,
        source: "Health report",
      })
    );

    if (typeof onMedicinesDetected === "function") {
      onMedicinesDetected(confirmedMedicines);
    } else {
      const currentMedicines = JSON.parse(
        localStorage.getItem("carenest-medicines") || "[]"
      );

      localStorage.setItem(
        "carenest-medicines",
        JSON.stringify([
          ...currentMedicines,
          ...confirmedMedicines,
        ])
      );
    }

    alert(
      `${confirmedMedicines.length} medicine(s) added. Please verify every medicine, dose and schedule before using the reminder.`
    );
  };

  const saveReport = () => {
    if (!selectedFiles.length) {
      setAnalysisError("Choose at least one report or image.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      title: title.trim() || "Untitled health record",
      type: recordType,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),

      files: selectedFiles.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      })),

      analysis: analysisResult
        ? {
            summary: analysisResult.summary,
            reportDate: analysisResult.reportDate,
            doctor: analysisResult.doctor,
            hospital: analysisResult.hospital,
            conditions: analysisResult.conditions,
            medicines: analysisResult.medicines,
            warnings: analysisResult.warnings,
          }
        : null,
    };

    saveRecords([newRecord, ...records]);

    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    setTitle("");
    setRecordType("Medical Report");
    setNotes("");
    setSelectedFiles([]);
    setPreviewUrls([]);
    setAnalysisResult(null);
    setAnalysisError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const deleteRecord = (recordId) => {
    const confirmed = window.confirm(
      "Delete this saved health record?"
    );

    if (!confirmed) {
      return;
    }

    saveRecords(
      records.filter((record) => record.id !== recordId)
    );
  };

  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "0 KB";
    }

    const sizeInMb = bytes / (1024 * 1024);

    if (sizeInMb >= 1) {
      return `${sizeInMb.toFixed(1)} MB`;
    }

    return `${Math.ceil(bytes / 1024)} KB`;
  };

  return (
    <section id="health-records" className="health-records-section">
      <div className="records-container">
        <div className="records-heading">
          <span className="records-label">DIGITAL HEALTH RECORDS</span>

          <h2>
            Upload, analyse and save
            <span> health reports</span>
          </h2>

          <p>
            Upload prescriptions, laboratory reports, scans and medical
            documents. CareNest can extract useful information for your review.
          </p>
        </div>

        <div className="records-layout">
          <div className="upload-panel records-card">
            <div className="panel-heading">
              <div className="panel-icon">📤</div>

              <div>
                <h3>Upload health records</h3>
                <p>PDF, JPG, PNG and WEBP — maximum 10 MB each.</p>
              </div>
            </div>

            <div
              className="upload-zone"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();

                handleFileSelection({
                  target: {
                    files: event.dataTransfer.files,
                  },
                });
              }}
            >
              <div className="upload-icon">☁️</div>
              <h4>Select or drop reports here</h4>
              <p>
                Upload medical reports, prescriptions, scans or record images.
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={(event) => {
                  event.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Choose files
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,image/jpeg,image/png,image/webp"
                multiple
                hidden
                onChange={handleFileSelection}
              />
            </div>

            {selectedFiles.length > 0 && (
              <div className="selected-files">
                <h4>Selected files</h4>

                {selectedFiles.map((file, index) => (
                  <div
                    className="selected-file"
                    key={`${file.name}-${index}`}
                  >
                    <div className="file-preview">
                      {file.type.startsWith("image/") ? (
                        <img
                          src={previewUrls[index]}
                          alt={file.name}
                        />
                      ) : (
                        <span>PDF</span>
                      )}
                    </div>

                    <div className="file-information">
                      <strong>{file.name}</strong>
                      <small>
                        {file.type || "Unknown type"} ·{" "}
                        {formatFileSize(file.size)}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="record-form">
              <label>
                Record title
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Example: Blood test – July 2026"
                />
              </label>

              <label>
                Record type
                <select
                  value={recordType}
                  onChange={(event) =>
                    setRecordType(event.target.value)
                  }
                >
                  <option>Medical Report</option>
                  <option>Prescription</option>
                  <option>Laboratory Report</option>
                  <option>Scan or X-ray</option>
                  <option>Vaccination Record</option>
                  <option>Discharge Summary</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="full-width">
                Notes
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Add optional notes about this record..."
                  rows="4"
                />
              </label>
            </div>

            {analysisError && (
              <div className="error-message">
                {analysisError}
              </div>
            )}

            <div className="upload-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={analyzeReport}
                disabled={isAnalyzing || !selectedFiles.length}
              >
                {isAnalyzing
                  ? "Analysing report..."
                  : "✨ Analyse report"}
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={saveReport}
                disabled={!selectedFiles.length}
              >
                Save record
              </button>
            </div>

            <div className="medical-notice">
              <strong>Important:</strong> AI extraction can make mistakes.
              Always verify medicine names, dosage, timing and conditions with
              the original report and a qualified healthcare professional.
            </div>
          </div>

          <div className="analysis-panel records-card">
            <div className="panel-heading">
              <div className="panel-icon">🤖</div>

              <div>
                <h3>AI report analysis</h3>
                <p>Review extracted information before saving it.</p>
              </div>
            </div>

            {!analysisResult ? (
              <div className="empty-analysis">
                <span>🧾</span>
                <h4>No report analysed yet</h4>
                <p>
                  Select a health report and press “Analyse report”.
                </p>
              </div>
            ) : (
              <div className="analysis-results">
                <div className="analysis-block">
                  <span className="analysis-label">Summary</span>
                  <p>{analysisResult.summary}</p>
                </div>

                {(analysisResult.doctor ||
                  analysisResult.hospital ||
                  analysisResult.reportDate) && (
                  <div className="report-information-grid">
                    {analysisResult.reportDate && (
                      <div>
                        <small>Report date</small>
                        <strong>{analysisResult.reportDate}</strong>
                      </div>
                    )}

                    {analysisResult.doctor && (
                      <div>
                        <small>Doctor</small>
                        <strong>{analysisResult.doctor}</strong>
                      </div>
                    )}

                    {analysisResult.hospital && (
                      <div>
                        <small>Hospital</small>
                        <strong>{analysisResult.hospital}</strong>
                      </div>
                    )}
                  </div>
                )}

                <div className="analysis-block">
                  <span className="analysis-label">
                    Conditions mentioned
                  </span>

                  {analysisResult.conditions.length ? (
                    <div className="condition-list">
                      {analysisResult.conditions.map(
                        (condition, index) => (
                          <div
                            className="condition-item"
                            key={`${condition.name}-${index}`}
                          >
                            <strong>
                              {condition.name ||
                                "Unnamed condition"}
                            </strong>

                            {condition.sourceText && (
                              <small>
                                Found in report: “
                                {condition.sourceText}”
                              </small>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p>No clear condition was found.</p>
                  )}
                </div>

                <div className="analysis-block">
                  <span className="analysis-label">
                    Medicines detected
                  </span>

                  {analysisResult.medicines.length ? (
                    <>
                      <div className="medicine-list">
                        {analysisResult.medicines.map(
                          (medicine, index) => (
                            <div
                              className="detected-medicine"
                              key={`${medicine.name}-${index}`}
                            >
                              <div>
                                <strong>
                                  {medicine.name ||
                                    "Unnamed medicine"}
                                </strong>

                                <p>
                                  {[
                                    medicine.dosage,
                                    medicine.frequency,
                                    medicine.duration,
                                  ]
                                    .filter(Boolean)
                                    .join(" · ")}
                                </p>

                                {medicine.instructions && (
                                  <small>
                                    {medicine.instructions}
                                  </small>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      <button
                        type="button"
                        className="primary-button add-medicines-button"
                        onClick={addDetectedMedicines}
                      >
                        Add medicines to reminders
                      </button>
                    </>
                  ) : (
                    <p>No medicines were clearly detected.</p>
                  )}
                </div>

                {analysisResult.warnings.length > 0 && (
                  <div className="warning-block">
                    <strong>Review warnings</strong>

                    {analysisResult.warnings.map(
                      (warning, index) => (
                        <p key={index}>{warning}</p>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="saved-records-section">
          <div className="saved-records-heading">
            <div>
              <span className="records-label">SAVED RECORDS</span>
              <h3>Your health record library</h3>
            </div>

            <span className="record-count">
              {records.length} record{records.length === 1 ? "" : "s"}
            </span>
          </div>

          {records.length === 0 ? (
            <div className="empty-records records-card">
              <span>📁</span>
              <h4>No saved health records</h4>
              <p>Your uploaded records will appear here.</p>
            </div>
          ) : (
            <div className="saved-records-grid">
              {records.map((record) => (
                <article
                  className="saved-record-card"
                  key={record.id}
                >
                  <div className="saved-record-top">
                    <div className="record-file-icon">
                      {record.type === "Prescription"
                        ? "💊"
                        : record.type === "Laboratory Report"
                          ? "🧪"
                          : record.type === "Scan or X-ray"
                            ? "🩻"
                            : "📄"}
                    </div>

                    <button
                      type="button"
                      className="delete-record-button"
                      onClick={() => deleteRecord(record.id)}
                      aria-label={`Delete ${record.title}`}
                    >
                      ×
                    </button>
                  </div>

                  <span className="record-type">
                    {record.type}
                  </span>

                  <h4>{record.title}</h4>

                  <p className="record-date">
                    Saved{" "}
                    {new Date(record.createdAt).toLocaleDateString()}
                  </p>

                  {record.notes && (
                    <p className="record-notes">{record.notes}</p>
                  )}

                  <div className="record-files">
                    {record.files.map((file, index) => (
                      <div
                        className="record-file-row"
                        key={`${file.name}-${index}`}
                      >
                        <span>📎</span>

                        <div>
                          <strong>{file.name}</strong>
                          <small>{formatFileSize(file.size)}</small>
                        </div>
                      </div>
                    ))}
                  </div>

                  {record.analysis && (
                    <div className="saved-analysis">
                      <strong>AI analysis saved</strong>

                      <p>
                        {
                          record.analysis.conditions?.length
                        }{" "}
                        condition(s) and{" "}
                        {record.analysis.medicines?.length} medicine(s)
                        detected.
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .health-records-section {
          width: 100%;
          padding: 110px 24px;
          background: transparent;
        }

        .records-container {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
        }

        .records-heading {
          max-width: 780px;
          margin: 0 auto 55px;
          text-align: center;
        }

        .records-label {
          display: inline-flex;
          padding: 9px 16px;
          margin-bottom: 18px;
          border: 1px solid rgba(59, 130, 246, 0.25);
          border-radius: 999px;
          background: rgba(219, 234, 254, 0.82);
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.6px;
        }

        .records-heading h2 {
          margin: 0;
          color: #071b38;
          font-size: clamp(36px, 5vw, 58px);
          line-height: 1.12;
          letter-spacing: -2px;
        }

        .records-heading h2 span {
          color: #2563eb;
        }

        .records-heading p {
          margin: 22px auto 0;
          color: #334e68;
          font-size: 18px;
          line-height: 1.75;
        }

        .records-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(360px, 0.9fr);
          gap: 28px;
          align-items: start;
        }

        .records-card,
        .saved-record-card {
          border: 1px solid rgba(37, 99, 235, 0.25);
          border-radius: 30px;
          background: rgba(225, 244, 255, 0.76);
          box-shadow:
            0 22px 55px rgba(30, 64, 175, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
        }

        .upload-panel,
        .analysis-panel {
          padding: 30px;
        }

        .panel-heading {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 25px;
        }

        .panel-icon {
          display: grid;
          flex: 0 0 auto;
          place-items: center;
          width: 58px;
          height: 58px;
          border-radius: 18px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          font-size: 27px;
          box-shadow: 0 14px 28px rgba(37, 99, 235, 0.25);
        }

        .panel-heading h3 {
          margin: 0 0 5px;
          color: #071b38;
          font-size: 24px;
        }

        .panel-heading p {
          margin: 0;
          color: #4a6682;
          line-height: 1.5;
        }

        .upload-zone {
          padding: 38px 24px;
          border: 2px dashed rgba(37, 99, 235, 0.34);
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.4);
          text-align: center;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .upload-zone:hover {
          transform: translateY(-3px);
          border-color: #2563eb;
          background: rgba(255, 255, 255, 0.58);
        }

        .upload-icon {
          margin-bottom: 10px;
          font-size: 45px;
        }

        .upload-zone h4 {
          margin: 0 0 8px;
          color: #071b38;
          font-size: 21px;
        }

        .upload-zone p {
          margin: 0 0 20px;
          color: #4a6682;
        }

        .primary-button,
        .secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 12px 20px;
          border-radius: 13px;
          font: inherit;
          font-weight: 800;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .primary-button {
          border: 0;
          background: linear-gradient(90deg, #2563eb, #06b6d4);
          color: #ffffff;
          box-shadow: 0 12px 25px rgba(37, 99, 235, 0.24);
        }

        .secondary-button {
          border: 1px solid rgba(37, 99, 235, 0.35);
          background: rgba(255, 255, 255, 0.55);
          color: #164e9d;
        }

        .primary-button:hover,
        .secondary-button:hover {
          transform: translateY(-2px);
        }

        .primary-button:disabled,
        .secondary-button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
          transform: none;
        }

        .selected-files {
          margin-top: 22px;
        }

        .selected-files h4 {
          color: #071b38;
        }

        .selected-file {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 10px;
          padding: 12px;
          border: 1px solid rgba(37, 99, 235, 0.16);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.42);
        }

        .file-preview {
          display: grid;
          flex: 0 0 auto;
          place-items: center;
          width: 52px;
          height: 52px;
          overflow: hidden;
          border-radius: 13px;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: 13px;
          font-weight: 900;
        }

        .file-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .file-information {
          min-width: 0;
        }

        .file-information strong,
        .file-information small {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .file-information strong {
          color: #071b38;
        }

        .file-information small {
          margin-top: 4px;
          color: #5c748d;
        }

        .record-form {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: 24px;
        }

        .record-form label {
          display: grid;
          gap: 8px;
          color: #183b5c;
          font-weight: 750;
        }

        .record-form .full-width {
          grid-column: 1 / -1;
        }

        .record-form input,
        .record-form select,
        .record-form textarea {
          width: 100%;
          padding: 13px 14px;
          border: 1px solid rgba(37, 99, 235, 0.24);
          border-radius: 13px;
          outline: none;
          background: rgba(255, 255, 255, 0.58);
          color: #071b38;
          font: inherit;
        }

        .record-form input:focus,
        .record-form select:focus,
        .record-form textarea:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        .upload-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 22px;
        }

        .error-message,
        .medical-notice,
        .warning-block {
          margin-top: 18px;
          padding: 14px 16px;
          border-radius: 14px;
          line-height: 1.55;
        }

        .error-message {
          border: 1px solid rgba(220, 38, 38, 0.22);
          background: rgba(254, 226, 226, 0.8);
          color: #991b1b;
        }

        .medical-notice,
        .warning-block {
          border: 1px solid rgba(245, 158, 11, 0.27);
          background: rgba(254, 243, 199, 0.72);
          color: #78350f;
        }

        .empty-analysis,
        .empty-records {
          padding: 55px 25px;
          text-align: center;
        }

        .empty-analysis span,
        .empty-records span {
          font-size: 48px;
        }

        .empty-analysis h4,
        .empty-records h4 {
          margin: 14px 0 8px;
          color: #071b38;
          font-size: 21px;
        }

        .empty-analysis p,
        .empty-records p {
          margin: 0;
          color: #54708b;
        }

        .analysis-block {
          padding: 18px 0;
          border-bottom: 1px solid rgba(37, 99, 235, 0.12);
        }

        .analysis-label {
          display: block;
          margin-bottom: 10px;
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1.1px;
          text-transform: uppercase;
        }

        .analysis-block p {
          margin: 0;
          color: #2e4f6d;
          line-height: 1.65;
        }

        .report-information-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 18px;
        }

        .report-information-grid div {
          padding: 13px;
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.45);
        }

        .report-information-grid small,
        .report-information-grid strong {
          display: block;
        }

        .report-information-grid small {
          margin-bottom: 5px;
          color: #61788e;
        }

        .report-information-grid strong {
          color: #071b38;
        }

        .condition-list,
        .medicine-list {
          display: grid;
          gap: 10px;
        }

        .condition-item,
        .detected-medicine {
          padding: 14px;
          border: 1px solid rgba(37, 99, 235, 0.14);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.43);
        }

        .condition-item strong,
        .detected-medicine strong {
          display: block;
          color: #071b38;
        }

        .condition-item small,
        .detected-medicine small {
          display: block;
          margin-top: 6px;
          color: #61788e;
          line-height: 1.5;
        }

        .detected-medicine p {
          margin-top: 5px;
          font-size: 14px;
        }

        .add-medicines-button {
          width: 100%;
          margin-top: 14px;
        }

        .saved-records-section {
          margin-top: 55px;
        }

        .saved-records-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .saved-records-heading h3 {
          margin: 0;
          color: #071b38;
          font-size: 31px;
        }

        .record-count {
          padding: 9px 13px;
          border-radius: 999px;
          background: rgba(37, 99, 235, 0.1);
          color: #1d4ed8;
          font-weight: 800;
        }

        .saved-records-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .saved-record-card {
          padding: 24px;
        }

        .saved-record-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .record-file-icon {
          display: grid;
          place-items: center;
          width: 52px;
          height: 52px;
          border-radius: 15px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          font-size: 24px;
        }

        .delete-record-button {
          width: 36px;
          height: 36px;
          border: 0;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.12);
          color: #dc2626;
          font-size: 24px;
          cursor: pointer;
        }

        .record-type {
          color: #2563eb;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .saved-record-card h4 {
          margin: 9px 0;
          color: #071b38;
          font-size: 21px;
        }

        .record-date,
        .record-notes {
          color: #56728c;
          line-height: 1.55;
        }

        .record-files {
          display: grid;
          gap: 8px;
          margin-top: 17px;
        }

        .record-file-row {
          display: flex;
          gap: 10px;
          padding: 10px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.43);
        }

        .record-file-row div {
          min-width: 0;
        }

        .record-file-row strong,
        .record-file-row small {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .record-file-row strong {
          color: #173b5c;
        }

        .record-file-row small {
          color: #688096;
        }

        .saved-analysis {
          margin-top: 16px;
          padding: 13px;
          border-radius: 13px;
          background: rgba(37, 99, 235, 0.1);
          color: #174c93;
        }

        .saved-analysis p {
          margin: 5px 0 0;
          font-size: 14px;
        }

        .dark-theme .records-label {
          border-color: rgba(96, 165, 250, 0.25);
          background: rgba(15, 23, 42, 0.72);
          color: #7dd3fc;
        }

        .dark-theme .records-heading h2,
        .dark-theme .panel-heading h3,
        .dark-theme .upload-zone h4,
        .dark-theme .selected-files h4,
        .dark-theme .file-information strong,
        .dark-theme .empty-analysis h4,
        .dark-theme .empty-records h4,
        .dark-theme .report-information-grid strong,
        .dark-theme .condition-item strong,
        .dark-theme .detected-medicine strong,
        .dark-theme .saved-records-heading h3,
        .dark-theme .saved-record-card h4,
        .dark-theme .record-file-row strong {
          color: #f8fafc;
        }

        .dark-theme .records-heading p,
        .dark-theme .panel-heading p,
        .dark-theme .upload-zone p,
        .dark-theme .empty-analysis p,
        .dark-theme .empty-records p,
        .dark-theme .record-date,
        .dark-theme .record-notes {
          color: #b6c7da;
        }

        .dark-theme .records-card,
        .dark-theme .saved-record-card {
          border-color: rgba(96, 165, 250, 0.24);
          background: linear-gradient(
            145deg,
            rgba(15, 35, 64, 0.95),
            rgba(17, 59, 82, 0.84)
          );
          box-shadow:
            0 25px 65px rgba(0, 0, 0, 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .dark-theme .upload-zone,
        .dark-theme .selected-file,
        .dark-theme .report-information-grid div,
        .dark-theme .condition-item,
        .dark-theme .detected-medicine,
        .dark-theme .record-file-row {
          background: rgba(15, 23, 42, 0.42);
        }

        .dark-theme .record-form label {
          color: #d6e4f2;
        }

        .dark-theme .record-form input,
        .dark-theme .record-form select,
        .dark-theme .record-form textarea {
          border-color: rgba(96, 165, 250, 0.22);
          background: rgba(15, 23, 42, 0.55);
          color: #f8fafc;
        }

        .dark-theme .analysis-block p {
          color: #c8d7e7;
        }

        @media (max-width: 1000px) {
          .records-layout {
            grid-template-columns: 1fr;
          }

          .saved-records-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .health-records-section {
            padding: 76px 16px;
          }

          .upload-panel,
          .analysis-panel {
            padding: 22px;
          }

          .record-form {
            grid-template-columns: 1fr;
          }

          .record-form .full-width {
            grid-column: auto;
          }

          .report-information-grid {
            grid-template-columns: 1fr;
          }

          .saved-records-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .saved-records-grid {
            grid-template-columns: 1fr;
          }

          .upload-actions {
            flex-direction: column;
          }

          .upload-actions button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

export default HealthRecords;