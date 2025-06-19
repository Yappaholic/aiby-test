{pkgs ? import <nixpkgs> {}}:
with pkgs;
  mkShell {
    nativeBuildInputs = [
      prettierd
      vscode-langservers-extracted
      typescript-language-server
      typescript
      brave
    ];
  }
