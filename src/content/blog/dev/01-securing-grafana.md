---
author: Max Pijittum
pubDatetime: 2024-06-29T12:20:00Z
title: Securing Grafana
postSlug: securing-grafana
featured: false
draft: false
tags:
  - grafana
  - tutorial
description: Securing Grafana in 4 steps
---

วันนี้นั่งลง Grafana ใหม่ลงแล้วอยากจะใส่ DNS ให้ใช้ได้บน internet เพราะปกติใช้แต่ในกลุ่มของตัวเอง เลยมาจดขั้นตอนการ secure grafana ไว้หน่อย เดี๋ยวคราวหน้าจะลืม

step 1 - Certbot

```
sudo apt-get install cerbot
sudo certbot certonly -d www.domain.com
```

step 2 - permission

```
sudo groupadd sslcerts
user chown -R root:sslcerts /etc/letsencrypt/
sudo usermod -G sslcerts -a grafana
sudo chmod 755 /etc/letsencrypt/live
sudo chmod 755 /etc/letsencrypt/archive
```

step 3 - config

```
[server]
protocol = https
http_port = 443
domain = your.grafana.url
root_url = https://your.grafana.url

cert_file = /etc/letsencrypt/live/your.grafana.url/fullchain.pem
cert_key = /etc/letsencrypt/live/your.grafana.url/privkey.pem
```

step 4 - allow https port for grafana user to bind

```
sudo apt-get install libcap2-bin
sudo setcap 'cap_net_bind_service=+ep' /usr/sbin/grafana-server

sudo systemctl restart grafana-server.service
```

step 5 - checking logs

```
sudo tail -f /var/log/grafana/grafana.log
```
