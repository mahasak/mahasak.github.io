---
author: Max Pijittum
pubDatetime: 2024-05-30T11:20:00Z
title: Backing up your GPG keys
postSlug: backing-up-gpg
featured: false
draft: false
tags:
  - pgp
  - tutorial
description: Simple ways to export and backup your GPG keys
---

Backing up GPG keys is quite simple, but easily forgot (for me). Just put it a notes to myself on how I back it up and restore it.

To export keys and its owner trust

```
gpg --export --armor YOUR_ID > YOUR_ID.public.asc
gpg --export-secret-keys --armor YOUR_ID > YOUR_ID.private.asc
gpg --export-secret-subkeys --armor YOUR_ID > YOUR_ID.sub_private.asc
gpg --export-ownertrust > ownertrust.txt
```

Optionaly, you might want this to cancel your pgp keys if you lose private keys

```
gpg --output YOUR_ID.asc --gen-revoke YOUR_ID
```

To import keys and trusts

```
gpg --import YOUR_ID.public.asc
gpg --import YOUR_ID.private.asc
gpg --import YOUR_ID.sub_private.asc
gpg --import-ownertrust ownertrust.txt
```

To make it ultimately trusted (optional)

```
gpg --edit-key YOUR_ID
gpg> trust
Your decision? 5 (Ultimate trust)
3
```
