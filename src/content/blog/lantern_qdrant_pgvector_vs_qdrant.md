---
title: Pgvector and lanterndb/usearch are now nearly as fast and accurate as a SVDB (Qdrant)
author: skeptrune and vidyoot @ arguflow
pubDatetime: 2023-09-21T10:00:00Z
postSlug: lantern-vs-pgvector-vs-svd-qdrant
featured: true
draft: false
tags:
  - svd
  - qdrant
  - postgresql
  - lanterndb
  - engineering
  - vector-db
  - OLTP
ogImage: /assets/Arguflow_Opengraph.png
description: In-depth examination of whether or not lantern and pgvector are able to replace your specialized vector database
---

# Pgvector and lanterndb (postgres+usearch) are now nearly as fast and accurate as a SVD (Qdrant)

## Star us on Github at [github.com/arguflow/arguflow](https://github.com/arguflow/arguflow)!!!!

![star-please](/assets/please-star-us.png)

## Findings

Both [pgvector](https://github.com/pgvector/pgvector) and [lanterndb](https://lantern.dev/)(roughly postgresql + [usearch](https://www.unum.cloud/)) are **nearly as fast** as [Qdrant](https://qdrant.tech/) and **can** be **equally precise** after tuning. This means that you should first place your vectors in both [Qdrant](https://qdrant.tech/) and [pgvector](https://github.com/pgvector/pgvector) or [lanterndb](https://lantern.dev/) then tweak your HNSW index params, `m` and `ef_construction`, such that the postgres solution is just as accurate as [Qdrant](https://qdrant.tech/). Following that, move forward with postgres alone.

If you are not already using postgres and do not have requirements for an ACID compliant solution, then we would still recommend [Qdrant](https://qdrant.tech/). It has a lot of convenience features, supports quantization, and does not require tuning to be accurate. Most important, Qdrant is much easier and more reliable to scale horizontally

Check out [this notebook](https://github.com/arguflow/qdrant-svd-vs-lantern-vs-pgvector) to replicate our results. 

### Speed Comparisons

![pgsolutions vs qdrant](/assets/speed-comparison.png)

### Accuracy comparisons

![pgvector accuracy](/assets/pgvector-accuracy.png)

![lanterndb accuracy](/assets/lanterndb-accuracy.png)

### License comparisons 

- pgvector: Portions Copyright (roughly MIT)
- lanterndb: MIT
- Qdrant: Apache-2.0

## Why even test PostgreSQL’s pgvector extension against Qdrant?

Suppose you are looking for the best possible performance, scalability, and features for vector search. In that case, switching from a Specialized Vector Database (SVD) such as Qdrant is generally not recommended.

However, a [blog post by SingleStore](https://www.singlestore.com/blog/why-your-vector-database-should-not-be-a-vector-database/) explains an alternative use-case:

>Vectors and vector search are a data type and query processing approach, not a foundation for a new way of processing data. Using a specialty vector database (SVDB) will lead to the usual problems we see (and solve) again and again with our customers who use multiple specialty systems: redundant data, excessive data movement, lack of agreement on data values among distributed components, extra labor expense for specialized skills, extra licensing costs, limited query language power, programmability and extensibility, limited tool integration, and poor data integrity and availability compared with a true [Database Management Systems] DBMS.

One important challenge to consider when using an SVD is data consistency. Vector databases are typically separate from other data storage systems, such as data lakes and transactional databases. [Ce Gao from ModeIZ provides an example to better explain this](https://modelz.ai/blog/pgvector):

>Imagine if your data is already stored in an OLTP database such as PostgreSQL. To perform vector search using an independent vector database, you need to first extract the data from the database, then convert each data point into a vector using services such as OpenAI Embedding, and then synchronize it to a dedicated vector database. This adds a lot of complexity. Furthermore, if a user deletes a data point in PostgreSQL but it is not deleted in the vector database, then there will be data inconsistency issues. This issue can be very serious in actual production environments.

Qdrant provides a versatile payload API that enables storage of data as arbitrary JSON. Regardless, this comes without explicit schema assurances, migration avenues, or transactional guarantees. When porting into a production environment or scaling your database, the difficulty of integrating this with your OLTP store increases, also requiring more complex coordination logic. 

## HNSW Indexing: How does it work?

[Lanterndb](https://lantern.dev/) (roughly postgresql + [usearch](https://www.unum.cloud/)), [pgvector](https://github.com/pgvector/pgvector), and [Qdrant](https://qdrant.tech/) are all viable solutions explicity because they support HNSW indexing.

Hierarchical Navigable Small World graphs or HNSW is an algorithm for approximate nearest neighbor search. HNSW graphs are among the top performing indexes for vector similarity search – popular for its fast search speeds and recall accuracy. 

HNSW graphs are constructed by hierarchically organizing a set of nodes into a series of layers. A vector is also referred to as a node. Each layer contains a smaller number of nodes than the previous layer. Furthermore, in every layer, the nodes are more similar to each other than those in the previous layer. The algorithm starts at the densest layer and greedily traverses the graph, moving to the next layer, finding the node in the current layer closest to the query point, and repeating this process. The algorithm ends once it reaches the least dense layer, with the node at that layer being returned as the nearest neighbor. 

HNSW tends to be much faster to query than the traditional list-based query algorithm due to the use of graphs and layers that reduce the number of distance comparisons being run. By minimizing the overlap of shared neighbors across layers also helps increase query speeds.
