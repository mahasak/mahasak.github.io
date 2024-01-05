---
author: Max Pijittum
pubDatetime: 2024-01-05T16:00:00+08:00
title: Common Project Structure
postSlug: project-structure-rust
featured: false
draft: false
tags:
  - rust
description: Understand common project structure for Rust
---

## Table of contents

## Module per file

```yml
📂 foo
├─ 📂 src
│  ├─ 📄 utils.rs    # module
│  └─ 📄 main.rs
└─ 📦 Cargo.toml
```

utils.rs

```rust
pub fn hello() {
  println!("hello world!");
}
```

main.rs

```rust
mod utils;       // load modules
use utils;

fn main () {
  utils.hello(); // call functions from module
}
```

## Module per folder

```yml
📂 foo
├─ 📂 src
│  │
│  ├─ 📂 utils
│  │  ├─ 📄 mod.rs     # module entry point
│  │  ├─ 📄 say.rs
│  │  └─ 📄 cast.rs
│  │
│  └─ 📄 main.rs
│
└─ 📦 Cargo.toml
```

mod.rs

```rust
pub mod say;        // declare public access to function (exports)
```

say.rs

```rust
pub fn hello() {    // 👈 make it public, or just pub(crate) for internal use.
  println!("hello world!");
}
```

cast.rs

```rust
use super::say      // load say
pub fn cast() {
  say.hello();      // use function
}
```

main.rs

```rust
mod utils;          // load module
use utils::say;     // using say

fn main() {
  say.hello();      // call the functions
}
```

## Lib

Create lib using `cargo init <package> --lib`

```sh
cargo init bar --lib
```

```yml
📂 bar
├─ 📂 src
│  └─ 📄 lib.rs     # lib entrypoint
└─ 📦 Cargo.toml
```

lib.rs

```rust
pub fn hello() {
    println!("hello world!");
}
```

Using libs

- loading via `Cargo.toml`

```toml
[dependencies]
foo = { git="https://YOU_GITHUB_REPO_URL"}
```

- Publish package and use `cargo add <package>`
- loading via `workspace`

## Workspace

```yml
📂 workspace-example
│
├─ 🗂 utils
│  ├─ 📂 src
│  │  └─ 📄 lib.rs     # lib entrypoint.
│  └─ 📦 Cargo.toml
│
├─ 📂 foo
│  ├─ 📂 src
│  │  └─ 📄 main.rs    # app entrypoint.
│  └─ 📦 Cargo.toml
│
└─ 📦 Cargo.toml
```

foo/Cargo.toml

```toml
[dependencies]
foo = { path="../utils" }
```

Cargo.toml

```toml
[workspace]
members = [
  "utils",
  "foo",
]
```
