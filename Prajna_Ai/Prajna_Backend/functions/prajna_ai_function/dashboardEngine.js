module.exports = async function getDashboardSummary(db) {
  try {
    const firs = await db.collection("firs").find({}).toArray();

    const totalFIRs = firs.length;

    const crimeCount = {};
    const districtCount = {};
    const offenderSet = new Set();
    let repeatOffenders = 0;

    let activeInvestigations = 0;
    let criticalHotspots = 0;

    firs.forEach(fir => {

      // Crime count
      const crime = fir.crimeType || "Unknown";
      crimeCount[crime] = (crimeCount[crime] || 0) + 1;

      // District count
      const district = fir.district || "Unknown";
      districtCount[district] = (districtCount[district] || 0) + 1;

      // Active investigations
      if ((fir.status || "").toLowerCase() === "open") {
        activeInvestigations++;
      }

      // Critical hotspots (High severity FIRs)
      if ((fir.severity || "").toLowerCase() === "high") {
        criticalHotspots++;
      }

      // Offenders
      if (fir.accusedNames) {
        fir.accusedNames.forEach(accused => {
          const name = accused.name || accused;

          if (offenderSet.has(name)) {
            repeatOffenders++;
          } else {
            offenderSet.add(name);
          }
        });
      }

    });

    const topCrime =
      Object.keys(crimeCount).sort(
        (a, b) => crimeCount[b] - crimeCount[a]
      )[0] || "N/A";

    const topDistrict =
      Object.keys(districtCount).sort(
        (a, b) => districtCount[b] - districtCount[a]
      )[0] || "N/A";

    const recommendations = [
      `Increase surveillance in ${topDistrict}.`,
      `Focus investigation on ${topCrime} cases.`,
      ...(repeatOffenders > 0
        ? ["Monitor repeat offenders across linked FIRs."]
        : []),
      "Deploy predictive patrols in crime hotspots."
    ];

    return {
      success: true,

      totalFIRs,
      activeInvestigations,
      criticalHotspots,
      knownOffenders: offenderSet.size,
      repeatOffenders,
      topCrime,
      topDistrict,
      recommendations,
      lastUpdated: new Date().toLocaleString(),

      briefing: {
        title: "Daily Crime Intelligence Briefing",

        summary: `Prajna-AI analyzed ${totalFIRs} FIR records across Karnataka.

Current intelligence indicates that ${topDistrict} is the most active crime district.

The most frequently reported offence is ${topCrime}.

${repeatOffenders} repeat offender links have been identified across the crime database.

All analytical engines and predictive modules are operational.`,

        recommendations,

        statistics: {
          totalFIRs,
          activeInvestigations,
          criticalHotspots,
          knownOffenders: offenderSet.size,
          repeatOffenders,
          topCrime,
          topDistrict,
          lastUpdated: new Date().toLocaleString()
        }
      }
    };

  } catch (err) {
    console.error(err);

    return {
      success: false,
      error: err.message
    };
  }
};