---
title: 🎉 Announcing OpenEmbeddings | Pay as You Embed with crypto!
author: skeptrune @ arguflow
pubDatetime: 2023-08-09T10:00:00Z
postSlug: Official launch of Arguflow OpenEmbeddings
featured: true
draft: false
tags:
  - embeddings
  - crypto
  - eth
  - monterrey
  - openembedding
ogImage: /assets/Arguflow_Opengraph.png
description: We are officially releasing Arguflow OpenEmbeddings!
---

# 🎉 Announcing OpenEmbedding | Pay as You Embed with USDC, USDT, ETH, and WBTC!

With [Arguflow OpenEmbeddings](https://github.com/arguflow/openembeddings) you can use USDC/USDT/ETH/WBTC to get access to pay for what you use embedding models! Follow our [docs on github](https://github.com/arguflow/openembeddings) to get started.

To start, we are only supporting [bge-large-en](https://huggingface.co/BAAI/bge-large-en) as it is the #1 ranked embedding model on [huggingface's MTEB leaderbord](https://huggingface.co/spaces/mteb/leaderboard) and, in our opinion, the most useful. If you want support for other models, join our [discord](https://discord.gg/CuJVfgZf54), [telegram](https://t.me/+vUOq6omKOn5lY2Zh), and [Matrix](https://matrix.to/#/#arguflow-general:matrix.zerodao.gg). Preferably, please ping on Matrix. 

## Inspiration 

We saw [openrouter](https://openrouter.ai/docs) and thought something similar should exist that actually does serve developers. It would have at least helped us to ship a lot faster. 

## Motivation

1. **Embeddings are core to making useful LLM services.** Putting generative LLM's into production for your usecase is likely going involve some variation of RAG (retrieval-augmented-generation) on an existing dataset you have access to. That means you need both an embedding model and LLM. There are plenty of services providing pay for what you use access to LLM's, but virtually zero doing so for embedding models. It seemed like it would be helpful to the community for a service like this to exist. 
2.  **Hosting models is trivial, but unnecessarily expensive and annoying for most.** Cloud GPU's are insanely overpriced compared to buying a card and do not make sense to run 24/7 for most internal/niche services. Want search on your notes or work docs? It will be way cheaper and faster to go with a pay for what you use service like us instead of hosting your own model.
3. **There is an Ethereum payments library called [monterrey](https://github.com/arguflow/monterrey/tree/fa/erc20-support) that we wanted to play with.** It's very awesome, you should check it out if you want to do EVM payments for your project. If anyone has something similar for other chains, we are game to try them as well 👀.

## Why crypto? 

It's easier and cheaper 🤷.

## Conclusion 

Assuming that you have not yet heard of [Arguflow](https://arguflow.ai) before, we offer a product suite that contains everything you need to create semantic search and retrieval-augmented LLM-chat experiences on your data. If that interests you, get in touch at [contact@arguflow.gg](mailto:contact@arguflow.gg) or check out our live competitive debate demos at [search.arguflow.ai](https://search.arguflow.ai) or [chat.arguflow.ai](https://chat.arguflow.ai). Thanks! 