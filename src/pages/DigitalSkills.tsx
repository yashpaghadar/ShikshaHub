import { useState } from 'react';
import { useApp } from '../AppContext';
import { ProgressBar, StatusBadge } from '../components/ui';
import type { FileItem } from '../types';

export function DigitalSkillsPage() {
  const { t, digitalSkills, updateDigitalSkillProgress } = useApp();
  const [activeSim, setActiveSim] = useState<string | null>(null);

  const iconMap: Record<string, string> = {
    Monitor: 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z',
    Globe: 'M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z',
    Mail: 'M4 4h16v16H4zM22 6l-10 7L2 6',
    ShieldCheck: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4',
    Wallet: 'M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 100 4h3v-4z',
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 animate-fade-in sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{t('digitalSkillsHeading')}</h1>
      <p className="mt-1 text-sm text-gray-500">{t('digitalSkillsDesc')}</p>

      {/* Modules */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {digitalSkills.map((module) => (
          <div key={module.id} className="card-hover">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={iconMap[module.icon] || iconMap.Monitor} />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-ink">{module.title}</h3>
                <div className="mt-2"><ProgressBar value={module.progress} size="sm" /></div>
                <p className="mt-1 text-xs font-semibold text-gray-500">{module.progress}%</p>
              </div>
            </div>
            <ul className="mt-3 space-y-1">
              {module.topics.map((topic, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="text-secondary-600">✓</span> {topic}
                </li>
              ))}
            </ul>
            <button
              onClick={() => updateDigitalSkillProgress(module.id, Math.min(100, module.progress + 20))}
              className="mt-3 btn-outline w-full text-xs"
            >
              {t('continue')}
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Simulations */}
      <div className="mt-8 space-y-6">
        {/* Suspicious Message Sim */}
        <div className="card">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <h2 className="text-base font-bold text-ink">{t('spotSuspiciousMessage')}</h2>
              <p className="text-xs text-gray-500">{t('cyberSafety')}</p>
            </div>
          </div>
          {activeSim === 'suspicious' ? (
            <SuspiciousMessageSim onClose={() => setActiveSim(null)} />
          ) : (
            <>
              <p className="text-sm text-gray-600">{t('spotSuspiciousDesc')}</p>
              <button onClick={() => setActiveSim('suspicious')} className="mt-4 btn-primary w-full text-sm">
                {t('open')} ▶
              </button>
            </>
          )}
        </div>

        {/* File Management Sim */}
        <div className="card">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl">📁</span>
            <div>
              <h2 className="text-base font-bold text-ink">{t('fileManagementSim')}</h2>
              <p className="text-xs text-gray-500">{t('computerBasics')}</p>
            </div>
          </div>
          {activeSim === 'files' ? (
            <FileManagementSim onClose={() => setActiveSim(null)} />
          ) : (
            <>
              <p className="text-sm text-gray-600">{t('fileManagementDesc')}</p>
              <button onClick={() => setActiveSim('files')} className="mt-4 btn-primary w-full text-sm">
                {t('open')} ▶
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SuspiciousMessageSim({ onClose }: { onClose: () => void }) {
  const { t } = useApp();
  const [choice, setChoice] = useState<number | null>(null);

  const options = [
    { label: t('openTheLink'), safe: false },
    { label: t('ignoreTheMessage'), safe: true },
    { label: t('reportTheMessage'), safe: true },
  ];

  return (
    <div className="animate-fade-in">
      {/* Simulated message */}
      <div className="rounded-xl border-2 border-error-200 bg-error-50 p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-error-600">
          <span>⚠️</span> SMS / WhatsApp
        </div>
        <p className="mt-2 text-sm text-ink">
          "Congratulations! You have won ₹2,00,000. Click here to claim your prize now: <span className="text-error-600 underline">bit.ly/claim-prize</span>"
        </p>
      </div>

      <p className="mt-4 text-sm font-medium text-gray-700">{t('selectOption')}:</p>
      <div className="mt-2 space-y-2.5">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setChoice(i)}
            disabled={choice !== null}
            className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
              choice === i
                ? opt.safe
                  ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                  : 'border-error-500 bg-error-50 text-error-700'
                : 'border-gray-200 bg-white text-ink hover:border-primary-300 hover:bg-primary-50'
            }`}
          >
            <span>{opt.label}</span>
            {choice === i && (opt.safe ? <span>✓</span> : <span>✗</span>)}
          </button>
        ))}
      </div>

      {choice !== null && (
        <div className="mt-4 animate-fade-in">
          {options[choice].safe ? (
            <div className="rounded-xl bg-secondary-50 p-4">
              <p className="font-bold text-secondary-700">✓ {t('goodChoice')}</p>
              <p className="mt-1 text-sm text-secondary-600">{t('goodChoiceDesc')}</p>
            </div>
          ) : (
            <div className="rounded-xl bg-error-50 p-4">
              <p className="font-bold text-error-700">✗ {t('unsafeChoice')}</p>
              <p className="mt-1 text-sm text-error-600">{t('unsafeChoiceDesc')}</p>
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <button onClick={() => setChoice(null)} className="btn-outline text-sm">
              {t('retry')}
            </button>
            <button onClick={onClose} className="btn-ghost text-sm">
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FileManagementSim({ onClose }: { onClose: () => void }) {
  const { t, files, addFile, renameFile, deleteFile, moveFile } = useApp();
  const [selected, setSelected] = useState<string | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [targetFolder, setTargetFolder] = useState<string | null>(null);

  const rootFiles = files.filter((f) => f.parent === null);
  const selectedItem = files.find((f) => f.id === selected);
  const folders = files.filter((f) => f.type === 'folder' && f.id !== selected);

  const handleAction = (act: string) => {
    if (!selected) return;
    setAction(act);
    if (act === 'rename' && selectedItem) setInputValue(selectedItem.name);
    if (act === 'move') setTargetFolder(null);
  };

  const confirmAction = () => {
    if (!action || !selected) return;
    if (action === 'rename' && inputValue.trim()) {
      renameFile(selected, inputValue.trim());
    } else if (action === 'move') {
      moveFile(selected, targetFolder);
    } else if (action === 'delete') {
      deleteFile(selected);
    }
    setSelected(null);
    setAction(null);
    setInputValue('');
  };

  return (
    <div className="animate-fade-in">
      <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
        <p className="mb-3 text-xs font-semibold text-gray-500">Desktop</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {rootFiles.map((file) => (
            <button
              key={file.id}
              onClick={() => setSelected(file.id)}
              className={`flex flex-col items-center gap-1 rounded-xl p-3 transition-all ${
                selected === file.id ? 'bg-primary-100 ring-2 ring-primary-400' : 'hover:bg-white'
              }`}
            >
              <span className="text-3xl">{file.type === 'folder' ? '📁' : '📄'}</span>
              <span className="truncate text-xs font-medium text-ink">{file.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => { setAction('create'); setInputValue(''); }} className="btn-outline text-xs">
          + {t('createFolder')}
        </button>
        {selectedItem && (
          <>
            <button onClick={() => handleAction('rename')} className="btn-outline text-xs">
              ✏️ {t('rename')}
            </button>
            <button onClick={() => handleAction('move')} className="btn-outline text-xs">
              ↗ {t('move')}
            </button>
            <button onClick={() => handleAction('delete')} className="btn-danger text-xs">
              🗑 {t('delete')}
            </button>
          </>
        )}
      </div>

      {/* Action panel */}
      {action === 'create' && (
        <div className="mt-4 rounded-xl bg-primary-50 p-4">
          <p className="mb-2 text-sm font-medium text-ink">{t('createFolder')}</p>
          <input
            className="input"
            placeholder="Folder name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
          />
          <div className="mt-3 flex gap-2">
            <button onClick={() => { if (inputValue.trim()) addFile(inputValue.trim(), 'folder', null); setAction(null); setInputValue(''); }} className="btn-primary text-sm">
              {t('submit')}
            </button>
            <button onClick={() => setAction(null)} className="btn-ghost text-sm">{t('cancel')}</button>
          </div>
        </div>
      )}

      {action === 'rename' && selectedItem && (
        <div className="mt-4 rounded-xl bg-primary-50 p-4">
          <p className="mb-2 text-sm font-medium text-ink">{t('rename')}: {selectedItem.name}</p>
          <input
            className="input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
          />
          <div className="mt-3 flex gap-2">
            <button onClick={confirmAction} className="btn-primary text-sm">{t('submit')}</button>
            <button onClick={() => setAction(null)} className="btn-ghost text-sm">{t('cancel')}</button>
          </div>
        </div>
      )}

      {action === 'move' && selectedItem && (
        <div className="mt-4 rounded-xl bg-primary-50 p-4">
          <p className="mb-2 text-sm font-medium text-ink">{t('move')}: {selectedItem.name}</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTargetFolder(null)}
              className={`rounded-lg border-2 px-3 py-2 text-xs font-medium ${targetFolder === null ? 'border-primary-500 bg-primary-100' : 'border-gray-200 bg-white'}`}
            >
              🏠 Root
            </button>
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setTargetFolder(folder.id)}
                className={`rounded-lg border-2 px-3 py-2 text-xs font-medium ${targetFolder === folder.id ? 'border-primary-500 bg-primary-100' : 'border-gray-200 bg-white'}`}
              >
                📁 {folder.name}
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={confirmAction} className="btn-primary text-sm">{t('submit')}</button>
            <button onClick={() => setAction(null)} className="btn-ghost text-sm">{t('cancel')}</button>
          </div>
        </div>
      )}

      {action === 'delete' && selectedItem && (
        <div className="mt-4 rounded-xl bg-error-50 p-4">
          <p className="text-sm font-medium text-error-700">
            {t('delete')}: <strong>{selectedItem.name}</strong>?
          </p>
          <div className="mt-3 flex gap-2">
            <button onClick={confirmAction} className="btn-danger text-sm">{t('yes')}</button>
            <button onClick={() => setAction(null)} className="btn-ghost text-sm">{t('no')}</button>
          </div>
        </div>
      )}

      <button onClick={onClose} className="mt-4 btn-ghost text-sm">{t('close')}</button>
    </div>
  );
}
