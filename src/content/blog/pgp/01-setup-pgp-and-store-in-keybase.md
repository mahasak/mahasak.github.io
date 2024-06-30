---
author: Max Pijittum
pubDatetime: 2023-03-21T11:20:00Z
title: Using Keybase.IO to store PGP/SSH
postSlug: storing-pgp-ssh-on-keybase
featured: false
draft: false
tags:
  - pgp
  - tutorial
description: Brief notes on setting up PGP and storing on keybase
---

วันนี้เสียเวลาไปพักนึงเพราะว่าลืม backup key ที่ใช้ใน PGP ไปซะงั้น กว่าจะส่งไฟล์ได้เลยต้องเสียเวลา invalidate ของเก่า แล้วทำใหม่หมดเลย วันนี้เลยทำ blog การใช้ Keybase เพื่อสร้าง PGP / SSH Keys ซะหน่อย

แล้วเราใช้ Keybase และ PGP/SSH keys ทำอะไรได้บ้าง

เราสามารถใช้ Keybase เป็น Server เพื่อเก็บ PGP/SSH key ได้ไง
เราสามารถทำ password-less login ได้ด้วย SSH key แหละ
แล้วเรายังสามารใช้ PGP ในการทำงานด้วย เช่นการ Sign commit ใน Github/Gitlab เพื่อ verify ว่าคนส่ง commit มาเป็น contributor ตัวจริง
ขั้นตอนแรกสุดคือ ลง Keybase (https://keybase.io) อันนี้ไปอ่านเอาเองนะครับ ซึ่งเราสามารถสร้าง PGP Key จากหน้า Keybase profile ของเราได้เลย

หลังจากสร้าง PGP key ใน keybase แล้วเราก็จะสามารถเริ่มขั้นตอนต่อไปได้ นั่นคือลง Monkeysphere เอามาช่วย convert PGP -> SSH

```
#อันนี้เป็นเครื่องมือสำหรับ OpenPGP ที่ port มาชื่อว่า openpgp2ssh
brew install monkeysphere
```

หลังจากนั้นเราก็ export เอา key จาก Keybase ลงมาที่เครื่องก่อน ขั้นตอนนี้แนะนำให้ทำอย่างรัดกุม ปลอดภัย และระวังหลุดนะฮะ

```
keybase login

# Export เอา public key มาจาก Keybase
keybase pgp export -o keybase.public.key

# Exporting เอา private key มาจาก Keybase
keybase pgp export -s --unencrypted -o keybase.private.key
```

หลังจากนั้นเราจะสามารถ import PGP keys จาก Keybase มาที่เครื่องเราได้แบบนี้

```
#import public key จาก Keybase
gpg -q --import keybase.public.key

# import private key จาก keybase
gpg -q --allow-secret-key-import --import keybase.private.key

# ลอง list key ดูว่าเรียบร้อยไหม
gpg --list-keys
```

ตอนที่เรา list key มา อย่าลืมจด Encryption key ไว้นะครับ หลังจากนั้นเราก็สามารถ convert มาใช้เป็น SSH Key โดยใช้ openpgp2ssh แบบนี้ได้ โดยเปลี่ยน [KEY ID] เป็น Encryption Key

```
# ใน ~/.ssh/

gpg --export-options export-minimal,no-export-attributes --export-secret-keys --no-armor [KEY ID] | openpgp2ssh [KEY ID] > id_rsa
chmod 400 id_rsa
ssh-keygen -y -f id_rsa > id_rsa.pub
```

ถ้าเราจะเก็บ SSH key นี้ไว้ใน Keybase fs สามารถทำได้นะครับ โดยจัดการลบ SSH keyfile เดิมก่อน แล้วทำ symlink มา ตัว Keybase fs คือ file system ของ Keybase ซึ่งจะ sync กันข้าม device และสามารถแชร์ได้แบบต่างๆคือ

private - จะ sync ไปเฉพาะเครื่องที่เรา login เอง และ authenticate device แล้ว
public - คนอื่นๆสามารถ explore ได้ เราสามารถใช้แชร์ไฟล์ที่ public ได้เช่น public key
team - อันนี้ก็แชร์ให้คนในทีมเราเองที่กำหนดไว้ใน Keybase

```
rm -f ~/.ssh/id_rsa.pub
rm -f ~/.ssh/id_rsa

mkdir -p ~/.ssh/

# Create symbolic links to the default
ln -s [KEYBASE-FS-PATH]/id_rsa.pub ~/.ssh/id_rsa.pub
ln -s [KEYBASE-FS-PATH]/id_rsa ~/.ssh/id_rsa
```

ในการ export key ออกมาเพื่อ backup ทำได้โดย ซึ่งเราจะสามารถเก็บไฟล์ที่สร้างในรูปแบบ base64-encoded ASCII-armored backups ไว้ในที่ปลอดภัยเพื่อ restore กลับมาใหม่ได้ถ้าหาย

```
gpg --armor --export > pgp-public-keys.asc
gpg --armor --export-secret-keys > pgp-private-keys.asc
gpg --export-ownertrust > pgp-ownertrust.asc
```

แน่นอน เราอาจจะอยาก create revocation certificate เพื่อเอาไว้ยกเลิก Key เดิม ถ้าเราคิดว่า Key นั้นถูก compromise ในภายหลังได้

```
gpg --armor --gen-revoke [KEY ID] > pgp-revocation.asc
```

ส่วนวิธีในการ import pgp key ในเครื่องอื่นๆนั้นก็ทำได้โดย import public/private และ trust certificate เข้าไปด้วยคำสั่งด้านล่างนี้

```
gpg --import pgp-public-keys.asc
gpg --import pgp-private-keys.asc
gpg --import-ownertrust pgp-ownertrust.asc
```

และถ้าอยากยกเลิก key เดิมเมื่อไหร่ เราก็ import revocation certificate เข้าไปได้ตอนนั้นเลย

```
gpg --import pgp-revocation.asc
```

และสุดท้าย เนื่องจากเราใช้ Keybase เป็น Key server ในการ distribute key ของเรา ทุกครั้งที่มีการ update อย่าลืม update key ไปที่ Keybase Server ด้วยคำสั่งต่อไปนี้

```
keybase pgp update
```

เสร็จแล้ว ทีนี้เราก็สามารถใช้ key ใหม่ได้อย่างสบายใจ ไร้กังวล มี backup plan แล้ว

Pro tips:

เราสามารถทำ Github/Gitlab signed commit ได้ด้วยนะ ลองอ่านที่นี่

Reference:

- [Sign commit on GitHub](https://docs.github.com/en/authentication/managing-commit-signature-verification)
- [Sign commit on GitLab](https://docs.gitlab.com/ee/user/project/repository/gpg_signed_commits/)
