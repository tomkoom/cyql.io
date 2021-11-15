export const fetchNftInfo = async (setNftItems, setLoading) => {
    setLoading(true);
    function handleFetchRes(data, name, link, img, salePrice) {
        data = data
            .split("\n")
            .map((str) => str.replace(/ /g, "").toLowerCase());

        const totalAssets = data.filter((str) =>
            str.includes("mintednfts:")
        )
            ? data.filter((str) => str.includes("mintednfts:")).toString()
            : "";

        const circulatingNfts = data
            .filter((str) => str.includes("circulatingnfts:"))
            .toString();

        const listings = data
            .filter((str) => str.includes("marketplacelistings:"))
            .toString();

        const sales = data
            .filter((str) => str.includes("soldviamarketplace:"))
            .toString();

        const salesInIcp = data
            .filter((str) => str.includes("soldviamarketplaceinicp:"))
            .toString();

        const avgPrice = data
            .filter((str) => str.includes("averagepriceicpviamarketplace:"))
            .toString();

        const nftProject = {
            name,
            link,
            img,
            totalAssets: totalAssets
                .replace("mintednfts:", "")
                .replace("_", ","),

            circulatingNfts: circulatingNfts
                .replace("circulatingnfts:", "")
                .replace("_", ","),

            listings: listings
                .replace("marketplacelistings:", "")
                .replace("_", ","),

            sales: sales
                .replace("soldviamarketplace:", "")
                .replace("_", ","),

            salesInIcp: salesInIcp
                .replace("soldviamarketplaceinicp:", "")
                .replace("_", ",")
                .replace("icp", ""),

            avgPrice: avgPrice
                .replace("averagepriceicpviamarketplace:", "")
                .replace("_", ",")
                .replace("icp", ""),

            salePrice,
        };

        return nftProject;
    }

    // Cronics
    const cronics = fetch(
        "https://e3izy-jiaaa-aaaah-qacbq-cai.raw.ic0.app/"
    )
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "Cronics",
                "https://entrepot.app/marketplace/cronics",
                "https://e3izy-jiaaa-aaaah-qacbq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=vfsjk-nakor-uwiaa-aaaaa-b4aaq-maqca-aadet-q"
            )
        );

    // ICPuppies
    const icPuppies = fetch(
        "https://njgly-uaaaa-aaaah-qb6pa-cai.raw.ic0.app/"
    )
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "ICPuppies",
                "https://entrepot.app/marketplace/icpuppies",
                "https://njgly-uaaaa-aaaah-qb6pa-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=slkgo-rakor-uwiaa-aaaaa-b4apt-yaqca-aacir-q",
                "0.4-1 ICP"
            )
        );

    // ICmojis
    const icMojis = fetch(
        "https://gevsk-tqaaa-aaaah-qaoca-cai.raw.ic0.app/"
    )
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "ICmojis",
                "https://entrepot.app/marketplace/icmojis",
                "https://gevsk-tqaaa-aaaah-qaoca-cai.raw.ic0.app/?tokenid=ydcn6-kikor-uwiaa-aaaaa-b4adq-qaqca-aaaj6-q"
            )
        );

    // Starverse
    const starverse = fetch(
        "https://nbg4r-saaaa-aaaah-qap7a-cai.raw.ic0.app/"
    )
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "Starverse",
                "https://entrepot.app/marketplace/starverse",
                "https://nbg4r-saaaa-aaaah-qap7a-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=gbxs5-sykor-uwiaa-aaaaa-b4ad7-yaqca-aabj4-a",
                "0 ICP"
            )
        );

    // Internet Astronauts
    const internetAstronauts = fetch(
        "https://sr4qi-vaaaa-aaaah-qcaaq-cai.raw.ic0.app/"
    )
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "Internet Astronauts",
                "https://entrepot.app/marketplace/interastrosc",
                "https://sr4qi-vaaaa-aaaah-qcaaq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=3yzwq-iykor-uwiaa-aaaaa-b4aqa-eaqca-aaad5-q"
            )
        );

    // ICTuTs
    const icTuts = fetch("https://ahl3d-xqaaa-aaaaj-qacca-cai.raw.ic0.app/")
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "ICTuTs",
                "https://entrepot.app/wallet/ictuts",
                "https://ahl3d-xqaaa-aaaaj-qacca-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=urleq-fikor-uwiaa-aaaaa-cmaaq-qaqca-aaext-a",
                "0.5-1.5 ICP"
            )
        );

    // ICelebrity
    const icelebrity = fetch(
        "https://kss7i-hqaaa-aaaah-qbvmq-cai.raw.ic0.app/"
    )
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "ICelebrity",
                "https://entrepot.app/marketplace/icelebrity",
                "https://kss7i-hqaaa-aaaah-qbvmq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=5qg5b-nykor-uwiaa-aaaaa-b4anl-eaqca-aaabb-q",
            )
        );

    // Faceted Meninas
    const facetedMeninas = fetch(
        "https://k4qsa-4aaaa-aaaah-qbvnq-cai.raw.ic0.app/"
    )
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "Faceted Meninas",
                "https://entrepot.app/marketplace/faceted-meninas",
                "https://k4qsa-4aaaa-aaaah-qbvnq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=slywj-kykor-uwiaa-aaaaa-b4anl-maqca-aaabc-q"
            )
        );

    // Wing
    const wing = fetch("https://73xld-saaaa-aaaah-qbjya-cai.raw.ic0.app/")
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "Wing",
                "https://entrepot.app/marketplace/wing",
                "https://73xld-saaaa-aaaah-qbjya-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=2eyec-cqkor-uwiaa-aaaaa-b4ako-aaqca-aaabl-a",
                "1.75 ICP"
            )
        );

    // ICPuzzle
    const icPuzzle = fetch(
        "https://owuqd-dyaaa-aaaah-qapxq-cai.raw.ic0.app/"
    )
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "ICPuzzle",
                "https://entrepot.app/marketplace/icpuzzle",
                "https://owuqd-dyaaa-aaaah-qapxq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=j4wxy-sakor-uwiaa-aaaaa-b4ad5-4aqca-aaaak-a"
            )
        );

    // ICPBunny
    const icpBunny = fetch(
        "https://q6hjz-kyaaa-aaaah-qcama-cai.raw.ic0.app/"
    )
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "ICPBunny",
                "https://entrepot.app/marketplace/icpbunny",
                "https://f2yud-3iaaa-aaaaf-qaehq-cai.raw.ic0.app/Token/1249",
                "0.35 ICP"
            )
        );

    // ICPunks
    const icPunks = fetch(
        "https://bxdf4-baaaa-aaaah-qaruq-cai.raw.ic0.app/"
    )
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "ICPunks",
                "https://entrepot.app/marketplace/icpunks",
                "https://qcg3w-tyaaa-aaaah-qakea-cai.raw.ic0.app/Token/29",
                "0 ICP"
            )
        );

    // ICDrip
    const icDrip = fetch("https://3db6u-aiaaa-aaaah-qbjbq-cai.raw.ic0.app/")
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "ICDrip",
                "https://entrepot.app/marketplace/icdrip",
                "https://d3ttm-qaaaa-aaaai-qam4a-cai.raw.ic0.app/?tokenId=5316",
                "0 ICP"
            )
        );

    // Poked bots
    const pokedBots = fetch("https://bzsui-sqaaa-aaaah-qce2a-cai.raw.ic0.app/")
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "Poked Bots",
                "https://entrepot.app/marketplace/poked",
                "https://bzsui-sqaaa-aaaah-qce2a-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=zmnyl-5ykor-uwiaa-aaaaa-b4arg-qaqca-aaaag-a",
                "4 ICP"
            )
        );

    // Infernal Vampire Colony
    const infernalVampires = fetch("https://gyuaf-kqaaa-aaaah-qceka-cai.raw.ic0.app/")
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "Infernal Vampire Colony",
                "https://entrepot.app/marketplace/ivc",
                "https://gyuaf-kqaaa-aaaah-qceka-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=qzaen-sykor-uwiaa-aaaaa-b4arc-qaqca-aaaj3-a",
                "1 ICP"
            )
        );

    // Motoko Day Drop
    const motokoDayDrop = fetch("https://oeee4-qaaaa-aaaak-qaaeq-cai.raw.ic0.app/")
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "Motoko Day Drop",
                "https://entrepot.app/marketplace/motoko",
                "https://oeee4-qaaaa-aaaak-qaaeq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=llmji-7akor-uwiaa-aaaaa-cuaab-eaqca-aadvo-q",
                "0 ICP"
            )
        );

    // Infinite Chimps
    const infiniteChimps = fetch("https://pnpu4-3aaaa-aaaah-qcceq-cai.raw.ic0.app/")
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "Infinite Chimps",
                "https://entrepot.app/marketplace/infinite-chimps",
                "https://pnpu4-3aaaa-aaaah-qcceq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=5n2cg-tykor-uwiaa-aaaaa-b4aqr-eaqca-aaabt-a",
            )
        );

    // IC3D
    const ic3D = fetch("https://nfvlz-jaaaa-aaaah-qcciq-cai.raw.ic0.app/")
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "IC3D",
                "https://entrepot.app/marketplace/ic3d",
                "https://nfvlz-jaaaa-aaaah-qcciq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=drnzn-yykor-uwiaa-aaaaa-b4aqs-eaqca-aaen3-a",
                "0.5 ICP"
            )
        );

    // Wild and West
    const wildAndWest = fetch("https://b5el6-hqaaa-aaaah-qcdhq-cai.raw.ic0.app/")
        .then((res) => res.text())
        .then((data) =>
            handleFetchRes(
                data,
                "Wild and West",
                "https://entrepot.app/marketplace/wildwest",
                "https://b5el6-hqaaa-aaaah-qcdhq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=xoufh-gqkor-uwiaa-aaaaa-b4aqz-4aqca-aaabt-q",
            )
        );

    await Promise.all([
        icPunks,
        pokedBots,
        cronics,
        icPuppies,
        motokoDayDrop,
        icDrip,
        icMojis,
        starverse,
        internetAstronauts,
        icpBunny,
        icTuts,
        icPuzzle,
        wing,
        facetedMeninas,
        infernalVampires,
        icelebrity,
        wildAndWest,
        infiniteChimps,
        ic3D,
    ]).then((nftData) => {
        nftData.sort((a, b) =>
            Math.floor(a.salesInIcp) > Math.floor(b.salesInIcp) ? -1 : 1
        );
        setNftItems(nftData);
    });
    setLoading(false);
};
