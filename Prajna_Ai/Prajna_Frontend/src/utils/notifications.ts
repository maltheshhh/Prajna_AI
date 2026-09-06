export interface PortalNotification {
  id: string;
  title: string;
  sub: string;
  time: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  route: string;
  badge: string;
  dotColor: string;
  unread?: boolean;
}

export function getLivePortalNotifications(): PortalNotification[] {
  const notifications: PortalNotification[] = [];

  // 1. Check Citizen Sighting Reports
  try {
    const sightingData = localStorage.getItem('ksp_face_sighting_reports');
    if (sightingData) {
      const sightings = JSON.parse(sightingData);
      if (Array.isArray(sightings) && sightings.length > 0) {
        sightings.slice(0, 2).forEach((s, idx) => {
          notifications.push({
            id: `sighting-${s.id || idx}`,
            title: `Citizen Sighting: ${s.suspect || 'Suspect'} (${s.confidence || 85}% Match)`,
            sub: `${s.location || 'Bengaluru'} • ${s.station || 'Jurisdictional PS'}`,
            time: 'Just now',
            type: 'critical',
            route: '/face-search',
            badge: 'BIOMETRICS',
            dotColor: 'bg-[#C62828]',
            unread: true
          });
        });
      }
    }
  } catch (e) {
    console.error('Error reading sighting notifications', e);
  }

  // 2. Check Emergency Incident Reports
  try {
    const generalData = localStorage.getItem('ksp_general_crime_reports');
    if (generalData) {
      const incidents = JSON.parse(generalData);
      if (Array.isArray(incidents) && incidents.length > 0) {
        incidents.slice(0, 2).forEach((inc, idx) => {
          notifications.push({
            id: `incident-${inc.id || idx}`,
            title: `Emergency Incident: ${inc.crimeType || 'Reported Incident'}`,
            sub: `${inc.location || 'Bengaluru'} • ${inc.status || 'Pending Dispatch'}`,
            time: '5 mins ago',
            type: 'warning',
            route: inc.routing?.redirectUrl || '/reports',
            badge: inc.routing?.department ? 'ROUTED' : 'DISPATCH',
            dotColor: 'bg-[#F57C00]',
            unread: !inc.status?.includes('Dispatched')
          });
        });
      }
    }
  } catch (e) {
    console.error('Error reading incident notifications', e);
  }

  // 3. High-Risk Recidivism Alert
  notifications.push({
    id: 'recidivism-0150',
    title: 'Recidivism Spike: Manjunath Kulkarni (70% Score)',
    sub: 'Raichur APMC Belt • Drug Offences Timeline Alert',
    time: '18 mins ago',
    type: 'critical',
    route: '/recidivism-engine',
    badge: 'QUICKML',
    dotColor: 'bg-[#C62828]'
  });

  // 4. Critical Hotspot Density Alert
  notifications.push({
    id: 'hotspot-0001',
    title: 'Critical Hotspot Spike: Tumakuru Taluk',
    sub: '16 incidents flagged • Resource deployment advised',
    time: '42 mins ago',
    type: 'warning',
    route: '/hotspots',
    badge: 'GIS INTEL',
    dotColor: 'bg-[#F57C00]'
  });

  // 5. FIU Financial Structuring Alert
  notifications.push({
    id: 'fiu-txn-0002',
    title: 'FIU Money Trail: ₹48,902 Structuring Detected',
    sub: 'Under ₹50,000 PMLA threshold • Linked to SUS-0147',
    time: '1 hour ago',
    type: 'info',
    route: '/financial',
    badge: 'FIU ALERT',
    dotColor: 'bg-[#00529B]'
  });

  // 6. Tactical Digital Twin Alert
  notifications.push({
    id: 'sim-alert-01',
    title: 'Tactical Deployment: Ingress SLA Cordon Alert',
    sub: 'Sub-2.5m intercept coverage available for Majestic Hub',
    time: '2 hours ago',
    type: 'success',
    route: '/operational-simulation',
    badge: 'TACTICAL',
    dotColor: 'bg-[#2E7D32]'
  });

  return notifications;
}
