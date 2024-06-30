---
author: Max Pijittum
pubDatetime: 2024-01-08T16:00:00+08:00
title: Neovim setup for Rust
postSlug: neovim-rust
featured: false
draft: true
tags:
  - rust
description: Understand common project structure for Rust
---

## Table of contents

install nvchad

theme catppuccin
M.ui = {theme='catppuccin'}

rustup component add rust-analyzer

edit chadrc.lua (in lau/custom)
import custom plugin file

M.plugins = 'custom.plugins'

local plugins = {
{
"williamboman/mason.nvim",
opts = {
ensure_installed = {
"rust-analyzer",
}
}
}
}

return plugins

install Mason plugin with:
:MasonInstallAll

Add Rust LSP
{
"neovim/nvim-lspconfig".
config = function()
require "plugins.config.lspconfig"
require "custom.configs.lspconfig"
end,
}

create custom lspconfig.lua
local on_attach = require("plugins.configs.lspconfig").on_attach
local capabilities = require("plugins.configs.lspconfig").capabilities
local lspconfig = require("lspconfig")
local util = require "lspconfig/util"

rust-tools.lua
local on_attach = require("plugins.configs.lspconfig").on_attach
local capabilities = require("plugins.configs.lspconfig").capabilities

local options = {
server = {
on_attach = on_attach,
capabilities = capabilities,
}
}

return options

formatting on save
custom/plugins.llua
{
"rust-lang/rust.vim",
ft = "rust",
init = function ()
vim.g.rustfmt_autosave = 1
end

}

running and debugging
custom/configs/lspconfig.lua

{
"neovim/nvim-lspconfig",
config = function()
require "plugins.configs.lspconfig"
require "custom.configs.lspconfig"
end,
},
{
"simrat39/rust-tools.nvim",
ft = "rust",
dependencies = "neovim/nvim-lspconfig",
opts = function ()
return require "custom.configs.rust-tools"
end,
config = function(_, opts)
require('rust-tools').setup(opts)
end
},
{
"mfussenegger/nvim-dap",
init = function()
require("core.utils").load_mappings("dap")
end
},
{
'saecki/crates.nvim',
ft = {"toml"},
config = function(_, opts)
local crates = require('crates')
crates.setup(opts)
require('cmp').setup.buffer({
sources = { { name = "crates" }}
})
crates.show()
require("core.utils").load*mappings("crates")
end,
},
{
"rust-lang/rust.vim",
ft = "rust",
init = function ()
vim.g.rustfmt_autosave = 1
end
},
{
"theHamsta/nvim-dap-virtual-text",
lazy = false,
config = function(*, opts)
require("nvim-dap-virtual-text").setup()
end
},
{
"hrsh7th/nvim-cmp",
opts = function()
local M = require "plugins.configs.cmp"
M.completion.completeopt = "menu,menuone,noselect"
M.mapping["<CR>"] = cmp.mapping.confirm {
behavior = cmp.ConfirmBehavior.Insert,
select = false,
}
table.insert(M.sources, {name = "crates"})
return M
end,
}
