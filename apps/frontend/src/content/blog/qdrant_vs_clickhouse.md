---
title: Is Clickhouse Ready to Replace Your Specialized Vector Database (Qdrant)?
author: skeptrune @ arguflow
pubDatetime: 2023-08-22T10:00:00Z
postSlug: clickhouse-vs-vector-database-qdrant
featured: true
draft: false
tags:
  - svd
  - qdrant
  - clickhouse
  - engineering
  - vector-db
  - OLAP
  - OLTP
ogImage: /assets/Arguflow_Opengraph.png
description: In-depth examination of whether or not Clickhouse would be able to replace your specialized vector database
---

# Can Clickhouse replace your specialized vector database?

**Answer**: Not right now, but maybe soon

- [CLickhouse is an OLAP data warehousing solution](https://clickhouse.com)
- [Qdrant is a SVD (specialized vector database)](https://qdrant.tech)

## Findings

The key takeaway here is that we are strategically developing our systems to facilitate painless replacement of the underlying vector store. Anticipating the uncertain trajectory of vector store solutions, we are exercising caution and refraining from fully committing to any particular data store solution at this point.

For now, we will stick to [Qdrant](https://qdrant.tech/) for our competitive debate demos as [Clickhouse](https://clickhouse.com/)'s [annoy index](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/annindexes) is too imprecise to be viable and their [HNSW usearch index](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/annindexes#usearch), powered by [unum](https://www.unum.cloud/) is both too slow and imprecise to be viable.

However, it is important to note that Clickhouse's annoy index solution wins out on pure speed and can be the right choice for datasets characterized by substantial sparsity or considerable size. We may use Clickhouse for future customer deployments when it makes sense to do so.

[This Jupyter notebook will allow you to replicate our results](https://github.com/arguflow/clickhouse-vs-qdrant-comparison/blob/main/qdrant-to-ch.ipynb).

We are hoping that Clickhouse or another established SQL database catches up to the SVD's soon.

## Why even consider not using a SVD?

> Make each program do one thing well - [unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy#Do_One_Thing_and_Do_It_Well)

SVDs (Specialized Vector Databases) stand as meticulously crafted solutions, excelling in the realm of vector data storage. Given their prowess in this domain, one might naturally question the rationale behind opting for a more comprehensive all-in-one DBMS, such as [Clickhouse](https://clickhouse.com/).

Ce Gao from modelz explained it quite well in his [Do we really need a specialized vector database?](https://modelz.ai/blog/pgvector) article.

> There are two issues that I think are important. The first is the issue of data consistency. During the prototyping phase, vector databases are very suitable, and ease of use is more important than anything else. However, a vector database is an independent system that is completely decoupled from other data storage systems such as TP databases and AP data lakes. Therefore, data needs to be synchronized, streamed, and processed between multiple systems.

> Imagine if your data is already stored in an OLTP database such as PostgreSQL. To perform vector search using an independent vector database, you need to first extract the data from the database, then convert each data point into a vector using services such as OpenAI Embedding, and then synchronize it to a dedicated vector database. This adds a lot of complexity. Furthermore, if a user deletes a data point in PostgreSQL but it is not deleted in the vector database, then there will be data inconsistency issues. This issue can be very serious in actual production environments.

[Qdrant](https://qdrant.tech/), like [ElasticSearch](https://www.elastic.co/), is not [ACID](https://docs.digitalocean.com/glossary/acid/) compliant. Hence, it's prudent to employ analogous principles for data storage in Qdrant as you would for Elastic. Maddie Jones from [Bonsai](https://bonsai.io) offers a detailed look at the case for ElasticSearch storage in her [Why Elasticsearch should not be your Primary Data Store](https://bonsai.io/blog/why-elasticsearch-should-not-be-your-primary-data-store) article. I would strongly recommend giving it a read.

> Elasticsearch focuses on making data available in “near real-time.” In order to do that, it requires making engineering choices focused on speed rather than perfectly reliable results. This means there are a number of tradeoffs under the hood where consistency is sacrificed for expediency. Inconsistent and partial results are much more of a possibility with Elasticsearch than with a database.

[Qdrant](https://qdrant.tech/) provides a versatile [payload API](https://qdrant.tech/documentation/concepts/payload/) that enables storage of arbitrary data as JSON. Nonetheless, it's important to note that this convenience comes without explicit schema assurances, migration avenues, or transactional guarantees. As your data accumulates within Qdrant, the difficulty of coordinating its interaction with your OLTP store grows, necessitating complex coordination logic during search operations.

## Metrics to consider before switching to Clickhouse from a SVD

- query speed
- precision

A NirantK blog on PGVector called [Qdrant vs pgvector - Results from the 1M OpenAI Benchmark](https://nirantk.com/writing/pgvector-vs-qdrant/) effectively explains why pgvector is not viable.

> That is a 1500% deficit in speed (compared to Qdrant). However, we shouldn’t only consider speed as the main metric when evaluating a database. In terms of accuracy, pgvector delivers way fewer relevant results than Qdrant.

When comparing Qdrant to Clickhouse, we have to ask the same questions.

## Clickhouse vs Qdrant - Results from the DebateSum dataset

Our infrastructure demos are over a slightly tweaked version of the [DebateSum dataset](https://aclanthology.org/2020.argmining-1.1/) which we plan to publish at the end of this month. It contains slightly more than `250,000` vectors.

It is important to understand [Clickhouse ANN indexes](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/annindexes#annoy-annoy) for this section. The term `GRANULARITY` from their documentation is especially relevant.

We only test up to a `GRANULARITY` of `100` as anything over that would have no difference.
`8192*100=819200` is already one chunk for the whole dataset.

### Part 1 - annoy index

#### Speed

**TLDR**: Clickhouse's annoy index is faster than Qdrant's non-quantized exact search by ~2x

The subsequent analysis exclusively presents exact results from Qdrant. However, it's important to note that [Qdrant also offers support for quantization](https://qdrant.tech/articles/scalar-quantization/), enhancing speed and making it a viable option, particularly for handling extensive datasets.

![Clickhouse vs. Qdrant speed graph](/assets/clickhouse-vs-qdrant-speed.png)

Raw numbers: 

```
ClickHouse no index avg search time: 0.46365357384012895s
ClickHouse no index max search time: 0.5633612700039521s
ClickHouse no index min search time: 0.3683128940028837s
Qdrant avg search time: 0.08820767688928755s
Qdrant max search time: 0.15530096499423962s
Qdrant min search time: 0.048996901998179965s
ClickHouse 1 avg search time: 1.0917331094591645s
ClickHouse 1 max search time: 1.388704337994568s
ClickHouse 1 min search time: 0.8996438419999322s
ClickHouse 10 avg search time: 0.1356209996396501s
ClickHouse 10 max search time: 0.1880552560032811s
ClickHouse 10 min search time: 0.10617626599560026s
ClickHouse 100 avg search time: 0.04859960312038311s
ClickHouse 100 max search time: 0.08107170500443317s
ClickHouse 100 min search time: 0.032141474992386065s
```

#### Accuracy

**TLDR** Clickhouse's annoy index is **far** less accurate than Qdrant. The results are, to an extent, bad enough as to be semi-random.

The following numbers indiciate how far top 10 results from Qdrant shift within the sets of the top 100 for Clickhouse by index. If a result from the Qdrant top 10 is not present, we treat the shift as 100. Thank you to Kanadaj from [RoyalRoad](https://royalroad.com) for inspiring this approach.

It is reliable to do this as Qdrant supports querying for `exact` results.

```
ClickHouse 1 avg shift: 4.5
ClickHouse 1 max shift: 9
ClickHouse 1 min shift: 0
ClickHouse 1 std shift: 2.8722813232690143
ClickHouse 10 avg shift: 79.656
ClickHouse 10 max shift: 100
ClickHouse 10 min shift: 0
ClickHouse 10 std shift: 40.064992998876214
ClickHouse 100 avg shift: 87.33
ClickHouse 100 max shift: 100
ClickHouse 100 min shift: 0
ClickHouse 100 std shift: 33.21907735022152
```

### Part 2 - HNSW usearch index

#### Speed

**TLDR**: Clickhouse/unum's HNSW usearch index is slower than no index at all granularities and no-index is 2x slower than Qdrant

The following graph shows speed results when using Qdrant in "exact" mode. 

![Clickhouse/Unum HNSW usearch vs. Qdrant speed graph](/assets/usearch-clickhouse-vs-qdrant-speed.png)

Raw numbers: 

```
ClickHouse no index avg search time: 0.3848514598194743s
ClickHouse no index max search time: 0.4841100390185602s
ClickHouse no index min search time: 0.36708716896828264s
Qdrant avg search time: 0.06445666696759872s
Qdrant max search time: 0.06592152494704351s
Qdrant min search time: 0.06282151298364624s
ClickHouse 1 avg search time: 0.8424794271984137s
ClickHouse 1 max search time: 1.132948489044793s
ClickHouse 1 min search time: 0.8090874889749102s
ClickHouse 10 avg search time: 0.6162429533223621s
ClickHouse 10 max search time: 0.6449962719925679s
ClickHouse 10 min search time: 0.5852355810347944s
ClickHouse 100 avg search time: 0.5669281100016087s
ClickHouse 100 max search time: 0.5991650649812073s
ClickHouse 100 min search time: 0.5392437219852582s
```

#### Accuracy

**TLDR** Clickhouse/Unum's HNSW usearch index is also **far** less accurate than Qdrant. 

We used the same technique for the `usearch` index as we did for the `annoy` index. 

```
ClickHouse 1 avg shift: 4.5
ClickHouse 1 max shift: 9
ClickHouse 1 min shift: 0
ClickHouse 1 std shift: 2.8722813232690143
ClickHouse 10 avg shift: 62.831
ClickHouse 10 max shift: 100
ClickHouse 10 min shift: 0
ClickHouse 10 std shift: 47.6877179051378
ClickHouse 100 avg shift: 69.896
ClickHouse 100 max shift: 100
ClickHouse 100 min shift: 0
ClickHouse 100 std shift: 45.44800528076012
```

## Conclusion

Due to the extremely low precision, it is not viable to replace Qdrant with Clickhouse at this time. Going forward, we will continue to exercise caution and refrain from fully committing to any particular data store solution.
