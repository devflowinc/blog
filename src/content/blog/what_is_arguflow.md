---
title: What is Arguflow? Build Semantic Search and Retrieval Augmented LLM Solutions fast
author: skeptrune @ arguflow
pubDatetime: 2023-09-29T10:00:00Z
postSlug: what-is-arguflow
featured: true
draft: false
tags:
  - about-us
  - semantic-search
  - search
  - recommendations
  - use-cases
  - retrieval-augmented-generation
  - rag
ogImage: /assets/Arguflow_Opengraph.png
description: We tell you what Arguflow is all about and why you should consider self-hosting our service
---

# What is Arguflow? Build Semantic Search and Retrieval Augmented LLM Solutions fast

Introducing [Arguflow](https://github.com/arguflow/arguflow) — a self-hostable service that empowers you to deploy Semantic Vector Search and Retrieval-Augmented-Generation (RAG) on your dataset quickly and easily.

![arguflow system architecture](https://github.com/arguflow/arguflow/blob/main/assets/arguflow-system-diagram.png?raw=true)

**Stop re-inventing the semantic search and RAG wheel!**

## What are some example use-cases of Arguflow?

All of these use-cases are supported both headlessly via REST API and headfully via the UI's.

### Legal e-discovery semantic search and vector retrieval

If you are a technical legal professional or a technical employee at a firm then you have likely been asked to improve document review process over production discoveries with AI.

Chunking the production dataset into embeddings and serving them via a UI is immensely helpful for legal associates. It can save dozens of hours of time for legal professionals.

### Theme aggregation/recommendations for research

![](/assets/get-related-cards.png)

Once you have found some subset of documents that tie into a given theme, you will likely want to quickly find more which are similar. This is similar to how spotify suggests songs to add to an existing playlist you have created. 

This can be helpful for both research use-cases and social media platforms. 

### Content moderation for a platform

If you allow arbitrary users to contribute to your platform then it is likely that you will end up with some stuff you want to remove. 

For example, you could detect and remove violent content by checking vector distance between embeddings in your dataset and a query like "adults killing each other". 

Another use-case here could be validating user reports. You can make an embedding for the user report and check the vector distance to the content to determine whether or not they were honest about the content it contained.

### Generation of FAQs, reports, summaries, or QA bots

![](/assets/generated-debrief.gif)

By performing a retrieval based on a user's prompt and then injecting that into the LLM's context window, you are able to get generations based on your own data. 

This is useful for a wide variety of use-cases. It may be the highest value capability of our service. 

## Why did we build it? 

We were seeing a bunch of startups continually re-invent a semantic search and RAG system, here are some YC ones: [gloo](https://www.ycombinator.com/companies/gloo), [epsilon](https://www.ycombinator.com/companies/epsilon), [sweetspot](https://www.ycombinator.com/companies/sweetspot), [mendable](https://www.ycombinator.com/companies/mendable), [meru](https://www.ycombinator.com/companies/meru), [sid](https://www.ycombinator.com/companies/sid), [semantic-finance](https://www.ycombinator.com/companies/semantic-finance). 

To us, it seemed like there was some service missing that would allow you to deploy semantic search and RAG to all of these verticals much more quickly.

Because of that, we decided to build Arguflow. 

## What is the secret sauce that allows us to be a company? 

If you get a SLA with Arguflow then you will be provided with access to the following beyond a hosted and managed instance:

1. Sub-sentence level extractive summarization model to make reading retrievals faster
2. Anti-hallucination pipeline using NER models

## If you think Arguflow is useful for something you want to build then self host it!

We have a [self-hosting guide here](https://docs.arguflow.ai/self_hosting). Try it out and let us know what you think! Also, [star us on Github](https://github.com/arguflow/arguflow).

![rust github star armed crab](/assets/rust-github-star-armed-crab.jpeg)
