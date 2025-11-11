# Homebrew Installation

This directory contains Homebrew formula and cask definitions for Pawn Appétit.

## Using the Cask (Recommended for macOS users)

The cask installs the pre-built DMG binary, which is the simplest and fastest method:

```bash
brew install --cask /path/to/pawn-appetit/homebrew/pawn-appetit.rb
```

Or, if you want to install directly from the repository URL:

```bash
brew install --cask https://raw.githubusercontent.com/Pawn-Appetit/pawn-appetit/main/homebrew/pawn-appetit.rb
```

## Using the Formula (Building from Source)

The formula builds Pawn Appétit from source. This is useful if you want to build from the latest code or customize the build:

```bash
brew install /path/to/pawn-appetit/homebrew/pawn-appetit-formula.rb
```

Or, if you want to install directly from the repository URL:

```bash
brew install https://raw.githubusercontent.com/Pawn-Appetit/pawn-appetit/main/homebrew/pawn-appetit-formula.rb
```

## Submitting to Homebrew Core/Cask

To submit these to the official Homebrew repositories:

### For the Cask (Homebrew Cask)

1. Fork the [homebrew-cask](https://github.com/Homebrew/homebrew-cask) repository
2. Copy `pawn-appetit.rb` to `Casks/p/pawn-appetit.rb` in your fork
3. Test the cask:
   ```bash
   brew install --cask /path/to/homebrew-cask/Casks/p/pawn-appetit.rb
   brew audit --cask --online pawn-appetit
   brew style --fix Casks/p/pawn-appetit.rb
   ```
4. Submit a pull request

### For the Formula (Homebrew Core)

1. Fork the [homebrew-core](https://github.com/Homebrew/homebrew-core) repository
2. Copy `pawn-appetit-formula.rb` to `Formula/p/pawn-appetit.rb` in your fork (rename to `pawn-appetit.rb`)
3. Test the formula:
   ```bash
   brew install --build-from-source /path/to/homebrew-core/Formula/p/pawn-appetit.rb
   brew audit --strict --online pawn-appetit
   brew style --fix Formula/p/pawn-appetit.rb
   ```
4. Submit a pull request

## Updating for New Releases

When a new version is released:

### For the Cask

1. Update the `version` string
2. Download both DMG files and calculate their SHA256 hashes:
   ```bash
   curl -L -o pawn-appetit-arm.dmg "https://github.com/Pawn-Appetit/pawn-appetit/releases/download/vX.Y.Z/Pawn.Appetit_X.Y.Z_aarch64_darwin.dmg"
   shasum -a 256 pawn-appetit-arm.dmg
   
   curl -L -o pawn-appetit-intel.dmg "https://github.com/Pawn-Appetit/pawn-appetit/releases/download/vX.Y.Z/Pawn.Appetit_X.Y.Z_x64_darwin.dmg"
   shasum -a 256 pawn-appetit-intel.dmg
   ```
3. Update the `sha256` hashes in the cask

### For the Formula

1. Update the `url` with the new version tag
2. Calculate the SHA256 of the source tarball:
   ```bash
   curl -L -o pawn-appetit.tar.gz "https://github.com/Pawn-Appetit/pawn-appetit/archive/refs/tags/vX.Y.Z.tar.gz"
   shasum -a 256 pawn-appetit.tar.gz
   ```
3. Update the `sha256` in the formula

## Local Testing

To test the cask locally:

```bash
brew install --cask homebrew/pawn-appetit.rb
brew uninstall --cask pawn-appetit
```

To test the formula locally:

```bash
brew install homebrew/pawn-appetit-formula.rb
brew uninstall pawn-appetit
```

## Notes

- The **cask** is the recommended installation method for most users as it installs the pre-built binary
- The **formula** is for users who want to build from source or need more control over the build process
- Both files can coexist, as they serve different purposes
