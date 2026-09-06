async function getNetworkGraph(db) {

    const graph = await db
        .collection("network_graph")
        .findOne({});

    return graph;

}

module.exports = {
    getNetworkGraph
};