const { getCrimeSummary } = require("./handler");

async function main() {
  const result = await getCrimeSummary(
    "Show vehicle theft trends in Shivamogga"
  );

  console.log(result);
}

main();