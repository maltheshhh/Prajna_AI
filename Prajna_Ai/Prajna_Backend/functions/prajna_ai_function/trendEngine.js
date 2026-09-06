async function getTrendAnalytics(db) {

    const firs = await db
        .collection("firs")
        .find({})
        .toArray();

    const monthlyMap = {};
    const crimeMap = {};
    const districtMap = {};

    let openCases = 0;
    let closedCases = 0;

    firs.forEach(fir => {

        // Monthly Trend
        const month = new Date(fir.dateOfOffence)
            .toLocaleString("default", { month: "short" });

        monthlyMap[month] = (monthlyMap[month] || 0) + 1;

        // Crime Types
        const crime = fir.crimeType || "Unknown";
        crimeMap[crime] = (crimeMap[crime] || 0) + 1;

        // Districts
        const district = fir.district || "Unknown";
        districtMap[district] = (districtMap[district] || 0) + 1;

        // Status
        if ((fir.status || "").toLowerCase() === "open")
            openCases++;
        else
            closedCases++;
    });

    return {

    totalFIRs: firs.length,

    firs,          

    monthlyTrend: Object.entries(monthlyMap).map(([month, count]) => ({
        month,
        count
    })),

    crimeTypes: Object.entries(crimeMap).map(([crime, count]) => ({
        crime,
        count
    })),

    districts: Object.entries(districtMap).map(([district, count]) => ({
        district,
        count
    })),

    status: {
        open: openCases,
        closed: closedCases
    }

};
}

async function getSociologicalAnalytics(db) {

    const firs = await db
        .collection("firs")
        .find({})
        .toArray();

    const ageGroups = {
        "18-25 yrs": 0,
        "26-35 yrs": 0,
        "36-45 yrs": 0,
        "46+ yrs": 0
    };

    const genderGroups = {
        Male: 0,
        Female: 0,
        Other: 0
    };

    firs.forEach(fir => {

    const people = [
        ...(fir.accusedNames || []),
        ...(fir.victimNames || [])
    ];

    people.forEach(person => {

        const age = Number(person.age);

        if (!isNaN(age)) {

            if (age >= 18 && age <= 25)
                ageGroups["18-25 yrs"]++;

            else if (age >= 26 && age <= 35)
                ageGroups["26-35 yrs"]++;

            else if (age >= 36 && age <= 45)
                ageGroups["36-45 yrs"]++;

            else if (age >= 46)
                ageGroups["46+ yrs"]++;
        }

        const gender = (person.gender || "").trim().toLowerCase();

        if (gender === "male")
            genderGroups.Male++;

        else if (gender === "female")
            genderGroups.Female++;

        else
            genderGroups.Other++;
    });

});

    return {
        ageData: Object.entries(ageGroups).map(([group, count]) => ({
            group,
            count
        })),

        genderData: Object.entries(genderGroups).map(([name, count]) => ({
            name,
            count
        }))
    };
}

module.exports = {
    getTrendAnalytics,
    getSociologicalAnalytics
}
