---
layout: home
title: An open location protocol
titleTemplate: about.placepin.org

hero:
  name: 'placepin<span class="pp-stop">.</span>org'
  text: Nine characters for any point on Earth.
  tagline: >-
    An open, offline-decodable location protocol. No lookup table, no account,
    no service to be cut off from — a code is arithmetic, and anyone can
    implement it.
  actions:
    - theme: brand
      text: Read the specification
      link: /spec/spec
    - theme: alt
      text: Join the beta
      link: https://forms.gle/RbxSy673MNBGybju5
    - theme: alt
      text: Open the app
      link: https://placepin.org

features:
  - title: An equal-area grid, computed live
    details: >-
      Three nested dive-downs, each splitting its parent box into 27,000 cells
      by a deterministic apportionment routine. No precompute step and no index
      — every encode and decode partitions on the fly, which is what lets a
      client work with no network at all.
    link: /spec/spec#_03-·-the-grid
    linkText: The grid, normatively

  - title: An alphabet that cannot spell
    details: >-
      Thirty characters, no vowels, no L. Blocks cannot form words, so no code
      lands on a school and becomes a screenshot. 0 and 1 are safe to include
      precisely because O, I and L are absent.
    link: /spec/spec#_02-·-alphabet
    linkText: Why these thirty

  - title: Every truncation is a real address
    details: >-
      Drop the leading blocks and what remains still decodes — to the ≈840 m
      area, then the ≈137 km region. A coarser code is a first-class address,
      not a degraded one.
    link: /spec/spec#_01-·-anatomy-of-a-code
    linkText: Anatomy of a code

  - title: Conformance is fixtures, not prose
    details: >-
      sin, cos and sqrt are not bit-identical across platforms, so the
      specification defines conformance by published test vectors instead of by
      its own text. Every implementation consumes the same file.
    link: https://github.com/placepin-org/placepin-spec/blob/main/vectors.json
    linkText: vectors.json

  - title: Open, because the alternative is a dependency
    details: >-
      A code decodes through the published algorithm, specification and
      vectors, with no central service and no map provider to favour. A
      location protocol one company controls is not infrastructure — it is a
      billing relationship.
    link: /why
    linkText: Why another protocol

  - title: Still 0.x — and 1.0 is the freeze
    details: >-
      Every version is a 0.x on purpose: nothing emitted before the freeze is a
      durable code. Beta and stress testing come first, and 1.0 lands with
      non-Latin scripts mapped one-to-one onto the existing thirty characters.
    link: /next
    linkText: The road to 1.0
---

## What this is

placepin turns a latitude and longitude into a nine-character address, and back again:

<PinCode code="PYY-ZT7-WMR" />

That code names a cell roughly five metres on a side — a doorway, a gate, a particular corner of a field. It is short enough to say down a phone, fixed enough in shape to type without a keyboard fighting you, and computable in both directions with about three kilobytes of code and no network.

The protocol exists because the alternatives each give up something specific. Plus Codes are longer at comparable precision. what3words is proprietary and its word lists are a licensing dependency. Geohash contains vowels, so its codes can and do spell things. A bare latitude and longitude is precise and completely unsayable. [Why another protocol](/why) makes that case properly, including the parts that do not favour placepin.

placepin's own honest disadvantages are stated in the specification rather than buried: there is **no checksum**, the conformance burden is floating-point, and the truncation direction is unfamiliar. [§10 lays them out plainly](/spec/spec#_10-·-versioning-prior-art-open-questions) alongside the claims.

## The one thing that surprises everyone

A code is written **finest to coarsest**, left to right. The most specific block comes first, because that is the part a person is actually told — nobody knows which of 27,000 global regions they are standing in, but "the gate at `PYY`" is a thing someone can say to you.

The cost of that ordering is that truncation runs **right to left**, which is backwards from every prefix system you have met:

<TruncationLadder />

That last rung is the trap. `PYY` on its own is not a coarse address and not an error — it is one of 27,000 local values *relative to whichever area cell it is paired with*, meaning something different inside each of roughly 729 million area-and-region combinations. §01 makes it normative that software must never decode three characters as a local block in isolation.

The same rule kills prefix indexes. Two codes sharing a leading block are usually continents apart, so **string similarity implies nothing** except a genuine right-anchored suffix match.

## There is no check character

This is a deliberate omission, not an oversight, and it has a real consequence worth stating in plain language: **every corrupted code is still a valid address, somewhere.** A typo does not produce an error. It produces a different, real place — possibly on another continent.

The specification's position is that the fix belongs in the product, not the format. Anything built on placepin should preview the cell on a map and have a person confirm it before that location is acted on. A code should never be routed straight to a navigation handoff.

## Where the draft actually stands

Protocol **v5** is a draft, and [§10](/spec/spec#_10-·-versioning-prior-art-open-questions) is unusually direct about what that means: nothing emitted before v5-final is a durable code. The grid, the apportionment rule, the boundary ownership and the normalization are all resolved. What is not resolved is human:

- **The letter `Y`.** It behaves as a semi-vowel — `SKY`, `GYM`, and at least one three-letter Y-word that is a slur. If Y is dropped, the alphabet becomes 29 characters and **every code that exists changes meaning**, with no checksum to catch it.
- **The confusable pairs.** 1/7 in European handwriting, 2/Z, 5/S and 8/B by sight, M/N over a phone. All still in the set, all awaiting transcription trials.
- **The block order itself**, which is considered actively unstable until the proximity-aware input it was meant to enable has been tried by real people.

Governance is the other open question, and it is not technical: the specification, the reference implementation and this site are one person's repositories today. A protocol meant to outlive its own domain name cannot stay that way, so [moving it to an open-source organisation](/next#an-open-source-organisation) is on the road to the freeze rather than filed under someday.

Freezing those is what the beta is for — and the freeze is `1.0`, not a release number that happens next. [What's next](/next) lays out the road there, including what a 1.0 has to carry: **codes in non-Latin scripts**, mapped one-to-one onto the existing thirty characters so a script code is the same address rather than a related one. Which scripts, and which characters within them, is explicitly a decision for the people who read them.

## The source

Three repositories, and the split between them is the point — the protocol, an implementation of it, and the fixtures that decide whether the second got the first right.

<SourceLinks />

Anything that is not a bug report or a specification proposal — governance, an implementation in another language, a script mapping, building on this: **[hello@placepin.org](mailto:hello@placepin.org)**.

<BetaCta />
