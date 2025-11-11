class PawnAppetitFormula < Formula
  desc "Modern, open-source chess application with professional-grade analysis tools"
  homepage "https://pawnappetit.com/"
  url "https://github.com/Pawn-Appetit/pawn-appetit/archive/refs/tags/v0.9.0.tar.gz"
  sha256 "cb39401a1f4dbf7d63f61eb753557b72c02e6c286d9ce810cb1949075d3d5bd5"
  license "GPL-3.0-only"
  head "https://github.com/Pawn-Appetit/pawn-appetit.git", branch: "main"

  depends_on "node" => :build
  depends_on "pnpm" => :build
  depends_on "rust" => :build

  on_linux do
    depends_on "pkg-config" => :build
    depends_on "webkit2gtk"
    depends_on "gtk+3"
  end

  def install
    # Install Node.js dependencies
    system "pnpm", "install", "--frozen-lockfile"

    # Build the application
    system "pnpm", "tauri", "build"

    # Install the built application
    if OS.mac?
      prefix.install "src-tauri/target/release/bundle/macos/Pawn Appetit.app"
    elsif OS.linux?
      bin.install "src-tauri/target/release/pawn-appetit"
      prefix.install Dir["src-tauri/target/release/bundle/*"]
    end
  end

  def caveats
    <<~EOS
      Pawn Appétit has been installed.

      On macOS, you can find the app at:
        #{prefix}/Pawn Appetit.app

      You may want to symlink it to your Applications folder:
        ln -s #{prefix}/Pawn\ Appetit.app /Applications/

      For the best experience on macOS, consider using the cask instead:
        brew install --cask pawn-appetit
    EOS
  end

  test do
    # Test that the binary exists and is executable
    if OS.linux?
      assert_predicate bin/"pawn-appetit", :exist?
      assert_predicate bin/"pawn-appetit", :executable?
    end
  end
end
