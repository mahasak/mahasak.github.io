---
author: Max Pijittum
pubDatetime: 2024-06-29T12:20:00Z
title: Multiple Github account with SSH config
postSlug: multiple-github-account-with-ssh-config
featured: false
draft: false
tags:
  - tutorial
description: Simple ways to use multiple github account on your dev machine
---

Recently, i found that for some cases that you might want to commit to private github repo with additional ssh key can be tricky. I googled for a solution and found this one is quite effective. All you need to do is share ssh key to github repo and config your ssh config file to choose an additional ssh key as ssh identity.

Step 1 - Create an additional ssh key

```
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f ~/.ssh/<filename>
```

or

```
ssh-keygen -t ed25519 -b 4096 -C "your_email@example.com" -f ~/.ssh/<filename>
```

Step 2 - Add origin to your local copy

```
git remote remove origin
git remote add origin git@github.com:<github_user>/<repository>.git
```

Step 3 - Config ssh config

```
Host <repository>.github.com
	HostName github.com
	User git
	IdentityFile ~/.ssh/<filename>
    IdentytiesOnly yes
```

With these three steps,your local copy should be able to collaborate with preivate repository.
