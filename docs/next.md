---
title: What's next
description: The road from 0.x to the freeze, and what a 1.0 has to carry, including non-Latin codes.
outline: [2, 3]
---

# What's next

::: warning This page is a plan, not the specification
Everything below describes intended direction. The normative document is [SPEC.md](/spec/spec), and nothing here changes what a code means today. Where a decision is still open it is marked **TODO** and says who decides.
:::

## Every version is a 0.x, on purpose

The protocol is at **v5 draft**, and every package that implements it is released as `0.x`. That is not modesty about maturity. It is a load-bearing signal, and [§10](/spec/spec#_10-·-versioning-prior-art-open-questions) makes it normative:

> Nothing emitted before v5-final is a durable code.

While the protocol sits below 1.0, a change that moves any conformance vector is a **minor** bump, never a patch. npm pins carets to the minor below 1.0, so `^0.1.0` will not resolve `0.2.0`, which means a protocol change cannot enter an implementation through a routine dependency update. Somebody has to take it deliberately.

**1.0 is the freeze.** After it, the alphabet, the partition routine, the tie-break rule, the normalization and the block write-order are all immutable, because changing any one of them changes where existing codes point and there is no checksum anywhere in the system to notice.

<Milestones :stages="[
  {
    version: '0.x',
    state: 'now',
    title: 'Draft: where the protocol is today',
    body: 'The grid, apportionment, boundary ownership and normalization are all resolved and conformance-tested. The alphabet is a candidate, not a decision. Codes emitted now are not durable.',
  },
  {
    version: '0.x',
    state: 'next',
    title: 'Beta and stress testing',
    body: 'The open questions are human ones, and they are settled by people using the thing rather than by more argument in the document: speech and handwriting transcription trials, the letter Y, the confusable pairs, and whether writing the spot first is genuinely easier to use.',
  },
  {
    version: '0.x',
    state: 'next',
    title: 'Implementations in other languages',
    body: 'JavaScript exists and is conformant. Python, Rust, Go, Swift, Kotlin and the rest are open, and each is a few hundred lines against a published fixture file, not a research project. Ports can start now; the vectors they test against are versioned with the spec.',
  },
  {
    version: '1.0',
    state: 'later',
    title: 'The freeze, and non-Latin codes',
    body: 'Everything the freeze covers becomes immutable. 1.0 is also the release that carries script support, because a mapping between scripts is exactly the kind of thing that must not change afterwards.',
  },
  {
    version: 'governance',
    state: 'next',
    title: 'An open-source organisation',
    body: 'The repositories are one person\'s today. A protocol meant to outlive its domain name cannot stay that way, and this needs to be settled before the freeze rather than after it.',
  },
]" />

## What the beta is actually testing

Stress testing here means load in the human sense, not the server sense; there is no server. The questions that hold 1.0 up are all about whether a code survives contact with a person:

| Open question | How it gets answered |
|---|---|
| Does the letter `Y` stay? | Transcription trials. It behaves as a semi-vowel: `SKY`, `GYM`, and at least one three-letter Y-word that is a slur. Dropping it makes the alphabet 29 characters and **changes the meaning of every code that exists**. |
| Do the confusable pairs hold up? | 1/7 in European handwriting, 2/Z, 5/S and 8/B by sight, M/N over a phone. All still in the set. |
| Is local-first genuinely easier? | The block order is considered actively unstable until the proximity-aware input it was meant to enable has been tried for real. |
| Does a code survive being spoken? | "P Y Y — Z T 7 — W M R", read down a phone line by someone who has never seen the format. |

Each of those has the same shape: it cannot be resolved by reasoning, and it cannot be revisited after 1.0.

