module {

  public type CategoryId = Text;
  public type CategoryLabel = Text;
  public type Category = { id : CategoryId; lbl : CategoryLabel };
  public type CategoryWithSize = {
    category : Category;
    size : Nat
  };

  public type ProjectCategory = {
    id : Text;
    title : Text;
    size : Nat
  };

  public let categories : [Category] = [
    { id = "all"; lbl = "All" },

    // wallets, defi, tokens, payments
    { id = "wallets"; lbl = "Wallets" },
    { id = "defi"; lbl = "DeFi" },
    { id = "tokens"; lbl = "Tokens" },
    { id = "stablecoins"; lbl = "Stablecoins" },
    { id = "dexs"; lbl = "DEXs" },
    { id = "swapping"; lbl = "Swapping" },
    { id = "payments_invoicing"; lbl = "Payments/Invoicing" },
    { id = "staking"; lbl = "Staking" },

    // games, p2e
    { id = "games"; lbl = "Games" },
    { id = "gambling"; lbl = "Gambling" },
    { id = "betting"; lbl = "Betting" },

    // tools, dev tools
    { id = "tools"; lbl = "Tools" },
    { id = "dev_tools"; lbl = "Dev Tools" },

    // communities, daos, governance
    { id = "communities"; lbl = "Communities" },
    { id = "daos"; lbl = "DAOs" },
    { id = "governance"; lbl = "Governance" },

    // infrastracture, cloud, storage
    { id = "infrastructure"; lbl = "Infrastructure" },
    { id = "cloud"; lbl = "Cloud" },
    { id = "storage"; lbl = "Storage" },
    { id = "search_engines"; lbl = "Search Engines" },

    // frameworks, protocol
    { id = "frameworks"; lbl = "Frameworks" },
    { id = "protocol"; lbl = "Protocol" }, // to upds

    // metaverse, ar/vr
    { id = "metaverse"; lbl = "Metaverse" },
    { id = "ar_vr"; lbl = "AR/VR" },

    // messaging, blogging
    { id = "messaging"; lbl = "Messaging" },
    { id = "blogging"; lbl = "Blogging" },

    // chains
    { id = "btc"; lbl = "BTC" },
    { id = "ethereum"; lbl = "Ethereum" },

    // sustainability
    { id = "sustainability"; lbl = "Sustainability" },

    // marketing, analytics
    { id = "marketing"; lbl = "Marketing" },
    { id = "analytics"; lbl = "Analytics" },

    //  ...
    { id = "nfts"; lbl = "NFTs" },
    { id = "dapps"; lbl = "dApps" },
    { id = "social_networks"; lbl = "Social Networks" },
    { id = "explorers"; lbl = "Explorers" },
    { id = "education"; lbl = "Education" },
    { id = "marketplace"; lbl = "Marketplace" },
    { id = "identity"; lbl = "Identity" },
    { id = "ai"; lbl = "AI" },
    { id = "ecommerse"; lbl = "Ecommerce" },
    { id = "vcs"; lbl = "VCs" },
    { id = "automation"; lbl = "Automation" },
  ];

}
