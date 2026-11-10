---
title: "Building My Website with AI: The Experiment"
description: "Building fernandoghg.com with ChatGPT and Codex: delegating technical work, choosing tools, prioritising privacy and learning along the way."
published: "2026-10-25"
lang: en
category: desarrollo
draft: true
translationKey: crear-mi-web-con-ia-el-experimento
series: fernandoghg-com
seriesPart: 2
---

When I decided to create my own website, I knew what I wanted: a simple space to share projects, experiences and what I learned along the way.

What I wasn't sure about was which technologies to use or how to approach the development work.

Instead of starting by studying different frameworks and tools, choosing among them and implementing the whole solution myself, I decided to try something different: **delegating much of the technical decision-making and programming to artificial intelligence**.

I wanted to see how far this approach could take me, how much work it could save and what limitations I would encounter along the way.

## Delegating Development Without Losing Control

Although I'm a computer engineer, I wasn't familiar with the technologies we would eventually use to build the website.

That was precisely why one of the first experiments was to let AI evaluate the alternatives and propose a suitable solution.

My responsibility would be to set the goals and requirements: a fast website, easy to maintain, inexpensive to run, available in Spanish and English, and respectful of visitors' privacy.

I decided to use **ChatGPT to help analyse requirements, explore alternatives and plan the work**, while **Codex would work directly on the project's code**.

I wanted to focus mainly on the content, functionality and certain design and architecture decisions, leaving much of the technical implementation to these tools.

But delegating didn't mean accepting every proposal.

From the beginning, I wanted a supervised process: defining what I needed, reviewing alternatives, checking results and approving changes before incorporating them into the main version.

The aim wasn't to prove that AI could do everything by itself, but to discover how far it could help me build a complete project.

## Choosing the Technologies

One of the first decisions was to avoid an unnecessarily complex architecture.

For a personal website with pages and articles, maintaining an application server, database or other services that would add little value didn't seem reasonable.

Based on the requirements I'd set, the proposed solution was to use **Astro and TypeScript** to generate a static website, with **Cloudflare Pages** as the hosting platform.

I hadn't used these technologies before, but they suited the project's goals: good performance, straightforward maintenance, minimal resource requirements and low running costs.

We also built in support for Spanish and English from the outset, so internationalisation wouldn't become an extra complication later on.

In this case, I didn't need to master every tool before getting started. I needed to understand the proposed decisions well enough to assess whether they met my goals and to check that the result worked.

## Privacy as a Requirement from the Start

Another aspect I considered essential was data protection.

When I described the project to the AI, I explicitly required the proposed solutions to respect applicable Spanish and European law, particularly the General Data Protection Regulation (GDPR), Spain's Organic Law on Personal Data Protection and Guarantee of Digital Rights (LOPDGDD), and other relevant provisions.

I didn't want the convenience of adding a library or external service to introduce unnecessary tracking or collection of personal data.

Nor did I need my own analytics, personalised advertising or tools for studying visitors' behaviour.

That's why I opted for a website without advertising trackers and with as few dependencies as necessary.

Of course, the absence of first-party tracking tools doesn't mean that hosting providers and other services perform no technical data processing. Those aspects still need to be reviewed and explained transparently.

Privacy, then, couldn't be addressed simply by adding a legal notice at the end of development. **It had to be part of the requirements shaping technical decisions from the very beginning.**

## What I've Learned So Far

One of my first conclusions is that using AI doesn't remove the need to think about software design. What changes, to a large extent, is the way you work.

By delegating the choice of tools and much of the programming to AI, I've been able to focus more on defining what I wanted to achieve, setting requirements, assessing proposals and checking results.

That doesn't mean the work disappears. Some tasks can be completed much more quickly, but others become more important.

You need to explain your requirements clearly, review the proposed solutions and spot when something isn't working as it should.

I've also found that generating code quickly doesn't guarantee a suitable result. While building this website, we've had to pay attention to security, privacy, accessibility, internationalisation and deployment.

In short, **AI can do more than save development time; it can also allow me to focus more on important decisions and the quality of the outcome**.

And there's another important conclusion: for a small project like this one, keeping things simple remains a good strategy, regardless of who writes the code.

## An Ongoing Experiment

The website already has a working technical foundation, but the experiment with AI doesn't end here.

There are still things to improve, new content to add and decisions to make.

Some interesting questions also remain: how much time does AI actually save? Which tasks can it handle independently? What problems arise when working with technologies you don't already know?

I'd like to keep exploring these questions and sharing concrete examples of what works, what doesn't and the solutions we find along the way.

Ultimately, the aim wasn't simply to have AI generate a website.

**It was to find out whether AI could help me turn an idea into a real project, while allowing me to spend my time where I could contribute the most.**
