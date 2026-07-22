import { useMemo, useState } from "react";

const initialMembers = [
  {
    id: 1,
    name: "Father",
    age: 48,
    blood: "B+",
    relation: "Primary Guardian",
    phone: "+91 98765 43210",
    status: "Stable",
    icon: "👨",
  },
  {
    id: 2,
    name: "Mother",
    age: 44,
    blood: "A+",
    relation: "Family Caregiver",
    phone: "+91 98765 43211",
    status: "Healthy",
    icon: "👩",
  },
  {
    id: 3,
    name: "Grandmother",
    age: 72,
    blood: "O+",
    relation: "Senior Member",
    phone: "+91 98765 43212",
    status: "Needs Attention",
    icon: "👵",
  },
  {
    id: 4,
    name: "You",
    age: 18,
    blood: "B+",
    relation: "Account Owner",
    phone: "+91 98765 43213",
    status: "Healthy",
    icon: "🧑",
  },
];

const memberIcons = ["👨", "👩", "👵", "👴", "🧑", "👧", "👦", "👶"];

function FamilyMembers() {
  const [members, setMembers] = useState(initialMembers);
  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    age: "",
    blood: "",
    phone: "",
    icon: "🧑",
  });

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const query = searchTerm.toLowerCase();

      return (
        member.name.toLowerCase().includes(query) ||
        member.relation.toLowerCase().includes(query) ||
        member.blood.toLowerCase().includes(query)
      );
    });
  }, [members, searchTerm]);

  const healthyMembers = members.filter(
    (member) => member.status === "Healthy" || member.status === "Stable"
  ).length;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const addMember = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.relation.trim() ||
      !formData.age ||
      !formData.blood.trim() ||
      !formData.phone.trim()
    ) {
      alert("Please fill in all family member details.");
      return;
    }

    const newMember = {
      id: Date.now(),
      name: formData.name.trim(),
      relation: formData.relation.trim(),
      age: Number(formData.age),
      blood: formData.blood.trim().toUpperCase(),
      phone: formData.phone.trim(),
      status: "Healthy",
      icon: formData.icon,
    };

    setMembers((previousMembers) => [...previousMembers, newMember]);

    setFormData({
      name: "",
      relation: "",
      age: "",
      blood: "",
      phone: "",
      icon: "🧑",
    });

    setShowForm(false);
  };

  const deleteMember = (memberId) => {
    setMembers((previousMembers) =>
      previousMembers.filter((member) => member.id !== memberId)
    );

    if (selectedMember?.id === memberId) {
      setSelectedMember(null);
    }
  };

  const getStatusClass = (status) => {
    if (status === "Needs Attention") return "member-attention";
    if (status === "Stable") return "member-stable";
    return "member-healthy";
  };

  return (
    <section id="family" className="family-section">
      <div className="family-container">
        <div className="family-heading" data-aos="fade-up">
          <span className="family-label">FAMILY HEALTH PROFILES</span>
          <h2>Manage Everyone From One Place</h2>
          <p>
            Keep essential health details, emergency contacts and profile
            information organized for every family member.
          </p>
        </div>

        <div className="family-summary" data-aos="fade-up">
          <div>
            <span className="family-label">FAMILY OVERVIEW</span>
            <h3>{members.length} profiles connected</h3>
            <p>
              {healthyMembers} members currently show a healthy or stable
              status.
            </p>
          </div>

          <div className="family-summary-stats">
            <div>
              <strong>{members.length}</strong>
              <span>Profiles</span>
            </div>

            <div>
              <strong>{healthyMembers}</strong>
              <span>Healthy</span>
            </div>
          </div>

          <button
            type="button"
            className="add-member-button"
            onClick={() => setShowForm((current) => !current)}
          >
            {showForm ? "✕ Close Form" : "＋ Add Member"}
          </button>
        </div>

        {showForm && (
          <form className="member-form" onSubmit={addMember} data-aos="zoom-in">
            <div className="member-form-heading">
              <div>
                <span className="family-label">NEW PROFILE</span>
                <h3>Add Family Member</h3>
              </div>
              <span className="member-form-icon">👨‍👩‍👧‍👦</span>
            </div>

            <div className="member-form-grid">
              <label>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Example: Brother"
                />
              </label>

              <label>
                <span>Relationship</span>
                <input
                  type="text"
                  name="relation"
                  value={formData.relation}
                  onChange={handleChange}
                  placeholder="Example: Younger Brother"
                />
              </label>

              <label>
                <span>Age</span>
                <input
                  type="number"
                  name="age"
                  min="0"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                />
              </label>

              <label>
                <span>Blood group</span>
                <input
                  type="text"
                  name="blood"
                  value={formData.blood}
                  onChange={handleChange}
                  placeholder="Example: O+"
                />
              </label>

              <label>
                <span>Emergency phone</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </label>

              <label>
                <span>Profile icon</span>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                >
                  {memberIcons.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </label>

              <button type="submit" className="save-member-button">
                Save Member
              </button>
            </div>
          </form>
        )}

        <div className="family-toolbar" data-aos="fade-up">
          <div className="family-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search family profiles..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <span>{filteredMembers.length} profiles shown</span>
        </div>

        <div className="family-grid">
          {filteredMembers.length === 0 ? (
            <div className="family-empty" data-aos="fade-up">
              <div>👨‍👩‍👧‍👦</div>
              <h3>No family profiles found</h3>
              <p>Try another search term or add a new family member.</p>
            </div>
          ) : (
            filteredMembers.map((member, index) => (
              <article
                key={member.id}
                className="member-card"
                data-aos="flip-left"
                data-aos-delay={index * 80}
              >
                <div className="member-card-top">
                  <div className="member-avatar">{member.icon}</div>

                  <button
                    type="button"
                    className="delete-member-button"
                    onClick={() => deleteMember(member.id)}
                    aria-label={`Delete ${member.name}`}
                  >
                    🗑
                  </button>
                </div>

                <h3>{member.name}</h3>
                <p className="member-relation">{member.relation}</p>

                <span
                  className={`member-status ${getStatusClass(member.status)}`}
                >
                  ● {member.status}
                </span>

                <div className="member-details-grid">
                  <div>
                    <strong>{member.age}</strong>
                    <span>Age</span>
                  </div>

                  <div>
                    <strong className="blood-value">{member.blood}</strong>
                    <span>Blood Group</span>
                  </div>
                </div>

                <div className="member-phone">
                  <span>📞</span>
                  <div>
                    <small>Emergency Contact</small>
                    <strong>{member.phone}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="view-profile-button"
                  onClick={() => setSelectedMember(member)}
                >
                  View Health Profile
                </button>
              </article>
            ))
          )}
        </div>
      </div>

      {selectedMember && (
        <div
          className="member-modal-backdrop"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="member-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="member-modal-close"
              onClick={() => setSelectedMember(null)}
            >
              ✕
            </button>

            <div className="modal-member-avatar">{selectedMember.icon}</div>
            <span className="family-label">{selectedMember.relation}</span>
            <h3>{selectedMember.name}</h3>

            <div className="modal-member-details">
              <div>
                <span>Age</span>
                <strong>{selectedMember.age}</strong>
              </div>

              <div>
                <span>Blood Group</span>
                <strong>{selectedMember.blood}</strong>
              </div>

              <div>
                <span>Health Status</span>
                <strong>{selectedMember.status}</strong>
              </div>
            </div>

            <div className="modal-contact">
              📞 {selectedMember.phone}
            </div>

            <p>
              This demo profile can later be connected to medicines,
              appointments, vaccination history and health records.
            </p>
          </div>
        </div>
      )}

      <style>
        {`
          .family-section {
            position: relative;
            padding: 100px 6%;
            background:
              radial-gradient(circle at 12% 15%, rgba(6,182,212,.1), transparent 28%),
              radial-gradient(circle at 88% 85%, rgba(37,99,235,.1), transparent 26%),
              linear-gradient(135deg, #f8feff, #f3f7ff);
          }

          .family-container {
            max-width: 1180px;
            margin: 0 auto;
          }

          .family-heading {
            max-width: 760px;
            margin: 0 auto 42px;
            text-align: center;
          }

          .family-label {
            color: #2563eb;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 1.5px;
          }

          .family-heading h2 {
            margin: 10px 0 14px;
            color: #102a46;
            font-size: clamp(34px, 5vw, 50px);
            letter-spacing: -1.5px;
          }

          .family-heading p,
          .family-summary p,
          .family-empty p,
          .member-modal p {
            color: #64748b;
            line-height: 1.7;
          }

          .family-heading p {
            margin: 0;
            font-size: 18px;
          }

          .family-summary,
          .member-form,
          .family-toolbar,
          .member-card,
          .family-empty,
          .member-modal {
            border: 1px solid rgba(255,255,255,.86);
            background: rgba(255,255,255,.78);
            box-shadow: 0 20px 55px rgba(30,64,175,.1);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
          }

          .family-summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            padding: 28px;
            margin-bottom: 24px;
            border-radius: 28px;
          }

          .family-summary h3,
          .member-form-heading h3,
          .member-card h3,
          .family-empty h3,
          .member-modal h3 {
            color: #102a46;
          }

          .family-summary h3 {
            margin: 8px 0;
            font-size: 25px;
          }

          .family-summary p {
            margin: 0;
          }

          .family-summary-stats {
            display: flex;
            gap: 12px;
          }

          .family-summary-stats div {
            min-width: 88px;
            padding: 14px;
            text-align: center;
            border-radius: 16px;
            background: linear-gradient(135deg, #dbeafe, #cffafe);
          }

          .family-summary-stats strong,
          .family-summary-stats span {
            display: block;
          }

          .family-summary-stats strong {
            color: #1d4ed8;
            font-size: 24px;
          }

          .family-summary-stats span {
            margin-top: 3px;
            color: #64748b;
            font-size: 11px;
            font-weight: 800;
          }

          .add-member-button,
          .save-member-button,
          .delete-member-button,
          .view-profile-button,
          .member-modal-close {
            border: none;
            cursor: pointer;
            font-weight: 800;
            transition: transform .22s ease, box-shadow .22s ease;
          }

          .add-member-button {
            min-width: 150px;
            padding: 14px 20px;
            color: #fff;
            border-radius: 14px;
            background: linear-gradient(135deg, #2563eb, #06b6d4);
            box-shadow: 0 14px 28px rgba(37,99,235,.22);
          }

          .add-member-button:hover,
          .save-member-button:hover,
          .delete-member-button:hover,
          .view-profile-button:hover {
            transform: translateY(-2px);
          }

          .member-form {
            padding: 28px;
            margin-bottom: 24px;
            border-radius: 26px;
          }

          .member-form-heading {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 22px;
          }

          .member-form-heading h3 {
            margin: 7px 0 0;
            font-size: 24px;
          }

          .member-form-icon {
            width: 54px;
            height: 54px;
            display: grid;
            place-items: center;
            border-radius: 16px;
            background: rgba(37,99,235,.12);
            font-size: 25px;
          }

          .member-form-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            align-items: end;
            gap: 15px;
          }

          .member-form-grid label {
            display: grid;
            gap: 8px;
            color: #475569;
            font-size: 13px;
            font-weight: 800;
          }

          .member-form-grid input,
          .member-form-grid select,
          .family-search input {
            width: 100%;
            box-sizing: border-box;
            color: #1e293b;
            border: 1px solid #cbd5e1;
            outline: none;
            background: rgba(248,250,252,.92);
            font-size: 15px;
          }

          .member-form-grid input,
          .member-form-grid select {
            padding: 13px 14px;
            border-radius: 12px;
          }

          .member-form-grid input:focus,
          .member-form-grid select:focus,
          .family-search:focus-within {
            border-color: #2563eb;
            box-shadow: 0 0 0 4px rgba(37,99,235,.1);
          }

          .save-member-button {
            padding: 14px 18px;
            color: #fff;
            border-radius: 12px;
            background: linear-gradient(135deg, #10b981, #059669);
          }

          .family-toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            padding: 18px;
            margin-bottom: 24px;
            border-radius: 22px;
          }

          .family-toolbar > span {
            color: #64748b;
            font-size: 13px;
            font-weight: 800;
          }

          .family-search {
            min-width: 280px;
            max-width: 460px;
            flex: 1;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0 14px;
            border: 1px solid #cbd5e1;
            border-radius: 13px;
            background: rgba(248,250,252,.92);
          }

          .family-search input {
            padding: 13px 0;
            border: none;
            background: transparent;
          }

          .family-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }

          .member-card {
            padding: 24px;
            border-radius: 24px;
            transition: transform .25s ease, box-shadow .25s ease;
          }

          .member-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 26px 58px rgba(30,64,175,.15);
          }

          .member-card-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
          }

          .member-avatar {
            width: 76px;
            height: 76px;
            display: grid;
            place-items: center;
            border-radius: 24px;
            background: linear-gradient(135deg, #dbeafe, #cffafe);
            font-size: 40px;
          }

          .delete-member-button {
            width: 38px;
            height: 38px;
            color: #dc2626;
            border-radius: 10px;
            background: #fee2e2;
          }

          .member-card h3 {
            margin: 19px 0 5px;
            font-size: 23px;
          }

          .member-relation {
            margin: 0 0 12px;
            color: #2563eb;
            font-size: 14px;
            font-weight: 800;
          }

          .member-status {
            display: inline-block;
            padding: 7px 10px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 900;
          }

          .member-healthy {
            color: #15803d;
            background: #dcfce7;
          }

          .member-stable {
            color: #1d4ed8;
            background: #dbeafe;
          }

          .member-attention {
            color: #b45309;
            background: #fef3c7;
          }

          .member-details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin: 18px 0;
          }

          .member-details-grid div {
            padding: 13px;
            text-align: center;
            border-radius: 14px;
            background: #f8fafc;
          }

          .member-details-grid strong,
          .member-details-grid span {
            display: block;
          }

          .member-details-grid strong {
            color: #102a46;
            font-size: 19px;
          }

          .member-details-grid .blood-value {
            color: #dc2626;
          }

          .member-details-grid span {
            margin-top: 4px;
            color: #64748b;
            font-size: 11px;
            font-weight: 700;
          }

          .member-phone {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px;
            border-radius: 14px;
            background: #eff6ff;
          }

          .member-phone small,
          .member-phone strong {
            display: block;
          }

          .member-phone small {
            color: #64748b;
            font-size: 10px;
          }

          .member-phone strong {
            margin-top: 2px;
            color: #1e3a8a;
            font-size: 13px;
          }

          .view-profile-button {
            width: 100%;
            margin-top: 18px;
            padding: 12px;
            color: #fff;
            border-radius: 11px;
            background: linear-gradient(135deg, #2563eb, #06b6d4);
          }

          .family-empty {
            grid-column: 1 / -1;
            padding: 48px 20px;
            text-align: center;
            border-radius: 24px;
          }

          .family-empty div {
            font-size: 44px;
          }

          .family-empty h3 {
            margin: 14px 0 7px;
          }

          .family-empty p {
            margin: 0;
          }

          .member-modal-backdrop {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: grid;
            place-items: center;
            padding: 20px;
            background: rgba(2,6,23,.62);
          }

          .member-modal {
            position: relative;
            width: min(460px, 100%);
            padding: 34px;
            text-align: center;
            border-radius: 28px;
          }

          .member-modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 38px;
            height: 38px;
            color: #475569;
            border-radius: 10px;
            background: #eef2ff;
          }

          .modal-member-avatar {
            width: 90px;
            height: 90px;
            margin: 0 auto 18px;
            display: grid;
            place-items: center;
            border-radius: 28px;
            background: linear-gradient(135deg, #dbeafe, #cffafe);
            font-size: 48px;
          }

          .member-modal h3 {
            margin: 10px 0 20px;
            font-size: 28px;
          }

          .modal-member-details {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 18px;
          }

          .modal-member-details div {
            padding: 13px;
            border-radius: 14px;
            background: #f8fafc;
          }

          .modal-member-details span,
          .modal-member-details strong {
            display: block;
          }

          .modal-member-details span {
            color: #64748b;
            font-size: 10px;
          }

          .modal-member-details strong {
            margin-top: 4px;
            color: #102a46;
            font-size: 14px;
          }

          .modal-contact {
            padding: 13px;
            color: #1d4ed8;
            border-radius: 14px;
            background: #eff6ff;
            font-weight: 800;
          }

          .member-modal p {
            margin: 20px 0 0;
            font-size: 14px;
          }

          .dark-theme .family-section {
            background:
              radial-gradient(circle at 12% 15%, rgba(6,182,212,.14), transparent 28%),
              radial-gradient(circle at 88% 85%, rgba(37,99,235,.16), transparent 26%),
              linear-gradient(135deg, #07111f, #0b1a2d);
          }

          .dark-theme .family-summary,
          .dark-theme .member-form,
          .dark-theme .family-toolbar,
          .dark-theme .member-card,
          .dark-theme .family-empty,
          .dark-theme .member-modal {
            background: rgba(15,23,42,.8);
            border-color: rgba(96,165,250,.14);
            box-shadow: 0 20px 55px rgba(0,0,0,.25);
          }

          .dark-theme .family-heading h2,
          .dark-theme .family-summary h3,
          .dark-theme .member-form-heading h3,
          .dark-theme .member-card h3,
          .dark-theme .family-empty h3,
          .dark-theme .member-modal h3,
          .dark-theme .member-details-grid strong,
          .dark-theme .modal-member-details strong {
            color: #f8fafc;
          }

          .dark-theme .family-heading p,
          .dark-theme .family-summary p,
          .dark-theme .family-empty p,
          .dark-theme .member-modal p,
          .dark-theme .family-toolbar > span {
            color: #b7c8dc;
          }

          .dark-theme .member-form-grid label {
            color: #dbeafe;
          }

          .dark-theme .member-form-grid input,
          .dark-theme .member-form-grid select,
          .dark-theme .family-search,
          .dark-theme .member-details-grid div,
          .dark-theme .modal-member-details div {
            color: #f8fafc;
            border-color: #334155;
            background: #111c2e;
          }

          .dark-theme .family-search input {
            color: #f8fafc;
          }

          .dark-theme .member-phone,
          .dark-theme .modal-contact {
            background: rgba(37,99,235,.14);
          }

          .dark-theme .member-phone strong {
            color: #93c5fd;
          }

          @media (max-width: 1050px) {
            .family-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .member-form-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .family-summary {
              flex-wrap: wrap;
            }
          }

          @media (max-width: 700px) {
            .family-summary {
              align-items: flex-start;
              flex-direction: column;
            }

            .family-summary-stats {
              width: 100%;
            }

            .family-summary-stats div {
              flex: 1;
            }

            .add-member-button {
              width: 100%;
            }

            .family-toolbar {
              align-items: stretch;
              flex-direction: column;
            }

            .family-search {
              max-width: none;
            }
          }

          @media (max-width: 560px) {
            .family-section {
              padding: 82px 18px;
            }

            .family-grid,
            .member-form-grid {
              grid-template-columns: 1fr;
            }

            .family-search {
              min-width: 0;
            }

            .modal-member-details {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </section>
  );
}

export default FamilyMembers;