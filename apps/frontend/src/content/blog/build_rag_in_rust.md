---
title: Build retrieval augmented generation (RAG) from scratch in Rust with Qdrant and OpenAI!
author: skeptrune @ arguflow
pubDatetime: 2023-09-27T10:00:00Z
postSlug: build-rag-from-scratch-in-rust
featured: true
draft: false
tags:
  - rust
  - qdrant
  - openai
  - retrieval-augmented-generation
  - rag
ogImage: /assets/Arguflow_Opengraph.png
description: We show how to build RAG from the ground up in Rust with as few dependencies as possible. Full implementation details will be linked in every place that it is relevant.
---

# Build retrieval augmented generation (RAG) from scratch in Rust with Qdrant and OpenAI!

The below tutorial will contain mostly pseudo-code for building RAG in Rust. If you are looking for a full implementation then check out the full code [here](https://github.com/arguflow/arguflow/blob/main/server/src/handlers/message_handler.rs#L72). You can even [self-host it with our guide](https://docs.arguflow.ai/self_hosting). 

In this guide, we are using Qdrant as the vector database. However, you can always replace that your with database of choice, [even postgresql](https://blog.arguflow.ai/posts/lantern-vs-pgvector-vs-svd-qdrant)! If you found this short guide to be helpful then please consider [giving Arguflow a star on Github](https://github.com/arguflow/arguflow).

![rust github star armed crab](/assets/rust-github-star-armed-crab.jpeg)


## The relevant crates 

- [openai_dive](https://github.com/tjardoo/openai-client)
- [qdrant-client](https://github.com/qdrant/rust-client)

## Step 1 - Load some data into Qdrant

You are going to want to load some data into Qdrant such that you can retrieve when you go to do generative inference. That will look roughly as follows. The [full implementation is here](https://github.com/arguflow/arguflow/blob/main/server/src/operators/qdrant_operator.rs#L12). 

```rust
pub async fn create_new_qdrant_point_query(
    point_id: uuid::Uuid,
    embedding_vector: Vec<f32>,
    content: String,
    private: bool,
    author_id: Option<uuid::Uuid>,
) -> Result<(), actix_web::Error> {
    let qdrant = get_qdrant_connection()
        .await
        .map_err(|err| ServiceError::BadRequest(err.message.into()))?;

    let payload = json!({
        raw_text: content
    })
    .try_into()
    .expect("A json! Value must always be a valid Payload");

    let point = PointStruct::new(point_id.clone().to_string(), embedding_vector, payload);

    let qdrant_collection = std::env::var("QDRANT_COLLECTION").unwrap_or("debate_cards".to_owned());
    qdrant
        .upsert_points_blocking(qdrant_collection, vec![point], None)
        .await
        .map_err(|_err| ServiceError::BadRequest("Failed inserting card to qdrant".into()))?;

    Ok(())
}
```

You are going to want to call that function a few times to make sure that you load a sufficient amount of data into Qdrant such that there is something meaningful to be retrieved during your generative inference. 

## Step 2. Generate a search query string to embed and use for retrieval from the user's prompt

Embeddings function that it works best to query with the hallucinated response to a user's prompt rather than the prompt itself. This is because you want to perform vector retrieval using the embedding for the theoretical inference more so than you do the prompt.

It is unlikely that relevant information will have an embedding similar to that of a question in example. 

To that end, you want to take the user's prompt and generate a short inference off it to do vector retrieval with as follows. [Full implementation here](https://github.com/arguflow/arguflow/blob/main/server/src/handlers/message_handler.rs#L365).

```rust
let rag_prompt = std::env::var("RAG_PROMPT").unwrap_or("Write a 1-2 sentence semantic search query along the lines of a hypothetical response to: \n\n".to_string());

let counter_arg_parameters = ChatCompletionParameters {
    model: "gpt-3.5-turbo".into(),
    messages: vec![ChatMessage {
        role: Role::User,
        content: format!(
            "{}{}",
            rag_prompt,
            openai_messages
                .clone()
                .last()
                .expect("No messages")
                .clone()
                .content
        ),
        name: None,
    }],
    temperature: None,
    top_p: None,
    n: None,
    stop: None,
    max_tokens: None,
    presence_penalty: Some(0.8),
    frequency_penalty: Some(0.8),
    logit_bias: None,
    user: None,
};

let evidence_search_query = client
    .chat()
    .create(counter_arg_parameters)
    .await
    .expect("No OpenAI Completion for evidence search");
```

### Step 3. Create a vector embedding from the search query string using OpenAI

This is a simple API call to the server running your embedding model. In our case, that will be `openai`'s API. 

It looks as follows. [Full implementation here](https://github.com/arguflow/arguflow/blob/main/server/src/operators/card_operator.rs#L80C1-L99C2).

```rust
pub async fn create_openai_embedding(message: &str) -> Result<Vec<f32>, actix_web::Error> {
    let open_ai_api_key = env!("OPENAI_API_KEY", "OPENAI_API_KEY should be set").into();
    let client = Client::new(open_ai_api_key);

    let parameters = EmbeddingParameters {
        model: "text-embedding-ada-002".to_string(),
        input: message.to_string(),
        user: None,
    };

    let embeddings = client
        .embeddings()
        .create(parameters)
        .await
        .map_err(actix_web::error::ErrorBadRequest)?;

    let vector = embeddings.data.get(0).unwrap().embedding.clone();
    Ok(vector.iter().map(|&x| x as f32).collect())
}
```

### 4. Use Qdrant to retrieve the information you plan to augment with

The included code will have to be slightly altered for your usage such that you pull the raw text out of the returned points instead of just the ID. Arguflow stores the raw text in Postgresql and does an external db join using the id. [Check out the full implementation here](https://github.com/arguflow/arguflow/blob/main/server/src/operators/qdrant_operator.rs#L140C1-L176C2).

```rust
pub async fn search_qdrant_query(
    page: u64,
    filter: Filter,
    embedding_vector: Vec<f32>,
) -> Result<Vec<SearchResult>, DefaultError> {
    let qdrant = get_qdrant_connection().await?;

    let qdrant_collection = std::env::var("QDRANT_COLLECTION").unwrap_or("debate_cards".to_owned());
    let data = qdrant
        .search_points(&SearchPoints {
            collection_name: qdrant_collection.to_string(),
            vector: embedding_vector,
            limit: 10,
            offset: Some((page - 1) * 10),
            with_payload: None,
            filter: Some(filter),
            ..Default::default()
        })
        .await
        .map_err(|_e| DefaultError {
            message: "Failed to search points on Qdrant",
        })?;

    let point_ids: Vec<SearchResult> = data
        .result
        .iter()
        .filter_map(|point| match point.clone().id?.point_id_options? {
            PointIdOptions::Uuid(id) => Some(SearchResult {
                score: point.score,
                point_id: uuid::Uuid::parse_str(&id).ok()?,
            }),
            PointIdOptions::Num(_) => None,
        })
        .collect();

    Ok(point_ids)
}
```

### 5. Create a generative inference using your retrieved data 

You can use your LLM of choice here. There are many services which will provide you with an OpenAI compatible API such that you can even continue using `openai_dive` if you so choose.

This step is mostly prompt engineering using your retrieved information. [Full implementation code here](https://github.com/arguflow/arguflow/blob/main/server/src/handlers/message_handler.rs#L434C9-L500C73).

```rust
let citation_cards: Vec<CardMetadataWithVotesAndFiles> = metadata_cards
        .iter()
        .map(|card| {
            if card.private {
                let matching_collided_card = collided_cards
                    .iter()
                    .find(|card| card.qdrant_id == card.qdrant_id && !card.metadata.private)
                    .expect("No public card metadata");

                matching_collided_card.metadata.clone()
            } else {
                card.clone()
            }
        })
        .collect();

    citation_cards_stringified =
        serde_json::to_string(&citation_cards).expect("Failed to serialize citation cards");
    citation_cards_stringified1 = citation_cards_stringified.clone();

    let rag_content = citation_cards
        .iter()
        .map(|card| card.content.clone())
        .collect::<Vec<String>>()
        .join("\n\n");

    last_message = format!(
        "Here's my prompt: {} \n\n Pretending you found it, base your tone on and use the following retrieved information as the basis of your response: {}",
        openai_messages.last().expect("There needs to be at least 1 prior message").content,
        rag_content,
    );
}

// replace the last message with the last message with evidence
let open_ai_messages = openai_messages
    .clone()
    .into_iter()
    .enumerate()
    .map(|(index, message)| {
        if index == openai_messages.len() - 1 {
            ChatMessage {
                role: message.role,
                content: last_message.clone(),
                name: message.name,
            }
        } else {
            message
        }
    })
    .collect();

let parameters = ChatCompletionParameters {
    model: "gpt-3.5-turbo".into(),
    messages: open_ai_messages,
    temperature: None,
    top_p: None,
    n: None,
    stop: None,
    max_tokens: None,
    presence_penalty: Some(0.8),
    frequency_penalty: Some(0.8),
    logit_bias: None,
    user: None,
};

let (s, r) = unbounded::<String>();
let stream = client.chat().create_stream(parameters).await.unwrap();
```

### Conclusion 

If you found this short guide to be helpful then please consider [giving Arguflow a star on Github](https://github.com/arguflow/arguflow). If you are considering doing all of this with a REST API and streaming responses back to the user then definitely consider [self-hosting Arguflow!](https://docs.arguflow.ai/self_hosting). 

![rust github star crab meme](/assets/rust-github-star-crab.png)
