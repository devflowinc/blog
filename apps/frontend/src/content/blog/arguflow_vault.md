---
title: Arguflow Vault | What is it and our goals for the service
author: skeptrune @ arguflow
pubDatetime: 2023-05-30T10:00:00Z
postSlug: Learn about what Arguflow Vault is and our planned direction for it
featured: true
draft: false
tags:
  - vault
  - chat-gpt
  - open-ai
  - goals
  - roadmap
  - embeddings
ogImage: /assets/Arguflow_Opengraph.png
description:
  Learn about what Arguflow Vault is and our planned direction for it

---


## What is it?

If you don't know what an "embedding" is, then I strongly reccomend reading this [informational article](https://towardsdatascience.com/what-is-embedding-and-what-can-you-do-with-it-61ba7c05efd8) from towardsdatascience before going much further. 

In technical terms, [Vault](https://vault.arguflow.com/) is a website that allows users to create and search embeddings. Keep reading for a more complete explanation.

### Primary Goals For [Vault](https://vault.arguflow.com/)

#### Provide those in the academic debate community a way to save and query their evidence and also demonstrate their research abilities to the outside world

There are a number of open-evidence projects for the debate community, however they are oriented around sharing large briefs in the form of a docx or pdf file. Those briefs are significantly **more** than just evidence. They contain argument contentions, cut cards, definitions, values, and several other things. 

While they are really great starting points for competitors building their case, we believe they have key issues that [Vault](https://vault.arguflow.com/) may be able to fix:

- due to their nature as pdf/docx files, they are difficult to supplement or edit and re-share
- the evidence cards contained within the briefs are difficult to query as the best option is usually a ctrl+f matching search 
- frequently, there are evidence duplicates where while the exact words in a card are different their meaning is the same 
- they don't build on each-other, you can only ctrl+f in one brief at any given time
- debaters don't have incentive to contribute; their efforts creating and sharing briefs are near-impossible to convey to the outside world

To be clear, [Vault](https://vault.arguflow.com/) will likely not be a replacement for briefs. We do not intend to expand [Vault](https://vault.arguflow.com/) to be more than an evidence store. Therefore, briefs will still be needed to provide contentions, definitions, values, framing, etc. We intend for [Vault](https://vault.arguflow.com/) to help those who build briefs and cases, not replace them. 

One of the interesting features that could be coming up for [Vault](https://vault.arguflow.com/) is integration with something like [CXB8](https://github.com/debate/CX_DB8) such that search results will be shown as cut cards instead of just plain-text. 

#### Supplement [Arguflow AI Coach](https://arguflow.com/) to include evidence from [Vault](https://vault.arguflow.com/) in its feedback and counter-arguments 

Understanding this section will require that you are familiar with the concept of llm-chain'ing. If that is not a term you are familiar with, [this article](https://cobusgreyling.substack.com/p/chaining-large-language-model-llm) is a great primer. 

If the evidence within Vault grows large enough and there enough users upvoting/downvoting the evidence present, we think that we will be able to drastically improve the quality of [AI Coach](https://arguflow.com/) by executing the following chain: 

1. User provides their argument to [AI Coach](https://arguflow.com/)
2. A vector search is performed on [Vault](https://vault.arguflow.com/)'s data and the top few results based on a combination of user-rating and vector-similarity are saved
3. The user's argument along with the top results from [Vault](https://vault.arguflow.com/) are fed as a prompt to a chat model that generates feedback and a counterargument
4. The generated feedback and counteragument are returned to the user alongwith a list of the top results from [Vault](https://vault.arguflow.com/)

### Moonshot Goal

#### Be the go-to semantic search engine provider for embeddings across the web

There are lots of folks who are creating embeddings from arxiv papers, news articles, podasts, and several other media. That work is insanely great, however, it has a few issues: 

- very low accessibility in that you have to be highly technical to query the embeddings 
- vector-similarity in and of itself is not the end-all be-all to search, there is a lot of value in creating an algorithm that weights vector similarity, backlinks, user-rating, and several other factors 


[Vault](https://vault.arguflow.com/) is a ways away from being the go-to semantic search-engine, but the blockers aren't feature related. The technical requirements are relatively simple: 

1. Ingest a greater number of embeddings from those who are creating huge embedding stores 
2. Create a more complex search algorithm that combines vector-similarity, with other factors 

The complicated parts that we are far less confident in our ability to deliver are: 

1. Performance. As of now, our technical implementation is very naive. There are a host of things we would need to do to scale to tens of millions of users, and we are not confident that we know how to do that. 
2. Product-market fit and marketing. Recently there was news that [Neeva, the would-be google competitor,](https://www.theverge.com/2023/5/20/23731397/neeva-search-engine-google-shutdown) is shutting down and getting acquired by Snowflake. We have little to no confidence that we would be able to succeed where they failed, but may try anyways.

## The Future

We are not sure that we are going to continue developing software for Arguflow at all. We will likely be leaving [AI Coach](https://arguflow.com/) and [Vault](https://vault.arguflow.com/) mostly alone until the academic debate season starts back up again during the upcoming '23/'24 school-year. 

Some key features we may add in the near-term are voice-to-text for [AI Coach](https://arguflow.com/) and integration with a card-cutting model like [CXB8](https://github.com/debate/CX_DB8), but we lack plans beyond that for the next few months and don't even gaurantee that we will ship those.

In the meantime, we are hoping to get accepted into [Futo's fellow program](https://futo.org/fellows/) where we would begin building enterprise software for business teams to have better and more docuementable debates and constructive dialogue. 

## Conclusion

We are excited about what we're building! If any of this seems interesting to you, then please reach out to contact@arguflow.gg. Thanks! 