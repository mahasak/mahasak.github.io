---
author: Max Pijittum
pubDatetime: 2024-01-05T16:00:00+08:00
title: Install Rust and Cargo
postSlug: install-rust-and-cargo
featured: false
draft: false
tags:
  - rust
description: Preparation for install required rust and cargo package for developments.
---

## Table of contents

## Rust language installation

For my rust learning, I'm using [rustup](https://rustup.rs/) to install rust and its toolschain e.g. Cargo

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

To update rust, simply running following commands

```sh
rustup upgrade
```

## What is Cargo ?

Cargo is pacakge manager (just like NPM to NodeJS)

Install cargo package

```sh
cargo install cargo-edit
cargo install cargo-watch
cargo install cargo-audit
```

How to use Cargo package manager

```sh
# Init application <name>
cargo init <name>

# Build and run app
cargo run

# Watch for changes and rebuild
cargo watch

# Run tests
cargo test

# Build a release without debug info
cargo build --release

# Add/Remove package <pkg> to app
cargo add <pkg>
cargo rm <pkg>
```

Bonus, Add Tokio to the app ([Tokio](https://tokio.rs/) is an asynchronous runtime for Rust)

```sh
cargo add tokio
```