[Join the beta →](https://forms.gle/RbxSy673MNBGybju5)

## Non-Latin codes

A nine-character code is meant to be an address a person can say, remember and type. For most of the world, a Latin-script code is none of those things, and an open location protocol that only works comfortably in one script has not really earned the word *open*.

### The mechanism: a 1:1 mapping, not a second protocol

The intended design is the most conservative one available. Each script gets a **1:1 character mapping onto the existing thirty**:

```
latin    0 1 2 3 4 5 6 7 8 9 B C D F G H J K M N P Q R S T V W X Y Z
         │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │
script   ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽
         exactly thirty, in one fixed published order
```

The consequences follow directly from that, and they are the reason for choosing it:

- **The grid does not change.** Nothing in §03 or §04 is touched. Encoding still produces the same three block indices; only the characters those indices are rendered with differ.
- **A script code is the same address, not a related one.** It is a rendering, the way a phone number is the same number in any numeral system. Convert in either direction and you land on the same cell, exactly.
- **Conformance stays one suite.** The Appendix A vectors continue to define correctness; a script mapping adds a table, not a second implementation.
- **Nothing existing changes meaning.** The Latin form is untouched, which is the only version of this feature that can ship alongside a freeze.

### What is not decided

::: danger TODO: this is a community decision
The mapping tables themselves are **not written**, and they are not going to be written by one person guessing at somebody else's script. Every question below is open, and the plan is to settle them with the communities who actually read and write in each script.
:::

The hard part is not the mechanism. It is that the properties §02 bought with the Latin alphabet do not automatically survive being carried across:

| Question | Why it is genuinely hard |
|---|---|
| **Which scripts, and in what order?** | Reach matters, but so does whether a script can supply thirty characters that are distinguishable in handwriting, in speech, and at small sizes. |
| **Does "cannot spell a word" survive?** | The Latin set is vowel-free, so blocks cannot form words. An arbitrary 1:1 map into another script has no such guarantee. It could easily produce a three-character block that is a real word, or a slur, in that language. Each mapping needs the same screening the Latin set got. |
| **Which characters are confusable in that script?** | Every script has its own 1/7 and 5/S. Only readers of that script can say which. |
| **What about case, and about scripts with no case?** | Latin codes are case-insensitive. Scripts without case need an equivalent normalization rule, and scripts with different casing behaviour need it stated. |
| **Digits: shared or mapped?** | The set contains 0–9. Some scripts have their own numerals; whether a code renders those or keeps ASCII digits is a readability decision, not a technical one. |
| **How is the script of a code known?** | A code has no version marker today. A script-rendered code must be recognisable as such from the string alone. That is the same rule §10 already imposes on any future extension, and the mistake v1→v2 made once already. |
| **Does the mapping order have a rationale, or is it arbitrary?** | A published fixed order is required either way. Whether it should follow the target script's own collation, or phonetic similarity, or nothing at all, is open. |

If you read and write in a script you would like to see supported, and especially if you can say which characters in it are confused with which, that is the single most useful thing you can bring to the beta.

## Implementations in other languages

There is one conformant implementation today: [`placepin-js`](https://github.com/placepin-org/placepin-js), the TypeScript reference, every Appendix A vector exact. One is enough to prove the spec and nowhere near enough for a protocol: placepin is only real in the languages people already work in.

[§10](/spec/spec#_10-·-versioning-prior-art-open-questions) lists this as open, and the shape of the work is unusually friendly:

- **The spec is the hard part, and it is done.** An implementation is `encode`, `decode`, and the partition routine from §03; the reference is about three kilobytes gzipped. There is no state, no I/O, no dependencies to bind.
- **Conformance is a file, not a judgement.** Every implementation consumes the same [`vectors.json`](https://github.com/placepin-org/placepin-spec/blob/main/vectors.json) from the same tagged release. Reproduce every row exactly, hold the §03 invariants, and it conforms. Nobody retypes Appendix A, and no port gets to mark its own exam paper.
- **The traps are documented.** Cycling largest-remainder apportionment, last-row/column bound snapping, the finest-first write order, and the rule that a bare three-character string is always a region: each is stated normatively with the failure mode it prevents.

Priority follows use: **Python** first (the spec names it), then the languages that put codes where they get used: **Rust and Go** for services and CLIs, **Swift and Kotlin/Java** for the phones people actually stand somewhere with, **C** for everything embedded. But that list is a guess about demand, not a plan; the port that actually happens is the one somebody wants.

Two rules for any port, both consequences of the draft status:

1. **Ship the vector suite in your tests**, pinned to a spec release. While the protocol is 0.x, a change that moves any vector is a minor bump, and your pin is what stops a protocol change arriving as a routine update.
2. **Nothing before v5-final is durable.** A port today is a port of a draft, and §02's open `Y` question could change the meaning of every code. Say so in your README the way `placepin-js` does.

If you start one, [say hello](mailto:hello@placepin.org). The implementations table in the spec repo's README lists every known port, and conformant ones get linked from here.

## An open-source organisation

Right now `placepin-spec`, `placepin-js` and this site are repositories under a single person's account, and the licences (CC BY 4.0 for the specification text, Apache-2.0 for the reference code) are [proposed rather than ratified](/spec/spec#_10-·-versioning-prior-art-open-questions). That is a reasonable state for a draft and an unreasonable one for infrastructure.

The point of an open protocol is that it keeps working without asking anyone. A specification whose only steward is one individual account does not clear that bar: it has a single point of failure for the domain, the npm scope, the repositories and the right to say what a code means. §10 already states the requirement, that **the protocol's identity must survive the domain name**, and personal ownership is the most obvious way it currently does not.

So before the freeze:

- **A neutral organisation** holds the specification, the reference implementations, the conformance fixtures, the `placepin.org` domain and the `@placepin` npm scope.
- **The licences are ratified**, with an explicit patent grant, rather than proposed in a table.
- **Changing a conformance vector is changing the protocol**, and needs a reviewer who knows that. A governance rule, not a convention someone remembers.
- **A written succession answer**, so the failure of any one person or account is an inconvenience rather than an ending.

::: warning TODO: the shape is not decided
Whether that is a foundation, a working group, a multi-maintainer GitHub organisation, or something hosted by an existing body is open. What is *not* open is the requirement: **no single account should be able to change what a code means, or to make the protocol unavailable.** Views on how to do this well are genuinely wanted; see below.
:::

## Contact

For anything that is not a bug report or a specification proposal, such as governance, implementations in other languages, script mappings, or wanting to build on this:

**[hello@placepin.org](mailto:hello@placepin.org)**

Everything technical is better off in the open, in the repository it belongs to:

<SourceLinks />

<BetaCta />
