import * as Lucide from 'lucide-react';

interface SecurityBadgeProps {
  icon: string;
  label: string;
  status: 'active' | 'inactive';
}

export function SecurityBadge({ icon, label, status }: SecurityBadgeProps) {
  // Dynamically resolve icon from Lucide
  const IconComponent = (Lucide as any)[icon] || Lucide.Shield;

  return (
    <div className="flex items-center space-x-2 rounded border border-ksp-gray-200 bg-white px-2.5 py-1.5 shadow-sm dark:bg-ksp-navy-dark dark:border-ksp-navy-light">
      <IconComponent className={`h-4 w-4 ${status === 'active' ? 'text-ksp-success' : 'text-ksp-gray-600'}`} />
      <span className="font-mono text-xs text-ksp-gray-800 dark:text-ksp-gray-100">{label}</span>
      <span className={`h-1.5 w-1.5 rounded-full ${status === 'active' ? 'bg-ksp-success animate-pulse' : 'bg-ksp-gray-600'}`} />
    </div>
  );
}
