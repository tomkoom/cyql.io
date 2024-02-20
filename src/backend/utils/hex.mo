import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Nat8 "mo:base/Nat8";

// https://forum.dfinity.org/t/how-does-msg-caller-convert-to-icp-address/21228/6
// https://github.com/ICEvent/Escrow/blob/main/backend/hex.mo
// https://github.com/crusso/motoko-hex/blob/0.6/src/Hex.mo
// https://github.com/ninegua/tipjar/blob/main/src/tipjar/Util.mo#L145

module {
  let hexChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

  public func toHex(arr : [Nat8]) : Text {
    Text.join(
      "",
      Iter.map<Nat8, Text>(
        Iter.fromArray(arr),
        func(x : Nat8) : Text {
          let a = Nat8.toNat(x / 16);
          let b = Nat8.toNat(x % 16);
          hexChars[a] # hexChars[b]
        },
      ),
    )
  }
}
