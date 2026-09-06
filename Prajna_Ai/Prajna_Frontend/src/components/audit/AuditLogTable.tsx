import { useState } from 'react';
import { AuditLogEntry } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import * as Lucide from 'lucide-react';

interface AuditLogTableProps {
  logs: AuditLogEntry[];
}

export function AuditLogTable({ logs }: AuditLogTableProps) {
  const { t } = useLanguage();
  const [filterAction, setFilterAction] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<'timestamp' | 'responseTime'>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const itemsPerPage = 10;

  // Filter logic
  const filteredLogs = logs.filter(log => {
    if (filterAction !== 'all' && log.action !== filterAction) return false;
    return true;
  });

  // Sort logic
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'timestamp') {
      comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    } else if (sortField === 'responseTime') {
      comparison = (a.responseTime || 0) - (b.responseTime || 0);
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Paginated logic
  const totalPages = Math.ceil(sortedLogs.length / itemsPerPage);
  const paginatedLogs = sortedLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getActionBadgeClass = (action: string) => {
    switch (action) {
      case 'QUERY': return 'bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300';
      case 'EXPORT_PDF': return 'bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300';
      case 'FACE_SEARCH': return 'bg-orange-100 text-orange-800 dark:bg-orange-950/30 dark:text-orange-300';
      case 'ROLE_CHANGE': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300';
      default: return 'bg-gray-100 text-ksp-gray-800 dark:bg-ksp-navy-light dark:text-white';
    }
  };

  const toggleSort = (field: 'timestamp' | 'responseTime') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const actionTypes = Array.from(new Set(logs.map(l => l.action)));

  return (
    <div className="rounded-lg border border-ksp-gray-200 bg-white p-5 shadow-sm dark:bg-ksp-navy-dark dark:border-ksp-navy-light text-xs font-sans">
      
      {/* Filters header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 mb-4 select-none">
        <div className="flex items-center space-x-2">
          <Lucide.ShieldCheck className="h-5 w-5 text-ksp-navy dark:text-sky-300" />
          <h3 className="font-extrabold text-sm text-ksp-navy dark:text-white uppercase tracking-wider">
            {t('immutableSecurityAuditLogs')}
          </h3>
          <span className="rounded bg-ksp-red/10 border border-ksp-red/35 px-1.5 py-0.5 text-[9px] font-bold text-ksp-red font-mono">
            {t('tamperProofRecord')}
          </span>
        </div>

        {/* Filter Selection */}
        <div className="flex items-center space-x-1.5">
          <span className="font-bold text-ksp-gray-600 dark:text-ksp-gray-300">{t('actionFilter')}</span>
          <select
            value={filterAction}
            onChange={(e) => { setFilterAction(e.target.value); setCurrentPage(1); }}
            className="rounded border border-ksp-gray-300 bg-white px-2 py-1 outline-none dark:bg-ksp-navy dark:border-ksp-navy-light dark:text-white"
          >
            <option value="all">{t('allActions')}</option>
            {actionTypes.map(act => (
              <option key={act} value={act}>{act}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-ksp-gray-200 font-bold text-ksp-gray-800 dark:border-ksp-navy-light dark:text-ksp-gray-200">
              <th className="py-2.5 cursor-pointer select-none font-mono" onClick={() => toggleSort('timestamp')}>
                {t('timestamp')} {sortField === 'timestamp' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th className="py-2.5">{t('user')}</th>
              <th className="py-2.5">{t('role')}</th>
              <th className="py-2.5">{t('action')}</th>
              <th className="py-2.5">{t('details')}</th>
              <th className="py-2.5">{t('ipAddress')}</th>
              <th className="py-2.5 cursor-pointer select-none font-mono" onClick={() => toggleSort('responseTime')}>
                {t('latency')} {sortField === 'responseTime' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ksp-gray-100 dark:divide-ksp-navy-light font-medium">
            {paginatedLogs.map((log) => (
              <tr key={log.id} className="hover:bg-ksp-gray-50/50 dark:hover:bg-ksp-navy-light/10">
                <td className="py-2.5 font-mono text-[10px] text-ksp-gray-600 dark:text-ksp-gray-300">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="py-2.5 font-bold text-ksp-navy dark:text-white">{log.userName}</td>
                <td className="py-2.5 font-mono text-[10px] uppercase text-ksp-gray-600 dark:text-ksp-gray-300">
                  {log.userRole}
                </td>
                <td className="py-2.5">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${getActionBadgeClass(log.action)}`}>
                    {log.action}
                  </span>
                </td>
                <td className="py-2.5 max-w-xs truncate text-ksp-gray-800 dark:text-ksp-gray-200" title={log.details}>
                  {log.details}
                </td>
                <td className="py-2.5 font-mono text-[10px] text-ksp-gray-600 dark:text-ksp-gray-300">
                  {log.ipAddress}
                </td>
                <td className="py-2.5 font-mono text-[10px] text-ksp-gray-600 dark:text-ksp-gray-300">
                  {log.responseTime ? `${log.responseTime}ms` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-ksp-gray-200 dark:border-ksp-navy-light mt-4 select-none">
          <span className="text-[10px] font-bold text-ksp-gray-600 dark:text-ksp-gray-400">
            {t('showingPage')} {currentPage} {t('of')} {totalPages} ({filteredLogs.length} {t('totalEntries')})
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 border border-ksp-gray-300 rounded hover:bg-ksp-gray-50 text-[10px] font-bold disabled:opacity-40 disabled:cursor-not-allowed dark:border-ksp-navy-light dark:text-white"
            >
              {t('previous')}
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 border border-ksp-gray-300 rounded hover:bg-ksp-gray-50 text-[10px] font-bold disabled:opacity-40 disabled:cursor-not-allowed dark:border-ksp-navy-light dark:text-white"
            >
              {t('next')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
