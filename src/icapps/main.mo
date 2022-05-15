import Principal "mo:base/Principal";

actor {
    public func greet(name : Text) : async Text {
        return "Hello, " # name # "!";
    };

    public query ({caller}) func whoami() : async Text {
        return Principal.toText(caller);
    };
};
