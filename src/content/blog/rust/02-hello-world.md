---
author: Max Pijittum
pubDatetime: 2024-01-05T16:00:00+08:00
title: Hello world (Rust)
postSlug: hello-world-rust
featured: false
draft: false
tags:
  - rust
description: Understand how to start building simple app with Rust and Cargo
---

## Table of contents

## Create an application

To create an app with Cargo, using `cargo init <app-name>` on CLI

```sh
cargo init hello-world
```

This will populated a following boilerplate for hello-world app.

```yml
📁 hello-world
├─📁 src           # source code here
│ └─ main.rs
└─ 📦 Cargo.toml    # package definition
```

### main.rs

```rust
fn main() {
    println!("Hello, world!");
}

```

### Cargo.toml

```toml
[package]
name = "hello-world"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
```

## Run your first hello world

```sh
cargo run
```

```sh
   Compiling hello-world v0.1.0 (.../src/public/learns/rust/hello-world/hello-world)
    Finished dev [unoptimized + debuginfo] target(s) in 0.72s
     Running `target/debug/hello-world`
Hello, world!
```
