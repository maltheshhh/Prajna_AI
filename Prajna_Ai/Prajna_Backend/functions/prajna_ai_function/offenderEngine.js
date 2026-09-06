async function getOffenderProfiles(db) {

    const firs = await db
        .collection("firs")
        .find({})
        .toArray();

    const offenders = [];

    firs.forEach(fir => {

        (fir.accusedNames || []).forEach(person => {

            offenders.push({
    id: person.id || Math.random().toString(36),

    name: person.name || "Unknown",

    aliases: person.aliases || [],

    gender: person.gender || "Male",

    age: Number(person.age) || 0,

    district: fir.district,

    policeStation: fir.policeStation,

    crimeType: fir.crimeType,

    firNumber: fir.firNumber,

    status: fir.status,

    totalCases: 1,

    isRepeatOffender: false,

    moSignature: fir.crimeType,

    aadharHash: "XXXX-XXXX",

    lastKnownActivity: fir.dateOfRegistration,

    knownAddresses: [
        fir.policeStation + ", " + fir.district
    ],

    linkedFIRs: [
        fir.firNumber
    ],

    associateIds: [],

    riskScore: Math.floor(Math.random() * 40) + 60,

    riskTier:
        Math.random() > 0.7
            ? "high"
            : Math.random() > 0.4
            ? "medium"
            : "low"
});

        });

    });

    return offenders;

}

module.exports = {
    getOffenderProfiles
};