cask "pawn-appetit" do
  version "0.9.0"
  sha256 arm:   "d4adcafa758f44fec71dcfe240b9e9715e9fbafcce82417a56aca147894f5e53",
         intel: "3a4c338639a8d30067fdf2b941402ac5c595ebf8e1cc26417d62d4e6f009dd10"

  url "https://github.com/Pawn-Appetit/pawn-appetit/releases/download/v#{version}/Pawn.Appetit_#{version}_#{arch}_darwin.dmg",
      verified: "github.com/Pawn-Appetit/pawn-appetit/"
  name "Pawn Appétit"
  desc "Modern, open-source chess application with professional-grade analysis tools"
  homepage "https://pawnappetit.com/"

  livecheck do
    url :url
    strategy :github_latest
  end

  on_arm do
    def arch
      "aarch64"
    end
  end

  on_intel do
    def arch
      "x64"
    end
  end

  app "Pawn Appetit.app"

  zap trash: [
    "~/Library/Application Support/com.pawnappetit",
    "~/Library/Caches/com.pawnappetit",
    "~/Library/Preferences/com.pawnappetit.plist",
    "~/Library/Saved Application State/com.pawnappetit.savedState",
    "~/Library/WebKit/com.pawnappetit",
  ]
end
