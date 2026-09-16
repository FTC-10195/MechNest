import { useState } from 'react';
import './AdminPanel.css';

const EMPTY_FORM = {
  title: '',
  teamNumber: '',
  teamName: '',
  description: '',
  imageLink: '',
  teamLink: '',
  cadLink: '',
  season: 'INTO THE DEEP',
  drivetrain: 'Mecanum Drive',
};

function AdminPanel({ isOpen, onClose, onAddDesign, isAuthenticated, onLogin, onLogout, isSupabaseConfigured }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [form, setForm] = useState(EMPTY_FORM);
  const [cadFile, setCadFile] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const valid = await onLogin(credentials.username, credentials.password);
    if (!valid) {
      setLoginError('That username or password is not correct.');
      return;
    }
    setLoginError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.title || !form.teamNumber || !form.description || (!form.cadLink && !cadFile)) {
      setFormMessage('Add a title, team number, description, and CAD link or file.');
      return;
    }

    setIsSaving(true);
    setFormMessage('');
    try {
      await onAddDesign({
        ...form,
        id: `admin-${Date.now()}`,
        imageLink: form.imageLink || './Images/MechNestLogo.png',
        tags: ['N/A'],
        season: ['N/A', form.season],
        drive: ['N/A', form.drivetrain],
        cadFile,
        cadText: cadFile ? cadFile.name : form.cadLink,
      });
      setForm(EMPTY_FORM);
      setCadFile(null);
      setFormMessage(isSupabaseConfigured ? 'Design published to the shared catalog.' : 'Design added to this browser’s catalog.');
    } catch (error) {
      setFormMessage(error.message || 'The design could not be saved.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="admin-panel" role="dialog" aria-modal="true" aria-labelledby="admin-panel-title">
        <div className="admin-panel-header">
          <div>
            <p className="eyebrow">Catalog administration</p>
            <h2 id="admin-panel-title">Manage designs</h2>
          </div>
          <button className="admin-close" type="button" onClick={onClose} aria-label="Close administration panel">×</button>
        </div>

        {!isAuthenticated ? (
          <form className="admin-login" onSubmit={handleLogin}>
            <p>Sign in to add a robot design and its CAD reference.</p>
            <label>{isSupabaseConfigured ? 'Email' : 'Username'}<input type={isSupabaseConfigured ? 'email' : 'text'} value={credentials.username} onChange={(event) => setCredentials({ ...credentials, username: event.target.value })} autoComplete="username" required /></label>
            <label>Password<input type="password" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} autoComplete="current-password" required /></label>
            {loginError && <p className="admin-error" role="alert">{loginError}</p>}
            <button className="admin-primary" type="submit">Sign in</button>
            <small>Use the administrator account created in Supabase Authentication.</small>
          </form>
        ) : (
          <>
            <div className="admin-session">
              <span>Signed in as administrator</span>
              <button type="button" onClick={onLogout}>Sign out</button>
            </div>
            <form className="design-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>Design title<input name="title" value={form.title} onChange={updateForm} placeholder="e.g. Atlas V2" required /></label>
                <label>Team number<input name="teamNumber" value={form.teamNumber} onChange={updateForm} placeholder="e.g. 10195" required /></label>
                <label>Team name<input name="teamName" value={form.teamName} onChange={updateForm} placeholder="Team name" /></label>
                <label>Season<select name="season" value={form.season} onChange={updateForm}><option>INTO THE DEEP</option><option>CENTERSTAGE</option><option>POWERPLAY</option><option>FREIGHT FRENZY</option><option>ULTIMATE GOAL</option></select></label>
                <label>Drivetrain<select name="drivetrain" value={form.drivetrain} onChange={updateForm}><option>Mecanum Drive</option><option>Tank Drive</option><option>Swerve Drive</option><option>X-Drive</option></select></label>
                <label>Robot image URL<input name="imageLink" value={form.imageLink} onChange={updateForm} placeholder="https://..." /></label>
              </div>
              <label>Description<textarea name="description" value={form.description} onChange={updateForm} rows="4" placeholder="What makes this design useful?" required /></label>
              <label>CAD link<input name="cadLink" value={form.cadLink} onChange={updateForm} placeholder="https://cad.onshape.com/..." /></label>
              <label className="file-field">Or upload a CAD file<input type="file" accept=".cad,.step,.stp,.sldprt,.obj,.stl,.zip,.pdf" onChange={(event) => setCadFile(event.target.files[0] || null)} /><span>{cadFile ? cadFile.name : 'Choose a file from this device'}</span></label>
              <label>Team website<input name="teamLink" value={form.teamLink} onChange={updateForm} placeholder="https://..." /></label>
              {formMessage && <p className="admin-message" role="status">{formMessage}</p>}
              <button className="admin-primary" type="submit" disabled={isSaving}>{isSaving ? 'Saving design...' : 'Add design to catalog'}</button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export default AdminPanel;