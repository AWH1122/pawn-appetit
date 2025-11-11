# Homebrew Installation

This directory contains the Homebrew cask definition for Pawn Appétit.

## Using the Cask

The cask installs the pre-built DMG binary for macOS:

```bash
brew install --cask /path/to/pawn-appetit/homebrew/pawn-appetit.rb
```

Or, if you want to install directly from the repository URL:

```bash
brew install --cask https://raw.githubusercontent.com/Pawn-Appetit/pawn-appetit/main/homebrew/pawn-appetit.rb
```

## Submitting to Homebrew Cask

To submit this to the official Homebrew Cask repository:

1. Fork the [homebrew-cask](https://github.com/Homebrew/homebrew-cask) repository
2. Copy `pawn-appetit.rb` to `Casks/p/pawn-appetit.rb` in your fork
3. Test the cask:
   ```bash
   brew install --cask /path/to/homebrew-cask/Casks/p/pawn-appetit.rb
   brew audit --cask --online pawn-appetit
   brew style --fix Casks/p/pawn-appetit.rb
   ```
4. Submit a pull request

## Updating for New Releases

When a new version is released:

1. Update the `version` string in `pawn-appetit.rb`
2. Download both DMG files and calculate their SHA256 hashes:
   ```bash
   curl -L -o pawn-appetit-arm.dmg "https://github.com/Pawn-Appetit/pawn-appetit/releases/download/vX.Y.Z/Pawn.Appetit_X.Y.Z_aarch64_darwin.dmg"
   shasum -a 256 pawn-appetit-arm.dmg
   
   curl -L -o pawn-appetit-intel.dmg "https://github.com/Pawn-Appetit/pawn-appetit/releases/download/vX.Y.Z/Pawn.Appetit_X.Y.Z_x64_darwin.dmg"
   shasum -a 256 pawn-appetit-intel.dmg
   ```
3. Update the `sha256` hashes in the cask

## Local Testing

To test the cask locally:

```bash
brew install --cask homebrew/pawn-appetit.rb
brew uninstall --cask pawn-appetit
```

## Notes

- This cask installs the pre-built GUI application for macOS
- Supports both Apple Silicon (M1/M2/M3) and Intel Macs
- Homebrew casks are the standard way to distribute GUI applications on macOS
