---
title: Chat with Enron's Past | Navigating the Enron Email Corpus with RAG and semantic search
author: skeptrune @ arguflow
pubDatetime: 2023-09-28T10:00:00Z
postSlug: enron-unleashed-semantic-search
featured: true
draft: false
tags:
  - enron
  - semantic-search
  - self-hosting
  - retrieval-augmented-generation
  - rag
ogImage: /assets/Arguflow_Opengraph.png
description: We used the Arguflow service to stand up semantic search and RAG for the Enron Email corpus for the public. Try it out and tell us what you think!
---
# Chat with Enron's Past: Navigating the Enron Email Corpus with RAG and semantic search

At Arguflow, we provide an open source toolkit for quickly standing up semantic search and retrieval-augmented generation (RAG) on your data sources. 

To that end, we are launching several demos showing how you can use Arguflow to build search and RAG products. Today, we are excited to unviel [search](https://enron-search.arguflow.ai) and [RAG](https://enron-chat.arguflow.ai) for the Enron Email Corpus! 

If you think this interesting or helpful, then please [star our github project](https://github.com/arguflow/arguflow)!

![PCs pointing at github star meme](/assets/point-at-github-star-meme.png)

## Chat with Enron and explore the email corpus yourself

![Enron can cure male loneliness](/assets/enron-cure-to-male-loneliness.png)

The demo search and chat experiences are publicly available for you to try out and use at [enron-search.arguflow.ai](https://enron-search.arguflow.ai) and [enron-chat.arguflow.ai](https://enron-chat.arguflow.ai).

[Chat](https://enron-chat.arguflow.ai) is especially fun. You can literally talk to Enron. 

## How can self-host and deploy a mirror yourself 

We did not do anything to clean the dataset, so the search results can frequently be very noise. By cleaning the dataset before upload, you could stand up a much higher quality search experience.

1. Follow our [self-hosting guide on docs.arguflow.ai](https://docs.arguflow.ai/self_hosting) to stand up the REST API and frontends. 
2. Download the dataset from the [CMU page that hosts it](https://www.cs.cmu.edu/~./enron/)
3. Iterate over the csv and make the cards as you desire from there. The code for doing so will look roughly as follows: 

```python
headers = {'Content-Type': 'application/json',
           "Authorization": "af-pEJaygALr3ony0WkVv18JtOKccwCn7sj"}
data = {
    "card_html": row[-2],
    "link": row[2],
    "private": False,
    "metadata"  : {
        "Message-ID": row[1],
        "Date": row[3],
        "From": row[4][12:-2],
        "To": row[5][12:-2],
        "Subject": row[6],
        "X-From": row[7],
        "X-To": row[8],
        "X-CC": row[9],
        "X-BCC": row[10],
        "X-Folder": row[11],
        "X-Origin": row[12],
        "X-FileName": row[13],
        "User": row[15],
    }
}
data = requests.post("http://localhost:8090/api/card", data=json.dumps(data), headers=headers)
```

You can look at the [full code implementation including EDA here](https://github.com/arguflow/enron-upload/tree/main).

## Our favorite themes from the dataset

Enron was an absolutely wild company. The dataset is insane. There are all kinds of fun bits you can find will searching. We compiled a few of our favorite themes as groupings of documents you can checkout below: 

- [Employee Outrage](https://enron-search.arguflow.ai/collection/29c4a07a-3160-4641-a0d1-5e35721e1f4b)
- [Angry Investors](https://enron-search.arguflow.ai/collection/ca7d6431-68ef-42e8-8c6e-91a9fe45413d)
- [Scamming](https://enron-search.arguflow.ai/collection/f2c65f1f-5817-4a61-880d-b5db80cd73f7)
- [Sexism](https://enron-search.arguflow.ai/collection/a7a7e79f-be21-48bc-b607-65f34c5a6009)
- [Copypasta](https://enron-search.arguflow.ai/collection/ed52c8ce-55b4-4f91-9b0f-4d6c84ddc5c3)
- [Milk it](https://enron-search.arguflow.ai/collection/b21b6ee1-eca2-42cc-8a7f-56fe65c8cb39)

## Conclusion! 

This was a fun project and will help us explain what we do to legal firms. If you are interested in [self-hosting Arguflow](https://docs.arguflow.ai/self_hosting) and standing up something similar for your dataset, then please do get in touch!

If you find this helpful or interesting, then please also make sure to [star us on Github](https://github.com/arguflow/arguflow)!

![the squad starring our github meme](/assets/squad-github-star-meme.png)
