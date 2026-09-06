import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import { useLanguage, formatDynamicText } from '@/context/LanguageContext';

export function RoleSwitcher() {
  const { role, switchRole } = useAuth();
  const { t, language } = useLanguage();

  const roles: { value: UserRole; label: string; desc: string }[] = [
    { value: 'investigator', label: 'Investigator', desc: 'Own district cases, chatbot, face search, offender profiles.' },
    { value: 'analyst', label: 'Analyst', desc: 'State-wide data, all dashboards, network graphs.' },
    { value: 'supervisor', label: 'Supervisor', desc: 'Team activity and audit logs.' },
    { value: 'policymaker', label: 'Policymaker', desc: 'Aggregate trends only — no personally identifiable info.' }
  ];

  return (
    <div className="rounded-lg border border-ksp-gray-200 bg-white p-4 shadow-sm dark:bg-ksp-navy-dark dark:border-ksp-navy-light font-sans text-left select-none">
      <h3 className="font-mono text-sm font-bold text-ksp-navy dark:text-ksp-gray-100 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-ksp-red animate-ping" />
        {t('demoRoleSwitcher') || 'DEMO ROLE SWITCHER'}
      </h3>
      <p className="mt-1 text-xs text-ksp-gray-600 dark:text-ksp-gray-300">
        {t('demoRoleSwitcherDesc') || 'Demo purposes only. In production, roles are enforced via Catalyst IAM permissions.'}
      </p>

      <div className="mt-4">
        <label className="block text-xs font-semibold text-ksp-gray-800 dark:text-ksp-gray-200">
          {t('switchCurrentRole') || 'Switch Current Role'}
        </label>
        <select
          value={role || 'investigator'}
          onChange={(e) => switchRole(e.target.value as UserRole)}
          className="mt-1 block w-full rounded border border-ksp-gray-300 bg-ksp-gray-50 px-3 py-1.5 text-sm outline-none focus:border-ksp-navy dark:bg-ksp-navy-light dark:border-ksp-navy-light dark:text-white"
        >
          {roles.map((r) => (
            <option key={r.value} value={r.value}>
              {formatDynamicText(r.label, language)}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3 rounded bg-ksp-gray-50 p-2.5 dark:bg-ksp-navy-light/30">
        <span className="text-[11px] font-bold text-ksp-navy dark:text-ksp-gray-200">
          {t('accessPermissionForRole') || 'ACCESS PERMISSION FOR THIS ROLE:'}
        </span>
        <p className="text-xs text-ksp-gray-800 dark:text-ksp-gray-300 mt-0.5">
          {formatDynamicText(roles.find((r) => r.value === role)?.desc || '', language)}
        </p>
      </div>
    </div>
  );
}
