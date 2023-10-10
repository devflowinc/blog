---
title: Chat with Louis Rossmann | Navigating all of Louis's videos with Semantic Search and RAG
author: skeptrune @ arguflow
pubDatetime: 2023-10-09T10:00:00Z
postSlug: chat-with-louis-rossmann
featured: true
draft: false
tags:
  - rossmann
  - right-to-repair
  - semantic-search
  - self-hosting
  - retrieval-augmented-generation
  - rag
ogImage: /assets/Arguflow_Opengraph.png
description: We used the Arguflow service to stand up semantic search and RAG for all of Louis Rossmann's Youtube content. Try it out and tell us what you think!
---

# Chat with Louis Rossmann | Navigating all of Louis' videos with Semantic Search and RAG

At Arguflow, we provide an open source toolkit for quickly standing up semantic search and retrieval-augmented generation (RAG) on your data sources.

We've been hard at work on demos showcasing how you can use Arguflow to build Search and RAG products. Last week, we released our [Enron Demo](https://blog.arguflow.ai/posts/enron-unleashed-semantic-search), allowing you to [Search](https://enron-search.arguflow.ai/) and [Chat](https://enron-search.arguflow.ai/) over the entirety of the Enron Corpus.

![Rust crab github star us or else](/assets/rust_github_star_or_else.jpeg)

Now, we're really excited to kickoff our new series of demos with popular online influencers. Those of you that are active in the right-to-repair scene may appreciate this one. Introducing [Search](https://louis-search.arguflow.ai/) and [RAG](https://louis-chat.arguflow.ai/) over the entirety of [Louis Rossmann's](https://www.youtube.com/channel/UCl2mFZoRqjw_ELax4Yisf6w) video archive!

For those that don't know Louis, he is an American independent repair technician, right to repair activist, and Youtuber with over 1.8 million subscribers. He is the owner and operator of Rossmann Repair Group in Austin, Texas. And is a partner at FUTO, where we are participating in their Summer Fellows Class.

# Chat with and Search Transcripts of all of Louis's Videos Yourself

This was a particularly unique Dataset to explore. As open-source advocates ourselves, seeing some of Louis's most common topics, in particular about [Google,](https://louis-search.arguflow.ai/collection/5de96d2c-3a87-40cd-a938-a12ddfe9e11d) was really funny and interesting

The demo search and chat experiences are publicly available for you to try out and use at [louis-search.arguflow.ai](https://louis-search.arguflow.ai) and [louis-chat.arguflow.ai.](https://louis-chat.arguflow.ai)

# How to self-host and deploy a mirror yourself

Follow our self-hosting guide on docs.arguflow.ai to stand up the REST API and frontends.
Use the Youtube API to extract all the video IDs of his channel.
Iterate over each video and use some sort of audio-to-text model to convert each video into a transcript and upload them.
The code will look something like this:

```python
for key in keys:
    try:
        video_url = key[8:]  # @param {type:"string"}
        video = YouTube(video_url)
        audio_file = (
            video.streams.filter(only_audio=True).first().download(
                filename="audio.mp4")
        )
        transcription = whisper_model.transcribe(audio_file, verbose=False)
        df = pd.DataFrame(transcription["segments"], columns=[
                          "start", "end", "text"])
        for start in range(0, len(df), 8):
            end = min(start + 8, len(df))
            chunk = df.iloc[start:end]
            text = chunk["text"].astype(str).str.cat(sep="")
            data = {
                "card_html": text,
                "link": video_url + f"&t={math.floor(chunk.iloc[0]['start'])}",
                "private": False,
                "metadata": {
                    "Title": video.title,
                    "Description": video.description,
                    "Thumbnail": video.thumbnail_url,
                    "Channel": video.author,
                    "Duration": video.length,
                    "Uploaded At": video.publish_date.strftime("%Y-%m-%d %H:%M:%S"),
                },
            }
            print(data)
            response = requests.post(
                "http://localhost:8090/api/card", json=json.dumps(data)
            )
            print(video_url + f"&t={math.floor(chunk.iloc(0)['start'])}")
            if response.status_code != 200:
                print(f"Error: {response.text}")
                r.set(
                    "Error: " + video_url +
                    f"&t={math.floor(chunk.iloc(0)['start'])}",
                    "Error",
                )
        r.delete(key)
    except Exception as e:
        print("Error: " + str(e))
        r.set("Error: " + video_url, "Error")
        continue
```

# Uploading data to server

Send a video transcription to the server using python

```python
data = {
    "card_html": text,
    "link": video_url + f"&t={math.floor(chunk.iloc[0]['start'])}",
    "private": False,
    "metadata": {
        "Title": video.title,
        "Description": video.description,
        "Thumbnail": video.thumbnail_url,
        "Channel": video.author,
        "Duration": video.length,
        "Uploaded At": video.publish_date.strftime("%Y-%m-%d %H:%M:%S"),
    },
}
response = requests.post(
    "https://your-api-example.com/api/card",
    json=json.dumps(data)
)
```

The full example of this can be seen in the [repo here](https://github.com/arguflow/youtube-transcribe/blob/main/main.py)

# Favorite Searches from the Dataset

Using Semantic Search you can pull some unique results from the Data, we even included timestamps in the card metadata so you can go to the exact moment in the video that certain things were said.

Some of our favourite searches to run include

- 'Google is run by demonic powers beyond our understanding or control'
- 'Apple has absolutely no clue what they're doing'
- 'Even a monkey could repair something like this'
- 'Google has eyes and ears everywhere, I am paranoid'
- 'My privacy is leaking like a faucet in a frat house'

# Conclusion!

This is the first of our upcoming influencer demos, and given our admiration for Louis we had a lot of fun compiling this one. We hope you have fun playing with it or standing up your own version on a different persona you follow or enjoy.

If you found this interesting, or got use out of the [self-host tutorial](https://docs.arguflow.ai/self_hosting), please [star us on github](https://github.com/arguflow/arguflow).

![me and the arguflow github star meme wojak](/assets/me_github_star_button_wojak.png)
